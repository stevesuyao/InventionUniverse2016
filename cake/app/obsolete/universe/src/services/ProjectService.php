<?php 

require_once ('models/Project/Project.php');
require_once ('ProjectTypeService.php');
require_once ('PlanetService.php');

define('PROJECTS_PATH', '/uploads/projects');

class ProjectService {

	public static function matchFields($project, $array) {
		$project->id            = $array['id'];
		$project->parent_id     = $array['parent_id'];
		$project->name          = $array['name'];
		$project->description   = $array['description'];
		$project->type_id       = $array['type_id'];
		$project->url           = $array['url'];
		$project->thumbnail_url	= $array['thumbnail_url'];
	}
	
	// Is used for preventing browser always read uploaded data from cache.
	private static function generateUploadCacheSuffix() {
		return "?ver=" . $_SERVER["REQUEST_TIME"];
	}

	private static function makeDirectoryName($project) {
		return PROJECTS_PATH . '/' . $project->parent_id;
	}
	
	private static function makeFileName($project, $type) {
		return $project->id . '.' . $type->extension;
	}
	
	/**
	 * Create a new project.
	 * Project files are stored under the projects upload folder as "/<user_id>/<project_id>.<project_extension>".
	 * @param $project Project object to be inserted into database.
	 * @return boolean True if successful, false otherwise.
	 */
	public function putProject($project, $file_data) {
		if ((!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $project->parent_id))) {
			return false;
		}
		
		include ('db.php');
		
		// FIRST, INSERT NEW RECORD INTO DATABASE.
		$stmt = $db->prepare('
			INSERT INTO projects (parent_id, name, description, type_id, url, created_at, updated_at) 
			VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			');
		
		$success = $stmt->execute(array(
			$project->parent_id, 
			$project->name, 
			$project->description, 
			$project->type_id, 
			'TO_BE_UPDATED' // URL depends on project id, which we only obtain after this insert. 
			));
			
		if (!$success) {
			return false; // Insert query failed.
		}
		
		// NEXT, CREATE THE PROJECT FILE IN THE APPROPRIATE USER DIRECTORY.
		$dir = ProjectService::makeDirectoryName($project);
		
		if (!is_dir('.' . $dir)) {
			mkdir('.' . $dir); // Create the directory if it doesn't exist.
		}
		
		// Get this project's appropriate file extension.
		$pts = new ProjectTypeService();
		$type = $pts->getProjectTypeByID($project->type_id);

		// Note: We suffer an extra query for the project file's extension because we don't
		// want to necessarily trust the information coming in from the client. E.g. a nefarious
		// user can modify packet data to change a file's extension to ".exe" or ".bat".

		// Create file.
		$project->id = $db->lastInsertId();
		$file_name = ProjectService::makeFileName($project, $type);
		if (!file_put_contents('.' . $dir . '/' . $file_name, $file_data)) { 
			return false;
		}
	
		self::createThumbnail($project->id, '.' . $dir . '/' . $file_name, $type, $db);
	
		// FINALLY, UPDATE THE URL FIELD IN THE NEWLY INSERTED RECORD.
		$stmt = $db->prepare('UPDATE projects SET url = ? WHERE id = ?');
		$url = $dir . '/' . $file_name;
		return $stmt->execute(array($url, $project->id));
	}
	
	/**
	 * Gets all the projects belonging to a specific planet.
	 * @param $parent_id The 'id' parameter of the parent object.
	 * @return Array An array of Project objects if successful, NULL otherwise.
	 */
	public function getProjectsByParentID($parent_id) {
		include ('db.php'); 
		
		// Use a join to get the type of each project without making a query for each record.
		$stmt = $db->prepare('
		SELECT P.*, T.name AS type 
		FROM projects P, project_types T 
		WHERE P.parent_id = ? AND P.type_id = T.id
		ORDER BY id DESC');
		
		if ($stmt->execute(array($parent_id))) {
			$result = $stmt->fetchAll();
			
			$projects = array();
			
			foreach ($result as $i => $row) {
				$projects[$i] = new Project();
				
				self::matchFields($projects[$i], $row);
				
				// Not a natural field of projects so we match manually.
				$projects[$i]->type = $row['type']; 
			}
			
			return $projects;
		}
		return NULL;
	}
	
	/**
	 * Updates a project with input parameters. Parent user must be logged in.
	 * @param $project Project object with new field values.
	 * @return boolean True if successful, false otherwise.
	 */
	public function updateProject($project, $file_data) {
		if ((!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $project->parent_id))) {
			return false;
		}
		
		include ('db.php');
		
		// Check that this project really belongs to the alleged parent (splicing attacks).
		$stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
		if (!$stmt->execute(array($project->id))) {
			return false;
		}
		$result = $stmt->fetch();
		if (!$result) {
			return false;
		}
		if ($result['parent_id'] != $project->parent_id) {
			return false;
		}
		
		// Optionally, update the project file.
		if ($file_data != NULL) {
			// Get this project's type (and file extension).
			$pts = new ProjectTypeService();
			$type = $pts->getProjectTypeByID($project->type_id);
		
			// Update project file.
			$dir = ProjectService::makeDirectoryName($project);
			$file_name = ProjectService::makeFileName($project, $type);
			if (!file_put_contents('.' . $dir . '/' . $file_name, $file_data)) {
				return false;
			}
		
			self::createThumbnail($project->id, '.' . $dir . '/' . $file_name, $type, $db);
		}
		
		// Update record.
		$stmt = $db->prepare('
			UPDATE projects 
			SET name=?, description = ?
			WHERE id = ?
		');
		
		return $stmt->execute(array(
			$project->name,
			$project->description,
			$project->id
		));
	}
	
	/**
	 * Deletes a specified project. Parent user must be logged in.
	 * @param $project Project object to be deleted.
	 * @return boolean True if successful, false otherwise.
	 */
	public function deleteProject($project) {
		if ((!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $project->parent_id))) {
			return false;
		}
		
		include ('db.php');

		// Get this project's type (and file extension).
		$pts = new ProjectTypeService();
		$type = $pts->getProjectTypeByID($project->type_id);
		
		 // Delete project on file system.
		$dir = ProjectService::makeDirectoryName($project); //PROJECTS_PATH . '/' . $project->parent_id;
		$file_name = ProjectService::makeFileName($project, $type); //$project->id . '.' . $type->extension;
		
		if ( file_exists('.' . $dir . '/' . $file_name) ) {
			unlink('.' . $dir . '/' . $file_name);
		}
		
		self::removeThumbnail($project->thumbnail_url);
		
		// Delete record.
		$stmt = $db->prepare('DELETE FROM projects WHERE id = ?');
		return $stmt->execute(array($project->id));
	}
	
	/**
	 * Full-text searches all projects over specified query.
	 * @param $query Search string.
	 * @return Array 2-dimensional array where index i = [<matched project>, <corresponding planet owner>].
	 */
	public function searchProjects($query) {
		include ('db.php');
		
		$stmt = $db->prepare('
			SELECT P.*, T.name AS type 
			FROM projects P, project_types T 
			WHERE P.type_id = T.id AND MATCH (P.name, P.description)
			AGAINST (? in NATURAL LANGUAGE MODE)');
		
		if ($stmt->execute(array($query))) {
			$result = $stmt->fetchAll();
			
			if ($result) {
				$output = array();
				
				$planetService = new PlanetService();
				
				foreach ($result as $i => $row) {
					$project = new Project();
					self::matchFields($project, $row);
					$project->type = $row['type']; // Not a natural field of projects so we match manually.			
					
					// Now query the planet that this project belongs to.
					$planet = $planetService->getPlanetByID($project->parent_id);
					
					$output[$i] = array($project, $planet);
				}
				return $output;
			}
		}
		return NULL;
	}
	
	/**
	 * Delete thumbnail.
	 * @param $thumbnail_file Pass in Project->thumbnail_url.
	 */
	private static function removeThumbnail($thumbnail_file) {
		if ($thumbnail_file == null) {
			return;
		}
	
		$pos = strrpos($thumbnail_file, "?ver=");
		
		if ($pos === false) {
			return;
		}
		
		$file = substr($thumbnail_file, 1, $pos-1);
		if ( file_exists($file) ) {
			unlink($file);
		}
	}
	
	/**
	 * Generate thumbnail for project.
	 * @param $project_id Project ID.
	 * @param $file Path to file.
	 * @param $type ProjectType of project.
	 * @param $db Database object.
	 */
	private static function createThumbnail($project_id, $file, $type, $db) {
		if (strcmp($type->name, 'Scratch') == 0) {
			$result = self::createScratchThumbnail($file);
			
			if ( $result === false) {
				$url = 'assets/thumb_default/scratch_icon.png';
			} else {
				$url = '.' . $result . self::generateUploadCacheSuffix();
			}
		
		} else if (strcmp($type->name, 'Website') == 0) {
			$url = 'assets/thumb_default/webpage_icon.png';
		} else if (strcmp($type->name, 'Powerpoint') == 0) {
			$url = 'assets/thumb_default/ppt_icon.png';
		} else if (strcmp($type->name, 'Image') == 0) {
			$result = self::createImageThumbnail($file);
			
			if ( $result === false) {
				$url = 'assets/thumb_default/image_icon.png';
			} else {
				$url = '.' . $result . self::generateUploadCacheSuffix();
			}
			
		} else if (strcmp($type->name, 'Audio') == 0) {
			$url = 'assets/thumb_default/audio_icon.png';
		} else if (strcmp($type->name, 'Video') == 0) {
			$url = 'assets/thumb_default/video_icon.png';
		} else if (strcmp($type->name, 'Word Document') == 0) {
			$url = 'assets/thumb_default/word_icon.png';
		} else {
			// Update database record as NULL.
			$stmt = $db->prepare('UPDATE projects SET thumbnail_url = NULL WHERE id = ?');
			$stmt->execute( array( $project_id ));
		}

		// Update database record.
		$stmt = $db->prepare('UPDATE projects SET thumbnail_url = ? WHERE id = ?');
		$stmt->execute( array($url, $project_id ));
	}
	
	/**
	 * Generate thumbnail for specified image.
	 * @param $file Path to file
	 * @return String Path to thumbnail if successful. False otherwise.
	 */
	private static function createImageThumbnail($file) {
		$lastSlash = strrpos($file, '/');
		$lastDot = strrpos($file, '.') - strlen($file) + 1;
		
		if ($lastSlash === false) {
			$dir = 'thumbnail';
			$thumbfile = 'thumbnail/' . substr($file, 0, $lastDot) . 'png';  
		} else {
			$dir = substr($file, 0, $lastSlash) . '/thumbnail';
			$thumbfile = substr($file, 0, $lastSlash) .
				'/thumbnail' . substr($file, $lastSlash, $lastDot) . 'png';
		}
			
		if (!is_dir($dir)) {
			mkdir($dir);
		}
		
		exec('java -jar ./tools/GetImageThumbnail.jar "' . $file . '" "' . $thumbfile . '"', $result, $return);
		
		if ($return != 0) {
			return false;
		}		
		return $thumbfile;
	}

	/**
	 * Generate thumbnail for specified scratch file.
	 * @param $file Path to file.
	 * @return String Path to thumbnail if successful. False otherwise.
	 */
	private static function createScratchThumbnail($file) {
		// Make sure the file is a Scratch project.
		if ( strcmp(substr($file, -3), '.sb') != 0) {
			return false;
		}
		
		// Generate thumbnail file path.
		$lastSlash = strrpos($file, '/');
		
		if ($lastSlash === false) {
			$dir = 'thumbnail';
			$thumbfile = 'thumbnail/' . substr($file, 0, -2) . 'png';  
		} else {
			$dir = substr($file, 0, $lastSlash) . '/thumbnail';
			$thumbfile = substr($file, 0, $lastSlash) .
				'/thumbnail' . substr($file, $lastSlash, -2) . 'png';
		}
		
		if (!is_dir($dir)) {
			mkdir($dir);
		}

		// Create thumbnail by executing getThumbnail.jar
		exec('java -jar ./tools/GetScratchThumbnail.jar "' . $file . '" "' . $thumbfile . '"', $result, $return);
		
		if ($return != 0) {
			return false;
		}
		
		return $thumbfile;
	}
}
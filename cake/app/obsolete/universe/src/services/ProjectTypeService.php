<?php

require_once ('models/Project/ProjectType.php');

class ProjectTypeService {
	
	private static function matchFields($type, $array) {
		$type->id        = $array['id'];
		$type->name      = $array['name'];
		$type->extension = $array['extension'];
	}
	
	/**
	 * Gets all project types.
	 * @return Array An array of ProjectType objects if successfull, NULL otherwise.
	 */
	public function getAllProjectTypes() {
		include('db.php'); 
		
		$stmt = $db->prepare('SELECT * FROM project_types ORDER BY id');
		if ($stmt->execute()) {
			$result = $stmt->fetchAll();
	
			$types = array();
			
			foreach ($result as $i => $row) {
				$types[$i] = new ProjectType();
				
				self::matchFields($types[$i], $row);
			}
			
			return $types;
		}
		return NULL;
	}

	/**
	 * Gets the project type with a specified ID.
	 * @param $id The 'id' parameter of the project type.
	 * @return ProjectType The ProjectType object if successful, NULL otherwise.
	 */
	public function getProjectTypeByID($id) {
		include('db.php');

		$stmt = $db->prepare('SELECT * FROM project_types WHERE id = ?');
		if ($stmt->execute(array($id))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$type = new ProjectType();
				
				self::matchFields($type, $result);
				
				return $type;
			}
		}
		return NULL;
	}

	/**
	 * Gets the project type with a specified extension.
	 * @param $ext The 'extension' parameter of the project type.
	 * @return ProjectType The ProjectType object if successful, NULL otherwise.
	 */
	public function getProjectTypeByExtension($ext) {
		include('db.php');
		
		$stmt = $db->prepare('SELECT * FROM project_types WHERE extension = ?');
		
		if ($stmt->execute(array($ext))) {
			$result = $stmt->fetch();
		
			if ($result) {
				$type = new ProjectType();
			
				self::matchFields($type, $result);
			
				return $type;
			}
		}
		return NULL;
	}
} 
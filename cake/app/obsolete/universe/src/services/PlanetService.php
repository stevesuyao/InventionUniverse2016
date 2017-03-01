<?php
require_once ('models/CelestialBody/Planet.php');
require_once ('Zend/Session.php');
require_once ('monitoring/UsageMonitor.php');

define('SALT_LENGTH', 32);
define('RESUME_PATH', '/uploads/resumes');
define('AVATAR_PATH', '/uploads/avatars');
define('PLANET_PATH', '/uploads/planets');

class PlanetService {	
	
	// http://phpsec.org/articles/2005/password-hashing.html
	private static function generateHash($plainText, $salt = null) {
		if ($salt === NULL) {
			$salt = substr(md5(uniqid(mt_rand(), true)), 0, SALT_LENGTH);
		} else {
			$salt = substr($salt, 0, SALT_LENGTH);
		}		
		return $salt . sha1($salt . $plainText);
	}
	
	// Is used for preventing browser always read uploaded data from cache.
	private static function generateUploadCacheSuffix() {
		return "?ver=" . $_SERVER["REQUEST_TIME"];
	}

	/**
	 * Get number of projects that the user owns.
	 * This function is embedded in match_fields. So it is focusing on each planet.
	 * @param $planet_id Planet ID.
	 * @return Integer Number of projects that the user owns.
	 */
	private static function getPlanetProjectCount($planet_id) {
		include('db.php');
		
		$stmt = $db->prepare('SELECT COUNT(*) FROM projects WHERE parent_id = ?');
		
		if ($stmt->execute(array($planet_id))) {
			$result = $stmt->fetch();
			
			if ($result) {
				return $result[0];
			}		
		}
		
		return 0;
	}
	
	/**
	 * Transfers field information from associative array to planet object.
	 * @param $planet Planet object.
	 * @param $array Array containing planet field data.
	 */
	public static function matchFields($planet, $array) {
		$planet->id            = $array['id'];
		$planet->parent_id     = $array['parent_id'];
		$planet->name          = $array['name'];
		$planet->description   = $array['description'];
		$planet->image_url     = $array['image_url'];
		$planet->first_name    = $array['first_name'];
		$planet->last_name     = $array['last_name'];
		$planet->email         = $array['email'];
		// Don't retrieve/expose 'password' or 'salt' fields.
		$planet->birth_date    = $array['birth_date'];
		$planet->hometown      = $array['hometown'];
		$planet->school        = $array['school'];
		$planet->hobbies       = $array['hobbies'];
		$planet->quotations    = $array['quotations'];
		$planet->heroes        = $array['heroes'];
		$planet->interests     = $array['interests'];
		$planet->goals         = $array['goals'];
		$planet->resume_url    = $array['resume_url'];
		$planet->avatar_url    = $array['avatar_url'];
		// Joined area.
		$planet->project_count = self::getPlanetProjectCount($planet->id);
	}

	/**
	 * Attempts to login to a planet with a (name,password) pair.
	 * If successful, starts a session.
	 * @param $planetName Name of the planet to login to.
	 * @param $password Input password for this planet.
	 * @return Planet Corresponding Planet object if successful, NULL otherwise.
	 */
	public function logIn($planetName, $password) {	
		include ('db.php');
		
		$stmt = $db->prepare('SELECT * FROM planets WHERE name = ? AND approved = 1');
		if ($stmt->execute(array($planetName))) { // If this query succeeds...
			$result = $stmt->fetch();
			
			if ($result) {
				$hash = $result['password'];
				$salt = $result['salt'];
	
				// If login credentials are correct...
				if (substr(self::generateHash($password, $salt), SALT_LENGTH) == $hash) {
					$planet = new Planet();
					
					self::matchFields($planet, $result);
						
					// Set session parameters.
					$_SESSION['planet'] = $planet->name;
					$_SESSION['planet_id'] = $planet->id;
					
					return $planet;
				}
			}
		}
		return NULL;
	}
	
	/**
	 * Logs user out by effectively destroying the current session.
	 * @return boolean Always true.
	 */
	public function logOut() {
		// Note:
		// Use of Zend_Session::destroy() or PHP's session_destroy() raises errors,
		// probably because of the HTTP headers issue. Manually unsetting session
		// variables is equivalent.

		// Unset all of the session variables.
		$_SESSION = array();
		
		// Delete the session cookie.
		Zend_Session::expireSessionCookie();

		return true;
	}
	
	/**
	 * Create a new planet.
	 * @param $planet Planet object to be inserted into database.
	 * @return boolean True if successful, false otherwise.
	 */
	public function putPlanet($planet) {
		include ('db.php');
		
		$stmt = $db->prepare('
			INSERT INTO planets
			(parent_id, name, image_url, avatar_url, first_name, last_name, email, password, salt,
			created_at, updated_at, approved)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
		');

		// Default images.
		$image_url = 'assets/images/planet.png';
		$avatar_url = 'assets/images/astronaut.jpg';

		$saltAndPassword = self::generateHash($planet->password);
		
		return $stmt->execute(array(
			$planet->parent_id,
			$planet->name,
			$image_url,
			$avatar_url,
			$planet->first_name,
			$planet->last_name,
			$planet->email,
			substr($saltAndPassword, SALT_LENGTH),
			substr($saltAndPassword, 0, SALT_LENGTH)
		));
	}
	
	/**
	 * Updates a planet with input parameters, EXCEPT password, salt and
	 * resume_url fields. Use changePassword() to update password.
	 * Corresponding user must be logged in.
	 * @param $planet Planet object with new field values.
	 * @return boolean True if successful, false otherwise.
	 */
	public function updatePlanet($planet) {
		if ((!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $planet->id))) {
			return false;
		}
		
		include ('db.php');
		
		// Update record.
		$stmt = $db->prepare('
			UPDATE planets
			SET email=?, first_name=?, last_name=?, birth_date=?, hometown=?,
					school=?, hobbies=?, quotations=?, heroes=?, interests=?, goals=?
			WHERE id=?
		');
		
		return $stmt->execute(array(
			$planet->email,
			$planet->first_name,
			$planet->last_name,
			$planet->birth_date,
			$planet->hometown,
			$planet->school,
			$planet->hobbies,
			$planet->quotations,
			$planet->heroes,
			$planet->interests,
			$planet->goals,
			$planet->id
		));
	}
	
	/**
	 * Changes the password of a planet.
	 * Corresponding user must be logged in.
	 * @param $planetName Name of the planet.
	 * @param $oldPassword The old (current) password of the planet.
	 * @param $newPassword The desired new password.
	 * @return boolean True if successful, false otherwise.
	 */
	public function changePassword($planetName, $oldPassword, $newPassword) {
		if ((!isset($_SESSION['planet']) || ($_SESSION['planet'] != $planetName))) {
			return false;
		}

		include ('db.php');

		$planet = $this->login($planetName, $oldPassword);
		
		if ($planet != NULL) { // If log in was successful...
			$saltAndPassword = self::generateHash($newPassword);

			$salt = substr($saltAndPassword, 0, SALT_LENGTH);
			$password = substr($saltAndPassword, SALT_LENGTH);
			
			$stmt = $db->prepare('UPDATE planets SET password=?, salt=? WHERE name=?');
			
			return $stmt->execute(array($password, $salt, $planetName));
		}
	}
	
	/**
	 * Gets all the planets belonging to a specific planetary system.
	 * @param $parent_id The 'id' parameter of the parent object.
	 * @return Array An array of Planet objects if successful, $parent_id if there are no such planets, and NULL on fail.
	 */
	public function getPlanetsByParentID($parent_id) {
		include('db.php');
		
		$stmt = $db->prepare('SELECT * FROM planets WHERE parent_id = ? AND approved = 1 ORDER BY id');
		
		if ($stmt->execute(array($parent_id))) {
			$result = $stmt->fetchAll();
			
			if ($result) {
				$planets = array();
				
				foreach ($result as $i => $row) {
					$planets[$i] = new Planet();
					
					self::matchFields($planets[$i], $row);
				}
				return $planets;
			}
			return $parent_id;
		}
		return NULL;
	}
	
	/**
	 * Get the planet with the specified name (names are unique identifiers for planets).
	 * @param $name The 'name' field of a Planet.
	 * @return Planet The planet object if it exists, NULL otherwise.
	 */
	public function getPlanetByName($name) {
		include('db.php');
		
		$stmt = $db->prepare('SELECT * FROM planets WHERE name = ? ORDER BY id');
		if ($stmt->execute(array($name))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$planet = new Planet();
				
				self::matchFields($planet, $result);

				return $planet;
			}
		}
		return NULL;
	}
	
	/**
	 * Get the planet with the specified id.
	 * @param $id The 'id' field of a Planet.
	 * @return Planet The planet object if it exists, NULL otherwise.
	 */
	public function getPlanetByID($id) {
		include('db.php');
		
		$stmt = $db->prepare('SELECT * FROM planets WHERE id = ? ORDER BY id');
		if ($stmt->execute(array($id))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$planet = new Planet();
				
				self::matchFields($planet, $result);

				return $planet;
			}
		}
		return NULL;
	}
	
	/**
	 * Updates the resume of a planet.
	 * @param $planet Planet that is being updated.
	 * @param $resume_extension File type (extension) of the resume.
	 * @param $resume_data Byte-array of the resume.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function updateResume($planet, $resume_extension, $resume_data) {
		if (!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $planet->id)) {
			return false;
		}
		
		include('db.php'); 
		
		// Validate file extension.
		// Could store these extensions in a database table, but there's only a couple so we hard-code it.
		if ($resume_extension != ".doc" && 
				$resume_extension != ".docx" && 
				$resume_extension != ".pdf" &&
				$resume_extension != ".ppt" &&
				$resume_extension != ".pptx") {
			return false;
		}
		
		// Put file.
		$file_name = $planet->id . $resume_extension;
		if (!file_put_contents('.' . RESUME_PATH . '/' . $file_name, $resume_data)) {
			return false;
		}

		// Update database record.
		$stmt = $db->prepare('UPDATE planets SET resume_url = ? WHERE id = ?');
		$url = RESUME_PATH . '/' . $file_name . self::generateUploadCacheSuffix();//APP_WEB_PATH . RESUME_PATH . '/' . $file_name;
		return $stmt->execute(array($url, $planet->id));
	}
	
	/**
	 * Set default avatar of a planet.
	 * @param $planet Planet that is being updated.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function setDefaultAvatar($planet) {
		if ((!isset($_SESSION['planet_id'])) || ($_SESSION['planet_id'] != $planet->id)) {
			return false;
		}
		
		include('db.php');
		
		$filename = AVATAR_PATH . '/' . $planet->id . '.png';
		if ( file_exists('.' . $filename) ) {
			unlink('.' . $filename);
		}
		
		$stmt = $db->prepare('UPDATE planets SET avatar_url = "assets/images/astronaut.jpg" WHERE id = ?');
		
		return $stmt->execute(array($planet->id));
	}
	
	/**
	 * Set customized avatar of a planet.
	 * @param $planet Planet that is being updated.
	 * @param $image_data Byte-array of PNG data of the avatar.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function setCustomAvatar($planet, $image_data) {
		if ((!isset($_SESSION['planet_id'])) || ($_SESSION['planet_id'] != $planet->id)) {
			return false;
		}

		include('db.php');
		
		$filename = AVATAR_PATH . '/' . $planet->id . '.png';
		if (!file_put_contents('.' . $filename, $image_data)) {
			return false;
		}
		
		$stmt = $db->prepare('UPDATE planets SET avatar_url = ? WHERE id = ?');
		return $stmt->execute(array('..' . $filename . self::generateUploadCacheSuffix(), $planet->id));
	}

	/**
	 * Set default planet image of a planet.
	 * @param $planet Planet that is being updated.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function setDefaultPlanetImage($planet) {
		if ( (!isset($_SESSION['planet_id'])) || ($_SESSION['planet_id'] != $planet->id) ) {
			return false;
		}
		
		include('db.php');
		
		$filename = PLANET_PATH . '/' . $planet->id . '.png';
		if ( file_exists('.' . $filename) ) {
			unlink('.' . $filename);
		}
		
		$stmt = $db->prepare('UPDATE planets SET image_url = "assets/images/planet.png" WHERE id = ?');
		
		return $stmt->execute(array($planet->id));
	}
	
	/**
	 * Set customized planet image of a planet.
	 * @param $planet Planet that is being updated.
	 * @param $image_data Byte-array of PNG data of the planet image.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function setCustomPlanetImage($planet, $image_data) {
		if ( (!isset($_SESSION['planet_id'])) || ($_SESSION['planet_id'] != $planet->id) ) {
			return false;
		}

		include('db.php');
		
		$filename = PLANET_PATH . '/' . $planet->id . '.png';
		if ( !file_put_contents('.' . $filename, $image_data) ) {
			return false;
		}
		
		$stmt = $db->prepare('UPDATE planets SET image_url = ? WHERE id = ?');
		return $stmt->execute(array('..' . $filename . self::generateUploadCacheSuffix(), $planet->id));
	}
	
	/**
	 * Full-text searches all planets over specified query.
	 * @param $query Search string.
	 * @return Array The planets that matched the search string.
	 */
	public function searchPlanets($query) {
		include ('db.php');
		
		$stmt = $db->prepare('
			SELECT *
			FROM planets
			WHERE MATCH (name, description, hometown, school, hobbies, interests, goals, first_name)
			AGAINST (? in NATURAL LANGUAGE MODE)');
		
		if ($stmt->execute(array($query))) {			
			$result = $stmt->fetchAll();
			
			if ($result) {
				$planets = array();
				
				foreach ($result as $i => $row) {
					$planets[$i] = new Planet();
					
					self::matchFields($planets[$i], $row);
				}
				return $planets;
			}
		}
		return NULL;
	}
} 
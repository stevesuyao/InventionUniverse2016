<?php

require_once ('models/CelestialBody/Constellation.php');

class ConstellationService {	

	private static function matchFields($constellation, $array) {
		$constellation->id          = $array['id'];
		$constellation->name        = $array['name'];
		$constellation->description = $array['description'];
		$constellation->image_url   = $array['image_url'];
	}
	
	/**
	 * Gets all available constellations.
	 * @return Array An array of Constellation objects if successfull, NULL otherwise.
	 */
	public function getAllConstellations() {
		include('db.php');

		$stmt = $db->prepare('SELECT * FROM constellations ORDER BY id');
		if ($stmt->execute()) {
			$result = $stmt->fetchAll();
	
			$constellations = Array();
			
			foreach ($result as $i => $row) {
				$constellations[$i] = new Constellation();
				
				self::matchFields($constellations[$i], $row);
			}
			
			return $constellations;
		}
		return NULL;
	}
	
	/**
	 * Gets the constellation with a specified name.
	 * @param $name The 'name' parameter of the constellation.
	 * @return Constellation The constellation if successful, NULL otherwise.
	 */
	public function getConstellationByName($name) {
		include ('db.php');
		
		$stmt = $db->prepare('SELECT * FROM constellations WHERE name = ? ORDER BY id');
		if ($stmt->execute(array($name))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$constellation = new Constellation();
				
				self::matchFields($constellation, $result);
				
				return $constellation;
			}
		}
		return NULL;
	}
	
	/**
	 * Gets the constellation with a specified ID.
	 * @param $id The 'id' parameter of the constellation.
	 * @return Constellation The constellation if successful, NULL otherwise.
	 */
	public function getConstellationByID($id) {
		include ('db.php');
		
		$stmt = $db->prepare('SELECT * FROM constellations WHERE id = ? ORDER BY id');
		if ($stmt->execute(array($id))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$constellation = new Constellation();
				
				self::matchFields($constellation, $result);
				
				return $constellation;
			}
		}
		return NULL;
	}
	
}
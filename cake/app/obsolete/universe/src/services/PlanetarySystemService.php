<?php

require_once ('models/CelestialBody/PlanetarySystem.php');
require_once ('GalaxyService.php');

class PlanetarySystemService {	
	
	private static function matchFields($system, $array) {
		$system->id 					= $array['id'];
		$system->parent_id 		= $array['parent_id'];
		$system->name 				= $array['name'];
		$system->description 	= $array['description'];
		$system->image_url 		= $array['image_url'];
	}
	
	/**
	 * Gets all the planetary systems belonging to a specific galaxy.
	 * @param $parent_id The 'id' parameter of the parent object.
	 * @return Array An array of PlanetarySystem objects if successful, NULL otherwise;
	 */
	public function getSystemsByParentID($parent_id) {
		include('db.php');
		
		$stmt = $db->prepare('SELECT * FROM systems WHERE parent_id = ? ORDER BY id');
		if ($stmt->execute(array($parent_id))) {
			$result = $stmt->fetchAll();
			
			$systems = Array();
			
			foreach ($result as $i => $row) {
				$systems[$i] = new PlanetarySystem();
				
				self::matchFields($systems[$i], $row);
			}
			
			return $systems;
		}
		return NULL;
	}
	
	/**
	 * Gets a planetary system by a specified name.
	 * @param $name The 'name' parameter of the planetary system.
	 * @return PlanetarySystem The system if successful, NULL otherwise.
	 */
	public function getSystemByName($name) {
		include ('db.php');
		
		$stmt = $db->prepare('SELECT * FROM systems WHERE name = ? ORDER BY id');
		if ($stmt->execute(array($name))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$system = new PlanetarySystem();
				
				self::matchFields($system, $result);
				
				return $system;
			}
		}
	}
	
	/**
	 * Gets a planetary system by a specified ID.
	 * @param $id The 'id' parameter of the planetary system.
	 * @return PlanetarySystem The system if successful, NULL otherwise.
	 */
	public function getSystemByID($id) {
		include ('db.php');
		
		$stmt = $db->prepare('SELECT * FROM systems WHERE id = ? ORDER BY id');
		if ($stmt->execute(array($id))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$system = new PlanetarySystem();
				
				self::matchFields($system, $result);
				
				return $system;
			}
		}
	}
	
}
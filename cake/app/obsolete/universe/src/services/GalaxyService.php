<?php

require_once ('models/CelestialBody/Galaxy.php');
require_once ('ConstellationService.php');

class GalaxyService {	
	
	private static function matchFields($galaxy, $array) {
		$galaxy->id          = $array['id'];
		$galaxy->parent_id   = $array['parent_id'];
		$galaxy->name        = $array['name'];
		$galaxy->description = $array['description'];
		$galaxy->image_url   = $array['image_url'];
	}
	
	/**
	 * Gets all the galaxies belonging to a constellation specified by ID.
	 * @param $parent_id The 'id' parameter of the parent object.
	 * @return Array An array of Galaxy objects if successful, NULL otherwise.
	 */
	public function getGalaxiesByParentID($parent_id) {
		include('db.php'); 
		
		$stmt = $db->prepare('SELECT * FROM galaxies WHERE parent_id = ? ORDER BY id');
		if ($stmt->execute(array($parent_id))) {
			$result = $stmt->fetchAll();
			
			$galaxies = Array();
			
			foreach ($result as $i => $row) {
				$galaxies[$i] = new Galaxy();

				self::matchFields($galaxies[$i], $row);
			}
			
			return $galaxies;
		}
		return NULL;
	}
	
	/**
	 * Gets a galaxy by a specified name.
	 * @param $name The 'name' parameter of the galaxy.
	 * @return Galaxy The galaxy if successful, NULL otherwise.
	 */
	public function getGalaxyByName($name) {
		include ('db.php');
		
		$stmt = $db->prepare('SELECT * FROM galaxies WHERE name = ? ORDER BY id');
		if ($stmt->execute(array($name))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$galaxy = new Galaxy();
				
				self::matchFields($galaxy, $result);
				
				return $galaxy;
			}
		}
		return NULL;
	}
	
	/**
	 * Gets a galaxy by a specified ID.
	 * @param $id The 'id' parameter of the galaxy.
	 * @return Galaxy The galaxy if successful, NULL otherwise.
	 */
	public function getGalaxyByID($id) {
		include ('db.php');
		
		$stmt = $db->prepare('SELECT * FROM galaxies WHERE id = ? ORDER BY id');
		if ($stmt->execute(array($id))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$galaxy = new Galaxy();
				
				self::matchFields($galaxy, $result);
				
				return $galaxy;
			}
		}
		return NULL;
	}
	
}
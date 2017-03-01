<?php

class UsageMonitor {
	
	/**
	 * Increments the planet view count.
	 * @param $id The planet id.
	 * @return False if fails, true if succeeds. 
	 */
	public static function incrementPlanetViewCount($id) {
		include('db.php');
        
		$select = $db->prepare('SELECT * FROM planet_viewcount WHERE id = ?');
		
		if ($select->execute(array($id))) {
			$result = $select->fetch();
			
			// Create the record for this planet if it doesn't exist.
			if (!$result) {
				$insert = $db->prepare('INSERT INTO planet_viewcount (id) VALUES (?)');
				
				if (!$insert->execute(array($id))) { 
					return false;
				}
			}
			
			// Increments the view count.
			$count = $result['view_count'];
			
			$update = $db->prepare('UPDATE planet_viewcount SET view_count = ? WHERE id = ?');
			
			return ($update->execute(array($count + 1, $id)));
		}
	}
    
	/**
	 * Increments the project view count.
	 * @param $id The project id.
	 * @return False if fails, true if succeeds.
	 */
	public static function incrementProjectViewCount($id) {
		include('db.php');

		$select = $db->prepare('SELECT * FROM project_viewcount WHERE id = ?');
		
		if ($select->execute(array($id))) {
			$result = $select->fetch();
			
			// Create the record for this project if it doesn't exist.
			if (!$result) {
				$insert = $db->prepare('INSERT INTO project_viewcount (id) VALUES (?)');
				
				if (!$insert->execute(array($id))) {
					return false;
				}
			}
			
			// Increments the view count.
			$count = $result['view_count'];
			
			$update = $db->prepare('UPDATE project_viewcount SET view_count = ? WHERE id = ?');
			
			return ($update->execute(array($count + 1, $id)));
		}
	}

}
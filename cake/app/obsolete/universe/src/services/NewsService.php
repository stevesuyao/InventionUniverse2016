<?php

require_once('ProjectService.php');
require_once('PlanetService.php');

class NewsService {

	/**
	 * Get a number of latest registered planets.
	 * @param $count Max number of planets to get.
	 * @return Array Array of planets that meet requirements.
	 */
	public function getLatestPlanets($count) {
		include('db.php');
		
		$stmt = $db->prepare('SELECT * FROM planets ORDER BY id DESC LIMIT :count');
		$stmt->bindParam(':count', $count, PDO::PARAM_INT);
		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll();
			
			if ($result) {
				$planets = array();
				
				foreach ($result as $i => $row) {
					$planets[$i] = new Planet();
					PlanetService::matchFields($planets[$i], $row);
				}
				
				return $planets;
			}
		}
		
		return NULL;
	}

	/**
	 * Get a number of latest registered planets.
	 * @param $count Max number of planets to get.
	 * @return Array 2-dimensional array where index i = [<matched project>, <corresponding planet owner>].
	 */
	public function getLatestProjects($count) {
		include('db.php');
		
		$stmt = $db->prepare('
			SELECT P.*, T.name AS type
			FROM projects P, project_types T
			WHERE P.type_id = T.id
			ORDER BY P.id DESC 
			LIMIT :count
			');
		$stmt->bindParam(':count', $count, PDO::PARAM_INT);
		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll();
			
			if ($result) {
				$output = array();
				$planetService = new PlanetService();
				
				foreach ($result as $i => $row) {
					$project = new Project();
					ProjectService::matchFields($project, $row);
					$project->type = $row['type']; // Not a natural field of projects so we match manually.
					$output[$i] = array(
							$project,
							$planetService->getPlanetByID($project->parent_id)
							);					
				}
				
				return $output;
			}
		}
		
		return NULL;
	}
}
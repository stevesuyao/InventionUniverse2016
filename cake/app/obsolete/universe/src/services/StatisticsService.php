<?php 

class StatisticsService {
	private function initTotal() {
		include('db.php');

		// Delete the total item from statistics table
		$db->prepare('
			DELETE FROM statistics
			WHERE year=0 AND month=0
		')->execute();
		
		$stmt = $db->prepare('
			INSERT INTO statistics (year, month, visits, users, projects)
			VALUES (0, 0, ?, ?, ?)
		');
		
		$stmt->execute(array($this->getTotalVisits(), $this->getTotalUsers(), $this->getTotalProjects()));
	}

	public static function getTotalUsers() {
		include('db.php');
	
		$stmt = $db->prepare('SELECT COUNT(*) FROM planets');
		
		if ($stmt->execute()) {
			$result = $stmt->fetch();
			return $result['COUNT(*)'];
		} else {
			return false;
		}
	}
	
	public static function getTotalProjects() {
		include('db.php');
	
		$stmt = $db->prepare('SELECT COUNT(*) FROM projects');
		
		if ($stmt->execute()) {
			$result = $stmt->fetch();
			return $result['COUNT(*)'];
		} else {
			return false;
		}
	}

	public static function getTotalVisits() {
		include('db.php');
		
		$stmt = $db->prepare('SELECT visits FROM statistics WHERE year=0 AND month=0');
		
		if ($stmt->execute()) {
			$result = $stmt->fetch();
			if ($result === false) {
				return 0;
			}
			return $result['visits'];
		} else {
			return 0;
		}
	}
	
	public function increaseVisit() {
		include('db.php');
		
		$stmt = $db->prepare('
			UPDATE statistics
			SET visits = ?
			WHERE year=0 AND month=0
		');
		
		return $stmt->execute( array($this->getTotalVisits() + 1) );
	}
	
	public function saveSnapshot() {
		include('db.php');
		
		$year = (int)date('Y');
		$month = (int)date('m');
		$visits = $this->getTotalVisits();
		$users = $this->getTotalUsers();
		$projects = $this->getTotalProjects();
		
		$stmt = $db->prepare('SELECT id FROM statistics WHERE year = ? AND month = ?');
		$stmt->execute(array($year, $month));
		$result = $stmt->fetch();
		
		if ($result === false) {
			$stmt = $db->prepare('
				INSERT INTO statistics (year, month, visits, users, projects)
				VALUES (?, ?, ?, ?, ?)
			');
			$stmt->execute( array( $year, $month, $visits, $users, $projects ) );
		} else {
			$id = $result['id'];
			
			$stmt = $db->prepare('
				UPDATE statistics
				SET visits=?, users=?, projects=?
				WHERE id=?
			');
			
			$stmt->execute( array( $visits, $users, $projects, $id ) );
		}
		
		$db->prepare('
			UPDATE statistics
			SET users=?, projects=?
			WHERE year=0 AND month=0
		')->execute(
			array($users, $projects)
		);
	}
	
	public function performStatistics() {
		$this->increaseVisit();
		$this->saveSnapshot();
	}
}

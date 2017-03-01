<?php 

require_once ('models/Skill/Skill.php');
require_once ('models/Skill/SkillLevel.php');
require_once ('models/Skill/SkillType.php');

class SkillService {
	
	/**
	 * Transfers field information from associative array to skill object.
	 * @param $skill Skill object.
	 * @param $array Array containing project field data.
	 */
	private static function matchFields($skill, $array) {
		$skill->id        = $array['id'];
		$skill->parent_id = $array['parent_id'];
		$skill->type_id   = $array['type_id'];
		$skill->level_id  = $array['level_id'];
		$skill->name      = $array['name'];
	}

	/**
	 * Get all skills that belong to a specfic user.
	 * @param $parent_id ID of user.
	 * @return Array An array of Skill objects if successful, NULL otherwise.
	 */
	public function getSkillsByParentID($parent_id) {
		include('db.php');

		$stmt = $db->prepare('
			SELECT S.*, L.name as level, T.name as type
			FROM skills S, skill_levels L, skill_types T
			WHERE S.level_id = L.id AND S.type_id = T.id AND S.parent_id = ?
			ORDER BY S.id
		');

		if ($stmt->execute(array($parent_id))) {
			$result = $stmt->fetchAll();
			$skills = array();

			foreach ($result as $i => $row) {
				$skills[$i] = new Skill();
				self::matchFields($skills[$i], $row);
				$skills[$i]->type = $row['type'];
				$skills[$i]->level = $row['level'];
			}

			return $skills;
		}

		return NULL;
	}

	/**
	 * Create a new skill for user.
	 * @param $skill Skill object to be inserted.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function addSkill($skill) {
		if ( (!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $skill->parent_id)) ) {
			return false;
		}

		include('db.php');

		$stmt = $db->prepare('
			INSERT INTO skills (parent_id, type_id, level_id, name)
			VALUES (?, ?, ?, ?)
			');

		if (!$stmt->execute(array(
			$skill->parent_id,
			$skill->type_id,
			$skill->level_id,
			$skill->name
		))) {
			return false;
		}

		return true;
	}

	/**
	 * Edit an existing skill for user.
	 * @param $skill Skill object to be edited.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function editSkill($skill) {
		if ( (!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $skill->parent_id)) ) {
			return false;
		}

		include('db.php');

		$stmt = $db->prepare('
			UPDATE skills
			SET type_id = ?, level_id = ?, name = ?
			WHERE id = ? AND parent_id = ?
			');

		return $stmt->execute(array(
			$skill->type_id,
			$skill->level_id,
			$skill->name,
			$skill->id,
			$skill->parent_id
			));
	}

	/**
	 * Delete an existing skill.
	 * @param $skill Skill object to be deleted.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function deleteSkill($skill) {
		if ( (!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $skill->parent_id)) ) {
			return false;
		}

		include('db.php');

		$stmt = $db->prepare('
			DELETE FROM skills
			WHERE id = ? AND parent_id = ?
			');

		return $stmt->execute(array($skill->id,	$skill->parent_id));
	}

	/////////////////////////////////////////////////////////////////////////////
	// Skill Levels
	/////////////////////////////////////////////////////////////////////////////
	
	public function getAllSkillLevels() {
		include('db.php');

		$stmt = $db->prepare('SELECT * FROM skill_levels ORDER BY id');

		if ($stmt->execute()) {
			$result = $stmt->fetchAll();
			$levels = array();

			foreach ($result as $i => $row) {
				$levels[$i] = new SkillLevel();
				$levels[$i]->id = $row['id'];
				$levels[$i]->name = $row['name'];
			}

			return $levels;
		}

		return NULL;
	}

	/////////////////////////////////////////////////////////////////////////////
	// Skill Types
	/////////////////////////////////////////////////////////////////////////////
	
	public function getAllSkillTypes() {
		include('db.php');

		$stmt = $db->prepare('SELECT * FROM skill_types ORDER BY id');

		if ($stmt->execute()) {
			$result = $stmt->fetchAll();
			$types = array();

			foreach ($result as $i => $row) {
				$types[$i] = new SkillType();
				$types[$i]->id = $row['id'];
				$types[$i]->name = $row['name'];
			}
			
			return $types;
		}
		return NULL;
	}
	
}


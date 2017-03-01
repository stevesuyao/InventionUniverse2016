<?php 

class Skill {
	public $id;
	public $parent_id;
	public $type_id;
	public $level_id;
	public $name;
	
        // Joined from skill_types and skill_levels
        public $type;
        public $level;

	public $_explicitType = 'SkillVO';
}
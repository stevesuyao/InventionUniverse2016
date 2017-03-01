<?php

class Planet {
	public $id;
	public $parent_id;
	public $name;
	public $description;
	public $image_url;
	
	public $password;
	public $salt;
	public $first_name;
	public $last_name;
	public $email;
	public $birth_date;
	public $hometown;
	public $school;
	public $hobbies;
	public $quotations;
	public $heroes;
	public $interests;
	public $goals;
	public $resume_url;
        public $avatar_url;
	
	public $project_count; // Joined area
	public $_explicitType = 'PlanetVO';
}
<?php

class Project {
	public $id;
	public $parent_id;
	public $name;
	public $description;
	public $type_id;
	public $url;
	public $thumbnail_url;
	
	// This field is actually the name of the type_id from the "project_types table". 
  // Joined by the controller and stored here for convenience.
	public $type;
	
	public $_explicitType = 'ProjectVO';
}
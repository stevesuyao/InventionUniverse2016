<?php

class Comment {
	public $id;
	public $planet_id;
	public $author_id;
	public $text;
	
	// This field is actually the NAME of the AUTHOR_ID from the PLANETS table. 
	// Joined by the controller and stored here for convenience.
	public $author;
	
	public $_explicitType = 'CommentVO';
}
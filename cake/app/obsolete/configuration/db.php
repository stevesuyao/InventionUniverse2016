<?php

// Database config and connection script.
// To be included in any methods requiring a database connection.

$DB_HOST = 'localhost';
$DB_NAME = 'biy';
$DB_USER = 'root';
$DB_PASS = '';

try {
	$db = new PDO(
	"mysql:host=".$DB_HOST.";
	dbname=".$DB_NAME
	,$DB_USER
	,$DB_PASS
	,array(PDO::ATTR_PERSISTENT => true)
	);
} catch (Exception $e) {
	return NULL; 
}
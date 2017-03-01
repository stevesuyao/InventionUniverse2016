<?php

error_reporting(E_ALL | E_STRICT);
ini_set("display_errors", "on");

// CONFIGURATION! 
// Edit these variables to suit your system.
$FRAMEWORKS_PATH = 'C:/Wamp/www/biy-iu-09summer/frameworks';
$APPLICATION_PATH = 'C:/Wamp/www/biy-iu-09summer/universe';

ini_set("include_path", ini_get("include_path") . ';' . $FRAMEWORKS_PATH . ';' . $APPLICATION_PATH . ';' . $APPLICATION_PATH . '/src');

require_once ('Zend/Amf/Server.php');
require_once ('Zend/Session.php');

$server = new Zend_Amf_Server();
Zend_Session::start();
$server->setSession();
$server->addDirectory($APPLICATION_PATH . '/src/services/');
$server->addDirectory($APPLICATION_PATH . '/src/monitoring/');
echo ($server->handle());

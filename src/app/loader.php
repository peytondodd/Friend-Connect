<?php

// Load Config
require_once "config/config.php";

// Load helpers
require_once "helpers/url_helper.php";
require_once "helpers/session_helper.php";

// Autoload Libraries
spl_autoload_register(function($className) { //match class name with filename
  require_once "libraries/". $className . ".php";
});

?>

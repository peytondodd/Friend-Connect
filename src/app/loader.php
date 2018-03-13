<?php

// Load Config
require_once "config/config.php";

// Autoload Libraries
spl_autoload_register(function($className) { //match class name with filename
  require_once "libraries/". $className . ".php";
});

?>

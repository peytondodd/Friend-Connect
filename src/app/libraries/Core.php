<?php
/*

 - App Core Class
 - Creates URL & loads core controller
 - URL Format - /Controller/method/params

*/

class Core {
  // default
  protected $currentController = "Index";
  protected $currentMethod = "index";
  protected $params = [];

  public function __construct() {
    // get url
    $url = $this->getURL();

    // if user is logged in, default = HOME
    if (isLoggedIn()) {
      $this->currentController = "Home";
    }

    $url = route_helper($url); // from url_helper.php

    // First url value - controller
    if (file_exists("../app/controllers/" . ucwords($url[0]) . ".php")) {
      // if Controller file exist, set as currentController
      $this->currentController = ucwords($url[0]);
      unset($url[0]);
    }
    // Require and instantiate controller
    require_once "../app/controllers/" . $this->currentController . ".php";
    $this->currentController = new $this->currentController;

    // Second url value - method
    if (isset($url[1])) {
      if (method_exists($this->currentController, $url[1])) {
        // if method exists, set as currentMethod
        $this->currentMethod = $url[1];
        unset($url[1]);
      }
    }

    // Third url value - parameters
    $this->params = $url ? array_values($url) : [];

    // Call the controller, method, and optional parameter
    call_user_func_array(
      [$this->currentController, $this->currentMethod],
      $this->params
    );

  }

  public function getURL() {
    if (isset($_GET["url"])) {
      $url = rtrim($_GET["url"], "/");
      $url = filter_var($url, FILTER_SANITIZE_URL);
      $url = explode("/", $url);
      return $url;
    }
  }

}



?>

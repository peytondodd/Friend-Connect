<?php
  /*
  - Base controller
  - Loads the models and views
  */

  class Controller {
    // loads models
    public function model($model) {
      // require and return instantiated model
      require_once "../app/models/" . $model . ".php";
      return new $model();
    }

    // loads views
    public function view($view, $data = []) {
      // check for view file and require
      if (file_exists("../app/views/" . $view . ".php")) {
        require_once "../app/views/" . $view . ".php";
      } else {
        // view does not exists
        die("Page not found!");
      }
    }

  }



?>

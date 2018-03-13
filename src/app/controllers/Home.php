<?php

  class Home extends Controller {
    public function __construct() {

    }

    public function index() {
      //homepage

      $data = [];

      $this->view("home/index", $data);
    }
  }



?>

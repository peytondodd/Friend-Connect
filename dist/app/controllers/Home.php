<?php

  class Home extends Controller{
    public function __construct() {

    }

    public function index() {

      $data = [

      ];

      $this->view("home/home");
    }
  }

?>

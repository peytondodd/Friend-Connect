<?php

  class Home extends Controller{
    public function __construct() {
      $this->userModel = $this->model("User");

      //first time setup
      $userProfileSetup = $this->userModel->findUserInfoById($_SESSION["user_id"])->profile_setup;
      if ($userProfileSetup == 0) {
        redirect("profiles/setup");
      }

    }

    public function index() {


      $data = [

      ];

      $this->view("home/home");
    }
  }

?>

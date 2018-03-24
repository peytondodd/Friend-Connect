<?php

  class Index extends Controller {
    public function __construct() {
      $this->userModel = $this->model("User");
    }

    public function index() {
      //Start page

      $data = [
        "first_name" => "",
        "last_name" => "",
        "register_email" => "",
        "confirm_register_email" => "",
        "login_email" => "",
        "first_name_err" => "",
        "last_name_err" => "",
        "register_email_err" => "",
        "confirm_register_email_err" => "",
        "password_err" => "",
        "confirm_password_err" => ""
      ];

      $this->view("index/index", $data);
    }
  }



?>

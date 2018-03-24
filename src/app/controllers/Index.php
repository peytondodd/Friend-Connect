<?php

  class Index extends Controller {
    public function __construct() {
      $this->userModel = $this->model("User");
    }

    public function index() {
      //Start page
      if (isset($_SESSION["registerData"])) {
        $data["first_name"] = $_SESSION["registerData"]["first_name"];
        $data["last_name"] = $_SESSION["registerData"]["last_name"];
        $data["register_email"] = $_SESSION["registerData"]["register_email"];
        $data["confirm_register_email"] = $_SESSION["registerData"]["confirm_register_email"];
        $data["first_name_err"] = $_SESSION["registerData"]["first_name_err"];
        $data["last_name_err"] = $_SESSION["registerData"]["last_name_err"];
        $data["register_email_err"] = $_SESSION["registerData"]["register_email_err"];
        if (isset($_SESSION["registerData"]["confirm_register_email_err"])) {
          $data["confirm_register_email_err"] = $_SESSION["registerData"]["confirm_register_email_err"];
        }
        $data["password_err"] = $_SESSION["registerData"]["password_err"];
        $data["confirm_password_err"] = $_SESSION["registerData"]["confirm_password_err"];
        unset($_SESSION["registerData"]);
        $this->view("index/index", $data);
      } else {

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
  }



?>

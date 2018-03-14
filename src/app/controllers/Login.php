<?php

  class Login extends Controller {
    public function __construct() {
      $this->userModel = $this->model("User");
    }

    public function index() {
      // LOGIN FORM
      if (isset($_POST["login"])) {
        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

        $data = [
        "login_email" => trim($_POST["login_email"]),
        "password" => trim($_POST["password"]),
        "login_email_err" => "",
        "password_err" => "",
        "login_err" => ""
        ];

        // validate empty email
        if (empty($data["login_email"])) {
          $data["login_email_err"] = "Please enter your email.";
        }

        // validate empty password
        if (empty($data["password"])) {
          $data["password_err"] = "Please enter your password.";
        }

        // validate login - no errors
        if (empty($data["login_email_err"]) && empty($data["password_err"])) {
          //check if email exists and password is correct
          $userLoggedIn = $this->userModel->login($data["login_email"], $data["password"]);

          if ($userLoggedIn) {
            echo "LOGGED IN";
            $this->view("login/login",$data);
          } else {
            echo "Log in details does not exist or is wrong.";
            $data["login_err"] = "Log in details does not exist or is wrong.";

            $this->view("login/login", $data);
          }
        } else {
          echo "empty fields";
          $this->view("login/login", $data);
        }
      } else {

        $data = [
          "login_email" => "",
          "password" => "",
          "login_email_err" => "",
          "password_err" => ""
        ];

        $this->view("login/login", $data);
      }
    }


  }

 ?>

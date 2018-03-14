<?php

  class Register extends Controller{
    public function __construct() {
      $this->userModel = $this->model("user");
    }

    public function index() {
      // REGISTER FORM
      if (isset($_POST["register"])) {
        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

        $data = [
          "first_name" => trim($_POST["first_name"]),
          "last_name" => trim($_POST["last_name"]),
          "register_email" => trim($_POST["register_email"]),
          "password" => trim($_POST["password"]),
          "confirm_password" => trim($_POST["confirm_password"]),
          "first_name_err" => "",
          "last_name_err" => "",
          "register_email_err" => "",
          "password_err" => "",
          "confirm_password_err" => ""
        ];

        // validate first name
        if (empty($data["first_name"])) {
          $data["first_name_err"] = "What's your first name?";
        }
        // validate last name
        if (empty($data["last_name"])) {
          $data["last_name_err"] = "What's your last name?";
        }

        // validate email
        if (empty($data["register_email"])) {
          $data["register_email_err"] = "You will need your email to log in.";
        } else {
          // if email exists, alert owner
          if ($this->userModel->findUserByEmail($data["register_email"])) {
            $data["register_email_err"] = "Email is taken.";
          }

        }

        // validate password
        if (empty($data["password"])) {
          $data["password_err"] = "Please enter a password.";
        } elseif (strlen($data["password"]) < 8) {
          $data["password_err"] = "Password must be at least 8 characters.";
        } elseif (!preg_match("#[0-9]+#", $data["password"])) {
          $data["password_err"] = "Password must include at least 1 number.";
        } elseif (!preg_match("#[a-zA-Z]+#", $data["password"])) {
          $data["password_err"] = "Password must include at least 1 letter.";
        }

        // validate confirm password
        if (empty($data["confirm_password"])) {
          $data["confirm_password_err"] = "Please confirm the password.";
        } elseif ($data["password"] != $data["confirm_password"]) {
          $data["confirm_password_err"] = "Passwords do not match";
        }

        // echo '<pre>';
        //   print_r($data);
        // echo '</pre>';

        // Check validations - no errors
        if (empty($data["first_name_err"]) && empty($data["last_name_err"]) &&
        empty($data["register_email_err"]) && empty($data["password_err"]) &&
        empty($data["confirm_password_err"])) {
          // form validated
          echo "form validated";
          // Hash password
          $data["password"] = password_hash($data["password"], PASSWORD_DEFAULT);

          // Register user to Database
          if ($this->userModel->register($data)) {
            // posted in database
            echo "database success";
          } else {
            echo "database error";
            // not posted in database
          }
        } else {
          echo "form not validated";
          // load form with the inputs and errors
          echo '<pre>';
            print_r($data);
          echo '</pre>';
          $this->view("register/register", $data);
        }

      } else {
        $data = [
          "first_name" => "",
          "last_name" => "",
          "register_email" => "",
          "password" => "",
          "confirm_password" => "",
          "first_name_err" => "",
          "last_name_err" => "",
          "register_email_err" => "",
          "password_err" => "",
          "confirm_password_err" => ""
        ];

        $this->view("register/register",$data);
      }



    }


  }

?>

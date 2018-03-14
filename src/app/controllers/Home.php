<?php

  class Home extends Controller {
    public function __construct() {
      $this->userModel = $this->model("User");
    }

    public function index() {
      //homepage

      // form processor
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
            $this->view("home/index", $data);
          }

        }

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

          echo '<pre>';
            print_r($data);
          echo '</pre>';

          // validate login - no errors
          if (empty($data["login_email_err"]) && empty($data["password_err"])) {
            //check if email exists and password is correct
            $userLoggedIn = $this->userModel->login($data["login_email"], $data["password"]);

            if ($userLoggedIn) {
              echo "LOGGED IN";
            } else {
              echo "Log in details does not exist or is wrong.";
              $data["login_err"] = "Log in details does not exist or is wrong.";

              $_SESSION["login_email"] = $data["login_email"];
              redirect("login");
            }
          } else {
            echo "empty fields";
            $this->view("home/index", $data);
          }
        }


      }

      $data = [
        "first_name" => "",
        "last_name" => "",
        "register_email" => "",
        "login_email" => "",
        "first_name_err" => "",
        "last_name_err" => "",
        "email_err" => "",
        "password_err" => "",
        "confirm_password_err" => ""
      ];

      $this->view("home/index", $data);
    }
  }



?>

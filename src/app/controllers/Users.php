<?php

  class Users extends Controller {
    public function __construct() {
 
      $this->userModel = $this->model("User");
    }

    public function index() {
      redirect("");
    }

    public function register() {
      if (isLoggedIn()) {
        redirect("");
      }

      // REGISTER FORM
      if (isset($_POST["register"]) || isset($_POST["register_index"])) {
        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

        $data = [
          "first_name" => trim($_POST["first_name"]),
          "last_name" => trim($_POST["last_name"]),
          "register_email" => trim($_POST["register_email"]),
          "confirm_register_email" => trim($_POST["confirm_register_email"]),
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
        } elseif (!filter_var($data["register_email"], FILTER_VALIDATE_EMAIL)) {
            $data["register_email_err"] = "Email is invalid.";
        } elseif ($this->userModel->findUserByEmail($data["register_email"])) {
            $data["register_email_err"] = "Email is taken.";
        }

        // confirm Email
        if (empty($data["register_email_err"]) && empty($data["confirm_register_email"])) {
          $data["confirm_register_email_err"] = "Please confirm the email.";
        } elseif (empty($data["register_email_err"]) && $data["register_email"] != $data["confirm_register_email"]) {
          $data["confirm_register_email_err"] = "Emails do not match.";
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
        if (empty($data["password_err"]) && empty($data["confirm_password"])) {
          $data["confirm_password_err"] = "Please confirm the password.";
        } elseif (empty($data["password_err"]) && $data["password"] != $data["confirm_password"]) {
          $data["confirm_password_err"] = "Passwords do not match";
        }

        // echo '<pre>';
        //   print_r($data);
        // echo '</pre>';

        // Check validations - no errors
        if (empty($data["first_name_err"]) && empty($data["last_name_err"]) &&
        empty($data["register_email_err"]) && empty($data["confirm_register_email_err"]) &&
        empty($data["password_err"]) && empty($data["confirm_password_err"])) {
          // form validated -SUCCESS
          //echo "form validated";
          $_SESSION["registerData"] = $data;
          // send registration details to user's email
          $this->successMail($data);
          // Hash password
          $data["password"] = password_hash($data["password"], PASSWORD_DEFAULT);

          // Register user to Database
          if ($this->userModel->register($data)) {
            // posted in database- SUCCESS
            $this->userModel->createUserInfo($data["register_email"]);
            redirect("register/success");
          } else {
            echo "database error";
            // not posted in database
          }
        } else {
          //echo "form not validated";
          // load form with the inputs and errors
          // echo '<pre>';
          //   print_r($data);
          // echo '</pre>';
          //$this->view("register/register", $data);
          if (isset($_POST["register"])) {
            $this->view("users/register", $data);
          }
          if (isset($_POST["register_index"])) {
            $_SESSION["registerData"] = $data;
            redirect("");
            //$this->view("users/register", $data);
          }
        }

      } else {
        $data = [
          "first_name" => "",
          "last_name" => "",
          "register_email" => "",
          "confirm_register_email" => "",
          "password" => "",
          "confirm_password" => "",
          "first_name_err" => "",
          "last_name_err" => "",
          "register_email_err" => "",
          "confirm_register_email_err" => "",
          "password_err" => "",
          "confirm_password_err" => ""
        ];

        $this->view("users/register",$data);
      }

    }//register()

    function successMail($data) {
      $to = $data["register_email"];
      $subject = "Your Friend Connect Account Details";
      $message = "
        <html>
          <body>
            <h1>Friend Connect</h1>
            <p>Thank you for signing up!</p>
            <p>Here is your account details.</p>
            <br>
            <table style='border-collapse: collapse; border: 1px solid black;'>
              <tr>
                <th style='border: 1px solid black;'> First Name </th>
                <td style='border: 1px solid black;'>".$data["first_name"]."</td>
              </tr>
              <tr>
                <th style='border: 1px solid black;'> Last Name </th>
                <td style='border: 1px solid black;'>".$data["last_name"]."</td>
              </tr>
              <tr>
                <th style='border: 1px solid black;'> Email </th>
                <td style='border: 1px solid black;'>".$data["register_email"]."</td>
              </tr>
              <tr>
                <th style='border: 1px solid black;'> Password </th>
                <td style='border: 1px solid black;'>".$data["password"]."</td>
              </tr>
            </table>
            <br>
            <p>The GitHub for Friend Connect can be found here: <a href='https://github.com/thejasonxie/Friend-Connect'>https://github.com/thejasonxie/Friend-Connect</a></p>
            <p>Friend Connect was developed by <a href='https://thejasonxie.com/' target='_blank'>Jason Xie</a></p>
            <br>
          </body>
        </html>
      ";
      // $headers[] = 'MIME-Version: 1.0';
      // $headers[] = 'Content-type: text/html; charset=iso-8859-1';
      // $headers[] = 'From: admin@thejasonxie.com';
      $headers = "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=iso-8859-1" . "\r\n" .
                "From: admin@thejasonxie.com";
      mail($to, $subject, $message, $headers);
    }

    public function success() {
      if (!isset($_SESSION["registerData"])) {
        redirect("login");
      }

      $data["registered_name"] = ucwords($_SESSION["registerData"]["first_name"]);
      $data["registered_email"] = $_SESSION["registerData"]["register_email"];
      $data["registered_password"] = $_SESSION["registerData"]["password"];
      //unset($_SESSION["registerData"]);
      $this->view("users/success", $data);

      //unset($_SESSION["registered_name"]);
      //unset($_SESSION["registered_email"]);
      //unset($_SESSION["registered_password"]);

    }


    public function login() {
      if (isLoggedIn()) {
        redirect("");
      }
      // LOGIN FORM
      if (isset($_POST["login"])) {

        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

        $data = [
        "login_email" => isset($_POST["login_email"]) ? trim($_POST["login_email"]) : "",
        "password" => isset($_POST["login_email"]) ? trim($_POST["password"]) : "",
        "login_email_err" => "",
        "password_err" => "",
        "login_err" => ""
        ];

        //after register, click to log in
        if (isset($_SESSION["registerData"]["register_email"]) &&
        isset($_SESSION["registerData"]["password"])) {
          if ($this->userModel->findUserByEmail($_SESSION["registerData"]["register_email"])) {
            $data["login_email"] = $_SESSION["registerData"]["register_email"];
            $data["password"] = $_SESSION["registerData"]["password"];
          }
          unset($_SESSION["registerData"]);
        }

        // validate empty email
        if (empty($data["login_email"])) {
          $data["login_email_err"] = "Please enter your email.";
        }

        // validate empty password
        if (empty($data["password"])) {
          $data["password_err"] = "Please enter your password.";
        }

        // if only email entered
        if (!empty($data["login_email"])) {
          if ($this->userModel->findUserByEmail($data["login_email"])) {
            $userData = $this->userModel->findUserByEmail($data["login_email"]);
            $data["first_name"] = $userData->first_name;
            $data["last_name"] = $userData->last_name;
          }
        }

        //var_dump($data);
        // validate login - no errors
        if (empty($data["login_email_err"]) && empty($data["password_err"])) {
          //check if email exists and password is correct
          $userLoggedIn = $this->userModel->login($data["login_email"], $data["password"]);

          if ($userLoggedIn) {
            if (isset($_SESSION["register_data"])) {
              unset($_SESSION["registerData"]);
            }

            createUserSession($userLoggedIn);
            $this->userModel->updateUserStatus(1); // 1 = online
            redirect("");

          } else {
            if (isset($data["first_name"])) {
              $data["login_err"] = "Sorry ".ucwords($data["first_name"]).", your password is wrong.";
              $data["password_err"] = "Wrong password.";
            } else {
              $data["login_err"] = "Sorry, this account does not exists.";
            }
            $this->view("users/login",$data);
          }
        } elseif (empty($data["login_email_err"]) && !empty($data["password_err"])) {
          if (isset($data["first_name"])) {
            $data["login_err"] = "Sorry ".ucwords($data["first_name"]).", enter your password.";
          } else {
            $data["login_email_err"] = "Sorry, this email does not exists.";
          }
          $this->view("users/login",$data);
        } elseif (!empty($data["login_email_err"]) && !empty($data["password_err"])) {
          // $data["login_err"] = "Empty fields";
          // echo $data["login_err"];
          $this->view("users/login",$data);
        }
      } else {

        $data = [
          "login_email" => "",
          "password" => "",
          "login_email_err" => "",
          "password_err" => ""
        ];

        $this->view("users/login", $data);
      }
    }


    public function logout() {
      $this->userModel->updateUserStatus(0); // 0 = offline
      // *** updateUserStatus must be put before unset($_SESSION["user_id"]) as it uses it.
      unset($_SESSION["user_id"]);
      unset($_SESSION["user_first_name"]);
      unset($_SESSION["user_last_name"]);
      unset($_SESSION["user_email"]);
      session_destroy();
      redirect("");
    }

    public function updateStatus() {
      if (isset($_REQUEST["status"])) {
        if (isset($_SESSION["user_id"])) {
          $this->userModel->updateUserStatus($_REQUEST["status"]);
        }
        return;
      }
    }


  }




?>

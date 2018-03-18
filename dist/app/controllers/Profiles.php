<?php

  class Profiles extends Controller {
    public function __construct() {
      $this->userModel = $this->model("user");
    }

    public function index() {

      $data = [];
      $this->view("profile/profile", $data);

    }

    public function user($id) {
      if ($this->userModel->findUserById($id)) {
        if ($this->userModel->findUserInfoById($id)) {

          $user = $this->userModel->findUserById($id);
          $userInfo = $this->userModel->findUserInfoById($id);

          $data = [
            "id" => $user->id,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "status" => $userInfo->status,
            "profile_img" => $userInfo->profile_img,
            "birthday" => $userInfo->birthday,
            "gender" => $userInfo->gender,
            "education" => $userInfo->education,
            "work" => $userInfo->work,
            "location" => $userInfo->location,
            "description" => $userInfo->description
          ];
          $this->view("profile/profile", $data);
        } else {
          echo "user not found details";
        }

      } else {
        echo "user not found";
      }


    }


    public function setup() {
      //already completed
      $userProfileSetup = $this->userModel->findUserInfoById($_SESSION["user_id"])->profile_setup;
      echo $userProfileSetup;
      echo $_SESSION["user_id"];
      if ($userProfileSetup == 1) {
        if (isset($_SERVER["HTTP_REFERER"])) {
          header("Location: " . $_SERVER["HTTP_REFERER"]);
        } else {
          redirect("");
        }
      }

      if (isset($_POST["submit"])) {
        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

        $userInfo = [
          "status" => "",
          "profile_img" => "",
          "birthday" => "",
          "gender" => "",
          "education" => "",
          "work" => "",
          "location" => "",
          "description" => "",
          "profile_setup" => "",
          "ERR_profile_img" => "",
          "ERR_birthday" => "",
          "ERR_gender" => "",
          "ERR_education" => "",
          "ERR_work" => "",
          "ERR_location" => "",
          "ERR_description" => "",
        ];

        //PROFILE IMAGE
        if ($_FILES["img_upload"]["name"] !== "" && $_FILES["img_upload"]["size"] !== 0) {

          $fileName = $_FILES["img_upload"]["name"];
          $fileTmpName = $_FILES["img_upload"]["tmp_name"];
          $fileSize = $_FILES["img_upload"]["size"];
          $fileError = $_FILES["img_upload"]["error"];

          $fileExt = explode(".", $fileName);
          $fileActualExt = strtolower(end($fileExt));

          $allowed = array("jpeg", "jpg", "png");

          if (in_array($fileActualExt, $allowed)) {
            if ($fileError === 0) {
              if ($fileSize < 500000) { // 50mb
                $fileNameNew = "profile.".$_SESSION["user_id"].".".$fileActualExt;
                // Create image folder if it doesnt exist
                if (file_exists("./images")) {
                  if (file_exists("./images/".$_SESSION["user_id"])) {
                    $userFolder = "./images/".$_SESSION["user_id"];
                  } else {
                    mkdir("./images/".$_SESSION["user_id"]);
                    $userFolder = "./images/".$_SESSION["user_id"];
                  }
                } else {
                  mkdir("./images");
                  mkdir("./images/".$_SESSION["user_id"]);
                  $userFolder = "./images/".$_SESSION["user_id"];
                }

                $fileDestination = $userFolder. "/" .$fileNameNew;
                if (move_uploaded_file($fileTmpName, $fileDestination)) {
                  $userInfo["profile_img"] = 1;
                  echo "Success";
                } else {
                  echo "upload failed";
                  $userInfo["ERR_profile_img"] = "upload failed";
                }
              } else {
                echo "file is too big";
                $userInfo["ERR_profile_img"] = "file is too big";
              }
            } else {
              echo "there was an error uploading";
              $userInfo["ERR_profile_img"] = "there was an error uploading";
            }
          } else {
            echo "Wrong file type";
            $userInfo["ERR_profile_img"] = "Wrong file type";
          }
        } else {
          echo "bye";
          $userInfo["ERR_profile_img"] = "No profile picture selected";
        }

        // birthday
        if (isset($_POST["month"]) && isset($_POST["day"]) && isset($_POST["year"])) {
          if ($_POST["month"] != 0 && $_POST["day"] != 0 && $_POST["year"] != 0) {
            $month= $_POST["month"];
            $day= $_POST["day"];
            $year = $_POST["year"];
            $userInfo["birthday"] = date("Y-m-d",mktime(0,0,0,$month,$day,$year));
          } else {
            $userInfo["ERR_birthday"] = "Please select your birthday";
          }
        } else {
          $userInfo["ERR_birthday"] = "Please select your birthday";
        }

        // gender
        if (isset($_POST["gender"])) {
          $userInfo["gender"] = $_POST["gender"];
        } else {
          $userInfo["ERR_gender"] = "Please select your gender";
        }

        // education
        if (isset($_POST["education"])) {
          if (!empty($_POST["education"])) {
            if (strlen($_POST["education"]) < 255) {
              $userInfo["education"] = $_POST["education"];
            } else {
              $userInfo["ERR_education"] = "Education info is too long.";
            }
          } else {
            $userInfo["ERR_education"] = "Please enter your education.";
          }
        } else {
          $userInfo["ERR_education"] = "Please enter your education.";
        }

        // work
        if (isset($_POST["work"])) {
          if (!empty($_POST["work"])) {
            if (strlen($_POST["work"]) < 255) {
              $userInfo["work"] = $_POST["work"];
            } else {
              $userInfo["ERR_work"] = "Work info is too long.";
            }
          } else {
            $userInfo["ERR_work"] = "Please enter your work.";
          }
        } else {
          $userInfo["ERR_work"] = "Please enter your work.";
        }

        // location
        if (isset($_POST["location"])) {
          if (!empty($_POST["location"])) {
            if (strlen($_POST["location"]) < 255) {
              $userInfo["location"] = $_POST["location"];
            } else {
              $userInfo["ERR_location"] = "Location info is too long.";
            }
          } else {
            $userInfo["ERR_location"] = "Please enter your location.";
          }
        } else {
          $userInfo["ERR_location"] = "Please enter your location.";
        }

        // location
        if (isset($_POST["description"])) {
          if (!empty($_POST["description"])) {
            if (strlen($_POST["description"]) < 65535) {
              $userInfo["description"] = $_POST["description"];
            } else {
              $userInfo["ERR_description"] = "Description info is too long.";
            }
          } else {
            $userInfo["ERR_description"] = "Please enter your description.";
          }
        } else {
          $userInfo["ERR_description"] = "Please enter your description.";
        }


        echo "<br>";
        echo "<pre>";
        print_r($userInfo);
        //var_dump($userInfo);
        echo "</pre>";

        if (empty($userInfo["ERR_profile_img"]) && empty($userInfo["ERR_birthday"]) &&
        empty($userInfo["ERR_gender"]) && empty($userInfo["ERR_education"]) &&
        empty($userInfo["ERR_work"]) && empty($userInfo["ERR_location"]) &&
        empty($userInfo["ERR_description"])) {

          $userInfo["status"] = 1;
          $userInfo["profile_setup"] = 1;
          if ($this->userModel->updateUserInfo($userInfo)) {
            redirect("");
          } else {
            echo "Error";
          }

        } else {
          echo "profile Fail";
        }

      } else {

        $data = [
          "first_name" => $_SESSION["user_first_name"],
          "last_name" => $_SESSION["user_last_name"]
        ];

        $this->view("profile/setup", $data);
      }

    }




  }

?>

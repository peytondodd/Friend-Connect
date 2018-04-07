<?php

  class Profiles extends Controller {
    public function __construct() {
      $this->userModel = $this->model("User");
      $this->friendModel = $this->model("Friend");
      $this->postModel = $this->model("Post");
    }

    public function index() {

      $data = [];
      $this->view("profile/profile", $data);

    }

    public function user($id) {
      if ($this->userModel->findUserById($id)) {
        if ($this->userModel->findUserInfoById($id)) {

          // USER INFO AND DETAILS
          $user = $this->userModel->findUserById($id);
          $userInfo = $this->userModel->findUserInfoById($id);
          $status = "";

          // FRIEND STATUS
          if ($user->id != $_SESSION["user_id"]) {
            $friendStatus = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $user->id);
            if ($friendStatus != false) {
              // has relationship
              $status = $friendStatus;
            } else {
              // no relationship
              $status = "add friend";
            }
          }
          //["accept", "friends", "pending", "no access", "add friend", "unblock"]

          // FRIEND LIST
          $friend_list = [];
          $friends = $this->friendModel->friendListOfUser($id);
          if ($friends) {
            foreach($friends as $value) {
              // find friend id
              if ($value->user_one == $id) {
                $friend_id = $value->user_two;
              } elseif ($value->user_two == $id) {
                $friend_id = $value->user_one;
              }
              // find friend info
              $friend_name = $this->userModel->findUserById($friend_id);
              $friend_info = $this->userModel->findUserInfoById($friend_id);
              // gether friend data
              $friend = new stdClass();
              $friend->friend_id = $friend_id;
              $friend->friend_name = ucwords($friend_name->first_name. " " .$friend_name->last_name);
              $friend->profile_img = $this->getProfileImgSrc($friend_id, $friend_info->profile_img, $friend_info->profile_img_id);

              // push into friend list array
              $friend_list[] = $friend;
            }

            $numberOfFriends = count($friend_list);
            $numberDisplayed = [];
            if ($numberOfFriends <= 6) {
              do {
                $i = rand(0, $numberOfFriends-1);
                if (!in_array($i, $numberDisplayed)) {
                  $numberDisplayed[] = $i;
                }
              } while(count($numberDisplayed) != $numberOfFriends);
            } else {
              do {
                $i = rand(0, $numberOfFriends-1);
                if (!in_array($i, $numberDisplayed)) {
                  $numberDisplayed[] = $i;
                }
              } while(count($numberDisplayed) < 6);
            }
            for ($i = 0; $i < count($numberDisplayed); $i++) {
              $friend_list_short[] = $friend_list[$numberDisplayed[$i]];
            }
          } else {
            $friend_list_short = false;
          }

          // USER POSTS
          $userPosts = $this->postModel->getAllUserPost($id);
          function dateCompare($a, $b) {
            if ($a->created_at == $b->created_at) {
              return 0;
            }
            return ($a->created_at > $b->created_at) ? -1 : 1;
            //latest date to earliest date
          }
          usort($userPosts, "dateCompare");


          // POST NAME, PROFILE ICON, LIKES AND COMMENTS
          foreach ($userPosts as $value) {
            // NAMES
            $postName = $this->userModel->findUserById($value->user_id);
            $value->name = ucwords($postName->first_name." ".$postName->last_name);

            //post profile icon
            $picPost = $this->userModel->findUserInfoById($value->user_id);
            $value->img_src =
            $this->getProfileImgSrc($value->user_id, $picPost->profile_img, $picPost->profile_img_id);

            // LIKES
            //gather all like counts per post
            if ($this->postModel->getLikes($value->id)) {
              $value->likeCount = count($this->postModel->getLikes($value->id));
            } else {
              $value->likeCount = 0;
            }
            //Did current user session like the post?
            if ($this->postModel->currentUserLike($_SESSION["user_id"], $value->id)) {
              $value->currentUserLike = true;
            } else {
              $value->currentUserLike = false;
            }

            //COMMENTS
            $value->comments = new stdClass();
            if ($this->postModel->getComments($value->id)) {
              $postComment = $this->postModel->getComments($value->id);
              usort($postComment, "dateCompare");

              foreach($postComment as $comm) {
                $commentName = $this->userModel->findUserById($comm->user_id);
                $comm->name = ucwords($commentName->first_name." ".$commentName->last_name);

                $picComm= $this->userModel->findUserInfoById($comm->user_id);
                $comm->img_src =
                $this->getProfileImgSrc($value->user_id, $picComm->profile_img, $picComm->profile_img_id);
              }

              $value->comments->count = count($postComment);
              $value->comments->list = $postComment;
            } else {
              $value->comments->count = 0;
              $value->comments->list = 0;
            }

          }



          echo "<pre>";
          print_r($userPosts);
          echo "</pre>";

          $data = [
            "id" => $user->id,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "status" => $userInfo->status,
            "profile_img" => $this->getProfileImgSrc($id, $userInfo->profile_img, $userInfo->profile_img_id),
            "birthday" => $userInfo->birthday,
            "gender" => $userInfo->gender,
            "education" => $userInfo->education,
            "work" => $userInfo->work,
            "location" => $userInfo->location,
            "description" => $userInfo->description,
            "friend_status" => $status."hi",
            "friend_total" => $numberOfFriends,
            "friend_list" => $friend_list_short,
            "user_post" => $userPosts
          ];

          $this->view("profile/profile", $data);
        } else {
          echo "user not found details";
        }

      } else {
        echo "user not found";
      }


    }

    public function getProfileImgSrc($profileId, $profileImg, $profileImgId) {
      if ($profileImg == 1) {
          $ext = array("jpeg", "jpg", "png", "bmp", "gif");
          $found = false;
          $i = 0;
          do {
            if (file_exists("user_data/".$profileId."/profile.".$profileId.".".$ext[$i])) {
              $found = true;
              $ext = $ext[$i];
            } else {
              $i++;
            }
          } while (!$found && $i < 5);
          return $profileId . "/profile." . $profileId . "." . $ext;
      }elseif ($profileImg == 0) {
        return "default/default-profile-" . $profileImgId . ".jpg";
      }
    }


    public function setup() {
      //already completed
      $userProfileSetup = $this->userModel->findUserInfoById($_SESSION["user_id"])->profile_setup;
      //echo $userProfileSetup;
      //echo $_SESSION["user_id"];
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
          "profile_img" => "",//
          "profile_img_id" => "",
          "birthday" => "",
          "gender" => "",
          "education" => "",
          "work" => "",
          "location" => "",
          "description" => "",
          "profile_setup" => ""//,
          // "ERR_profile_img" => "",
          // "ERR_birthday" => "",
          // "ERR_gender" => "",
          // "ERR_education" => "",
          // "ERR_work" => "",
          // "ERR_location" => "",
          // "ERR_description" => "",
        ];

        //PROFILE IMAGE
        if ($_FILES["img_upload"]["name"] !== "" && $_FILES["img_upload"]["size"] !== 0) {

          $fileName = $_FILES["img_upload"]["name"];
          $fileTmpName = $_FILES["img_upload"]["tmp_name"];
          $fileSize = $_FILES["img_upload"]["size"];
          $fileError = $_FILES["img_upload"]["error"];

          $fileExt = explode(".", $fileName);
          $fileActualExt = strtolower(end($fileExt));

          $allowed = array("jpeg", "jpg", "png", "bmp", "gif");

          if (in_array($fileActualExt, $allowed)) {
            if ($fileError === 0) {
              if ($fileSize < 500000) { // 50mb
                $fileNameNew = "profile.".$_SESSION["user_id"].".".$fileActualExt;
                // Create image folder if it doesnt exist
                if (file_exists("./user_data")) {
                  if (file_exists("./user_data/".$_SESSION["user_id"])) {
                    $userFolder = "./user_data/".$_SESSION["user_id"];
                  } else {
                    mkdir("./user_data/".$_SESSION["user_id"]);
                    $userFolder = "./user_data/".$_SESSION["user_id"];
                  }
                } else {
                  mkdir("./user_data");
                  mkdir("./user_data/".$_SESSION["user_id"]);
                  $userFolder = "./user_data/".$_SESSION["user_id"];
                }

                $fileDestination = $userFolder. "/" .$fileNameNew;
                if (move_uploaded_file($fileTmpName, $fileDestination)) {
                  $userInfo["profile_img"] = 1;
                  //echo "Success";
                } else {
                  echo "upload failed";
                  //$userInfo["ERR_profile_img"] = "upload failed";
                }
              } else {
                echo "file is too big";
                //$userInfo["ERR_profile_img"] = "file is too big";
              }
            } else {
              echo "there was an error uploading";
              //$userInfo["ERR_profile_img"] = "there was an error uploading";
            }
          } else {
            echo "Wrong file type";
            //$userInfo["ERR_profile_img"] = "Wrong file type";
          }
        } else { // default profile
          if (isset($_POST["defaultProfile"])) {
            $defaultImgId = explode("-", $_POST["defaultProfile"])[2];
            $userInfo["profile_img"] = 0;
            $userInfo["profile_img_id"] = $defaultImgId;
          }
        }

        // birthday
        if (isset($_POST["month"]) && isset($_POST["day"]) && isset($_POST["year"])) {
          if ($_POST["month"] != 0 && $_POST["day"] != 0 && $_POST["year"] != 0) {
            $month= $_POST["month"];
            $day= $_POST["day"];
            $year = $_POST["year"];
            $userInfo["birthday"] = date("Y-m-d",mktime(0,0,0,$month,$day,$year));
          } //else {
          //   $userInfo["ERR_birthday"] = "Please select your birthday";
          // }
        } //else {
        //   $userInfo["ERR_birthday"] = "Please select your birthday";
        // }

        // gender
        if (isset($_POST["gender"])) {
          $userInfo["gender"] = $_POST["gender"];
        } //else {
          //$userInfo["ERR_gender"] = "Please select your gender";
        //}

        // education
        if (isset($_POST["education"])) {
          if (!empty($_POST["education"])) {
            if (strlen($_POST["education"]) < 255) {
              $userInfo["education"] = $_POST["education"];
            } //else {
              //$userInfo["ERR_education"] = "Education info is too long.";
            //}
          } //else {
            //$userInfo["ERR_education"] = "Please enter your education.";
          //}
        } //else {
          //$userInfo["ERR_education"] = "Please enter your education.";
        //}

        // work
        if (isset($_POST["work"])) {
          if (!empty($_POST["work"])) {
            if (strlen($_POST["work"]) < 255) {
              $userInfo["work"] = $_POST["work"];
            } //else {
              //$userInfo["ERR_work"] = "Work info is too long.";
            //}
          } //else {
            //$userInfo["ERR_work"] = "Please enter your work.";
          //}
        } //else {
          //$userInfo["ERR_work"] = "Please enter your work.";
        //}

        // location
        if (isset($_POST["location"])) {
          if (!empty($_POST["location"])) {
            if (strlen($_POST["location"]) < 255) {
              $userInfo["location"] = $_POST["location"];
            } //else {
              //$userInfo["ERR_location"] = "Location info is too long.";
            //}
          } //else {
            //$userInfo["ERR_location"] = "Please enter your location.";
          //}
        } //else {
          //$userInfo["ERR_location"] = "Please enter your location.";
        //}

        // location
        if (isset($_POST["description"])) {
          if (!empty($_POST["description"])) {
            if (strlen($_POST["description"]) < 65535) {
              $userInfo["description"] = $_POST["description"];
            } //else {
              //$userInfo["ERR_description"] = "Description info is too long.";
            //}
          } //else {
            //$userInfo["ERR_description"] = "Please enter your description.";
          //}
        } //else {
          //$userInfo["ERR_description"] = "Please enter your description.";
        //}


        // echo "<br>";
        // echo "<pre>";
        // print_r($userInfo);
        // //var_dump($userInfo);
        // echo "</pre>";

        // if (empty($userInfo["ERR_profile_img"]) && empty($userInfo["ERR_birthday"]) &&
        // empty($userInfo["ERR_gender"]) && empty($userInfo["ERR_education"]) &&
        // empty($userInfo["ERR_work"]) && empty($userInfo["ERR_location"]) &&
        // empty($userInfo["ERR_description"])) {

          $userInfo["status"] = 1;
          $userInfo["profile_setup"] = 1;
          if ($this->userModel->updateUserInfo($userInfo)) {
            redirect("");
          } else {
            echo "Error";
          }

        // } else {
        //   echo "profile Fail";
        // }

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

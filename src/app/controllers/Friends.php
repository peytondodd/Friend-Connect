<?php

class Friends extends Controller {

  public function __construct() {
    $this->friendModel = $this->model("Friend");
  }

  public function index () {
    if (isset($_REQUEST["viewedUserId"])) {
      session_write_close();
      $timestamp = $_REQUEST["timestamp"];
      $viewedUserId = $_REQUEST["viewedUserId"];
      $oldStatus = $_REQUEST["oldStatus"];
      $status = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $viewedUserId);
      // if ($status) {
      //   $updatedTime = $this->friendModel->getDateUpdated($_SESSION["user_id"], $viewedUserId)->date_updated;
      // }

      if (!$status) {
        if ($oldStatus == "Add Friend") {
          while (!$status) {
            sleep(1);
            $status = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $viewedUserId);

            //break;

          }
          //sleep(5);
          $data = [
            "status" => $status
          ];
          echo json_encode($data);
        } else {
          $data = [
            "status" => "Add Friend"
          ];
        echo json_encode($data);
        }
      } elseif ($status) {
          $updatedTime = $this->friendModel->getDateUpdated($_SESSION["user_id"], $viewedUserId)->date_updated;


      }

    }

    if (isset($_REQUEST["updatefriend"])) {
      //$split = explode("-", $_REQUEST["updatefriend"]);
      $status = $_REQUEST["updatefriend"];
      $viewedUserId = $_REQUEST["viewedUserId"];

      //echo $status;
      //echo "CLICK";

      if ($this->friendModel->checkFriendStatus($_SESSION["user_id"], $viewedUserId)) {

        if ($status == "Add Friend") {
            $this->friendModel->updateFriend($_SESSION["user_id"], $viewedUserId, 1);
        }
        return;

      } else {
        if ($status == "Add Friend") {
            $this->friendModel->addFriend($_SESSION["user_id"], $viewedUserId);
            return;
        }
      }


    }



  }

}





?>

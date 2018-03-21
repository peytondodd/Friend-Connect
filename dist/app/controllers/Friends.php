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
          $timestamp = $this->friendModel->getDateUpdated($_SESSION["user_id"], $viewedUserId)->date_updated;
          //sleep(5);
          $data = [
            "status" => $status,
            "timestamp" => $timestamp
          ];
          //session_start();
          echo json_encode($data);
        } else {
          $data = [
            "status" => "Add Friend"
          ];
          //session_start();
        echo json_encode($data);
        }
      } elseif ($status) {
          $updatedTime = $this->friendModel->getDateUpdated($_SESSION["user_id"], $viewedUserId)->date_updated;
          while ($updatedTime <= $timestamp) {
            sleep(1);
            if ($this->friendModel->getDateUpdated($_SESSION["user_id"], $viewedUserId)) {
              $updatedTime = $this->friendModel->getDateUpdated($_SESSION["user_id"], $viewedUserId)->date_updated;
            }
            if (!$this->friendModel->checkFriendStatus($_SESSION["user_id"], $viewedUserId)) { //deleted
              $data = [
                "status" => "Add Friend",
                "timestamp" => "0000-00-00 00:00:00"
              ];
              //session_start();
              echo json_encode($data);
              return;
              break;
            }
          }

          $status = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $viewedUserId);
          $timestamp = $this->friendModel->getDateUpdated($_SESSION["user_id"], $viewedUserId)->date_updated;
          $data = [
            "status" => $status,
            "timestamp" => $timestamp
          ];
          //session_start();
          echo json_encode($data);

      }

    }

    if (isset($_REQUEST["updatefriend"])) {
      //$split = explode("-", $_REQUEST["updatefriend"]);
      $status = $_REQUEST["updatefriend"];
      $viewedUserId = $_REQUEST["UserId"];

      //echo $status;
      //echo "CLICK";

      if ($this->friendModel->checkFriendStatus($_SESSION["user_id"], $viewedUserId)) {

        if ($status == "Add Friend") {
          $this->friendModel->updateFriend($_SESSION["user_id"], $viewedUserId, 1);
          return;
        } elseif ($status == "Accept") {
          $this->friendModel->updateFriend($_SESSION["user_id"], $viewedUserId, 2);
          return;
        } elseif ($status == "Cancel") {
          $this->friendModel->deleteFriend($_SESSION["user_id"], $viewedUserId);
          return;
        } elseif ($status == "Block") {
          $this->friendModel->updateFriend($_SESSION["user_id"], $viewedUserId, 4);
          return;
        } elseif ($status == "Unblock") {
          $wasFriend = $this->friendModel->wasFriend($_SESSION["user_id"], $viewedUserId);
          if ($wasFriend == 0) {
            $this->friendModel->deleteFriend($_SESSION["user_id"], $viewedUserId);
            echo "was friend " .$wasFriend;
          } elseif ($wasFriend == 1) {
            $this->friendModel->updateFriend($viewedUserId, $_SESSION["user_id"], 1);
            echo "was friend " .$wasFriend;
          } elseif ($wasFriend == 2) {
            $this->friendModel->updateFriend($_SESSION["user_id"], $viewedUserId, 2);
            echo "was friend " .$wasFriend;
          }
          return;
        } elseif ($status == "Decline") {
          $this->friendModel->deleteFriend($_SESSION["user_id"], $viewedUserId);
          return;
        } elseif ($status == "Delete") {
          $this->friendModel->deleteFriend($_SESSION["user_id"], $viewedUserId);
          return;
        }


      } else {
        if ($status == "Add Friend") {
            $this->friendModel->addFriend($_SESSION["user_id"], $viewedUserId);
            return;
        } elseif ($status == "Block") {
          $this->friendModel->blockStranger($_SESSION["user_id"], $viewedUserId);
        }
      }


    }



  }

}





?>

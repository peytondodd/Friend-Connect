<?php

class Friends extends Controller {

  public function __construct() {
    $this->friendModel = $this->model("Friend");
    session_write_close();
  }

  public function index () {
    
  }

  public function add() {
    if (isset($_REQUEST["addFriendId"])) {
      $friendAdded = $this->friendModel->addFriend($_SESSION["user_id"], $_REQUEST["addFriendId"]);
      while(!$friendAdded) {
        $friendAdded = $this->friendModel->addFriend($_SESSION["user_id"], $_REQUEST["addFriendId"]);
      }
      echo "Pending";
      return;
    }
  }

  public function cancel() {
    if (isset($_REQUEST["cancelFriendId"])) {
      $friendCancelled = $this->friendModel->deleteFriend($_SESSION["user_id"], $_REQUEST["cancelFriendId"]);
      while(!$friendCancelled) {
        $friendCancelled = $this->friendModel->deleteFriend($_SESSION["user_id"], $_REQUEST["cancelFriendId"]);
      }
      echo "Add Friend";
      return;
    }
  }

  public function accept() {
    if (isset($_REQUEST["acceptFriendId"])) {
      $friendAccepted = $this->friendModel->updateFriend($_SESSION["user_id"], $_REQUEST["acceptFriendId"], 2);
      while(!$friendAccepted) {
        $friendAccepted = $this->friendModel->updateFriend($_SESSION["user_id"], $_REQUEST["acceptFriendId"], 2);
      }
      echo "Friends";
      return;
    }
  }

  public function unfriend() {
    if (isset($_REQUEST["unfriendFriendId"])) {
      $friendUnfriended = $this->friendModel->deleteFriend($_SESSION["user_id"], $_REQUEST["unfriendFriendId"]);
      while(!$friendUnfriended) {
        $friendUnfriended = $this->friendModel->deleteFriend($_SESSION["user_id"], $_REQUEST["unfriendFriendId"]);
      }
      echo "Add Friend";
      return;
    }
  }

  public function decline() {
    if (isset($_REQUEST["declineFriendId"])) {
      $friendDeclined = $this->friendModel->deleteFriend($_SESSION["user_id"], $_REQUEST["declineFriendId"]);
      while(!$friendDeclined) {
        $friendDeclined = $this->friendModel->deleteFriend($_SESSION["user_id"], $_REQUEST["declineFriendId"]);
      }
      echo "Add Friend";
      return;
    }
  }

  public function block() {
    if (isset($_REQUEST["blockFriendId"])) {
      if ($this->friendModel->checkFriendStatus($_SESSION["user_id"], $_REQUEST["blockFriendId"])) { //already friends
        $friendBlocked = $this->friendModel->updateFriend($_SESSION["user_id"], $_REQUEST["blockFriendId"], 4);
        while(!$friendBlocked) {
          $friendBlocked = $this->friendModel->updateFriend($_SESSION["user_id"], $_REQUEST["blockFriendId"], 4);
        }
      } else { //strangers
        $friendBlocked = $this->friendModel->blockStranger($_SESSION["user_id"], $_REQUEST["blockFriendId"]);
        while(!$friendBlocked) {
          $friendBlocked = $this->friendModel->blockStranger($_SESSION["user_id"], $_REQUEST["blockFriendId"]);
        }
      }
      echo "Unblock";
      return;
    }
  }

  public function unblock() {
    if (isset($_REQUEST["unblockFriendId"])) {
      $wasFriend = $this->friendModel->wasFriend($_SESSION["user_id"], $_REQUEST["unblockFriendId"]);
      if ($wasFriend == 0) {
        $friendUnblocked = $this->friendModel->deleteFriend($_SESSION["user_id"], $_REQUEST["unblockFriendId"]);
        echo "Add Friend";
      } elseif($wasFriend == 1) {
        // NOTICE session user is second parameter to switch back to original
        $friendUnblocked = $this->friendModel->updateFriend($_REQUEST["unblockFriendId"], $_SESSION["user_id"], 1);
        while (!$friendUnblocked) {
          $friendUnblocked = $this->friendModel->updateFriend($_REQUEST["unblockFriendId"], $_SESSION["user_id"], 1);
        }
        echo "Accept";
      } elseif($wasFriend == 2) {
        // NOTICE session user is second parameter to switch back to original
        $friendUnblocked = $this->friendModel->updateFriend($_REQUEST["unblockFriendId"], $_SESSION["user_id"], 2);
        while (!$friendUnblocked) {
          $friendUnblocked = $this->friendModel->updateFriend($_REQUEST["unblockFriendId"], $_SESSION["user_id"], 2);
        }
        echo "Friends";
      }
      return;
    }
  }

  public function realtimeStatus() {
    if (isset($_REQUEST["oldFriendStatus"]) && isset($_REQUEST["viewFriendId"]) &&
    isset($_REQUEST["timestamp"])) {
      $loopCounter = 0;
      $timeSpentPolling = 10; // 10-11 seconds
      $oldStatus = $_REQUEST["oldFriendStatus"];
      $friendId = $_REQUEST["viewFriendId"];
      $oldTimestamp = $_REQUEST["timestamp"];
      $newStatus = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $friendId);

      if (!$newStatus) {
        if ($oldStatus == "Add Friend") {
          while (!$newStatus) {
            sleep(1);
            $newStatus = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $friendId);
            $loopCounter++;
            if ($loopCounter > $timeSpentPolling) {
              $data = [ //old
                "newStatus" => $oldStatus,
                "newTimestamp" => $oldTimestamp
              ];
              echo json_encode($data);
              return;
            }
          }
          $newTimestamp = $this->friendModel->getDateUpdated($_SESSION["user_id"], $friendId)->date_updated;
 
          $data = [
            "newStatus" => $newStatus,
            "newTimestamp" => $newTimestamp
          ];
          echo json_encode($data);
          return;
        } else {
          $data = [
            "newStatus" => "Add Friend",
            "newTimestamp" => "0000-00-00 00:00:00"
          ];
        echo json_encode($data);
        return;
        }
      } else {
        $newTimestamp = $this->friendModel->getDateUpdated($_SESSION["user_id"], $friendId)->date_updated;
          while ($newTimestamp <= $oldTimestamp) {
            sleep(1);
            if ($this->friendModel->getDateUpdated($_SESSION["user_id"], $friendId)) {
              $newTimestamp = $this->friendModel->getDateUpdated($_SESSION["user_id"], $friendId)->date_updated;
            }
            if (!$this->friendModel->checkFriendStatus($_SESSION["user_id"], $friendId)) { //deleted
              $data = [
                "newStatus" => "Add Friend",
                "newTimestamp" => "0000-00-00 00:00:00"
              ];
              echo json_encode($data);
              return;
            }
            $loopCounter++;
            if ($loopCounter > $timeSpentPolling) {
              $data = [// old
                "newStatus" => $oldStatus,
                "newTimestamp" => $oldTimestamp
              ];
              echo json_encode($data);
              return;
            }
          }

          $newStatus = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $friendId);
          $newTimestamp = $this->friendModel->getDateUpdated($_SESSION["user_id"], $friendId)->date_updated;
          $data = [
            "newStatus" => $newStatus,
            "newTimestamp" => $newTimestamp
          ];
          echo json_encode($data);
          return;
      }

      return;
    }
    return;
  }

}





?>

<?php

class Test {

    public function index() {
    if (isset($_REQUEST["updatefriend"])) {
      //$split = explode("-", $_REQUEST["updatefriend"]);
      $status = $_REQUEST["updatefriend"];
      $viewedUserId = $_REQUEST["viewedUserId"];

      //echo $status;
      echo "CLICK";

      // if ($this->friendModel->checkFriendStatus($_SESSION["user_id"], $viewedUserId)) {
      //
      //   if ($status == "Add Friend") {
      //       $this->friendModel->updateFriend($_SESSION["user_id"], $viewedUserId, 1);
      //   }
      //   return;
      //
      // } else {
      //   if ($status == "Add Friend") {
      //       $this->friendModel->addFriend($_SESSION["user_id"], $viewedUserId);
      //       return;
      //   }
      // }


    }
  }

}


?>

<?php

class Chats extends Controller {

  public function __construct() {
    $this->userModel = $this->model("User");
    $this->chatModel = $this->model("Chat");
  }

  public function index() {
    redirect("chats/user/3");
    //$data = [];
    //$this->view("chat/index");
  }

  public function user($friendId) {
    session_write_close();
    if (isset($_REQUEST["timestamp"])) {
      $timestamp = $_REQUEST["timestamp"];
      $messages = $this->chatModel->getMessages($_SESSION["user_id"], $friendId);
      if ($messages) {
        $updatedTime = $messages[count($messages)-1]->date_sent;

        while ($updatedTime <= $timestamp) {
          sleep(.5);
          $messages = $this->chatModel->getMessages($_SESSION["user_id"], $friendId);
          $updatedTime = $messages[count($messages)-1]->date_sent;
        }
      } else {
        while (!$messages) {
          sleep(.5);
          $messages = $this->chatModel->getMessages($_SESSION["user_id"], $friendId);
        }
      }

      $friend_firstName = $this->userModel->findUserById($friendId)->first_name;
      $my_firstName = $_SESSION["user_first_name"];

      for ($i = 0; $i < count($messages); $i++) {
        $messages[$i]->friend_firstName = $friend_firstName;
        $messages[$i]->my_firstName = $my_firstName;
      }
      // $messages->friend_firstName = $friend_firstName;
      // $messages->my_firstName = $my_firstName;

      echo json_encode($messages);
      return;
    }

    if (isset($_REQUEST["message"])) {
      $receiverId = $friendId;
      $message = $_REQUEST["message"];
      $this->chatModel->sendMessages($_SESSION["user_id"], $receiverId, $message);
      return;
    }



    $data = [
      "id" => $friendId
    ];
    $this->view("chats/chat", $data);
  }

}




?>

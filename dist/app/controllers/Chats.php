<?php

class Chats extends Controller {

  public function __construct() {
    $this->userModel = $this->model("User");
    $this->chatModel = $this->model("Chat");
  }

  public function index() {
    $allMessages = $this->chatModel->getAllMessages($_SESSION["user_id"]);
    
    if ($allMessages) {
      //sorting messages into conversations
      $allMessages = $this->sortToConvo($allMessages);
      
      //convoView Module
      $convoIndex = 0; //default
      if (isset($_SESSION["showConvo"])) { //different convo set
        $friendId = $_SESSION["showConvo"];
        foreach($allMessages as $key => $value) {
          if ($friendId == $value[0]->sender_id) {
            $convoIndex = $key;
          } elseif ($friendId == $value[0]->receiver_id) {
            $convoIndex = $key;
          }
        }
      }
      // FRIEND DETAILS
      $friendDetails = new stdClass();
      // id
      if ($allMessages[$convoIndex][0]->sender_id != $_SESSION["user_id"]) {
        $friendDetails->id = $allMessages[$convoIndex][0]->sender_id;
      } elseif ($allMessages[$convoIndex][0]->receiver_id != $_SESSION["user_id"]) {
        $friendDetails->id = $allMessages[$convoIndex][0]->receiver_id;
      }
      $userInfo = $this->userModel->findUserInfoById($friendDetails->id);
      $nameOfFriend = explode(" ", $this->userModel->nameOfUser($friendDetails->id));
      // name
      $friendDetails->first_name = $nameOfFriend[0];
      $friendDetails->last_name = $nameOfFriend[1];
      // img_src
      $friendDetails->img_src = getProfileImgSrc($friendDetails->id, $userInfo->profile_img, $userInfo->profile_img_id);
      // MESSAGES
      $messages = $allMessages[$convoIndex];

      $convoView = [$friendDetails, $messages];

      //convoList Module
      $convoList = [];
      foreach ($allMessages as $key => $value) {
        $newList = new stdClass();
        //friend id
        if ($value[0]->sender_id != $_SESSION["user_id"]) {
          $newList->id = $value[0]->sender_id;
        } elseif ($value[0]->receiver_id != $_SESSION["user_id"]) {
          $newList->id = $value[0]->receiver_id;
        }
        //friend name
        $newList->name = $this->userModel->nameOfUser($newList->id);
        //img_src
        $userInfo = $this->userModel->findUserInfoById($newList->id);
        $newList->img_src = getProfileImgSrc($newList->id, $userInfo->profile_img, $userInfo->profile_img_id);
        //last messsage in convo
        $tempMessage = $value[count($value) - 1]->message;
        $displayLength = 25;
        if (strlen($tempMessage) > $displayLength) {
          $tempMessage = substr($tempMessage, 0, $displayLength) . "...";
        }
        $newList->last_message = $tempMessage;
        //date of last message
        $newList->last_date = $value[count($value) - 1]->date_sent;

        $convoList[] = $newList;
      }


      echo "<pre>";
      print_r($convoList);
      echo "</pre>";

    }
    //redirect("chats/user/3");
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


  function sortToConvo($allMessages) {
    $currentUserId = $_SESSION["user_id"];
    $friendIds = [];
    $conversations = [];
    foreach($allMessages as $value) {
      if ($value->sender_id != $currentUserId) {
        $found = array_search($value->sender_id, $friendIds);
        if ($found === false) { //create new index if convo doesn't exists
          $friendIds[] = $value->sender_id;
          $conversations[][] = $value;
        } else {
          $conversations[$found][] = $value;
        }
      } elseif ($value->receiver_id != $currentUserId) {
        $found = array_search($value->receiver_id, $friendIds);
        if ($found === false) { //create new index if convo doesn't exists
          $friendIds[] = $value->receiver_id;
          $conversations[][] = $value;
        } else {
          $conversations[$found][] = $value;
        }
      }
    }
    //sort messages in conversation according to date_sent - old to new
    foreach($conversations as $key => $value) {
      usort($conversations[$key], "messagesOldToNew");
    }
    //sort conversation according to latest date sent - new to old
    usort($conversations, function($a, $b) {
      $one = $a[count($a) - 1]->date_sent;
      $two = $b[count($b) - 1]->date_sent;
      if ($one == $two) {
        return 0;
      }
      return ($one > $two) ? -1 : 1;
    });

      // echo "<pre>";  
      // print_r($conversations);
      // echo "</pre>";  
    return $conversations;
  }


}



?>

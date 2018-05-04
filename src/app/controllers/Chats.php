<?php

class Chats extends Controller {

  public function __construct() {
    session_write_close();

    if (!isset($_SESSION["user_id"])) {
      redirect("login");
    }

    $this->userModel = $this->model("User");
    $this->friendModel = $this->model("Friend");
    $this->chatModel = $this->model("Chat");
  }

  public function index() {
    $allMessages = $this->chatModel->getAllMessages($_SESSION["user_id"]);
    
    if ($allMessages) {
      // $convoView = [$friendDetails, $messages];
      $convoList = $this->getConvoList($allMessages); 
      $convoView = $this->getConvoView($allMessages);
      

      // echo "<pre>";
      // print_r($convoList);
      // echo "</pre>";
      
      $data = [
        "convoView" => $convoView,
        "convoList" => $convoList
      ];
      $this->view("chats/chat", $data);
    } else {
      $data = [
        "convoView" => [],
        "convoList" => []
      ];
      $this->view("chats/chat", $data);
    }
    //redirect("chats/user/3");
    //$data = [];
    // $this->view("chats/chat");
  }

  public function getConversation() {
    if (isset($_REQUEST["convoId"])) {
      $allMessages = $this->chatModel->getAllMessages($_SESSION["user_id"]);
      if ($allMessages) {
        $convoId = $_REQUEST["convoId"];
        $convoView = $this->getConvoView($allMessages, $convoId);
        echo json_encode($convoView);
        return;
      } else {
        $convoId = $_REQUEST["convoId"];
        $convoView = $this->getConvoView($allMessages, $convoId);
        echo json_encode($convoView);
        return;
      }
    }
  }

  public function sendMessage() {
    if (isset($_REQUEST["sender_id"]) && isset($_REQUEST["receiver_id"]) && 
    isset($_REQUEST["message"])) {
      $messageSent = $this->chatModel->sendMessages($_REQUEST["sender_id"], $_REQUEST["receiver_id"], $_REQUEST["message"]);
      while(!$messageSent) {
        $messageSent = $this->chatModel->sendMessages($_REQUEST["sender_id"], $_REQUEST["receiver_id"], $_REQUEST["message"]);
      }
      echo "GOod";
      return;
    }
  }

  public function searchFriend() {
    if (isset($_REQUEST["friendName"])) {
      $tempFriendList = $this->friendModel->friendListOfUser($_SESSION["user_id"]);
      $friendList = [];
      foreach($tempFriendList as $value) {
        if ($value->user_one == $_SESSION["user_id"]) {
          $friendId = $value->user_two;
        } else {
          $friendId = $value->user_one;
        }
        $tempUserInfo = $this->userModel->findUserInfoById($friendId);
        $tempImgSrc = getProfileImgSrc($friendId, $tempUserInfo->profile_img, $tempUserInfo->profile_img_id);
        $tempUserName = $this->userModel->nameOfUser($friendId);
        $friendInfo = [
          "id" => $friendId,
          "name" => $tempUserName,
          "img_src" => $tempImgSrc
        ];
        $friendList[] = $friendInfo;
      }
      
      $searchedTerm = $_REQUEST["friendName"];
      if ($searchedTerm != "") {
        $filtered = [];
        for ($i = 0; $i < count($friendList); $i++) {
          if (strpos(strtolower($friendList[$i]["name"]), $searchedTerm) !== false) {
            if (!in_array($friendList[$i], $filtered)) {
              $filtered[] = $friendList[$i];
            }
          }
        }
        echo json_encode($filtered);
        return;
      } else {
        echo json_encode($friendList);
        return;
      }
    }
  }

  public function realTimeChatEvents() {

    if (isset($_REQUEST["convoList"]) && isset($_REQUEST["convoView"])) {
      $convoView = json_decode($_REQUEST["convoView"]);
      $convoList = json_decode($_REQUEST["convoList"]);

      $endloop = 0;
      $pollTime = 0;
      do {
        //convoView
        $allNewMessages = $this->chatModel->getAllMessages($_SESSION["user_id"]);
        //$newConvoView = $this->getConvoView($allNewMessages, $convoView[0]->id);
        $newConvoList = $this->getConvoList($allNewMessages);

        if ($newConvoList) {
          if (count($newConvoList) == count($convoList)) {
            foreach ($newConvoList as $key => $value) {
              $data = [];
              // New message
              if ($value->messageCount != $convoList[$key]->messageCount) {
                $data[] = "New Message";
                //list
                $data[1][] = $value;
                //view
                $newTotal = $value->messageCount - $convoList[$key]->messageCount;
                $newConvoView = $this->getConvoView($allNewMessages, $value->id);
                $temp = [];
                for($i = $newTotal; $i > 0; $i--) {
                  $temp[] = $newConvoView[1][count($newConvoView[1]) - $i];
                }
                $data[1][] = $temp;
                echo json_encode($data);
                return;
              }
              // New Status
              if ($value->status != $convoList[$key]->status) {
                $data[] = "New Status";
                $data[] = $value->id;
                if ($value->status == "1") {
                  $data[] = "Online";
                } else {
                  $data[] = "Offline";
                }
                echo json_encode($data);
                return;
              }
              // chat disabled
              if ($value->chat_disabled != $convoList[$key]->chat_disabled) {
                $data[] = "Chat Disabled";
                $data[] = $value;
                echo json_encode($data);
                return;
              }
            }
          } elseif (count($newConvoList) > count($convoList)) { //new conversation
            $data = [];
            $data[] = "New Conversation";
            //list
            $data[1][] = $newConvoList[0];
            //view
            $newTotal = $newConvoList[0]->messageCount - $newConvoList[0]->messageCount;
            $newConvoView = $this->getConvoView($allNewMessages, $newConvoList[0]->id);
            $temp = [];
            //for($i = $newTotal; $i > 0; $i--) {
              // $temp[] = $newConvoView[1][count($newConvoView[1]) - $i];
              $temp[] = $newConvoView[1][0];
            //}
            $data[1][] = $temp;
            echo json_encode($data);
            return;
          }

        }

        //end poll
        if ($pollTime > 20) {
          $endloop = 1;
          return;
        }
        $pollTime++;
        sleep(1);
      } while ($endloop != 1);
      return;

    }
  }

  function getConvoView($allMessages, $convoId = 0) {
    //sorting messages into conversations
    if ($allMessages) {
      $allMessages = $this->sortToConvo($allMessages);
    }

    //convoView Module
    if ($convoId) {
      if ($allMessages) {
        foreach ($allMessages as $key => $value) {
          if ($value[0]->sender_id == $convoId) {
            $convoIndex = $key;
          } elseif ($value[0]->receiver_id == $convoId) {
            $convoIndex = $key;
          }
        }
      }
    } else {
      $convoIndex = 0; //default
    }
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
    if (isset($convoIndex)) {
      if ($allMessages[$convoIndex][0]->sender_id != $_SESSION["user_id"]) {
        $friendDetails->id = $allMessages[$convoIndex][0]->sender_id;
      } elseif ($allMessages[$convoIndex][0]->receiver_id != $_SESSION["user_id"]) {
        $friendDetails->id = $allMessages[$convoIndex][0]->receiver_id;
      }
    } else { //if convo doesnt exists
      $friendDetails->id = $convoId;
    }
    $userInfo = $this->userModel->findUserInfoById($friendDetails->id);
    $nameOfFriend = explode(" ", $this->userModel->nameOfUser($friendDetails->id));
    // name
    $friendDetails->first_name = $nameOfFriend[0];
    $friendDetails->last_name = $nameOfFriend[1];
    // friend status online or offline
    $friendDetails->status = $userInfo->status;
    // img_src
    $friendDetails->img_src = getProfileImgSrc($friendDetails->id, $userInfo->profile_img, $userInfo->profile_img_id);
    // MESSAGES
    if (isset($convoIndex)) {
      $messages = $allMessages[$convoIndex];
      // change date of messages to am pm
      foreach($messages as $key => $message) {
        $tempDate = new DateTime($message->date_sent);
        $message->date_sent = $tempDate->format("Y-m-d h:i:s A");
      }
    } else { // if convo doesnt exists
      $messages = [];
    }
    // chat disabled
    $friend_status = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $friendDetails->id);
    if ($friend_status == "Pending" || $friend_status == "Add Friend" || $friend_status == "Unblock" || 
    $friend_status == "Accept" || $friend_status == "No Access" || !$friend_status) {
      $friendDetails->chat_disabled = 1;
      if ($friend_status == "Add Friend" || !$friend_status) {
        $friendDetails->chat_reason = "You are not friends with ".$friendDetails->first_name.".";
      } elseif ($friend_status == "Pending") {
        $friendDetails->chat_reason = "Wait for ".$friendDetails->first_name." to accept your friend request.";
      } elseif ($friend_status == "Accept") {
        $friendDetails->chat_reason = "Accept ".$friendDetails->first_name."'s friend request first.";
      } elseif ($friend_status == "Unblock") {
        $friendDetails->chat_reason = "You blocked ".$friendDetails->first_name.".";
      } elseif ($friend_status == "No Access") {
        $friendDetails->chat_reason = "You have been blocked by ".$friendDetails->first_name.".";
      }
    } else {
      $friendDetails->chat_disabled = 0;
    }
    return [$friendDetails, $messages];
  }

  function getConvoList($allMessages) {
    $convoList = [];
    $allMessages = $this->sortToConvo($allMessages);
    foreach ($allMessages as $key => $value) {
      $newList = new stdClass();
      //friend id
      if ($value[0]->sender_id != $_SESSION["user_id"]) {
        $newList->id = $value[0]->sender_id;
      } elseif ($value[0]->receiver_id != $_SESSION["user_id"]) {
        $newList->id = $value[0]->receiver_id;
      }

      $userInfo = $this->userModel->findUserInfoById($newList->id);
      //friend status online offline
      $newList->status = $userInfo->status;
      // chat disabled
      $nameOfFriend = explode(" ", $this->userModel->nameOfUser($newList->id))[0];
      $friend_status = $this->friendModel->checkFriendStatus($_SESSION["user_id"], $newList->id);
      if ($friend_status == "Pending" || $friend_status == "Add Friend" || $friend_status == "Unblock" || 
      $friend_status == "Accept" || $friend_status == "No Access" || !$friend_status) {
        $newList->chat_disabled = 1;
        if ($friend_status == "Add Friend" || !$friend_status) {
          $newList->chat_reason = "You are not friends with ".$nameOfFriend.".";
        } elseif ($friend_status == "Pending") {
          $newList->chat_reason = "Wait for ".$nameOfFriend." to accept your friend request.";
        } elseif ($friend_status == "Accept") {
          $newList->chat_reason = "Accept ".$nameOfFriend."'s friend request first.";
        } elseif ($friend_status == "Unblock") {
          $newList->chat_reason = "You blocked ".$nameOfFriend.".";
        } elseif ($friend_status == "No Access") {
          $newList->chat_reason = "You have been blocked by ".$nameOfFriend.".";
        }
      } else {
        $newList->chat_disabled = 0;
      }
      //img_src
      $newList->img_src = getProfileImgSrc($newList->id, $userInfo->profile_img, $userInfo->profile_img_id);
      // total message count
      $newList->messageCount = count($value);
      //last messsage in convo
      $tempMessage = $value[count($value) - 1]->message;
      $displayLength = 40; //length of message to be displayed in the convo list 
      if ($value[count($value) - 1]->sender_id == $_SESSION["user_id"]) {
        $tempMessage = "You: " . $tempMessage;
      }
      if (strlen($tempMessage) > $displayLength) {
        if ($value[count($value) - 1]->sender_id == $_SESSION["user_id"]) {
          $newList->last_message = substr($tempMessage, 0, $displayLength - 5) . "...";
        } else {
          $newList->last_message = substr($tempMessage, 0, $displayLength) . "...";
        }
      } else {
        $newList->last_message = $tempMessage;
      }

      //date of last message
      date_default_timezone_set("America/Toronto");
      $tempDate = new DateTime(date($value[count($value) - 1]->date_sent));
      $now = new DateTime(date("Y-m-d H:i:s"));
      $interval = $tempDate->diff($now);
      if ($interval->format("%y") != "0") {
        $newList->last_date = date("Y-m-d", strtotime($value[count($value) - 1]->date_sent));
        $nameLimit = 11;
      } elseif ($interval->format("%m") != "0") {
        $newList->last_date = date("M", strtotime($value[count($value) - 1]->date_sent))." ".date("j", strtotime($value[count($value) - 1]->date_sent));
        $nameLimit = 16;
      } elseif ($interval->format("%d") != "0") {
        if ($interval->format("%d") < "8") {
          // if ($interval->format("%d") == "1") {
          if (date("d", strtotime($value[count($value) - 1]->date_sent)) == ($now->format("d"))-1) {
          $newList->last_date = "Yesterday";
          $nameLimit = 13;
          } else {
            $newList->last_date = date("D", strtotime($value[count($value) - 1]->date_sent));
            $nameLimit = 18;
          }
        } else {
          $newList->last_date = date("M", strtotime($value[count($value) - 1]->date_sent))." ".date("j", strtotime($value[count($value) - 1]->date_sent));
          $nameLimit = 16;
        }
      } else {
        if (date("d", strtotime($value[count($value) - 1]->date_sent)) != $now->format("d")) {
          $newList->last_date = "Yesterday";
          $nameLimit = 13;
        } else {
          $newList->last_date = date("h:i a", strtotime($value[count($value) - 1]->date_sent));
          $nameLimit = 13;
        }
      }

      date_default_timezone_set("UTC");

      //friend name
      $tempName = $this->userModel->nameOfUser($newList->id);
      if (strlen($tempName) > $nameLimit) {
        $newList->name = substr($tempName, 0, $nameLimit) . "...";
      } else {
        $newList->name = $tempName;
      }

      //sender id
      // $newList->sender_id = $value[count($value) - 1]->sender_id;

      $convoList[] = $newList;
    }
    return $convoList;
  }

  function sortToConvo($allMessages) {
    $currentUserId = $_SESSION["user_id"];
    $friendIds = [];
    $conversations = [];
    if ($allMessages) {
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
    }
      // echo "<pre>";  
      // print_r($conversations);
      // echo "</pre>";  
    return $conversations;
  }


}



?>

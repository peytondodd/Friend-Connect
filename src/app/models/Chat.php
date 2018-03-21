<?php

class Chat {

  public function __construct() {
    $this->db = new Database;
  }

  public function getMessages($currentUserId, $friendId) {
    $this->db->query("SELECT * FROM chat WHERE
                    (sender_id = :user_one AND receiver_id = :user_two) OR
                    (sender_id = :user_two AND receiver_id = :user_one)");
    $this->db->bind(":user_one", $currentUserId);
    $this->db->bind(":user_two", $friendId);

    $row = $this->db->resultSet();

    if ($this->db->rowCount() > 0) {
      return $row;
    } else {
      return false;
    }
  }

  public function sendMessages($senderId, $receiverId, $message) {
    $this->db->query("INSERT INTO chat (sender_id, receiver_id, message)
                      VALUES (:sender_id, :receiver_id, :message)");
    $this->db->bind(":sender_id", $senderId);
    $this->db->bind(":receiver_id", $receiverId);
    $this->db->bind(":message", $message);
    if ($this->db->execute()) {
      return true;
    } else {
      return false;
    }
  }



}



?>

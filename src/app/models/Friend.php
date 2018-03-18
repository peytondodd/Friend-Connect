<?php

/*
  In the friends database, there are 5 columns:
  id, user_one, user_two, friend_status, created_at.

  id - the primary key, index of friendship, USELESS
  user_one - holds the id of first user
  user_two - holds the id of second user
  friend_status - holds friend status,
                  1 = pending request
                  2 = accepted
                  3 = declined
                  4 = blocked

  * user_one and user_two, id's switch frequently depending on the activity.
  user_one becomes the initiator
  eg.
  - if user id 20 sends a request to user id 25,
    user_one = 20, user_two = 25, friend_Status = 1

  - if user id 25 acceps the request, then
    user_one = 25, user_two = 20, friend_status = 2

  - if user id 20 decides to block user id 25, then
    user_one = 20, user_two = 25, friend_Status = 4

  * the person who commited the last action becomes user_one

*/

class Friend {

  public function __construct() {
    $this->db = new Database;
  }

  // FRIEND LIST OF A USER
  public function friendListOfUser($id) {
    $this->db->query("SELECT * FROM friends WHERE
                    (user_one = :id OR user_two = :id) AND
                    friend_status = 2");
    $this->db->bind(":id", $id);

    $rows = $this->db->resultSet();

    // check row
    if ($this->db->rowCount() > 0) {
      return $row;
    } else {
      return false;
    }
  }

  // FRIEND REQUESTS OF USER (of user id logged in)
  public function friendRequests($id) {
    $this->db->query("SELECT * FROM friends WHERE user_two = :id And friend_status = 1");
    $this->db->bind(":id", $id);

    $rows = $this->db->resultSet();

    // check row
    if ($this->db->rowCount() > 0) {
      return $row;
    } else {
      return false;
    }

  }

  // FRIEND STATUS OF VIEWED USER and CURRENT USER
  public function friendStatus($currentUserId, $viewedUserId) {
    $this->db->query("SELECT * FROM friends WHERE
                    (user_one = :user_one AND user_two = :user_two) OR
                    (user_one = :user_two OR user_two = :user_one)");
    $this->db->bind(":user_one", $currentUserId);
    $this->db->bind(":user_two", $viewedUserId);
    $row = $this->db->single();

    if ($this->db->rowCount() == 0) {
      return false;
    } else {
      if ($row->user_one == $curentUserId) {
        $status = [
          "initiator" => $currentUserId,
          "friend_status" => $row->friend_status
        ];
        return $status;
      } else if ($row->user_two == $currentUserID) {
        $status = [
          "initiator" => $viewedUserId,
          "friend_status" => $row->friend_status
        ];
        return $status;
      }
    }

  }

  // ADD A FRIEND
  public function addFriend($currentUserId, $viewedUserId) {
    $this->db->query("INSERT INTO friends (user_one, user_two, friend_status)
                    VALUES (:user_one, :user_two, :friend_status)");
    $this->db->bind(":user_one", $currentUserId);
    $this->db->bind(":user_two", $viewedUserId);
    $this->db->bind(":friend_status", 1);
    if ($this->db->execute()) {
        return true;
      } else {
        return false;
      }
  }

  // ACCEPT, DECLINE, AND BLOCK A FRIEND
  public function updateFriend($currentUserId, $viewedUserId, $action) {
    $this->db->query("UPDATE friends SET
                      user_one = :user_one,
                      user_two = :user_two,
                      friend_status = :friend_status");
    $this->db->bind(":user_one", $currentUserId);
    $this->db->bind(":user_two", $viewedUserId);
    $this->db->bind(":friend_status", $action);
    if ($this->db->execute()) {
      return true;
    } else {
      return false;
    }

  }

  // DELETE A FRIEND
  public function deleteFriend($currentUserId, $viewedUserId) {
    $this->db->query("DELETE FROM friends WHERE
                      (user_one = :user_one AND user_two = :user_two) OR
                      (user_one = :user_two AND user_two = :user_one)");
    $this->db->bind(":user_one", $currentUserId);
    $this->db->bind(":user_two", $viewedUserId);
    if ($this->db->execute()) {
      return true;
    } else {
      return false;
    }
  }



}

?>

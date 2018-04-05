<?php

class Post {

public function __construct() {
  $this->db = new Database;
}

//create post
public function createPost($userId, $content) {
  $this->db->query("INSERT INTO posts (user_id, content)
                    VALUES (:user_id, :content)");
  $this->db->bind(":user_id", $userId);
  $this->db->bind(":content", $content);

  if ($this->db->execute()) {
      return true;
  } else {
    return false;
  }
}

//get posts of user
public function getPost($userId) {
  $this->db->query("SELECT * FROM posts
                    WHERE user_id = :user_id");
  $this->db->bind(":user_id", $userId);
  $row = $this->db->resultSet();

  if ($this->db->rowCount() > 0) {
    return $row;
  } else {
    return false;
  }
}








}


?>

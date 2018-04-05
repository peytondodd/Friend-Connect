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









}


?>

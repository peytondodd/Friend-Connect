<?php

class Post {

  public function __construct() {
    $this->db = new Database;
  }

  //create post
  public function createPost($userId, $photo, $content) {
    $this->db->query("INSERT INTO posts (user_id, content, photo)
                      VALUES (:user_id, :content, :photo)");
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":content", $content);
    $this->db->bind(":photo", $photo);

    if ($this->db->execute()) {
        return true;
    } else {
      return false;
    }
  }

  //edit post
  public function updatePost($userId, $postId, $content) {
    $this->db->query("UPDATE posts SET
                      content = :content WHERE
                      id = :id AND
                      user_id = :user_id");
    $this->db->bind(":id", $postId);
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":content", $content);

    if ($this->db->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //delete post
  public function deletePost($userId, $postId) {
    $this->db->query("DELETE FROM posts WHERE
                      id = :id AND user_id = :user_id");
    $this->db->bind(":id", $postId);
    $this->db->bind(":user_id", $userId);

    if ($this->db->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //get posts of user
  public function getAllUserPost($userId) {
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

  //find postId
  public function getPostId($userId, $photo, $content) {
    $this->db->query("SELECT id FROM posts WHERE
                      user_id = :user_id AND
                      photo = :photo AND
                      content = :content");
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":photo", $photo);
    $this->db->bind(":content", $content);

    return $this->db->single();
  }

  //get one post
  public function getOnePost($postId) {
    $this->db->query("SELECT * FROM posts
                      WHERE id = :id");
    $this->db->bind(":id", $postId);
    $row = $this->db->single();

    return $row;
  }

  //insert photo
  public function postPhoto($postId, $photoName) {
    $this->db->query("INSERT INTO photos
                      (post_id, photo_name)
                      VALUES (:post_id, :photo_name)");
    $this->db->bind(":post_id", $postId);
    $this->db->bind(":photo_name", $photoName);

    if ($this->db->execute()) {
        return true;
    } else {
      return false;
    }
  }

  //get Photo name
  public function getPhoto($postId) {
    $this->db->query("SELECT photo_name FROM photos WHERE
                      post_id = :postId");
    $this->db->bind(":postId", $postId);
    $row = $this->db->single();

    if ($row) {
      return $row;
    } else {
      return false;
    }
  }

  public function likePost($userId, $postId) {
    // CHECK IF like already exists first
    $like = $this->getLikes($postId);
    if ($like) {
      foreach ($like as $value) {
        if ($value->user_id == $userId && $value->post_id == $postId) {
          return true;
        }
      }
    }
    $this->db->query("INSERT INTO likes (user_id, post_id, status)
                      VALUES (:user_id, :post_id, :status)");
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":post_id", $postId);
    $this->db->bind(":status", 1);

    if ($this->db->execute()) {
        return true;
    } else {
      return false;
    }
  }

public function unlikePost($userId, $postId) {
    $this->db->query("DELETE FROM likes WHERE
                      user_id = :user_id AND
                      post_id = :post_id");
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":post_id", $postId);
    if ($this->db->execute()) {
      //return "user =".$userId." post=".$postId;
      return true;
    } else {
      return false;
    }
  }
  public function deleteLike($userId, $postId) {
    $this->db->query("DELETE FROM likes WHERE
                      user_id = :user_id AND
                      post_id = :post_id");
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":post_id", $postId);
    if ($this->db->execute()) {
      return "user =".$userId." post=".$postId;
      //return true;
    } else {
      return false;
    }
  }

  public function getLikes($postId) {
    $this->db->query("SELECT * FROM likes WHERE post_id = :post_id");
    $this->db->bind(":post_id", $postId);
    $row = $this->db->resultSet();

    if ($this->db->rowCount() > 0) {
      return $row;
    } else {
      return false;
    }
  }

  public function currentUserLike($userId, $postId) {
    $this->db->query("SELECT * FROM likes WHERE
                      user_id = :user_id AND
                      post_id = :post_id");
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":post_id", $postId);
    $row = $this->db->single();
    return $row;
  }

  public function addComment($userId, $postId, $content) {
    $this->db->query("INSERT INTO comments
                    (user_id, post_id, content)
                    VALUES (:user_id, :post_id, :content)");
    $this->db->bind(":user_id", $userId);
    $this->db->bind(":post_id", $postId);
    $this->db->bind(":content", $content);
    if ($this->db->execute()) {
        return true;
    } else {
      return false;
    }
  }

  public function deleteComment($userId, $commentId) {
    $this->db->query("DELETE FROM comments WHERE
                      id = :id AND user_id = :user_id");
    $this->db->bind(":id", $commentId);
    $this->db->bind(":user_id", $userId);

    if ($this->db->execute()) {
        return true;
    } else {
      return false;
    }
  }

  public function getComments($postId) {
    $this->db->query("SELECT * FROM comments WHERE
                      post_id = :post_id");
    $this->db->bind(":post_id", $postId);
    $row = $this->db->resultSet();

    if ($this->db->rowCount() > 0) {
      return $row;
    } else {
      return false;
    }
  }

}
?>

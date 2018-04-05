<?php

class Posts extends Controller {
  public function __construct() {
    $this->postModel = $this->model("Post");
  }

  public function index() {

  }

  public function create() {
    session_write_close();
    if (isset($_REQUEST["createPostContent"])) {
      //echo $_REQUEST["post-content-create"];
      $content = $_REQUEST["createPostContent"];
      if (strlen($content) <= 2000) {
        $this->postModel->createPost($_SESSION["user_id"], $content);
        return;
      } else {
        // echo "bad";
        // return false;
      }

    }
  }

  public function get() {
    session_write_close();
    if (isset($_REQUEST["profilePost"])) {
      $id = $_REQUEST["profilePost"];
      $postCount = $_REQUEST["postCount"];
      $newPostCount = 0;
      $pollCounter = 0;
      do {
        $userPosts = $this->postModel->getPost($id);
        $newPostCount = count($userPosts);
        usleep(500000); //.5 seconds
        $pollCounter++;
        if ($pollCounter > 80) { //40 sec
          echo "refresh poll";
          return;
        }
      } while ($newPostCount <= $postCount);

      echo json_encode($userPosts);
      return;
    }

    //$userPosts = $this->postModel->getPost($id);
  }

  public function edit() {

  }

  public function delete() {

  }



}





?>

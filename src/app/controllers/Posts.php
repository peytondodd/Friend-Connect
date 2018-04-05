<?php

class Posts extends Controller {
  public function __construct() {
    $this->postModel = $this->model("Post");
  }

  public function index() {

  }

  public function create() {
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

  public function edit() {

  }

  public function delete() {

  }



}





?>

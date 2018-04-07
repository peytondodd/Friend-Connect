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
        $userPosts = $this->postModel->getAllUserPost($id);
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

  public function likeOrDislike() {
    session_write_close();
    if (isset($_REQUEST["likePostId"]) && isset($_REQUEST["likeDislike"])) {
      $userId = $_SESSION["user_id"];
      $postId = $_REQUEST["likePostId"];
      $action = $_REQUEST["likeDislike"];

      if ($action == "Like") {
        $this->postModel->likePost($userId, $postId);
        return;
      } elseif ($action == "Dislike") {
        $this->postModel->unlikePost($userId, $postId);
        return;
      }
      return;
    }
  }

  //real time events
  public function realTimeEvents() {
    session_write_close();

    //Profile Post Updater INIT
    if (isset($_REQUEST["profilePost"])) {
      $profileId = $_REQUEST["profilePost"];
      $profilePostCount = $_REQUEST["profilePostCount"];
      $newProfilePostCount = 0;
    }
    //Like or Dislike Updater INIT
    if (isset($_REQUEST["likeCount"])) {
      $likeCount = json_decode($_REQUEST["likeCount"]);
    }

    //LOOPER
    $pollCounter = 0;
    $endloop = 0;
    do {
      //Profile Post Updater
      if (isset($_REQUEST["profilePost"])) {
        $userPosts = $this->postModel->getAllUserPost($profileId);
        $newProfilePostCount = count($userPosts);
        if ($newProfilePostCount > $profilePostCount) {
          $data[] = "New Post";
          $data[] = $userPosts;
          echo json_encode($data);
          return;
          $endloop = 1;
        }
      }

      //Like or Dislike Updater
      if (isset($_REQUEST["likeCount"])) {
        forEach($likeCount as $value) {
          $newCount = $this->postModel->getLikes($value->postId);
          if ($newCount) { //if likes exists
            $totalLikes = 0;
            for ($i = 0; $i < count($newCount); $i++) {
              if ($newCount[$i]->status == 1) {
                $totalLikes++;
              } elseif ($newCount[$i]->status == 0) { //Delete
                $data[] = "New Like";
                $data[] = $value->postId;
                $data[] = 0;
                if (count($newCount) == 1) {
                  echo json_encode($data);
                }
                $this->postModel->deleteLike($_SESSION["user_id"], $value->postId);
                return;
              }
            }
            if ($totalLikes != $value->likeCount) { //Like
              $data[] = "New Like";
              $data[] = $value->postId;
              $data[] = $totalLikes;
              echo json_encode($data);
              return;
              $endloop = 1;
            }
          }
        }
      }

      //Poll counter - refresh every 40 seconds
      usleep(500000); //.5 seconds
      $pollCounter++;
      //if ($pollCounter > 80) { //40 sec
      if ($pollCounter > 20) { //40 sec
        echo "refresh poll";
        return;
      }
    } while ($endloop != 1);

  }




}





?>

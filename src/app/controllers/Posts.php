<?php

class Posts extends Controller {
  public function __construct() {
    $this->postModel = $this->model("Post");
    $this->userModel = $this->model("User");
  }

  public function index() {

  }

  public function createPost() {
    session_write_close();
    if (isset($_REQUEST["createPostContent"])) {
      //echo $_REQUEST["post-content-create"];
      $content = $_REQUEST["createPostContent"];
      if (strlen($content) <= 2000) {
        $this->postModel->createPost($_REQUEST["currentUserId"], $content);
        return;
      } else {
        // echo "bad";
        // return false;
      }

    }
  }

  public function get() {
    // session_write_close();
    // if (isset($_REQUEST["profilePost"])) {
    //   $id = $_REQUEST["profilePost"];
    //   $postCount = $_REQUEST["postCount"];
    //   $newPostCount = 0;
    //   $pollCounter = 0;
    //   do {
    //     $userPosts = $this->postModel->getAllUserPost($id);
    //     $newPostCount = count($userPosts);
    //     usleep(500000); //.5 seconds
    //     $pollCounter++;
    //     if ($pollCounter > 80) { //40 sec
    //       echo "refresh poll";
    //       return;
    //     }
    //   } while ($newPostCount <= $postCount);
    //
    //   echo json_encode($userPosts);
    //   return;
    // }

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
        $isSuccess = $this->postModel->currentUserLike($userId, $postId);
        while(!$isSuccess) {
          $isSuccess = $this->postModel->currentUserLike($userId, $postId);
        }
        echo "Dislike";
        return;
      } elseif ($action == "Dislike") {
        $this->postModel->unlikePost($userId, $postId);
        $isSuccess = $this->postModel->currentUserLike($userId, $postId);
        while($isSuccess) {
          $isSuccess = $this->postModel->currentUserLike($userId, $postId);
        }
        echo "Like";
        return;
      }
      //return;
    }
  }

  public function createComment() {
    session_write_close();
    if (isset($_REQUEST["commentUserId"]) && isset($_REQUEST["commentPostId"]) &&
    isset($_REQUEST["commentContent"])) {
      $userId = $_REQUEST["commentUserId"];
      $postId= $_REQUEST["commentPostId"];
      $content = $_REQUEST["commentContent"];

      $this->postModel->addComment($userId, $postId, $content);
      return;
    }
    return;
  }

  public function deleteComment() {
    if (isset($_REQUEST["deleteCommentUserId"]) &&
    isset($_REQUEST["deleteCommentCommentId"])) {
      $userId = $_REQUEST["deleteCommentUserId"];
      $commentId = $_REQUEST["deleteCommentCommentId"];
      echo "user ". $userId ." comment ".$commentId;

      $deleteComment = $this->postModel->deleteComment($userId, $commentId);

      while($deleteComment != true) {
        $deleteComment = $this->postModel->deleteComment($userId, $commentId);
      }

      return;
    }
  }

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
      $currentUserId = $_REQUEST["currentUserId"];
      $likeCount = json_decode($_REQUEST["likeCount"]);
    }

    //currentComments INIT
    if (isset($_REQUEST["currentComments"])) {
      $currentCommentsCount = json_decode($_REQUEST["currentComments"]);
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
            $totalLikes = count($newCount);
          } else {
            $totalLikes = 0;
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

      //currentComments update
      if (isset($_REQUEST["currentComments"])) {
        forEach($currentCommentsCount as $value) {
          $newComments = $this->postModel->getComments($value->postId);

          if ($newComments) {
            $newCommentsCount = count($newComments);
          } else {
            $newCommentsCount = 0;
          }

          if ($newCommentsCount != $value->commentsCount) {

            if ($newCommentsCount > $value->commentsCount) {
              //sort the latest comment to the top
              usort($newComments, "dateCompare");//dateCompare from sort_helper.php

              $numberOfNewComments = $newCommentsCount - $value->commentsCount;
              $totalNewComments = [];
              //filters the new comment
              for ($i = 0; $i < $numberOfNewComments; $i++) {
                $userInfo = $this->userModel->findUserInfoById($newComments[$i]->user_id);
                $userName = $this->userModel->findUserById($newComments[$i]->user_id);
                $newComments[$i]->img_src = getProfileImgSrc(
                                        $newComments[$i]->user_id,
                                        $userInfo->profile_img,
                                        $userInfo->profile_img_id);
                $newComments[$i]->name = ucwords($userName->first_name." ".$userName->last_name);
                $totalNewComments[] = $newComments[$i];
              }
              $data[] = "New Comment";
              $data[] = $totalNewComments;
              echo json_encode($data);

              return;

            } elseif ($newCommentsCount < $value->commentsCount) {
              $data[] = "Delete Comment";
              $data[] = $newComments;
              echo json_encode($data);
              return;
            }
            return;
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

<?php

class Posts extends Controller {
  public function __construct() {
    if (!isset($_SESSION["user_id"])) {
      redirect("login");
    }

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
        $this->postModel->createPost($_REQUEST["currentUserId"], 0, $content);
        echo "true";
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

  public function editPost() {
    session_write_close();
    if (isset($_REQUEST["editPostUserId"]) && isset($_REQUEST["editPostId"]) &&
    isset($_REQUEST["editPostContent"])) {
      if ($_SESSION["user_id"] == $_REQUEST["editPostUserId"]) {
        $userId = $_REQUEST["editPostUserId"];
        $postId = $_REQUEST["editPostId"];
        $content = $_REQUEST["editPostContent"];

        $editPost = $this->postModel->updatePost($userId, $postId, $content);
        while(!$editPost) {
          $editPost = $this->postModel->updatePost($userId, $postId, $content);
        }

        return;

      }
    }
  }

  public function deletePost() {
    session_write_close();
    if (isset($_REQUEST["deletePostId"]) && isset($_REQUEST["deletePostUserId"])) {
      if ($_SESSION["user_id"] == $_REQUEST["deletePostUserId"]) {
        $userId = $_REQUEST["deletePostUserId"];
        $postId = $_REQUEST["deletePostId"];

        $deletePost = $this->postModel->deletePost($userId, $postId);
        while(!$deletePost) {
          $deletePost = $this->postModel->deletePost($userId, $postId);
        }
        //echo "asdfsd";
        return;

      }
    }
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

  public function photos() {
    if (isset($_POST["photosUpload-uploadBtn"])) {
      $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
      // echo "<pre>";
      // print_r($_POST);
      // print_r($_FILES);
      // echo "</pre>";
      $userId = $_SESSION["user_id"];
      $content = $_POST["photosUpload-description"];
      $postPhoto = 0;

      //$photoName = uniqid($userId."-", true);

      $fileImage = $_FILES;
      // photo upload
      $postPhoto = $this->img_upload($fileImage);

      // make post
      $makePost = $this->postModel->createPost($userId, $postPhoto[0], $content);
      //createPost now returns id of inserted row ******

      //get post id for photo table
      //$postId = $this->postModel->getPostId($userId, $postPhoto[0], $content)->id;

      //insert to photo table
      if ($postPhoto[0]) {
        $this->postModel->postPhoto($makePost, $postPhoto[1]);
        redirect("/profiles/user/".$userId."?pageAction=photos");
      }

    }
  }

  function img_upload($fileImage) {
    if ($fileImage["post_img_upload"]["name"] !== "" && $fileImage["post_img_upload"]["size"] !== 0) {

      $fileName = $fileImage["post_img_upload"]["name"];
      $fileTmpName = $fileImage["post_img_upload"]["tmp_name"];
      $fileSize = $fileImage["post_img_upload"]["size"];
      $fileError = $fileImage["post_img_upload"]["error"];

      $fileExt = explode(".", $fileName);
      $fileActualExt = strtolower(end($fileExt));

      $allowed = array("jpeg", "jpg", "png", "bmp", "gif");

      if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
          if ($fileSize < 50000000) { // 50mb
            $fileNameNew = uniqid($_SESSION["user_id"]."-", true).".".$fileActualExt;
            // Create image folder if it doesnt exist
            if (file_exists("./user_data")) {
              if (file_exists("./user_data/".$_SESSION["user_id"])) {
                $userFolder = "./user_data/".$_SESSION["user_id"];
              } else {
                mkdir("./user_data/".$_SESSION["user_id"]);
                $userFolder = "./user_data/".$_SESSION["user_id"];
              }
            } else {
              mkdir("./user_data");
              mkdir("./user_data/".$_SESSION["user_id"]);
              $userFolder = "./user_data/".$_SESSION["user_id"];
            }

            $fileDestination = $userFolder. "/" .$fileNameNew;
            if (move_uploaded_file($fileTmpName, $fileDestination)) {
              $res[] = 1;
              $res[] = $fileNameNew;
              return $res;
              //echo "Success";
            } else {
              //echo "upload failed";
              return false;
            }
          } else {
            //echo "file is too big";
            return false;
          }
        } else {
          //echo "there was an error uploading";
          return false;
        }
      } else {
        //echo "Wrong file type";
        return false;
      }
    } else {
      // DO NOTHING
      return false;
    }
  }

  public function realTimeEvents() {
    session_write_close();

    //Profile Post Updater INIT
    if (isset($_REQUEST["postsUserId"])) {
      $postsUserId = json_decode($_REQUEST["postsUserId"]);
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

    //postcontent
    if (isset($_REQUEST["currentPostContent"])) {
      $currentPostContent = json_decode($_REQUEST["currentPostContent"]);
    }

    //LOOPER
    $pollCounter = 0;
    $endloop = 0;
    do {

      //Profile Post Updater
      if (isset($_REQUEST["postsUserId"])) {
        // $profileId - all posts releating to that ID
        $userPosts = [];

        for ($i = 0; $i < count($postsUserId); $i++) {
          //$userPosts = $this->postModel->getAllUserPost($postsUserId);
          $tempPosts = $this->postModel->getAllUserPost($postsUserId[$i]);
          if ($tempPosts) {
            for ($j = 0; $j < count($tempPosts); $j++) {
              $userPosts[] = $tempPosts[$j];
            }
          }
        }
        if ($userPosts) {
          $newProfilePostCount = count($userPosts);
        }
        //only when posts exists, look for post, likes, or comments
        if ($profilePostCount > 0 || $newProfilePostCount > 0) {

          if ($newProfilePostCount > $profilePostCount) {
            foreach($userPosts as $value) {
              // // NAMES
              $postName = $this->userModel->findUserById($value->user_id);
              $value->name = ucwords($postName->first_name." ".$postName->last_name);
              //post profile icon
              $picPost = $this->userModel->findUserInfoById($value->user_id);
              $value->img_src =
              getProfileImgSrc($value->user_id, $picPost->profile_img, $picPost->profile_img_id);
              //PHOTOS 
              if ($value->photo == 1) {
                $photoName = $this->postModel->getPhoto($value->id)->photo_name;
                $value->photoName = $photoName;
              }
              // LIKES
              //gather all like counts per post
              if ($this->postModel->getLikes($value->id)) {
                $value->likeCount = count($this->postModel->getLikes($value->id));
              } else {
                $value->likeCount = 0;
              }
              //Did current user session like the post?
              if ($this->postModel->currentUserLike($_SESSION["user_id"], $value->id)) {
                $value->currentUserLike = true;
              } else {
                $value->currentUserLike = false;
              }
              //COMMENTS
              $value->comments = new stdClass();
              if ($this->postModel->getComments($value->id)) {
                $postComment = $this->postModel->getComments($value->id);
                usort($postComment, "dateCompare"); // make recent comment to the top

                foreach($postComment as $comm) {
                  $commentName = $this->userModel->findUserById($comm->user_id);
                  $comm->name = ucwords($commentName->first_name." ".$commentName->last_name);

                  $picComm= $this->userModel->findUserInfoById($comm->user_id);
                  $comm->img_src =
                  getProfileImgSrc($comm->user_id, $picComm->profile_img, $picComm->profile_img_id);
                }

                $value->comments->count = count($postComment);
                $value->comments->list = $postComment;
              } else {
                $value->comments->count = 0;
                $value->comments->list = 0;
              }
            }

            usort($userPosts, "sortOldToNew");
            $data[] = "New Post";
            $data[] = $userPosts;
            $data[] = $newProfilePostCount - $profilePostCount;
            echo json_encode($data);
            return;
            $endloop = 1;
          } elseif ($newProfilePostCount < $profilePostCount) {
            $data[] = "Delete Post";
            $data[] = $userPosts;
            echo json_encode($data);
            return;
            $endloop = 1;
          }
          //return;


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
            if ($currentCommentsCount) {
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
                    if (!$newComments) {
                      $data[] = $value->postId;
                    }
                    echo json_encode($data);
                    return;
                  }
                  return;
                }
              }
            }
          }

          if (isset($_REQUEST["currentPostContent"])) {
            if ($currentPostContent) {
              foreach($currentPostContent as $value) {
                $newPostContent = $this->postModel->getOnePost($value->postId);
                if ($newPostContent) {
                  if ($value->content != $newPostContent->content) {

                    $data[] = "New Post Content";
                    $data[] = $newPostContent;

                    echo json_encode($data);
                    return;

                  }
                } else {
                  return;
                }
              }

            }
          }

        }
      }

      //Poll counter - refresh every 40 seconds
      usleep(500000); //.5 seconds
      $pollCounter++;
      // if ($pollCounter > 80) { //40 sec
      if ($pollCounter > 20) { //10 sec
        echo "refresh poll";
        return;
      }
    } while ($endloop != 1);

  }




}





?>

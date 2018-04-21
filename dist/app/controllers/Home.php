<?php

  class Home extends Controller{
    public function __construct() {
      $this->userModel = $this->model("User");
      $this->friendModel = $this->model("Friend");
      $this->postModel = $this->model("Post");

      //first time setup
      $userProfileSetup = $this->userModel->findUserInfoById($_SESSION["user_id"])->profile_setup;
      if ($userProfileSetup == 0) {
        redirect("profiles/setup");
      }

    }

    public function index() {
      $userIdList = [];
      //Get Friend ID 
      $friendList = $this->friendModel->friendListOfUser($_SESSION["user_id"]);
      if ($friendList) { //if user has friends
        foreach ($friendList as $value) {
          if ($value->user_one == $_SESSION["user_id"]) {
            $userIdList[] = ["user_id" => $value->user_two];
          } else {
            $userIdList[] = ["user_id" => $value->user_one];
          }
        }
      }
      //add own Id
      $userIdList[] = ["user_id" => $_SESSION["user_id"]];
      //find posts id, user_id, photo, created_at, content
      $listOfPost = [];
      foreach ($userIdList as $value) {
        $userPost = $this->postModel->getAllUserPost($value["user_id"]);
        if ($userPost) {
          foreach($userPost as $subValue) {
            $listOfPost[] = $subValue;
          }
        }
      }
      if ($listOfPost) { // if posts exists
        for ($i = 0; $i < count($listOfPost); $i++) {
          //get name of users
          $listOfPost[$i]->name = $this->userModel->nameOfUser($listOfPost[$i]->user_id);
          // get post profile icon img_src
          $userInfo = $this->userModel->findUserInfoById($listOfPost[$i]->user_id);
          $listOfPost[$i]->img_src = getProfileImgSrc($userInfo->user_id, $userInfo->profile_img, $userInfo->profile_img_id);
          //photoName
          if ($listOfPost[$i]->photo == 1) {
            $listOfPost[$i]->photoName = $this->postModel->getPhoto($listOfPost[$i]->id)->photo_name;
          }
          //likecount
          $likeCount = $this->postModel->getLikes($listOfPost[$i]->id);
          if ($likeCount) {
            $listOfPost[$i]->likeCount = count($likeCount);
          } else {
            $listOfPost[$i]->likeCount = 0;
          }
          //currentUserLike
          if ($this->postModel->currentUserLike($listOfPost[$i]->user_id, $listOfPost[$i]->id)) {
            $listOfPost[$i]->currentUserLike = true;
          } else {
            $listOfPost[$i]->currentUserLike = false;
          }
          //comments
          $listOfPost[$i]->comments = new stdClass();
          $comments = $this->postModel->getComments($listOfPost[$i]->id);
          if ($comments) {
            usort($comments, "dateCompare"); // make recent comment to the top

            foreach($comments as $comm) {
              $comm->name = $this->userModel->nameOfUser($comm->user_id);

              $picComm= $this->userModel->findUserInfoById($comm->user_id);
              $comm->img_src =
              getProfileImgSrc($comm->user_id, $picComm->profile_img, $picComm->profile_img_id);
            }

            $listOfPost[$i]->comments->count = count($comments);
            $listOfPost[$i]->comments->list = $comments;
          } else {
            $listOfPost[$i]->comments->count = 0;
            $listOfPost[$i]->comments->list = 0;
          }
        }
        usort($listOfPost, "dateCompare"); // most recent post to the top
      } else {
        $listOfPost = 0;
      }

      echo "<pre>";
      print_r($listOfPost);
      echo "</pre>";

      // POST REQUIRES
      /*
        - id
        - user_id
        - photo
        - photoName
        - name
        - img_src
        - likeCount
        - currentUserLike
        - created_at
        - content
        comments -> count , list: id, user_id, post_id, created_at, name, img_src, content
      */

      $data = [

      ];

      $this->view("home/home");
    }
  }

?>

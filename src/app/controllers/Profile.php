<?php

  class Profile extends Controller {
    public function __construct() {
      $this->userModel = $this->model("user");
    }

    public function index() {

      $data = [];
      $this->view("profile/profile", $data);

    }

    public function user($id) {
      if ($this->userModel->findUserById($id)) {
        $user = $this->userModel->findUserById($id);
        $data = [
          "first_name" => $user->first_name
        ];
        $this->view("profile/profile", $data);
      } else {
        echo "user not found";
      }

    }
  }

?>

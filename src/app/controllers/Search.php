<?php

class Search extends Controller {

  public function __construct() {
    $this->userModel = $this->model("User");

  }

  public function index() {
    $data = $this->userModel->getAllUsers();

    if (isset($_REQUEST["q"])) {
      $q = $_REQUEST["q"];

      if ($q !== "") {

        $q = strtolower($q);
        $len = strlen($q);
        $filtered = [];
        foreach ($data as $user) {
          if (strpos(strtolower($user->first_name), $q) !== false) {
            if (!in_array($user, $filtered)) {
              $filtered[] = $user;
            }
          }
          if (strpos(strtolower($user->last_name), $q) !== false) {
            if (!in_array($user, $filtered)) {
              $filtered[] = $user;
            }
          }
          if (strpos(strtolower($user->email), $q) !== false) {
            if (!in_array($user, $filtered)) {
              $filtered[] = $user;
            }
          }
          if (strpos(strtolower($user->education), $q) !== false) {
            if (!in_array($user, $filtered)) {
              $filtered[] = $user;
            }
          }
          if (strpos(strtolower($user->work), $q) !== false) {
            if (!in_array($user, $filtered)) {
              $filtered[] = $user;
            }
          }
          if (strpos(strtolower($user->location), $q) !== false) {
            if (!in_array($user, $filtered)) {
              $filtered[] = $user;
            }
          }

        }
        echo json_encode($filtered);
        return;
      } else {

        echo json_encode($data);
        return;

      }

    }else {
      echo "not found";
    }

    $this->view("search/search", $data);
  }
}




?>

<?php

class Chat extends Controller {

  public function __construct() {

  }

  public function index() {
    redirect("chat/user/3");
    //$data = [];
    //$this->view("chat/index");
  }

  public function user($id) {

    $data = [
      "id" => $id
    ];
    $this->view("chat/index", $data);
  }

}




?>

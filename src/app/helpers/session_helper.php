<?php

  session_start();

  function createUserSession($user) {
    $_SESSION["user_id"] = $user->id;
    $_SESSION["user_first_name"] = $user->first_name;
    $_SESSION["user_last_name"] = $user->last_name;
    $_SESSION["user_email"] = $user->email;
    //redirect("posts");
  }

  function isLoggedIn() {
    if (isset($_SESSION["user_id"])) {
      return true;
    } else {
      return false;
    }
  }

?>

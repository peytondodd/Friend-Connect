<?php

  // Core route fixer
  function route_helper($url) {
    if ($url[0] == "users") {
      if ($url[1] == "register") {
        redirect("register");
      } else if ($url[1] == "login") {
        redirect("login");
      } else {
        $url[0] = "Index";
      }
      return $url;
    }

    if ($url[0] == "register") {
      $url[0] = "users";
      if (!isset($url[1])) {
        $url[1] = "register";
      }
      return $url;
    }
    if ($url[0] == "login") {
      $url[0] = "users";
      $url[1] = "login";
      return $url;
    }
    if ($url[0] == "logout") {
      $url[0] = "users";
      $url[1] = "logout";
      return $url;
    }

  }


  // simple page redirect
  function redirect($page) {
    header("location: " . URLROOT . "/" . $page);
  }


?>

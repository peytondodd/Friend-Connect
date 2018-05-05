<?php
  if (isLoggedIn()) {
    $userProfileSetup = $this->userModel->findUserInfoById($_SESSION["user_id"])->profile_setup;
    $postLogIn = 0;
    $inSetup = 0;
    if ($userProfileSetup == 1) {
      $postLogIn = 1;
    } else if ($userProfileSetup == 0) {
      $inSetup = 1;
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITENAME; ?></title>
    <link rel="stylesheet" href="<?php echo URLROOT; ?>/css/main.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="shortcut icon" type="image/png" href="/images/friend-connect-logo-black.png">
  </head>
  <body <?php echo isset($inSetup) && $inSetup == 1  ? "style=overflow-x:hidden" : "";?>>
    <?php isset($postLogIn) && $postLogIn == 1 ? require APPROOT . "/views/inc/navbar.php" : "";?>

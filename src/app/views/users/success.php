<?php

  //$data["first_name"] = $_SESSION["first_name"];
  //$data["register_email"] = $_SESSION["register_email"];
  // unset($_SESSION["first_name"]);
  // unset($_SESSION["register_email"]);

?>
<?php require APPROOT . "/views/inc/header.php"; ?>
  <h1 class="text-center">Thanks for signing up <?php echo $data["registered_name"] ?>!</h1>
  <p class="text-center mb-5">Your account details has been sent to <?php echo $data["registered_email"] ?></p>
  <p class="text-center">There is no need to confirm your email, just click Log in!</p>
  <form class="" action="<?php echo URLROOT; ?>/login" method="post">
    <input class="btn btn-success" type="submit" name="login" value="Log in">
  </form>

<?php require APPROOT . "/views/inc/footer.php"; ?>

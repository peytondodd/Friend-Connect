<?php

  //$data["first_name"] = $_SESSION["first_name"];
  //$data["register_email"] = $_SESSION["register_email"];
  // unset($_SESSION["first_name"]);
  // unset($_SESSION["register_email"]);

?>
<?php require APPROOT . "/views/inc/header.php"; ?>
<div class="registerSuccess">
  <h1 class="text-center mt-5">Thanks for signing up <?php echo $data["registered_name"] ?>!</h1>
  <img class="smile-emoji mb-5" src="/images/smileface.png" alt="Smiley Emoji">
  <p class="text-center">Your account details has been sent to <?php echo $data["registered_email"] ?></p>
  <p class="text-center">Check your spam if you didn't get an email.</p>
  <p class="text-center">There is no need to confirm your email or activate your account, just click Log in!</p>
  <form class="text-center" action="<?php echo URLROOT; ?>/login" method="post">
    <input class="btn btn-success successLogIn" type="submit" name="login" value="Log in">
  </form>
</div>
<?php require APPROOT . "/views/inc/footer.php"; ?>

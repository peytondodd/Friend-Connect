<?php

?>

<?php require APPROOT . "/views/inc/header.php"; ?>
<div class="loginPage">
  <h1 class="text-center">Recover your password</h1>
  <p class="loginMessage text-center">Enter your email</p> 
  <div class="row">
    <form class="loginPageForm" action="<?php echo URLROOT; ?>/login" method="post">
      <div class="form-group">
        <input class="form-control" type="email" name="user_email" placeholder="Email" value="">
      </div>
      <input class="btn btn-success" type="submit" name="login" value="Submit">
    </form>
  </div>
</div>

<?php require APPROOT . "/views/inc/footer.php"; ?>

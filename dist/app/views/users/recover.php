<?php

?>

<?php require APPROOT . "/views/inc/header.php"; ?>
<div class="container">
  <h1 class="text-center">Recover your password</h1>
  <p class=" text-center">Enter your email</p> 
  <div class="row text-center">
    <form class="" style="margin: 0 auto;" action="<?php echo URLROOT; ?>/recover" method="post">
      <div class="form-group">
        <input class="form-control" type="email" name="user_email" placeholder="Email" value="">
      </div>
      <input class="btn btn-success" type="submit" name="recoverPassword" value="Submit">
    </form>
  </div>
</div>

<?php require APPROOT . "/views/inc/footer.php"; ?>

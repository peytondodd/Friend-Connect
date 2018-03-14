<?php
  if (isset($_SESSION["login_email"])) {
    $data["login_email"] = $_SESSION["login_email"];

    unset($_SESSION["login_email"]);
    session_destroy();
  }
?>

<?php require APPROOT . "/views/inc/header.php"; ?>
<h1 class="text-center">Login</h1>
<p class="text-center">Sign in to connect with your friends!</p>
<div class="row">
  <div class="col-md-6 mx-auto">
    <form class="" action="<?php echo URLROOT; ?>/login" method="post">
      <div class="form-group">
        <label for="email">Email: </label>
        <input class="form-control" type="text" name="login_email" value="<?php echo isset($data['login_email']) ? $data['login_email'] : ''; ?>">
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input class="form-control" type="password" name="password" value="">
      </div>
      <input class="btn btn-success" type="submit" name="login" value="Log In">
    </form>
  </div>
</div>


<?php require APPROOT . "/views/inc/footer.php"; ?>

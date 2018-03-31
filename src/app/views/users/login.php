<?php
  if (isset($_SESSION["login_email"])) {
    $data["login_email"] = $_SESSION["login_email"];

    unset($_SESSION["login_email"]);
    session_destroy(); // put when logout
  }
?>

<?php require APPROOT . "/views/inc/header.php"; ?>
<div class="loginPage">
  <h1 class="text-center">Log in</h1>
  <p class="loginMessage text-center">Sign in to connect with your friends!</p>
  <?php if (isset($data["first_name"]) && !empty($data["first_name"])) : ?>
    <img class="loginPageProfile" src="/images/khabib.jpg" alt="user profile">
  <?php endif; ?>
  <p class="text-center"><strong><?php echo isset($data["first_name"]) && !empty($data["first_name"]) ? "Hi ".$data["first_name"] : "";?></strong></p>
  <p class="text-center text-danger"><?php echo isset($data["login_err"]) && !empty($data["login_err"]) ? $data["login_err"] : "";?></p>
  <div class="row">
    <form class="loginPageForm" action="<?php echo URLROOT; ?>/login" method="post">
      <div class="form-group">
        <input class="form-control loginPage-email <?php echo !empty($data['login_email_err']) ? "is-invalid" : "" ?>" type="email" name="login_email" placeholder="Email" value="<?php echo isset($data['login_email']) ? $data['login_email'] : ''; ?>">
        <div class="invalid-feedback loginPage-emailErr">
          <?php echo $data['login_email_err']; ?>
        </div>
      </div>

      <div class="form-group">
        <input class="form-control loginPage-password <?php echo !empty($data['password_err']) ? "is-invalid" : "" ?>" type="password" name="password" placeholder="Password" value="">
        <div class="invalid-feedback loginPage-passwordErr">
          <?php echo isset($data['password_err']) ? $data['password_err'] : ""; ?>
        </div>
      </div>
        <a href="#">Forgot your password?</a>
        <p>Need an account? <a href="/register">Register!</a></p>
      <input class="btn btn-success" type="submit" name="login" value="Log In">
    </form>
  </div>
</div>

<?php require APPROOT . "/views/inc/footer.php"; ?>

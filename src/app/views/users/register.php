<?php require APPROOT . "/views/inc/header.php"; ?>

<div class="registerPage">
  <div class="row logo-container">
    <div class="registerPage-logo-box">
      <img class="registerPage-logo-black" src="/images/friend-connect-logo-black.png" alt="Friend Connect Logo" width="512px" height="512px">
    </div>
  </div>
  <h1 class="text-center">Friend Connect</h1>
  <p class="text-center">Join and connect with your friends today! </p>
  <form class="" action="<?php echo URLROOT; ?>/register" method="post">
    <div class="form-row form-group">
      <div class="col-6">
        <input class="form-control <?php echo !empty($data['first_name_err']) ? "is-invalid" : ""; ?>" type="text" name="first_name" placeholder="First name" value="<?php echo isset($data['first_name']) ? $data['first_name'] : ''; ?>">
        <div class="invalid-feedback first_name_err">
          <?php echo $data['first_name_err']; ?>
        </div>
      </div>
      <div class="col-6">
        <input class="form-control <?php echo !empty($data['last_name_err']) ? "is-invalid" : ""; ?>" type="text" name="last_name" placeholder="Last name" value="<?php echo isset($data['last_name']) ? $data['last_name'] : ''; ?>">
        <div class="invalid-feedback last_name_err">
          <?php echo $data['last_name_err']; ?>
        </div>
      </div>
    </div>
    <div class="form-group">
      <input class="email form-control <?php echo !empty($data['register_email_err']) ? "is-invalid" : ""; ?>" type="email" name="register_email" placeholder="Email" value="<?php echo isset($data['register_email']) ? $data['register_email'] : ''; ?>">
      <div class="invalid-feedback email_err">
        <?php echo $data['register_email_err']; ?>
      </div>
    </div>
    <div class="form-group">
      <input class="form-control confirm-email <?php echo !empty($data['confirm_register_email_err']) ? "is-invalid" : ""; ?>" <?php echo !empty($data['confirm_register_email_err']) || !empty($data['confirm_register_email']) ? "style='display:block';" : "style='display:none';";?> type="email" name="confirm_register_email" placeholder="Confirm email" value="">
      <div class="invalid-feedback confirm_email_err">
        <?php echo $data['confirm_register_email_err']; ?>
      </div>
    </div>
    <div class="form-group">
      <input class="password form-control <?php echo !empty($data['password_err']) ? "is-invalid" : ""; ?>" type="password" name="password" placeholder="Password">
      <div class="invalid-feedback password_err">
        <?php echo $data['password_err']; ?>
      </div>
    </div>
    <div class="form-group">
      <input class="form-control confirm-password <?php echo !empty($data['confirm_password_err']) ? "is-invalid" : ""; ?>" <?php echo !empty($data['confirm_password_err']) && !empty($data["confirm_password"]) ? "style='display:block';" : "style='display:none';";?> type="password" name="confirm_password" placeholder="Confirm password">
      <div class="invalid-feedback confirm_password_err">
        <?php echo isset($data['confirm_password_err']) ? $data['confirm_password_err'] : ""; ?>
      </div>
    </div>
    <div class="register-submit">

      <input class="btn btn-success" type="submit" name="register" value="Register">
      <p class="haveAccount float-right">Have an account? <a href="/login">Log in</a></p>
    </div>
  </form>
</div>

<?php require APPROOT . "/views/inc/footer.php"; ?>

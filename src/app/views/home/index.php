
<?php require APPROOT . "/views/inc/header.php"; ?>
<h1>Friend Connect</h1>
<p>Connect with your friends</p>
<h3 class="text-center">Register</h3>
<div class="row">
  <div class="col-md-6 mx-auto">
    <form class="" action="<?php echo URLROOT; ?>/" method="post">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="firstName">First name: </label>
          <input class="form-control" type="text" name="first_name" placeholder="First name" value="<?php echo isset($data['first_name']) ? $data['first_name'] : ''; ?>">
        </div>
        <div class="form-group col-md-6">
          <label for="lastName">Last name: </label>
          <input class="form-control" type="text" name="last_name" placeholder="Last name" value="<?php echo isset($data['last_name']) ? $data['last_name'] : ''; ?>">
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email: </label>
        <input class="form-control" type="email" name="register_email" placeholder="Email" value="<?php echo isset($data['register_email']) ? $data['register_email'] : ''; ?>">
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password: </label>
        <input class="form-control" type="password" name="confirm_password" placeholder="Confirm password">
      </div>

      <input class="btn btn-success" type="submit" name="register" value="Register">
    </form>
  </div>
</div>

<h3 class="text-center">Login</h3>
<div class="row">
  <div class="col-md-6 mx-auto">
    <form class="" action="<?php $_SERVER['PHP_SELF'] ?>" method="post">
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

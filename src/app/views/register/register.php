<?php require APPROOT . "/views/inc/header.php"; ?>
  <h1 class="text-center">Register</h1>
  <p class="text-center">Create a new account.</p>

<div class="row">
  <div class="col-md-6 mx-auto">
    <form class="" action="<?php echo URLROOT; ?>/register" method="post">
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
<?php require APPROOT . "/views/inc/footer.php"; ?>

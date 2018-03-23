<?php

  if (isset($_SESSION["registerData"])) {
    $data["first_name"] = $_SESSION["registerData"]["first_name"];
    $data["last_name"] = $_SESSION["registerData"]["last_name"];
    $data["register_email"] = $_SESSION["registerData"]["register_email"];
    //unset($_SESSION["registerData"]);
  }

?>
<?php require APPROOT . "/views/inc/header.php"; ?>

<div class="row index">
  <div class="col-md-6 gallery">
    <div class="slogan">
      <h3><i class="fa fa-users" aria-hidden="true"></i> Connect</h3>
      <h3><i class="fa fa-share-square"></i> Share</h3>
      <h3><i class="fa fa-comments"></i> Talk</h3>
    </div>
  </div>
  <div class="col-md-6 bg-light forms">
    <div class="container">

      <div class="login mt-4">
        <form class="" action="<?php echo URLROOT; ?>/login" method="post">
          <div class="text-center">
              <input class="form-control-sm" type="email" name="login_email" placeholder="Email" value="<?php echo isset($data['login_email']) ? $data['login_email'] : ''; ?>">
              <input class="form-control-sm" type="password" name="password" placeholder="Password" value="">
              <input class="btn btn-success" type="submit" name="login" value="Log In">
          </div>
        </form>
      </div>

      <div class="register">
        <div class="row logo-container">
          <div class="col-6 logo">
            <img class="logo" src="/images/friend-connect-logo.png" alt="Friend Connect Logo" width="512px" height="512px">
          </div>
          <div class="col-6">
            <a class="float-right btn btn-success login-hide" href="#">Log in</a>
          </div>
        </div>
        <h1 class="form-title">Friend Connect</h1>
        <p class="form-desc">Join and connect with your friends today! </p>
        <form class="registerform" action="<?php echo URLROOT; ?>/register" method="post">
          <div class="form-row">
            <div class="col-md-6">
              <input class="form-control" type="text" name="first_name" placeholder="First name" value="<?php echo isset($data['first_name']) ? $data['first_name'] : ''; ?>">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" name="last_name" placeholder="Last name" value="<?php echo isset($data['last_name']) ? $data['last_name'] : ''; ?>">
            </div>
          </div>
          <div class="">
            <input class="form-control" type="email" name="register_email" placeholder="Email" value="<?php echo isset($data['register_email']) ? $data['register_email'] : ''; ?>">
          </div>
          <div class="">
            <input class="form-control confirm-email" type="email" name="confirm_register_email" placeholder="Confirm email" value="<?php echo isset($data['register_email']) ? $data['register_email'] : ''; ?>">
          </div>
          <div class="">
            <input class="form-control" type="password" name="password" placeholder="Password">
          </div>
          <div class="">
            <input class="form-control confirm-password" type="password" name="confirm_password" placeholder="Confirm password">
          </div>
          <div class="register-submit">

            <input class="btn btn-success" type="submit" name="register_index" value="Register">
            <p class="float-right">Have an account? <a href="#">Log in</a></p>
          </div>
        </form>
      </div>

      <div class="mobile-launch">
        <a class="btn btn-success" href="#">Register</a>
        <a class="btn btn-success" href="#">Log in</a>
        <a class="btn btn-success" href="#">About</a>
      </div>

    </div>
  </div>
</div>
<div class="about">
  <h3 class="text-center mt-5">About</h3>
    <p>Friend Connect is a project made by Jason Xie to
    showcase his skills. </p>
    <p>It has a concept very similar
    to Facebook. Users can register, sign in, add, delete,
    and block friends, create and share posts, and chat
    with each other all in real time.</p>
    <p>The technologies used were just HTML, CSS, Vanilla JS,
      Ajax, Bootstrap, PHP, MySQL, SASS, Gulp, Geolocation and Unsplash api.</p>
    <p>Logo icon made by Bogdan Rosu from www.flaticon.com</p>
    <p>Image shown on this page is randomized by Unsplash on page load.</p>
</div>

<!-- <h3 class="text-center">Log in</h3>
<div class="row">
  <div class="col-md-6 mx-auto">
    <form class="" action="<?php echo URLROOT; ?>/login" method="post">
      <div class="form-group">
        <label for="email">Email: </label>
        <input class="form-control" type="email" name="login_email" value="<?php echo isset($data['login_email']) ? $data['login_email'] : ''; ?>">
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input class="form-control" type="password" name="password" value="">
      </div>
      <input class="btn btn-success" type="submit" name="login" value="Log In">
    </form>
  </div>
</div>

<h1>Friend Connect</h1>
<p>Connect with your friends</p>
<h3 class="text-center">Register</h3>
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

      <input class="btn btn-success" type="submit" name="register_index" value="Register">
    </form>
  </div>
</div> -->


<?php require APPROOT . "/views/inc/footer.php"; ?>

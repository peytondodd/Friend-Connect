
<?php require APPROOT . "/views/inc/header.php"; //print_r($_SESSION["registerData"]); echo "<pre>";print_r($data);echo "</pre>";?>

<div class="row index">
  <div class="col-md-6 gallery">
    <div class="slogan">
      <h3><i class="fa fa-users" aria-hidden="true"></i> Connect</h3>
      <h3><i class="fa fa-share-square"></i> Share</h3>
      <h3><i class="fa fa-comments"></i> Talk</h3>
    </div>
  </div>
  <div class="col-md-6 forms">
    <div class="container">

      <div class="login mt-4">
        <form class="" action="<?php echo URLROOT; ?>/login" method="post">
          <div class="text-center">
            <div class="form-row">
              <div class="col-5">
                <input class="form-control login-email" type="email" name="login_email" placeholder="Email" value="">
              </div>
              <div class="invalid-feedback login_email_err">

              </div>
              <div class="col-5">
                <input class="form-control login-password" type="password" name="password" placeholder="Password" value="">
              </div>
              <div class="invalid-feedback login_password_err">

              </div>
              <div class="col-2">
                <input class="btn btn-outline-success" type="submit" name="login" value="Log In">
              </div>
            </div>

          </div>
        </form>
      </div>

      <div class="register">
        <div class="row logo-container">
          <div class="col-6 logo-box">
            <img class="logo-black" src="/images/friend-connect-logo-black.png" alt="Friend Connect Logo" width="512px" height="512px">
            <img class="logo-white" src="/images/friend-connect-logo-white.png" alt="Friend Connect Logo" width="512px" height="512px">
          </div>
          <div class="col-6">
            <a class="float-right btn btn-outline-success login-hide" href="/login">Log in</a>
          </div>
        </div>
        <h1 class="form-title">Friend Connect</h1>
        <p class="form-desc">Join and connect with your friends today! </p>
        <form class="registerform" action="<?php echo URLROOT; ?>/register" method="post">
          <div class="form-row form-group">
            <div class="col-md-6">
              <input class="form-control <?php echo !empty($data['first_name_err']) ? "is-invalid" : ""; ?>" type="text" name="first_name" placeholder="First name" value="<?php echo isset($data['first_name']) ? $data['first_name'] : ''; ?>">
              <div class="invalid-feedback first_name_err">
                <?php echo $data['first_name_err']; ?>
              </div>
            </div>
            <div class="col-md-6">
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

            <input class="btn btn-success" type="submit" name="register_index" value="Register">
            <p class="haveAccount float-right">Have an account? <a href="/login">Log in</a></p>
          </div>
        </form>
      </div>

      <div class="mobile-launch">
        <a class="btn btn-success" href="/register">Register</a>
        <a class="btn btn-success" href="/login">Log in</a>
        <a class="btn btn-success" href="/about">About</a>
      </div>

    </div>
  </div>
  <div class="about-btn-box">
    <div class="about-btn">

    </div>
  </div>


</div>
<div class="about bg-light">
  <div class="about-content">
    <h3 class="text-center mb-3 text-secondary">About</h3>
    <p>Friend Connect is a project made by Jason Xie to
    showcase his skills. </p>
    <p>It has a concept very similar
    to Facebook. Users can: </p>
    <ul>
      <li>register</li>
      <li>sign in, add, delete,
      and block friends</li>
      <li>create and share posts</li>
      <li>chat
      with each other all in real time</li>
    </ul>
    <p>The technologies used were just HTML, CSS, Vanilla JS,
    Ajax, Bootstrap, PHP, MySQL, SASS, Gulp, Geolocation and Unsplash api.</p>
    <p>Logo icon made by Bogdan Rosu from <a target="_blank" href="https://www.flaticon.com/free-icon/camera-shutter_69386">www.flaticon.com</a></p>
    <p>Image shown on this page is randomized by Unsplash on page load.</p>
    <p>This project can be found on GitHub at:
    <a target="_blank" href="https://github.com/thejasonxie/Friend-Connect">https://github.com/thejasonxie/Friend-Connect</a></p>
    <p>To learn more about Jason Xie, visit: <a target="_blank" href="https://thejasonxie.com/">https://thejasonxie.com</a></p>
  </div>

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

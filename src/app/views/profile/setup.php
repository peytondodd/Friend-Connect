<?php
	$ip = $_SERVER["REMOTE_ADDR"];
	$api  = file_get_contents("http://freegeoip.net/json/".$ip);
	$apiarray = json_decode($api,true);
	echo "<pre>";
	print_r(json_decode($api));
	echo "</pre>";
	echo $apiarray["city"];
?>
<?php require APPROOT . "/views/inc/header.php"; ?>

<h1 class="text-center">Welcome to <?php echo SITENAME . " " . $data["first_name"]; ?></h1>
<br>
<h4 class="text-center">Since this is your first time, we will help set up your profile.</h4>
<h4 class="text-center">This can be changed later as well in the profile settings.</h4>

<div class="col-md-6 mx-auto">
  <form class="form-" enctype="multipart/form-data" action="<?php $_SERVER["PHP_SELF"] ?>" method="post">
    <div class="form-group">
      <label for="img_upload">Choose a profile picture: </label>
      <input type="file" name="img_upload" value="Profile picture">
    </div>
    <div class="form-group">
      <label for="birthday">What's your birthday: </label>
      <select class="" name="month">
        <option value="0">Month</option>
        <?php
          for ($m = 1; $m < 13; $m++) {
            echo "<option value='".$m."'>".date("F",mktime(0,0,0,$m))."</option>";
          }
        ?>
      </select>
      <select class="" name="day">
        <option value="0">Day</option>
        <?php
          for ($d = 1; $d <= 31; $d++) {
            echo "<option value='".$d."'>".$d."</option>";
          }
        ?>
      </select>
      <select class="" name="year">
        <option value="0">Year</option>
        <?php
          $year = date("Y");
          $yearEnd = $year - 100;
          for ($y = $year; $y >= $yearEnd; $y--) {
            echo "<option value='".$y."'>".$y."</option>";
          }
        ?>
      </select>
    </div>
    <div class="form-group">
      <label for="gender">Male: </label>
      <input type="radio" name="gender" value="1">
      <label for="gender">Female: </label>
      <input type="radio" name="gender" value="2">
    </div>
    <div class="form-group">
      <label for="education">What's your education background? ie. school: </label>
      <input type="text" name="education" value="">
    </div>
    <div class="form-group">
      <label for="work">Where do you work?</label>
      <input type="text" name="work" value="">
    </div>
    <div class="form-group">
      <label for="location">Where do you live?</label>
      <input type="text" name="location" value="">
    </div>
    <div class="form-group">
      <label for="description">Tell us about yourself?</label>
      <textarea name="description" rows="10" cols="50"></textarea>
    </div>
    <input class="btn btn-success" type="submit" name="submit" value="Save">
  </form>
</div>

<?php require APPROOT . "/views/inc/footer.php"; ?>

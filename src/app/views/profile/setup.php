<?php
	// $ip = $_SERVER["REMOTE_ADDR"];
	// $api  = file_get_contents("http://freegeoip.net/json/".$ip);
	// $apiarray = json_decode($api,true);
	// echo "<pre>";
	// print_r(json_decode($api));
	// echo "</pre>";
	// echo $apiarray["city"];
?>
<?php require APPROOT . "/views/inc/header.php"; ?>
<div class="profileSetupPage-bg bg-info">

	<div class="profileSetupPage1 bg-light">
		<img class="profileSetupPage-logo" src="/images/friend-connect-logo-black.png" alt="Friend Connect Logo" width="512px" height="512px">
		<h1 class="text-center">Welcome to <?php echo SITENAME . " "; ?></h1>
		<h1 class="text-center psp1-mb"><?php echo $data["first_name"]; ?></h1>
		<h5 class="text-center">Since this is your first time, we will help set up your profile.</h4>
		<h5 class="text-center psp1-mb">This can be changed later as well in the profile settings.</h4>

		<div class="profileSetupPage-introBtn">
			<div class="row">
				<div class="col-sm-6">
					<input class="btn btn-success mb-3" type="button" name="setUpNow" value="Set Up Now">
				</div>
				<div class="col-sm-6">
					<input class="btn btn-danger" type="button" name="setUpLater" value="Set Up Later">
				</div>
			</div>
		</div>

	</div>

	<div class="profileSetupPage2 bg-light">
		<p class="text-right psp2-mb">Skip></p>
		<h1 class="text-center psp2-mb">Profile picture</h1>
		<p class="text-center psp2-mb">You can upload your own picture, choose one of ours, or leave it at default.</p>
		<div class="row">
			<div class="col-sm-4">
				<div class="">
					<img class="profileSetupPage2-profileIMG" src="/user_data/default/default-profile.jpg" alt="default profile" width="600px" height="600px">
				</div>
				<p class="text-center font-weight-bold mt-2"><?php echo $data["first_name"]; ?>'s profile picture.</p>
			</div>
			<div class="col-sm-8">
				<div class="profileSetupPage2-profileSelector">
					<?php $num = 1; for ($i = 0; $i < 3; $i++) : ?>
						<div class="row profileSetupPage2-selectorIMG-row">
							<?php for ($j = 0; $j < 3; $j++) : ?>
								<div class="col-sm-4 profileSetupPage2-selectorIMG-col">
									<img class="profileSetupPage2-selectorIMG" src="/user_data/default/default-profile-<?php echo $num.".jpg";?>" alt="default-profile">
								</div>
							<?php $num++; endfor; ?>
						</div>
					<?php endfor; ?>
				</div>
				<div class="profileSetupPage2-profileUploader">
					<label class="btn btn-danger" for="img_upload">Upload a profile picture</label>
					<input class="profileSetupPage2-img_input" type="file" id="img_upload" name="img_upload" value="Profile picture">
				</div>
			</div>
		</div>

		<input class="btn btn-success float-right" type="button" name="save" value="Save">

	</div>

</div>


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

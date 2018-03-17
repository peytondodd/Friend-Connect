<?php require APPROOT . "/views/inc/header.php"; ?>

<input class="searchField mb-5 mt-5" type="text" name="search" placeholder="Search">
<p class="input"></p>
<p><?php echo strpos("abc","z"); ?></p>
<?php foreach ($data as $user) : ?>
<div class="row align-items-center border mb-3">
  <div class="col-12 col-md-4">
    <img width: "100%" alt="Grandfather with child"
    src="/images/<?php echo $user->user_id; ?>/profile.<?php echo $user->user_id; ?>.jpeg">
  </div>
  <div class="col-12 col-md-8">
  	<h3><?php echo $user->first_name . " " . $user->last_name; ?></h3>
    <?php if ($user->status == 0) : ?>
  	   <p>Status: Offline</p>
    <?php elseif ($user->status == 1) : ?>
      <p>Status: Online</p>
    <?php endif; ?>

  	<p>Birthday: <?php echo $user->birthday; ?></p>

    <?php if ($user->status == 0) : ?>
  	   <p>Gender: </p>
    <?php elseif ($user->status == 1) : ?>
      <p>Gender: Male</p>
    <?php elseif ($user->status == 2) : ?>
      <p>Gender: Female</p>
    <?php endif; ?>

  	<p>Education: <?php echo $user->education; ?></p>
  	<p>Work: <?php echo $user->work; ?></p>
  	<p>Location: <?php echo $user->location; ?></p>
  	<p>Description: <?php echo $user->description; ?></p>
  </div>
</div>
<?php endforeach; ?>

<script>


var test = document.querySelector(".searchField");
var input = document.querySelector(".input");
test.onkeyup = function() {
var query = test.value;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          //input.innerHTML = this.responseText;
          var blah = JSON.parse(this.responseText);
          console.log(blah);
      }
  };
  xmlhttp.open("GET", "/search?q=" + query, true);
  xmlhttp.send();
}

</script>

<?php require APPROOT . "/views/inc/footer.php"; ?>

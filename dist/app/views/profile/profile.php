<?php require APPROOT . "/views/inc/header.php"; ?>

<h1>Welcome to <?php echo $data["first_name"] . "'s profile."; ?></h1>

<?php if ($data["profile_img"] == 1) : ?>

  <?php
    $ext = array("jpeg", "jpg", "png");
    $found = false;
    $i = 0;
    do {
      if (file_exists("images/".$data['id']."/profile.".$data['id'].".".$ext[$i])) {
        $found = true;
      } else {
        $i++;
      }
    } while (!$found)
  ?>

  <img src="/images/<?php echo $data['id']; ?>/profile.<?php echo $data['id'].".".$ext[$i]; ?>" alt="profile image">
<?php elseif ($data["profile_img"] == 0) : ?>
  <img src="/images/default-profile.jpeg" alt="profile image">
<?php endif; ?>

<?php if ($data["status"] == 0) : ?>
  <p>Status: Offline</p>
<?php elseif ($data["status"] == 1) : ?>
  <p>Status: Online</p>
<?php endif; ?>

<p>Name: <?php echo $data["first_name"] . " " . $data["last_name"]; ?></p>

<?php if ($data["birthday"] != "0000-00-00") : ?>
  <p>Birthday <?php echo $data["birthday"]; ?></p>
<?php else : ?>
  <p>Birthday: </p>
<?php endif; ?>

<?php if ($data["gender"] == 0) : ?>
  <p>Gender: </p>
<?php elseif ($data["gender"] == 1) : ?>
  <p>Gender: Male</p>
<?php elseif ($data["gender"] == 2) : ?>
  <p>Gender: Female</p>
<?php endif; ?>

<p>Education: <?php echo $data["education"]; ?></p>
<p>Work: <?php echo $data["work"]; ?></p>
<p>Location: <?php echo $data["location"]; ?></p>
<p>Description: <?php echo $data["description"]; ?></p>

  <div class="btn-section">
  <?php //echo $data["friend_status"]; ?>
  <?php if ($data["id"] != $_SESSION["user_id"]) : ?>

    <?php //["accept", "friends", "pending", "no access", "add friend", "unblock"]  ?>

      <!-- <input class="friendbtn" type="submit" name="<?php //echo $data["id"]."-".$data["friend_status"]; ?>" value="<?php //echo $data["friend_status"] ?>"> -->
      <input class="friendbtn" type="submit" name="" value="">
  <?php endif; ?>

  </div>


<script>

  var btnContainer = document.querySelector(".btn-section");
  var viewedUserId = (window.location.href).split("/");
  viewedUserId = viewedUserId[viewedUserId.length-1];
  var listener = viewedUserId + "-";
  var timestamp = null;

  if (document.querySelector(".friendbtn")) {
    var friendbtn = document.querySelector(".friendbtn");
    friendbtn.addEventListener("click", clickFriend);
  }


function clickFriend (event) {
  //var query = event.target.name;
  //var updatefriend = viewedUserId +"-"+ event.target.value;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);

      }
  };

  xmlhttp.open("GET", "/friends?updatefriend=" + friendbtn.value +"&viewedUserId="+viewedUserId, true);
  xmlhttp.send();
}

function friendUpdater(method, url) {
  var promiseObj = new Promise (function(resolve,reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          //success
          console.log("SUCCESS");
          var resp = this.responseText;
          //console.log(resp);
          var respJson = resp;//JSON.parse(resp);
          resolve(respJson);
        } else {
          console.log("FAILED");
          reject(this.status);
          console.log(this.status);
        }
      } else {
        //console.log("still processing");
      }
    }
    //console.log("request sent successfully");
  });
  return promiseObj;
}


friendUpdater("GET", "/friends?viewedUserId=" + viewedUserId+"&timestamp="+timestamp+"&oldStatus="+friendbtn.value)
  .then(processRepoListResponse, errorHandler);
//}, 1000);

function processRepoListResponse(repoList){

 //console.log(repoList);
 var data = JSON.parse(repoList);
 friendbtn.name = data.status;
 friendbtn.value = data.status;
 if (data.loop) {
   console.log(data.loop);
 }
friendUpdater("GET", "/friends?viewedUserId=" + viewedUserId+"&timestamp="+timestamp+"&oldStatus="+friendbtn.value)
 .then(processRepoListResponse, errorHandler);

}
function errorHandler(statusCode){
 console.log("failed with status", status);
}


</script>


<?php require APPROOT . "/views/inc/footer.php"; ?>

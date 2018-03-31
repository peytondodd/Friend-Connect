<?php
  // PROFILE IMAGE
  $viewProfileImgSrc = $data["profile_img"];

  //DESCRIPTION
  if (strlen($data["description"]) > 100) {
    $viewDescription = substr($data["description"], 0, 100). "... <a class='descReadMore' href=''>Read More</a>";
  } else {
    $viewDescription = $data["description"];
  }

  //BIRTHDAY
  if ($data["birthday"] != 0000-00-00) {
    $date = date_format(date_create($data["birthday"]), "M. d, Y");
    $viewBirthday = $date;
  } else {
    $viewBirthday = "";
  }

  //GENDER
  if ($data["gender"] == 1) {
    $viewGender = "Male";
  } else if ($data["gender"] == 2) {
    $viewGender = "Female";
  } else {
    $viewGender = "";
  }

  //EDUCATION
  $viewEducation = $data["education"];

  //WORK
  $viewWork = $data["work"];

  //LOCATION
  $viewLocation = $data["location"];

  //FRIEND LIST
  if ($data["friend_list"]) {
    $totalFriends = $data["friend_total"];
    $friendList = $data["friend_list"];
    $numberOfFriends = count($friendList);
    $friendListRow = count($friendList)/3 > 1 ? 2 : 1;
  } else {
    $numberOfFriends = 0;
  }
  // echo "<pre>";
  // //echo $numberOfFriends;
  // print_r($friendList);
  // echo "</pre>";
?>

<?php require APPROOT . "/views/inc/header.php"; ?>

<div class="container profilePage">
  <div class="row">
    <div class="col-md-3 mb-3">
      <div class="profilePage__profileImage">
        <img class="profilePage__profileImage--img" src="/user_data/<?php echo $viewProfileImgSrc; ?>" alt="profile picture">
      </div>
    </div>
    <div class="col-md-9 mb-3">
      <div class="row">
        <div class="col-sm-6">
          <h1><?php echo ucwords($data["first_name"]. " " .$data["last_name"]); ?></h1>
        </div>
        <div class="col-sm-6">
          <input type="button" name="" value="Add Friend">
        </div>
      </div>
      <div class="row">
        <div class="profilePage__description">
          <?php if (!empty($viewDescription)) : ?>
            <p><?php echo $viewDescription; ?></p>
          <?php endif; ?>
        </div>
      </div>
      <div class="row">
        <input type="button" name="" value="About">
        <input type="button" name="" value="Photos">
        <input type="button" name="" value="Friends">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 mb-3">
      <div class="profilePage__profileInfo">
        <div class="profilePage__userDetails">
          Birthday
          <p><?php echo $viewBirthday; ?></p>
          Gender
          <p><?php echo $viewGender; ?></p>
          Education
          <p><?php echo $viewEducation; ?></p>
          Work
          <p><?php echo $viewWork; ?></p>
          Location
          <p><?php echo $viewLocation; ?></p>
        </div>
        <div class="profilePage__userFriends">
          <p>Friends(<?php echo $totalFriends; ?>)</p>
          <?php if ($numberOfFriends > 0) : ?>
            <div class="row profilePage__userFriends--row">
              <?php $num = 0; for ($i = 0; $i < $friendListRow; $i++) : ?>
                <div class="row profilePage__userFriends--row">
                  <?php for ($j = 0; $j < 3; $j++) : ?>
                    <div class="col-4 profilePage__userFriends--box">
                      <img class="profilePage__userFriends--img" src="/user_data/<?php echo $friendList[$num]->profile_img; ?>" alt="">
                      <span class="profilePage__userFriends--name"><?php echo $friendList[$num]->friend_name; $num++; ?></span>
                    </div>
                  <?php endfor; ?>
                </div>
              <?php endfor; ?>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="row mb-3">
        <div class="profilePage__inputPost">

        </div>
      </div>
      <div class="row">
        <div class="profilePage__displayPost">

        </div>
      </div>
    </div>
  </div>
</div>


<script>
  var user_descFull = "<?php echo $data["description"]; ?>";
  var user_descShort = "<?php echo $viewDescription; ?>";
</script>

<!-- <h1>Welcome to <?php echo $data["first_name"] . "'s profile."; ?></h1>

<img src="/user_data/<?php echo $profileImgSrc; ?>" alt="profile picture">

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

  </div> -->


<!-- <script>

  var btnContainer = document.querySelector(".btn-section");
  var viewedUserId = (window.location.href).split("/");
  viewedUserId = viewedUserId[viewedUserId.length-1];
  var listener = viewedUserId + "-";
  var timestamp = "0000-00-00 00:00:00";

  if (document.querySelector(".friendbtn")) {
    var friendbtn = document.querySelector(".friendbtn");
    friendbtn.addEventListener("click", triggerBtn);
  }

function triggerBtn (event) {
//function friendBtn (event) {
  //var query = event.target.name;
  //var updatefriend = viewedUserId +"-"+ event.target.value;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        console.log(this.responseText);

      }
  };

  xmlhttp.open("GET", "/friends?updatefriend=" + event.target.value +"&UserId="+viewedUserId, true);
  xmlhttp.send();
//}
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
          console.log(this.responseText);
          var resp = JSON.parse(this.responseText);
          console.log(resp);
          //console.log(resp);
          //var respJson = resp;//JSON.parse(resp);

          resolve(resp);
        } else {
          console.log("FAILED");
          //session_start();
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
  .then(success, failed);
//}, 1000);

function success(friend) {

 //console.log(repoList);
 friendbtn.name = friend.status;
 friendbtn.value = friend.status;
 if (friend.status == "Add Friend") {

   if (btnContainer.childElementCount > 1) {
     var btnLength = btnContainer.childElementCount;
     for (var i = 1; i < btnLength; i++) {
       btnContainer.removeChild(btnContainer.children[1]);
     }
   }

   var block = document.createElement("input");
   block.name = "Block";
   block.value = "Block";
   block.type = "Submit";
   btnContainer.appendChild(block);
   block.addEventListener("click", triggerBtn);
 }
 if (friend.status == "Accept") {

   if (btnContainer.childElementCount > 1) {
     var btnLength = btnContainer.childElementCount;
     for (var i = 1; i < btnLength; i++) {
       btnContainer.removeChild(btnContainer.children[1]);
     }
   }

   var decline = document.createElement("input");
   decline.name = "Decline";
   decline.value = "Decline";
   decline.type = "Submit";
   btnContainer.appendChild(decline);
   decline.addEventListener("click", triggerBtn);

   var blockFriend = document.createElement("input");
   blockFriend.name = "Block";
   blockFriend.value = "Block";
   blockFriend.type = "Submit";
   btnContainer.appendChild(blockFriend);
   blockFriend.addEventListener("click", triggerBtn);

 }
 if (friend.status == "Pending") {

   if (btnContainer.childElementCount > 1) {
     var btnLength = btnContainer.childElementCount;
     for (var i = 1; i < btnLength; i++) {
       btnContainer.removeChild(btnContainer.children[1]);
     }
   }

   var cancel = document.createElement("input");
   cancel.name = "Cancel";
   cancel.value = "Cancel";
   cancel.type = "Submit";
   btnContainer.appendChild(cancel);
   cancel.addEventListener("click", triggerBtn);
 }
 if (friend.status == "Friends") {

   if (btnContainer.childElementCount > 1) {
     var btnLength = btnContainer.childElementCount;
     for (var i = 1; i < btnLength; i++) {
       btnContainer.removeChild(btnContainer.children[1]);
     }
   }

   var blockFriend = document.createElement("input");
   blockFriend.name = "Block";
   blockFriend.value = "Block";
   blockFriend.type = "Submit";
   btnContainer.appendChild(blockFriend);
   blockFriend.addEventListener("click", triggerBtn);
   var deleteFriend = document.createElement("input");
   deleteFriend.name = "Delete";
   deleteFriend.value = "Delete";
   deleteFriend.type = "Submit";
   btnContainer.appendChild(deleteFriend);
   deleteFriend.addEventListener("click", triggerBtn);

 }
 if (friend.status == "No Access") {
   if (btnContainer.childElementCount > 1) {
     var btnLength = btnContainer.childElementCount;
     for (var i = 1; i < btnLength; i++) {
       btnContainer.removeChild(btnContainer.children[1]);
     }
   }
 }
 if (friend.status == "Unblock") {
   if (btnContainer.childElementCount > 1) {
     var btnLength = btnContainer.childElementCount;
     for (var i = 1; i < btnLength; i++) {
       btnContainer.removeChild(btnContainer.children[1]);
     }
   }
 }
 timestamp = friend.timestamp;

friendUpdater("GET", "/friends?viewedUserId=" + viewedUserId+"&timestamp="+timestamp+"&oldStatus="+friendbtn.value)
 .then(success, failed);

}
function failed(statusCode){
 console.log("failed with status", status);
}


</script> -->


<?php require APPROOT . "/views/inc/footer.php"; ?>

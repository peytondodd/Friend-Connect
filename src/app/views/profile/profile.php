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


</script>


<?php require APPROOT . "/views/inc/footer.php"; ?>

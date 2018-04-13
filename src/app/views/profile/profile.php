<?php
  // profile ID
  $viewId = $data["id"];

  // PROFILE IMAGE
  $viewProfileImgSrc = $data["profile_img"];

  //DESCRIPTION
  if (strlen($data["description"]) > 75) {
    $viewDescription = substr($data["description"], 0, 75). "... <a class='descReadMore' href=''>Read More</a>";
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

  //USER Posts
  $viewPost = $data["user_post"];

?>

<?php require APPROOT . "/views/inc/header.php"; ?>

<div class="container profilePage">

  <div class="row mb-3 profilePage__header">
  <div class="profilePage__header--box">
    <div class="col-md-3 px-0">
      <div class="profilePage__profileImage">
        <img class="profilePage__profileImage--img" src="/user_data/<?php echo $viewProfileImgSrc; ?>" alt="profile picture">
      </div>
    </div>

    <div class="col-md-9 px-0 profilePage__header--nameBox">
      <div class="profilePage__header--name">

        <div class="row">
          <div class="col-8">
            <h1 class="profilePage__header--userName"><?php echo ucwords($data["first_name"]. " " .$data["last_name"]); ?></h1>
          </div>
          <div class="col-4 profilePage__header--friendBtnBox">
            <input class="float-right btn btn-success profilePage__header--friendBtn" type="button" name="" value="Add Friend">
          </div>
        </div>
        <div class="profilePage__headerbtn">
          <div class="btn-group">
            <input class="btn btn-primary" type="button" name="" value="About">
            <input class="btn btn-primary" type="button" name="" value="Photos">
            <input class="btn btn-primary" type="button" name="" value="Friends">
            <?php if ($_SESSION["user_id"] == $viewId) : ?>
              <input class="btn btn-primary" type="button" name="profilePage-Settings" value="Settings">
            <?php endif; ?>
          </div>
        </div>

      </div>

    </div>
  </div>
  </div>

  <div class="row profileBody">
    <div class="col-md-4 mb-3">
      <div class="profilePage__profileInfo">

        <div class="profilePage__userDetails mb-3">
          <div class="profilePage__detailsTitle">
            <p><a href="">About</a></p>
          </div>
          <div class="profilePage__userInfo">
            <p>
              <span class="text-muted">Birthday </span>
              <strong><?php echo $viewBirthday; ?></strong>
            </p>
          </div>
          <div class="profilePage__userInfo">
            <p>
              <span class="text-muted">Gender </span>
              <strong><?php echo $viewGender; ?></strong>
            </p>
          </div>
          <div class="profilePage__userInfo">
            <p>
              <span class="text-muted">Education </span>
              <strong><?php echo $viewEducation; ?></strong>
            </p>
          </div>
          <div class="profilePage__userInfo">
            <p>
              <span class="text-muted">Work </span>
              <strong><?php echo $viewWork; ?></strong>
            </p>
          </div>
          <div class="profilePage__userInfo">
            <p>
              <span class="text-muted">Location </span>
              <strong><?php echo $viewLocation; ?></strong>
            </p>
          </div>
          <div class="profilePage__userInfo">
            <p class="profilePage__description">
              <span class="text-muted">Description </span>
                <?php if (!empty($viewDescription)) : ?>
                  <strong><?php echo $viewDescription; ?></strong>
                <?php endif; ?>
            </p>
          </div>

        </div>

        <div class="profilePage__userFriends">
          <div class="profilePage__userFriends--title">
            <p class="mb-0"><a href="">Friends(<?php echo $totalFriends; ?>)</a></p>
          </div>
          <?php if ($numberOfFriends > 0) : ?>
            <div class="row profilePage__userFriends--row">
              <?php $num = 0; for ($i = 0; $i < $friendListRow; $i++) : ?>
                <div class="row profilePage__userFriends--row">
                  <?php for ($j = 0; $j < 3; $j++) : ?>
                    <?php if (isset($friendList[$num])) : ?>
                      <div class="col-4 profilePage__userFriends--container">
                        <a href="/profiles/user/<?php echo $friendList[$num]->friend_id; ?>">
                          <div class="profilePage__userFriends--box">
                            <img class="profilePage__userFriends--img" src="/user_data/<?php echo $friendList[$num]->profile_img; ?>" alt="">
                            <span class="profilePage__userFriends--name"><?php echo $friendList[$num]->friend_name; ?></span>
                          </div>
                        </a>
                      </div>
                    <?php endif; ?>
                  <?php $num++; endfor; ?>
                </div>
              <?php endfor; ?>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="row mb-3">
        <div class="col">
          <div class="createPost">
            <div class="createPost__title">
              <p class="mb-0">Create a post</p>
            </div>
            <div class="row">
              <!-- <div class="col-2"> -->
                <div class="createPost__iconBox">
                  <img class="createPost__icon" src="/user_data/<?php echo $viewProfileImgSrc; ?>" alt="profile picture">
                </div>
                <span class="createPost__name"><?php echo ucwords($data["first_name"]. " " .$data["last_name"]); ?></span>
              <!-- </div> -->
              <!-- <div class="col"> -->
                <div class="createPost__inputBox">
                  <textarea class="createPost__input" name="name" rows="3" placeholder="Share your thoughts with your friends..."></textarea>
                </div>
              <!-- </div> -->
            </div>
            <div class="createPost__postBtnBox">
              <span><span class="createPost__charCounter">0</span>/2000</span>
              <input class="btn btn-success createPost__postBtn" type="button" name="button" value="Post">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col profilePage__displayPost">
          <?php if ($viewPost != 0) : ?>
            <?php for($i = 0; $i < count($viewPost); $i++) : ?>
              <div class="viewPost postID-<?php echo $viewPost[$i]->id; ?>">
                <div class="viewPost__postBox">
                  <div class="row mx-0">
                    <?php if ($_SESSION["user_id"] == $viewPost[$i]->user_id) : ?>
                      <p class="viewPost__modLink">
                        <a class="viewPost__editPost" href="#">Edit</a> |
                        <a class="viewPost__deletePost" href="#">Delete</a>
                      </p>

                    <?php endif; ?>
                    <div class="viewPost__postUserIconBox">
                      <img class="viewPost__postUserIcon" src="/user_data/<?php echo $viewPost[$i]->img_src; ?>" alt="profile picture">
                    </div>
                    <a class="viewPost__name" href="#"><?php echo $viewPost[$i]->name; ?></a>
                    <span class="viewPost__date"><?php echo $viewPost[$i]->created_at; ?></span>
                  </div>
                  <div class="row mx-0">
                    <div class="viewPost__content">
                      <?php echo $viewPost[$i]->content; ?>
                    </div>
                  </div>
                  <div class="row mx-0 viewPost__likeCommentShare">
                    <div class="row mx-0">
                      <div class="btn-group">
                        <?php if ($viewPost[$i]->currentUserLike) :?>
                          <a class="btn btn-default likeOrDislikeBtn" href="" name="<?php echo $viewPost[$i]->id; ?>">Dislike</a>
                        <?php else : ?>
                          <a class="btn btn-default likeOrDislikeBtn" href="" name="<?php echo $viewPost[$i]->id; ?>">Like</a>
                        <?php endif; ?>
                        <a class="btn btn-default showCommentsBtn" href="">Comment</a>
                        <a class="btn btn-default" href="">Share</a>
                      </div>
                    </div>
                  </div>

                  <?php if ($viewPost[$i]->likeCount > 0) : ?>
                    <div class="row">
                      <div class="col viewPost__showLikes">
                        <?php if ($viewPost[$i]->likeCount == 1) : ?>
                          <span class="viewPost__likeCount">
                            <?php echo $viewPost[$i]->likeCount; ?>
                          </span>
                          <span> person liked this</span>
                        <?php endif; ?>
                        <?php if ($viewPost[$i]->likeCount > 1) : ?>
                          <span class="viewPost__likeCount">
                            <?php echo $viewPost[$i]->likeCount; ?>
                          </span>
                          <span> people liked this</span>
                        <?php endif; ?>
                      </div>
                    </div>
                  <?php endif; ?>

                  <?php if ($viewPost[$i]->comments->count > 0) : ?>
                    <div class="row">
                      <div class="col">
                        <a href="" class="viewPost__showComments">View comments (<span class="commentCount"><?php echo $viewPost[$i]->comments->count; ?></span>)</a>
                      </div>
                    </div>
                  <?php endif; ?>



                </div>
              </div>
            <?php endfor; ?>
          <?php endif; ?>
        </div>
      </div>
    </div>

    <!-- <div class="modal-bg">
      <div class="modal-content-post">
      </div>
    </div> -->
  </div>

  <div class="profilePage__settingsPage">
    <h4 class="text-center pt-3">Profile Settings</h4>

    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="profilePage__settingImageContainer">
          <div class="profilePage__settingImageContainer--settingImageBox">
            <img class="profilePage__settingImageContainer--settingImage" src="/user_data/18/profile.18.gif" alt="">
          </div>

          <div class="profilePage__settingImageContainer--uploaderBox">
            <label class="btn btn-info" for="settings_ImgInput">Upload a new picture</label>
            <input class="profilePage__settingImageContainer--settings_ImgInput" type="file" id="settings_ImgInput" name="settings_img_upload" value="Profile picture">
            <p class="settingsUploadMessage text-center"><i class=""></i></p>
          </div>

        </div>
      </div>
      <div class="col-md-8 mb-3">
        <div class="profilePage__settingInfoContainer">
          <div class="form-row">
            <div class="form-group col-sm-6">
              <label for="firstName">First name: </label>
              <input class="form-control" id="firstName" type="text" placeholder="First name..." value="">
            </div>
            <div class="form-group col-sm-6">
              <label for="lastName">Last name: </label>
              <input class="form-control" id="lastName" type="text" placeholder="Last name..." value="">
            </div>
          </div>
          <div class="form-group">
    	      <label for="birthday">Birthday: </label><br>
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
            <label for="gender">Gender: </label><br>
            <input type="radio" name="" value="1"> Male
            <input type="radio" name="" value="2"> Female
            <input type="radio" name="" value="0"> None
          </div>
          <div class="form-group">
            <label for="education">Education: </label>
            <input class="form-control" type="text" id="education" name="" value="" placeholder="Education...">
          </div>
          <div class="form-group">
            <label for="work">Work: </label>
            <input class="form-control" type="text" id="work" name="" value="" placeholder="Work...">
          </div>
          <div class="form-group">
            <label for="location">Location: </label>
            <input class="form-control" type="text" id="location" name="" value="" placeholder="Location...">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="profilePage__settingInfoContainer--description" name="name" rows="8" placeholder="Description..."></textarea>
          </div>
          <input class="btn btn-success" type="button" name="" value="Save">
          <input class="btn btn-danger" type="button" name="" value="Cancel">
        </div>
      </div>
    </div>
  </div>



</div>


<script>

  var user_descFull = "<?php echo $data["description"]; ?>";
  var user_descShort = "<?php echo $viewDescription; ?>";
  var postName = "<?php echo ucwords($data["first_name"]. " " .$data["last_name"]); ?>";
  var postIconSrc = "/user_data/<?php echo $viewProfileImgSrc; ?>";
  var currentUserId = <?php echo $_SESSION["user_id"]; ?>;
  var viewPost = <?php echo json_encode($viewPost); ?>;

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

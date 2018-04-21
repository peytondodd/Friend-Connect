var profilePage = (function() {
  var profile = document.querySelector(".profilePage");
  if (profile) {
    //CACHE
    var descBox = profile.querySelector(".profilePage__description");
    var descReadMoreBtn = descBox.querySelector(".descReadMore");

    //BIND
    profile.addEventListener("click", profileClickDir);
    profile.addEventListener("change", profileChangeDir);

    //FUNCTIONS
    function profileClickDir(event) {
      //console.log(event.target);

      if (event.target.className == "descReadMore") {
        descReadMore(event);
      }
      if (event.target.className == "descShowLess") {
        descShowLess(event);
      }
      if (event.target.name == "profilePage-Settings") {
        profileSettings();
      }
      if (event.target.name == "settingsCancel") {
        cancelSettingsPage(event);
      }
      if (event.target.name == "profilePage-About") {
        profileAbout();
      }
      if (event.target.name == "profilePage-Friends") {
        profileFriends();
      }
      if (event.target.name == "profilePage-Photos") {
        profilePhotos();
      }
      if (event.target.name == "uploadPhotoProfile") {
        profilePhotosUpload();
      }
      if (event.target.name == "photosUpload-cancelBtn") {
        profilePhotos();
      }
      // if (event.target.className == "profilePage__photosPage--viewPhoto" ||
      // event.target.className == "profilePage__photosPage--viewPhotoBox") {
      //   displayProfilePhotos(event);
      // }
    }

    function profileChangeDir(event) {
      if (event.target.id == "settings_ImgInput" || event.target.id == "photos_ImgInput") {
        profileImageUpload(event);
      }
    }

    //pageACTION
    if (pageAction[0] == "settings") {
      profileSettings();
    } else if (pageAction[0] == "about") {
      profileAbout();
    } else if (pageAction[0] == "photos") {
      profilePhotos();
    } else if (pageAction[0] == "friends") {
      profileFriends();
    }


    function descReadMore(event) {
      event.preventDefault();
      descBox.children[1].innerHTML = user_descFull + " <a class='descShowLess' href=''>Show Less</a>";
    }

    function descShowLess(event) {
      event.preventDefault();
      descBox.children[1].innerHTML = user_descShort;
    }

    function profileAbout() {
      profile.children[1].style.display = "none";
      if (profile.children.length > 2) {
        for (var i = profile.children.length-1; i > 1; i--) {
          profile.removeChild(profile.children[i]);
        }
      }
      makeAboutPage();
    }

    function profilePhotos() {
      profile.children[1].style.display = "none";
      if (profile.children.length > 2) {
        for (var i = profile.children.length-1; i > 1; i--) {
          profile.removeChild(profile.children[i]);
        }
      }
      makePhotosPage();
    }

    function profilePhotosUpload() {
      profile.children[1].style.display = "none";
      if (profile.children.length > 2) {
        for (var i = profile.children.length-1; i > 1; i--) {
          profile.removeChild(profile.children[i]);
        }
      }
      makePhotoUploadPage();
    }

    // function displayProfilePhotos(event) {
    //   profile.children[1].style.display = "none";
    //   if (profile.children.length > 2) {
    //     for (var i = profile.children.length-1; i > 1; i--) {
    //       profile.removeChild(profile.children[i]);
    //     }
    //   }
    //
    //   if (event.target.localName == "div") {
    //     var postId = event.target.children[0].name.split("-")[1];
    //   } else if (event.target.localName == "img") {
    //     var postId = event.target.name.split("-")[1];
    //   }
    //   makeDisplayPhotosPage(postId);
    // }

    function profileFriends() {
      profile.children[1].style.display = "none";
      if (profile.children.length > 2) {
        for (var i = profile.children.length-1; i > 1; i--) {
          profile.removeChild(profile.children[i]);
        }
      }
      makeFriendsPage();
      var friendSearchInput = profile.querySelector(".profilePage__FriendsPage--Search");
      friendSearchInput.addEventListener("keyup", searchFriend);
    }

    function searchFriend(event) {
      //console.log(event.target.value);
      if (event.target.value != "") {
        var newFriendList = [];
        var expression = new RegExp(event.target.value, "i");
        friendList.forEach(function(value) {
          if (value.friend_name.search(expression) != -1) {
            newFriendList.push(value);
          }
        });

        profile.children[2].removeChild(profile.children[2].children[3]);
        profile.children[2].appendChild(makeFriendList(newFriendList));
      } else {
        profile.children[2].removeChild(profile.children[2].children[3]);
        profile.children[2].appendChild(makeFriendList(friendList));
      }
    }

    function profileSettings() {
      var profileBody = profile.querySelector(".profileBody");
      profileBody.style.display="none";
      if (profile.children.length > 2) {
        for (var i = profile.children.length-1; i > 1; i--) {
          profile.removeChild(profile.children[i]);
        }
      }
      makeSettingsPage();
    }

    function cancelSettingsPage(event) {
      var profileBody = profile.querySelector(".profileBody");
      profileBody.style.display="flex";

      profile.removeChild(profile.children[profile.children.length-1]);
    }

    function profileImageUpload(event) {
      var newImage = event.target.files[0];
      var uploadMessage = event.target.parentElement.children[2];
      var imageBox = event.target.parentElement.parentElement.children[0];
      var viewImage = imageBox.children[0];

      if (newImage) {
        var imageType = /image.*/;
        if (!newImage.type.match(imageType)) {
          //console.log("not image");
          uploadMessage.children[0].className = "fa fa-times-circle text-danger size-20px";
          uploadMessage.children[0].innerText = " That's not an image!";
        } else if (newImage.size >= 50000000) {
          //console.log("image is too big.");
          uploadMessage.children[0].className = "fa fa-times-circle text-danger size-20px";
          uploadMessage.children[0].innerText = " Image size too big!";
        } else {
          var imgURL = window.URL.createObjectURL(newImage);
          viewImage.onload = function() {
            //console.log("revoked");
            window.URL.revokeObjectURL(imgURL);
          }
          viewImage.src = imgURL;
          uploadMessage.children[0].className = "fa fa-check-circle text-success size-20px";
          uploadMessage.children[0].innerText = " Good image!";
        }
      }
    }


    function makeSettingsPage() {
      var settingsPage = document.createElement("div");
      settingsPage.className = "profilePage__settingsPage";
      settingsPage.innerHTML = `
        <h4 class="text-center pt-3">Profile Settings</h4>
        <form class="" enctype="multipart/form-data" action="/profiles/settings" method="post">
          <input type="hidden" name="id" value="${viewUserInfo.id}">
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="profilePage__settingImageContainer">
                <div class="profilePage__settingImageContainer--settingImageBox">
                  <img class="profilePage__settingImageContainer--settingImage" src="/user_data/${viewUserInfo.image}" alt="">
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
                    <input class="form-control" id="firstName" type="text" name="first_name" placeholder="First name..." value="${viewUserInfo.firstName}">
                  </div>
                  <div class="form-group col-sm-6">
                    <label for="lastName">Last name: </label>
                    <input class="form-control" id="lastName" type="text" name="last_name" placeholder="Last name..." value="${viewUserInfo.lastName}">
                  </div>
                </div>
                <div class="form-group">
          	      <label for="birthday">Birthday: </label><br>
          	      <select class="" name="month"></select>
          	      <select class="" name="day"></select>
          	      <select class="" name="year"></select>
          	    </div>
                <div class="form-group">
                  <label for="gender">Gender: </label><br>
                  <input type="radio" name="gender" value="1"> Male
                  <input type="radio" name="gender" value="2"> Female
                  <input type="radio" name="gender" value="0"> None
                </div>
                <div class="form-group">
                  <label for="education">Education: </label>
                  <input class="form-control" type="text" id="education" name="education" value="${viewUserInfo.education}" placeholder="Education...">
                </div>
                <div class="form-group">
                  <label for="work">Work: </label>
                  <input class="form-control" type="text" id="work" name="work" value="${viewUserInfo.work}" placeholder="Work...">
                </div>
                <div class="form-group">
                  <label for="location">Location: </label>
                  <input class="form-control" type="text" id="location" name="location" value="${viewUserInfo.location}" placeholder="Location...">
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="profilePage__settingInfoContainer--description" rows="3" name="description" placeholder="Description...">${viewUserInfo.description}</textarea>
                </div>
                <input class="btn btn-success" type="submit" name="settingsSave" value="Save">
                <input class="btn btn-danger" type="button" name="settingsCancel" value="Cancel">
              </div>
            </div>
          </div>
        </form>
      `;

      var birthday = viewUserInfo.birthday.split("-");
      var monthSettings = settingsPage.children[1].children[1].children[1].children[0].children[1].children[2];
      var daySettings = settingsPage.children[1].children[1].children[1].children[0].children[1].children[3];
      var yearSettings = settingsPage.children[1].children[1].children[1].children[0].children[1].children[4];
      //Month
      for (var i = 0; i < 13; i++) {
        var month = document.createElement("option");
        month.value = i;
        month.innerText = month_name(i);
        if (birthday[1] == i) {
          month.selected = true;
        }
        monthSettings.appendChild(month);
      }
      //day
      for (var i = 0; i < 32; i++) {
        var day = document.createElement("option");
        day.value = i;
        if (i == 0) {
          day.innerText = "Day";
        } else if (i == birthday[2]) {
          day.innerText = i;
          day.selected = true;
        } else {
          day.innerText = i;
        }
        daySettings.appendChild(day);
      }
      //year
      for (var i = 0; i < 102; i++) {
        var year = document.createElement("option");
        if (i == 0) {
          year.value = 0;
          year.innerText = "Year";
        } else {
          var d = new Date();
          var y = d.getFullYear();
          year.value = y + 1 - i;
          year.innerText = y + 1 - i;
          if (year.value == birthday[0]){
            year.selected = true;
          }
        }
        yearSettings.appendChild(year);
      }

      //gender
      var maleSettings = settingsPage.children[1].children[1].children[1].children[0].children[2].children[2];
      var femaleSettings = settingsPage.children[1].children[1].children[1].children[0].children[2].children[3];
      var noneSettings = settingsPage.children[1].children[1].children[1].children[0].children[2].children[4];

      if (viewUserInfo.gender == 1) {
        maleSettings.checked = true;
      } else if (viewUserInfo.gender == 2) {
        femaleSettings.checked = true;
      } else if (viewUserInfo.gender == 0) {
        noneSettings.checked = true;
      }

      profile.appendChild(settingsPage);

      //resize textarea
      var settingDesc = settingsPage.querySelector(".profilePage__settingInfoContainer--description");
      //resize text area
      settingDesc.style.height = "";
      settingDesc.style.height = settingDesc.scrollHeight + 15 + "px";

      settingDesc.addEventListener("keydown", settingDescDown);
    }

    function settingDescDown(event) {
      //resize text area
      event.target.style.height = "";
      event.target.style.height = event.target.scrollHeight + 15 + "px";
    }

    function month_name(num) {
      var mlist = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return mlist[num];
    }

    function makeAboutPage() {
      var birthday = viewUserInfo.birthday.split("-");
      if (birthday[0] == 0000 || birthday[1] == 00 || birthday[2] == 00) {
        birthday="";
      } else {
        if (viewUserInfo.age != "") {
          birthday = month_name(Number(birthday[1]))+" "+birthday[2]+", "+birthday[0]+" ("+viewUserInfo.age+" years old)";
        } else {
          birthday = month_name(Number(birthday[1]))+" "+birthday[2]+", "+birthday[0];
        }
      }

      if (viewUserInfo.gender == 1) {
        var gender = "Male";
      } else if (viewUserInfo.gender == 2) {
        var gender = "Female";
      } else if (viewUserInfo.gender == 0) {
        var gender = "";
      }

      var aboutPage = document.createElement("div");
      aboutPage.className = "profilePage__AboutPage";
      aboutPage.innerHTML = `
        <a href="/profiles/user/${viewUserInfo.id}">Back to Profile</a>
        <h4 class="text-center pt-3">About</h4>
        <div class="row">
          <div class="col">
            <div class="profilePage__AboutPage--Info">
              <p>Name: <strong>${viewUserInfo.firstName} ${viewUserInfo.lastName}</strong></p>
              <p>Birthday: <strong>${birthday}</strong></p>
              <p>Gender: <strong>${gender}</strong></p>
              <p>Education: <strong>${viewUserInfo.education}</strong></p>
              <p>Work: <strong>${viewUserInfo.work}</strong></p>
              <p>Location: <strong>${viewUserInfo.Location}</strong></p>
              <p>Description: <strong>${viewUserInfo.description}</strong></p>
            </div>
          </div>
        </div>
      `;
      profile.appendChild(aboutPage);
    }

    function makeFriendsPage() {

      var friendsPage = document.createElement("div");
      friendsPage.className = "profilePage__FriendsPage";
      friendsPage.innerHTML = `
        <a href="/profiles/user/${viewUserInfo.id}">Back to Profile</a>
        <h4 class="text-center pt-3">Friends</h4>
        <div class="row">
          <div class="col">
            <div class="profilePage__FriendsPage--FriendsContainer">
              <div class="row">
                <input class="profilePage__FriendsPage--Search" type="text" name="profilePage-SearchFriends" value="" placeholder="Search friends...">
              </div>
            </div>
          </div>
        </div>
      `;

      //friends list
      friendsPage.appendChild(makeFriendList(friendList));

      profile.appendChild(friendsPage);
    }

    function makeFriendList(list) {
      if (list) {
        var friendTotal = list.length;
        //sort alphabetically
        list.sort(function(a, b) {
          if (a.friend_name < b.friend_name) return -1;
          if (a.friend_name > b.friend_name) return 1;
          return 0;
        });

        var friendBox = document.createElement("div");
        friendBox.className = "row profilePage__FriendsPage--FriendsBox"
        friendBox.innerHTML = `
          <p style="width: 100%;">Total Friends (${friendTotal})</p>
        `;

        for (var i = 0; i < friendTotal; i++) {
          var friendCol = document.createElement("div");
          friendCol.className = "col-sm-6 col-md-4 px-0";
          friendCol.innerHTML = `
            <a href="/profiles/user/${list[i].friend_id}" style="text-decoration: none;">
            <div class="profilePage__FriendsPage--Friends">
              <div class="profilePage__FriendsPage--FriendIconBox">
                <img class="profilePage__FriendsPage--FriendIcon" src="/user_data/${list[i].profile_img}">
              </div>
              <span>${list[i].friend_name}</span>
            </div>
            </a>
          `;
          friendBox.appendChild(friendCol);
        }
        return friendBox;
      } else {
          var friendBox = document.createElement("div");
          friendBox.className = "row profilePage__FriendsPage--FriendsBox"
          friendBox.innerHTML = `
            <p style="width: 100%;">Total Friends (0)</p>
          `;
          return friendBox;
      }
    }


    function makePhotoUploadPage() {
      var photosUpload = document.createElement("div");
      photosUpload.className = "profilePage__photosUpload";
      photosUpload.innerHTML = `
        <h4 class="text-center pt-3">Upload a Photo</h4>
        <div class="row">
          <div class="col">
            <div class="profilePage__photosUpload--PhotosUploadContainer">
              <form class="" enctype="multipart/form-data" action="/posts/photos" method="post">
                <div class="row">
                  <div class="col-md-4">
                    <div class="row">
                      <div class="profilePage__photosUpload--photoBox">
                        <img class="profilePage__photosUpload--photo" src="">
                      </div>
                      <div class="profilePage__photosUpload--uploader">
                        <input type="hidden">
                        <input class="profilePage__photosUpload--photos_ImgInput" type="file" id="photos_ImgInput" name="post_img_upload" value="" required>
                        <p class="settingsUploadMessage text-center"><i class=""></i></p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="profilePage__photosUpload--description">
                      <p>Would you like to describe this image?</p>
                      <textarea class="profilePage__photosUpload--textInput" name="photosUpload-description"placeholder="Tell us about this image..."></textarea>
                      <input class="btn btn-success" type="submit" name="photosUpload-uploadBtn" value="Upload">
                      <input class="btn btn-danger" type="button" name="photosUpload-cancelBtn" value="Cancel">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;

      profile.appendChild(photosUpload);
      photosUpload.querySelector(".profilePage__photosUpload--textInput")
        .addEventListener("keydown", uploadPhotoDescDown);

    }


    function uploadPhotoDescDown(event) {
      //resize text area
      event.target.style.height = "";
      event.target.style.height = event.target.scrollHeight + 15 + "px";
    }

    function makePhotosPage() {

      var photosPage = document.createElement("div");
      photosPage.className = "profilePage__photosPage";
      photosPage.innerHTML = `
        <a href="/profiles/user/${viewUserInfo.id}">Back to Profile</a>
        <h4 class="text-center pt-3">Photos</h4>

          <div class="profilePage__photosPage--PhotosContainer row">

          </div>
      `;

      //photos
      if (viewPost) {
        var viewPhoto = [];
        viewPost.forEach(function(value) {
          if (value.photo == 1) {
            var photo = {
              userId: value.user_id,
              postId: value.id,
              photoName: value.photoName
            }
            viewPhoto.push(photo);
          }
        });
        for (var i = 0; i < viewPhoto.length; i++) {
          var photo = document.createElement("div");
          photo.className = "col-6 col-sm-4 col-md-3 px-0";
          photo.innerHTML = `
            <a href="/profiles/user/${viewUserInfo.id}?pageAction=post&postId=${viewPhoto[i].postId}">
              <div class="profilePage__photosPage--viewPhotoBox">
                <img class="profilePage__photosPage--viewPhoto" name="post-${viewPhoto[i].postId}" src="/user_data/${viewPhoto[i].userId}/${viewPhoto[i].photoName}">
              </div>
            </a>
          `;
          //console.log(photosPage.children[2].children[0].children[0]);
          photosPage.children[2].appendChild(photo);
        }
      }
      //upload button
      if (currentUserId == viewUserInfo.id) {
        var uploadPhoto = document.createElement("div");
        uploadPhoto.className = "text-center";
        uploadPhoto.innerHTML = `
          <input class="btn btn-success mb-3" type="button" name="uploadPhotoProfile" value="Upload A New Image">
        `;
        photosPage.insertBefore(uploadPhoto, photosPage.children[2]);
      }

      profile.appendChild(photosPage);
    }

    // function makeDisplayPhotosPage(postId) {
    //   var post;
    //   viewPost.forEach(function(value) {
    //     if (value.id == postId) {
    //       post = value;
    //     }
    //   });
    //
    //   var displayPhoto = document.createElement("div");
    //   displayPhoto.className = "profilePage__photosPage__displayContainer";
    //   displayPhoto.innerHTML = `
    //     <p><a href="">Back to Profile</a> | <a href="">Back to Photos</a></p>
    //     <div class="profilePage__photosPage--displayPhotoContainer">
    //       <div class="profilePage__photosPage--displayPhotoBox">
    //         <img class="profilePage__photosPage--displayPhoto" src="/user_data/${post.user_id}/${post.photoName}">
    //       </div>
    //     </div>
    //     <div class="viewPost postID-${post.id}">
    //       <div class='viewPost__postBox'>
    //         <div class="row mx-0">
    //           <div class="viewPost__postUserIconBox">
    //             <img class="viewPost__postUserIcon" src="/user_data/${post.img_src}" alt="profile picture">
    //           </div>
    //           <a class="viewPost__name" href="#">${post.name}</a>
    //           <span class="viewPost__date">${post.created_at}</span>
    //         </div>
    //         <div class="row mx-0">
    //           <div class="viewPost__content">
    //             ${post.content}
    //           </div>
    //         </div>
    //         <div class="row mx-0 viewPost__likeCommentShare">
    //           <div class="row mx-0">
    //             <div class="btn-group">
    //               <a class="btn btn-default likeOrDislikeBtn" href="">Like</a>
    //               <a class="btn btn-default showCommentsBtn" href="">Comment</a>
    //               <a class="btn btn-default" href="">Share</a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   `;
    //
    //   profile.appendChild(displayPhoto);
    // }


    //css custom
    //document.body.style.backgroundColor = "#EEE";



  }
})();

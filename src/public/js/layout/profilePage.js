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
        profileSettings(event);
      }
      if (event.target.name == "settingsCancel") {
        cancelSettingsPage(event);
      }
      if (event.target.name == "settingsSave") {
        saveSettingsPage(event);
      }
    }

    function profileChangeDir(event) {
      if (event.target.id == "settings_ImgInput") {
        settingsImageUpload(event);
      }
    }

    // var settings_ImgInput = profile.querySelector("#settings_ImgInput");
    // if (settings_ImgInput) {
    //   settings_ImgInput.addEventListener("change", settingsImageUpload);
    // }

    function descReadMore(event) {
      event.preventDefault();
      descBox.children[1].innerHTML = user_descFull + " <a class='descShowLess' href=''>Show Less</a>";
    }

    function descShowLess(event) {
      event.preventDefault();
      descBox.children[1].innerHTML = user_descShort;
    }

    function profileSettings(event) {
      var profileBody = profile.querySelector(".profileBody");
      profileBody.style.display="none";

      makeSettingsPage();
    }

    function cancelSettingsPage(event) {
      var profileBody = profile.querySelector(".profileBody");
      profileBody.style.display="flex";

      profile.removeChild(profile.children[profile.children.length-1]);
    }

    function settingsImageUpload(event) {
      var newImage = event.target.files[0];
      var uploadMessage = event.target.parentElement.children[2];
      var settingsImage = event.target.parentElement.parentElement.children[0].children[0];

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
          settingsImage.onload = function() {
            //console.log("revoked");
            window.URL.revokeObjectURL(imgURL);
          }
          settingsImage.src = imgURL;
          uploadMessage.children[0].className = "fa fa-check-circle text-success size-20px";
          uploadMessage.children[0].innerText = " Good image!";
        }
      }

    }

    function saveSettingsPage(event) {

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

      function month_name(num) {
        var mlist = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return mlist[num];
      }

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

    //css custom
    //document.body.style.backgroundColor = "#EEE";



  }
})();

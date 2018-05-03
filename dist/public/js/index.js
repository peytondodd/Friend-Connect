var indexPage = (function() {

  var index = document.querySelector(".index");
  var about = document.querySelector(".about");
  if (index) {
    var aboutBox = index.querySelector(".about-btn-box");
    //registration inputs
    var firstName = index.querySelector("input[name='first_name']");
    var lastName = index.querySelector("input[name='last_name']");
    var email = index.querySelector(".email");
    var confirmEmail = index.querySelector(".confirm-email");
    var password = index.querySelector(".password");
    var confirmPassword = index.querySelector(".confirm-password");
    var registerIndex = index.querySelector("input[name='register_index']");
    var registerForm = index.querySelector(".registerform");
    //registration errors
    var firstNameErr = index.querySelector(".first_name_err");
    var lastNameErr = index.querySelector(".last_name_err");
    var emailErr = index.querySelector(".email_err");
    var confirmEmailErr = index.querySelector(".confirm_email_err");
    var passwordErr = index.querySelector(".password_err");
    var confirmPasswordErr = index.querySelector(".confirm_password_err");

    aboutBox.addEventListener("click", aboutTransition);
    email.addEventListener("keyup", showConfirmEmail);
    password.addEventListener("keyup", showConfirmPassword);
    //registration inputs
    registerIndex.addEventListener("click", registerBtn);

  }

  function aboutTransition() {
    about.scrollIntoView({behavior: "smooth"});
  }

  function showConfirmEmail(event) {

    if (event.target.value.length < 5) {
      confirmEmail.style.display = "none";
    }
    if (event.target.value.length >= 5) {
      confirmEmail.style.display = "block";
    }
  }
  function showConfirmPassword(event) {
    if (event.target.value.length <= 6) {
      confirmPassword.style.display = "none";
    }
    if (event.target.value.length > 6) {
      confirmPassword.style.display = "block";
    }
  }

  // REGISTRATION VALIDATION

  function registerBtn(event) {
    var firstNameSuccess = 1,
        lastNameSuccess = 1,
        emailSuccess = 1,
        confirmEmailSuccess = 1,
        passwordSuccess = 1,
        confirmPasswordSuccess = 1;

    if (firstName.value.length == 0) {
      firstName.className = "form-control is-invalid";
      firstNameErr.innerHTML = "What is your first name?";
      firstNameSuccess = 0;
    } else if (firstNameSuccess == 1) {
      firstName.className = "form-control is-valid";
      firstNameErr.innerHTML = "";
    }

    if (lastName.value.length == 0) {
      lastName.className = "form-control is-invalid";
      lastNameErr.innerHTML = "What is your last name?";
      lastNameSuccess = 0;
    } else if (lastNameSuccess == 1) {
      lastName.className = "form-control is-valid";
      lastNameErr.innerHTML = "";
    }

    if (email.value.length == 0 ) {
      email.className = "email form-control is-invalid";
      emailErr.innerHTML = "You need an email to log in.";
      emailSuccess = 0;
    } else if (email.value.length > 0) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email.value) == false) {
        email.className = "email form-control is-invalid";
        emailErr.innerHTML = "Please enter a valid email.";
        emailSuccess = 0;
      } else {
        email.className = "email form-control is-valid";
        emailErr.innerHTML = "Please enter a valid email.";
        emailSuccess = 1;
      }
    } else if (emailSuccess == 1) {
      email.className = "email form-control is-valid";
      emailErr.innerHTML = "";
    }

    if (confirmEmail.value.length == 0 && emailSuccess == 1) {
      confirmEmail.className = "confirm-email form-control is-invalid";
      confirmEmailErr.innerHTML = "Please confirm your email.";
      confirmEmailSuccess = 0;
    } else if (confirmEmail.value != email.value && emailSuccess == 1) {
      confirmEmail.className = "confirm-email form-control is-invalid";
      confirmEmailErr.innerHTML = "Sorry, but your emails don't match.";
      confirmEmailSuccess = 0;
    } else if (confirmEmailSuccess == 1 && emailSuccess == 1) {
      confirmEmail.className = "confirm-email form-control is-valid";
      confirmEmailErr.innerHTML = "";
    }


    if (password.value.length == 0) {
      password.className = "password form-control is-invalid";
      passwordErr.innerHTML = "You forgot to enter a password.";
      passwordSuccess = 0;
    } else if (password.value.length < 8) {
      password.className = "password form-control is-invalid";
      passwordErr.innerHTML = "Sorry, your password must be at least 8 characters";
      passwordSuccess = 0;
    } else if (!password.value.match(/[a-zA-Z]/g)) {
      password.className = "password form-control is-invalid";
      passwordErr.innerHTML = "For security reasons, your password must contain a letter, a-z.";
      passwordSuccess = 0;
    } else if (!password.value.match(/[0-9]/g)) {
      password.className = "password form-control is-invalid";
      passwordErr.innerHTML = "For security reasons, your password must contain a number, 0-9.";
      passwordSuccess = 0;
    } else if (passwordSuccess == 1) {
      password.className = "password form-control is-valid";
      passwordErr.innerHTML = "";
    }


    if (confirmPassword.value.length == 0 && passwordSuccess == 1) {
      confirmPassword.className = "form-control confirm-password is-invalid";
      confirmPasswordErr.innerHTML = "Hey, you forgot to confirm your password.";
      confirmPasswordSuccess = 0;
    } else if (confirmPassword.value != password.value && passwordSuccess == 1) {
      confirmPassword.className = "form-control confirm-password is-invalid";
      confirmPasswordErr.innerHTML = "I think you need to re-type, your passwords don't match.";
      confirmPasswordSuccess = 0;
    } else if (confirmPasswordSuccess = 1) {
      confirmPassword.className = "form-control confirm-password is-valid";
      confirmPasswordErr.innerHTML = "";
    }

    if (firstNameSuccess != 1 || lastNameSuccess != 1 || emailSuccess != 1 ||
      confirmEmailSuccess != 1 || passwordSuccess != 1 || confirmPasswordSuccess != 1) {
      event.preventDefault();
    }
  }


})();

var registerPage = (function() {

  var registerPage = document.querySelector(".registerPage");
  if (registerPage) {
    //inputs
    var firstName = registerPage.querySelector("input[name='first_name']");
    var lastName = registerPage.querySelector("input[name='last_name']");
    var email = registerPage.querySelector(".email");
    var confirmEmail = registerPage.querySelector(".confirm-email");
    var password = registerPage.querySelector(".password");
    var confirmPassword = registerPage.querySelector(".confirm-password");
    var registerButton = registerPage.querySelector("input[name='register']");
    //errors
    var firstNameErr = registerPage.querySelector(".first_name_err");
    var lastNameErr = registerPage.querySelector(".last_name_err");
    var emailErr = registerPage.querySelector(".email_err");
    var confirmEmailErr = registerPage.querySelector(".confirm_email_err");
    var passwordErr = registerPage.querySelector(".password_err");
    var confirmPasswordErr = registerPage.querySelector(".confirm_password_err");

    email.addEventListener("keyup", showConfirmEmail);
    password.addEventListener("keyup", showConfirmPassword);
    registerButton.addEventListener("click", registerPageBtn);

    function showConfirmEmail(event) {

      if (event.target.value.length < 5) {
        confirmEmail.style.display = "none";
      }
      if (event.target.value.length >= 5) {
        confirmEmail.style.display = "block";
      }
    }
    function showConfirmPassword(event) {
      if (event.target.value.length <= 6) {
        confirmPassword.style.display = "none";
      }
      if (event.target.value.length > 6) {
        confirmPassword.style.display = "block";
      }
    }

    function registerPageBtn(event) {
      var firstNameSuccess = 1,
          lastNameSuccess = 1,
          emailSuccess = 1,
          confirmEmailSuccess = 1,
          passwordSuccess = 1,
          confirmPasswordSuccess = 1;

      if (firstName.value.length == 0) {
        firstName.className = "form-control is-invalid";
        firstNameErr.innerHTML = "What is your first name?";
        firstNameSuccess = 0;
      } else if (firstNameSuccess == 1) {
        firstName.className = "form-control is-valid";
        firstNameErr.innerHTML = "";
      }

      if (lastName.value.length == 0) {
        lastName.className = "form-control is-invalid";
        lastNameErr.innerHTML = "What is your last name?";
        lastNameSuccess = 0;
      } else if (lastNameSuccess == 1) {
        lastName.className = "form-control is-valid";
        lastNameErr.innerHTML = "";
      }

      if (email.value.length == 0 ) {
        email.className = "email form-control is-invalid";
        emailErr.innerHTML = "You need an email to log in.";
        emailSuccess = 0;
      } else if (email.value.length > 0) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.value) == false) {
          email.className = "email form-control is-invalid";
          emailErr.innerHTML = "Please enter a valid email.";
          emailSuccess = 0;
        } else {
          email.className = "email form-control is-valid";
          emailErr.innerHTML = "";
          emailSuccess = 1;
        }
      } else if (emailSuccess == 1) {
        email.className = "email form-control is-valid";
        emailErr.innerHTML = "";
      }

      if (confirmEmail.value.length == 0 && emailSuccess == 1) {
        confirmEmail.className = "confirm-email form-control is-invalid";
        confirmEmailErr.innerHTML = "Please confirm your email.";
        confirmEmailSuccess = 0;
      } else if (confirmEmail.value != email.value && emailSuccess == 1) {
        confirmEmail.className = "confirm-email form-control is-invalid";
        confirmEmailErr.innerHTML = "Sorry, but your emails don't match.";
        confirmEmailSuccess = 0;
      } else if (confirmEmailSuccess == 1 && emailSuccess == 1) {
        confirmEmail.className = "confirm-email form-control is-valid";
        confirmEmailErr.innerHTML = "";
      }


      if (password.value.length == 0) {
        password.className = "password form-control is-invalid";
        passwordErr.innerHTML = "You forgot to enter a password.";
        passwordSuccess = 0;
      } else if (password.value.length < 8) {
        password.className = "password form-control is-invalid";
        passwordErr.innerHTML = "Sorry, your password must be at least 8 characters";
        passwordSuccess = 0;
      } else if (!password.value.match(/[a-zA-Z]/g)) {
        password.className = "password form-control is-invalid";
        passwordErr.innerHTML = "For security reasons, your password must contain a letter, a-z.";
        passwordSuccess = 0;
      } else if (!password.value.match(/[0-9]/g)) {
        password.className = "password form-control is-invalid";
        passwordErr.innerHTML = "For security reasons, your password must contain a number, 0-9.";
        passwordSuccess = 0;
      } else if (passwordSuccess == 1) {
        password.className = "password form-control is-valid";
        passwordErr.innerHTML = "";
      }


      if (confirmPassword.value.length == 0 && passwordSuccess == 1) {
        confirmPassword.className = "form-control confirm-password is-invalid";
        confirmPasswordErr.innerHTML = "Hey, you forgot to confirm your password.";
        confirmPasswordSuccess = 0;
      } else if (confirmPassword.value != password.value && passwordSuccess == 1) {
        confirmPassword.className = "form-control confirm-password is-invalid";
        confirmPasswordErr.innerHTML = "I think you need to re-type, your passwords don't match.";
        confirmPasswordSuccess = 0;
      } else if (confirmPasswordSuccess = 1) {
        confirmPassword.className = "form-control confirm-password is-valid";
        confirmPasswordErr.innerHTML = "";
      }

      if (firstNameSuccess != 1 || lastNameSuccess != 1 || emailSuccess != 1 ||
        confirmEmailSuccess != 1 || passwordSuccess != 1 || confirmPasswordSuccess != 1) {
        event.preventDefault();
      }
    }

  }


})();

var loginPage = (function() {

  var loginPage = document.querySelector(".loginPage");
  if (loginPage) {
    var email = loginPage.querySelector(".loginPage-email");
    var password = loginPage.querySelector(".loginPage-password");
    var emailErr = loginPage.querySelector(".loginPage-emailErr");
    var passwordErr = loginPage.querySelector(".loginPage-passwordErr");
    var loginMessage = loginPage.querySelector(".loginMessage");
    var loginButton = loginPage.querySelector("input[name='login']");

    loginButton.addEventListener("click", function(event) {
      var emailSuccess = 1, passwordSuccess = 1;

      if (email.value.length == 0) {
        email.className = "form-control loginPage-email is-invalid";
        emailErr.innerHTML = "Please enter your email.";
        emailSuccess = 0;
      } else if (email.value.length > 0) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.value) == false) {
          email.className = "form-control loginPage-email is-invalid";
          emailErr.innerHTML = "Please enter a valid email.";
          emailSuccess = 0;
        } else {
          email.className = "form-control loginPage-email is-valid";
          emailErr.innerHTML = "";
          emailSuccess = 1;
        }
      } else if (emailSuccess == 1) {
        email.className = "form-control loginPage-email is-valid";
        emailErr.innerHTML = "";
      }

      if (password.value.length == 0 && emailSuccess == 1) {
        password.className = "form-control loginPage-password is-invalid";
        passwordErr.innerHTML = "Please enter your password.";
        passwordSuccess = 0;
      } else if (passwordSuccess == 1) {
        password.className = "form-control loginPage-password is-valid";
        passwordErr.innerHTML = "";
      }

      if (emailSuccess != 1 || passwordSuccess != 1) {
        event.preventDefault();
      }
    });
  }
})();

var profileSetupPage = (function() {
  var profileSetupPage = document.querySelector(".profileSetupPage-bg");
  if (profileSetupPage) {
    var page1 = profileSetupPage.querySelector(".profileSetupPage1");
    var page2 = profileSetupPage.querySelector(".profileSetupPage2");
    var page3 = profileSetupPage.querySelector(".profileSetupPage3");
    //page 1 buttons
    var setUpNow = page1.querySelector("input[name='setUpNow']");
    //page 2
    var imgSelect = page2.querySelector(".profileSetupPage2-profileSelector");
    var currentProfileIMG = page2.querySelector(".profileSetupPage2-profileIMG");
    var img_input = page2.querySelector("#img_input");
    var psp2back = page2.querySelector(".psp2-back");
    var nextBtn = page2.querySelector("input[name='next']");
    var hiddenDefault = page2.querySelector("input[name='defaultProfile']");
    var uploadMessage = page2.querySelector(".uploadMessage");
    //page 3
    var psp3back = page3.querySelector(".psp3-back");

    //page 1 button
    setUpNow.addEventListener("click", pspNext);
    //page 2
    imgSelect.addEventListener("click", selectedIMG);
    img_input.addEventListener("change", imgUpload);
    psp2back.addEventListener("click", pspBack);
    nextBtn.addEventListener("click", pspNext);
    //page 3
    psp3back.addEventListener("click", pspBack);

    if (page1.style.display = "block") {
      if (window.innerHeight <= 575) {
        profileSetupPage.style.height = "675px";
      } else {
        profileSetupPage.style.height = "100vh";
      }
    }
  }
  //page 2 image selectors
  function selectedIMG(event) {
    var thisEvent;
    if(event.target.children[0]){
      thisEvent = event.target.children[0];
    } else if (event.target.localName == "img"){
      thisEvent = event.target
    }
    currentProfileIMG.src = thisEvent.src;
    hiddenDefault.value = thisEvent.alt;
    uploadMessage.children[0].className = "";

    if (img_input.files.length) { //reset the input
      img_input.value = null;
    }
  }

  function imgUpload(event) {
    var newImage = event.target.files[0];

    if (newImage) {
      var imageType = /image.*/;
      if (!newImage.type.match(imageType)) {
        //console.log("not image");
        uploadMessage.children[0].className = "fa fa-times-circle text-danger size-30px";
      } else if (newImage.size >= 50000000) {
        //console.log("image is too big.");
        uploadMessage.children[0].className = "fa fa-times-circle text-danger size-30px";
      } else {
        var imgURL = window.URL.createObjectURL(newImage);
        currentProfileIMG.onload = function() {
          //console.log("revoked");
          window.URL.revokeObjectURL(imgURL);
        }
        currentProfileIMG.src = imgURL;
        uploadMessage.children[0].className = "fa fa-check-circle text-success size-30px";
      }
    }
  }

  function pspBack(event) {
    var pageFinder = event.target.parentElement.classList[0];
    if (pageFinder == "profileSetupPage2") {
      currentPage = page2;
      targetPage = page1;
    } else if (pageFinder == "profileSetupPage3") {
      currentPage = page3;
      targetPage = page2;
    }
    var fadein = window.innerHeight <= 825 ?
                  // currentPage != page2 ?
                  //   "fade-in-towards-right-sm" :
                    "fade-in-towards-right-sm" :
                "fade-in-towards-right";
    var fadeout = window.innerHeight <= 1065 ?
                    (window.innerHeight <= 825 && currentPage == page2) || currentPage == page3 ?
                      "fade-out-towards-right-sm" :
                      "fade-out-towards-right" :
                  "fade-out-towards-right";

    currentPage.classList.add(fadeout);
    setTimeout(function() {
      currentPage.style.display = "none";
      currentPage.classList.remove(fadeout);
      targetPage.classList.remove(fadein);
    }, 500);
    targetPage.style.display = "block"
    targetPage.classList.add(fadein);

    //resize background mobile
    if (targetPage == page1) {
      if (window.innerHeight <= 575) {
        profileSetupPage.style.height = "675px";
      }
    } else if (targetPage == page2) {
      if (window.innerHeight <= 825) {
        profileSetupPage.style.height = "825px";
      }
    }
  }

  function pspNext(event) {
    var pageFinder = event.target.parentElement;
    if (pageFinder.parentElement.parentElement.parentElement.classList[0] ==
    "profileSetupPage1") {
      currentPage = page1;
      targetPage = page2;
    } else if (pageFinder.classList[0] == "profileSetupPage2") {
      currentPage = page2;
      targetPage = page3;
    }

    var fadein = window.innerHeight <= 1065 ?
                  window.innerHeight <= 825 & currentPage == page1 ?
                    "fade-in-towards-left-sm" :
                    currentPage == page2 ?
                      "fade-in-towards-left-sm" :
                      "fade-in-towards-left" :
                "fade-in-towards-left";
    var fadeout = window.innerHeight <= 825?
                "fade-out-towards-left-sm" :
                "fade-out-towards-left";

    currentPage.classList.add(fadeout);
    setTimeout(function() {
      currentPage.style.display = "none";
      currentPage.classList.remove(fadeout);
      targetPage.classList.remove(fadein);
    },500);
    targetPage.style.display = "block";
    targetPage.classList.add(fadein);

    //resize background mobile
    if (targetPage == page2) {
      console.log(window.innerHeight);
      // if (window.innerWidth <= 584) {
      if (window.innerHeight <= 825) {
        profileSetupPage.style.height = "825px";
      }
    } else if (targetPage == page3) {
      if (window.innerHeight <= 1065) {
        profileSetupPage.style.height = "1065px";
      }
    }
  }



})();

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
      // if (event.target.className == "viewPost__photosPage--viewPhoto" ||
      // event.target.className == "viewPost__photosPage--viewPhotoBox") {
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
    } else if (pageAction[0] == "post") {
      profile.children[1].style.display = "none";
      if (profile.children.length > 2) {
        for (var i = profile.children.length-1; i > 1; i--) {
          profile.removeChild(profile.children[i]);
        }
      }
      makeDisplayPhotosPage(pageAction[1]);
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

    function displayProfilePhotos(event) {
      profile.children[1].style.display = "none";
      if (profile.children.length > 2) {
        for (var i = profile.children.length-1; i > 1; i--) {
          profile.removeChild(profile.children[i]);
        }
      }
    
      if (event.target.localName == "div") {
        var postId = event.target.children[0].name.split("-")[1];
      } else if (event.target.localName == "img") {
        var postId = event.target.name.split("-")[1];
      }
      makeDisplayPhotosPage(postId);
    }

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
      photosPage.className = "viewPost__photosPage";
      photosPage.innerHTML = `
        <a href="/profiles/user/${viewUserInfo.id}">Back to Profile</a>
        <h4 class="text-center pt-3">Photos</h4>

          <div class="viewPost__photosPage--PhotosContainer row">

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
              <div class="viewPost__photosPage--viewPhotoBox">
                <img class="viewPost__photosPage--viewPhoto" name="post-${viewPhoto[i].postId}" src="/user_data/${viewPhoto[i].userId}/${viewPhoto[i].photoName}">
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

    function makeDisplayPhotosPage(postId) {
      var post;
      viewPost.forEach(function(value) {
        if (value.id == postId) {
          post = value;
        }
      });
    
      var displayPhoto = document.createElement("div");
      displayPhoto.className = "profilePage__photosPage__displayContainer";
      ////displayPhoto.className = "viewPostBox";
      // displayPhoto.innerHTML = `
      //   <div class="viewPost postID-${post.id}">
      //     <div class="viewPost__photosPage--displayPhotoContainer">
      //       <div class="viewPost__photosPage--displayPhotoBox">
      //         <img class="viewPost__photosPage--displayPhoto" src="/user_data/${post.user_id}/${post.photoName}">
      //       </div>
      //     </div>
      //     <div class='viewPost__postBox'>
      //       <div class="row mx-0">
      //         <div class="viewPost__postUserIconBox">
      //           <img class="viewPost__postUserIcon" src="/user_data/${post.img_src}" alt="profile picture">
      //         </div>
      //         <a class="viewPost__name" href="#">${post.name}</a>
      //         <span class="viewPost__date">${post.created_at}</span>
      //       </div>
      //       <div class="row mx-0">
      //         <div class="viewPost__content">
      //           ${post.content}
      //         </div>
      //       </div>
      //       <div class="row mx-0 viewPost__likeCommentShare">
      //         <div class="row mx-0">
      //           <div class="btn-group">
      //             <a class="btn btn-default likeOrDislikeBtn" href="">Like</a>
      //             <a class="btn btn-default showCommentsBtn" href="">Comment</a>
      //             <a class="btn btn-default" href="">Share</a>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // `;
    
      profile.appendChild(displayPhoto);
    }


    //css custom
    //document.body.style.backgroundColor = "#EEE";



  }
})();


var createPost = (function() {

  var createAPost = document.querySelector(".createPost");
  if (createAPost) {

    //console.log("from createPost.js");
    var input = createAPost.querySelector(".createPost__input");
    var inputBox = input.parentNode;
    var iconBox = createAPost.querySelector(".createPost__iconBox");
    var postName = createAPost.querySelector(".createPost__name");
    var textWidth = createAPost.querySelector(".createPost__textWidthCount");
    var postBtn = createAPost.querySelector(".createPost__postBtn");
    var charCounter = createAPost.querySelector(".createPost__charCounter");

    input.addEventListener("focus", inputFocus);
    input.addEventListener("focusout", inputFocusOut);
    input.addEventListener("keydown", inputTypeDown);
    input.addEventListener("keyup", inputTypeUp);
    window.addEventListener("resize", responsive);
    postBtn.addEventListener("click", submitPost);


    function inputFocus() {
      iconBox.style.visibility = "visible";
      iconBox.style.opacity = "1";

      if (window.innerWidth < 576) {
        //iconBox.style.display = "block";
        //iconBox.style.paddingLeft = "0";
        iconBox.style.position = "static";
        postName.style.display = "inline-block";
      }

    }

    function inputFocusOut() {
      iconBox.style.opacity = "0";
      iconBox.style.visibility = "hidden";
      if (window.innerWidth < 576) {
        //iconBox.style.display = "none";
        iconBox.style.position = "absolute";
        postName.style.display = "none";
      }
    }

    function inputTypeDown(event) {
      //console.log(event);
      // big fonts aesthetics
      if (event.target.value.length > 0) {
        event.target.style.fontSize = "25px";
      }
      if (event.target.value.length > 50) {
        event.target.style.fontSize = "20px";
        //textWidth.style.fontSize = "20px";
      }
      if (event.target.value.length > 100 || event.keyCode == 8) {
        event.target.style.fontSize = "16px";
        //textWidth.style.fontSize = "16px";
      }

      //resize text area
      this.style.height = "";
      this.style.height = this.scrollHeight + 15 + "px";

      //max length
      if (event.target.value.length > 1999) {
        if (event.keyCode != 8) {
          event.preventDefault();
        }
      }
    }

    function inputTypeUp(event) {
      var temp = event.target.value;
      event.target.value = "";
      event.target.value = temp.substring(0, 2000);

      charCounter.innerHTML = event.target.value.length;


    }

    function responsive() {
      if (window.innerWidth > 575) {
        iconBox.style.position = "absolute";
        postName.style.display = "none";
      } else if (window.innerWidth < 576) {
        iconBox.style.position = "static";
        postName.style.display = "inline-block";
      }
    }


    function submitPost() {
      if (input.value.length > 0) {
      
        var submitPost = new XMLHttpRequest();
        submitPost.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              //success
              //console.log(this.responseText);
              //console.log("success");
              input.value = "";
              input.style.fontSize = "16px";
              input.style.height = "94px";
              charCounter.innerHTML = "0";
            } else {
              //failed
            }
          }

        };
        submitPost.open("POST", "/posts/createPost",true);
        submitPost.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        submitPost.send("createPostContent="+input.value+"&"+
                        "currentUserId="+currentUserId
        );

      }
    }
  }

})();

var friendBtn = (function() {

    var friendBtnBox = document.querySelector(".profilePage__header--friendBtnBox");
    if (friendBtnBox) {
        var friendStatus = friendBtnBox.querySelector("button[name='friendBtn-Status']");
    }
    if (friendStatus) {

        friendBtnBox.addEventListener("click", friendBtnClick);
        
        function friendBtnClick(event) {
            //console.log(event.target.innerText);
            if (event.target.innerText == "Add Friend") {
                addFriend();
            }
            if (event.target.innerText == "Cancel") {
                cancelFriend();
            }
            if (event.target.innerText == "Accept") {
                acceptFriend();
            }
            if (event.target.innerText == "Decline") {
                declineFriend();
            }
            if (event.target.innerText == "Unfriend") {
                unfriendFriend();
            }
            if (event.target.innerText == "Block") {
                blockFriend();
            }
            if (event.target.innerText == "Unblock") {
                unblockFriend();
            }
            
        }

        // Add friend
        function addFriend() {
            ajaxCall("GET", "/friends/add?addFriendId="+viewUserInfo.id, true)
                .then(addFriendSuccess, addFriendFail);
            
            function addFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }

                friendBtnBox.appendChild(friendActionBtn("Cancel"));
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function addFriendFail(data) {}
        }
        // Cancel Friend
        function cancelFriend() {
            ajaxCall("GET", "/friends/cancel?cancelFriendId="+viewUserInfo.id, true)
                .then(cancelFriendSuccess, cancelFriendFail);
            
            function cancelFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function cancelFriendFail(data) {}
        }

        // accept Friend
        function acceptFriend() {
            ajaxCall("GET", "/friends/accept?acceptFriendId="+viewUserInfo.id, true)
            .then(acceptFriendSuccess, acceptFriendFail);

            function acceptFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Unfriend"));
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function acceptFriendFail(data) {}
        }

        // unfriend Friend
        function unfriendFriend() {
            ajaxCall("GET", "/friends/unfriend?unfriendFriendId="+viewUserInfo.id, true)
            .then(unfriendFriendSuccess, unfriendFriendFail);

            function unfriendFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function unfriendFriendFail(data) {}
        }

        // decline friend
        function declineFriend() {
            ajaxCall("GET", "/friends/decline?declineFriendId="+viewUserInfo.id, true)
            .then(declineFriendSuccess, declineFriendFail);

            function declineFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function declineFriendFail(data) {}
        }

        // block friend
        function blockFriend() {
            ajaxCall("GET", "/friends/block?blockFriendId="+viewUserInfo.id, true)
            .then(blockFriendSuccess, blockFriendFail);

            function blockFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
            }
            function blockFriendFail(data) {}
        }
        //unblock Friend
        function unblockFriend() {
            ajaxCall("GET", "/friends/unblock?unblockFriendId="+viewUserInfo.id, true)
            .then(unblockFriendSuccess, unblockFriendFail);
            function unblockFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                if (data == "Add Friend") {
                    friendBtnBox.appendChild(friendActionBtn("Block"));
                } else if (data == "Accept") {
                    friendBtnBox.appendChild(friendActionBtn("Decline"));
                    friendBtnBox.appendChild(friendActionBtn("Block"));
                } else if (data == "Friends") {
                    friendBtnBox.appendChild(friendActionBtn("Unfriend"));
                    friendBtnBox.appendChild(friendActionBtn("Block"));
                }
            }
            function unblockFriendFail(data) {}
        }

        //friendActionBTN MAKER
        function friendActionBtn(btnName) {
            var friendActionBtn = document.createElement("button");
            friendActionBtn.className = "btn btn-danger profilePage__header-friendBtn";
            friendActionBtn.type = "button";
            friendActionBtn.name = "friendBtn-Status-Action";
            friendActionBtn.innerText = btnName;
            return friendActionBtn;
        }

        // AJAX CALL
        function ajaxCall(method, url, sync, postData=0) {
            var promiseObj = new Promise (function(resolve, reject) {
            var friendAction = new XMLHttpRequest();
            friendAction.onreadystatechange = function() {
                if (this.readyState == 4) {
                if (this.status == 200) {
                    //console.log(this.responseText);
                    resolve(this.responseText);
                } else {
                    reject(this.status);
                }
                }
            };
    
            friendAction.open(method, url, sync);
            if (method == "GET") {
                friendAction.send()
            } else if (method == "POST") {
                friendAction.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                friendAction.send(postData);
            }
            });
            return promiseObj;
        }

        // LIFE AJAX CALLER - REAL TIME
        function liveAjaxCall(statusData) {
            var promiseObj = new Promise (function(resolve, reject) {
            var getFriendStatus = new XMLHttpRequest();
            getFriendStatus.onreadystatechange = function() {
                if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.responseText);
                } else {
                    reject(this.status);
                }
                }
            };
            getFriendStatus.open("POST", "/posts/realTimeEvents", true);
            getFriendStatus.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            getFriendStatus.send(statusData);
            });
            return promiseObj;
        }

        // LIVE EVENTS LIVE EVENTS LIVE EVENTS
        var oldFriendStatus = friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText;
        var viewedFriendId = viewUserInfo.id;
        var timestamp = "0000-00-00 00:00:00";

        ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
            .then(liveStatusSuccess, liveStatusFail);
        
        function liveStatusSuccess(data) {
            if (data != "") {
                console.log(data);
                data = JSON.parse(data);
            
                var currentStatus = friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText;
                if (data.newStatus != currentStatus) {
                    friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data.newStatus;
                    while(friendBtnBox.children.length > 1) {
                        friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                    }
                    if (data.newStatus == "Pending") {
                        friendBtnBox.appendChild(friendActionBtn("Cancel"));
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Accept") {
                        friendBtnBox.appendChild(friendActionBtn("Decline"));
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Friends") {
                        friendBtnBox.appendChild(friendActionBtn("Unfriend"));
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Add Friend") {
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Unblock") {
                        //nothing
                    } else if (data.newStatus == "No Access") {
                        //redirect back
                        window.location.replace("/profiles/blocked");
                    }
                }
                var oldFriendStatus = data.newStatus;
                var timestamp = data.newTimestamp;
                // console.log(oldFriendStatus);
                ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
                    .then(liveStatusSuccess, liveStatusFail);
            } else {
                // ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
                //     .then(liveStatusSuccess, liveStatusFail);
            }

        }
        function liveStatusFail(data) {
            ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
                .then(liveStatusSuccess, liveStatusFail);
        }

    }

  


})();

var viewPostContainer = (function() {

  var viewPostBox = document.querySelector(".viewPostBox");
  if (viewPostBox) {

    var likeOrDislikeBtn = viewPostBox.querySelectorAll(".likeOrDislikeBtn");
    //var likeCount = viewPostBox.querySelector(".viewPost__likeCount");
    var allPosts = viewPostBox.querySelectorAll(".viewPost");

    // likeOrDislikeBtn.forEach(function(btn) {
    //   btn.addEventListener("click", likeOrDislike);
    // });

    allPosts.forEach(function(post) {
      post.addEventListener("click", postClickDir);
      // post.addEventListener("change", function() {
      //   //console.log("hya");
      //   allPost.addEventListener("click", postClickDir);
      // });
    });

    function postClickDir(event) {
      if (event.target.className != "viewPost__name" && 
      event.target.className != "viewPost__postUserIconLink" && 
      event.target.className != "viewPost__postUserIcon" &&
      event.target.className != "viewPost__commentIconLink" && 
      event.target.className != "viewPost__commentIcon" && 
      event.target.className != "viewPost__commentName") {
        event.preventDefault();
      }
      //console.log(event.target);
      //event.preventDefault();
      //console.log(event.target);
      // LIKE  AND DISLIKE CLICKS
      if (event.target.className == "btn btn-default likeOrDislikeBtn") {
        likeOrDislike(event);
      }
      // SHOW COMMENT BUTTONS
      if (event.target.className == "btn btn-default showCommentsBtn" ||
      event.target.className == "viewPost__showComments") {
        showComments(event);
      }
      if (event.target.className == "viewPost__hideComments") {
        hideComments(event);
      }
      if (event.target.name == "makeAPostComment") {
        addComment(event);
      }
      if (event.target.className == "viewPost__viewOlderComments") {
        olderComments(event);
      }
      if (event.target.className == "viewPost__deleteComment") {
        deleteComment(event);
      }
      if (event.target.className == "viewPost__deletePost") {
        deletePost(event);
      }
      if (event.target.className == "viewPost__editPost") {
        editPost(event);
      }
      if (event.target.name == "viewPost__saveEdit" ||
      event.target.name == "viewPost__cancelEdit") {
        editPostAction(event);
      }

      //console.log(event.target);
    }
    if (pageAction) {
      if (pageAction[0] == "post") {
      //  var profile = document.querySelector(".profilePage");
      //   profile.children[1].style.display = "none";
      //   if (profile.children.length > 2) {
      //     for (var i = profile.children.length-1; i > 1; i--) {
      //       profile.removeChild(profile.children[i]);
      //     }
      //   }
        var post = [];
        viewPost.forEach(function(value) {
          if (value.id == pageAction[1]) {
            post.push(value);
          }
        });
        if (post[0]) {
          displayPost(post, 1);
        } else {
          window.location.replace("/profiles/user/"+viewUserInfo.id);
        }
      }
    }
    function likeOrDislike(event) {
      //console.log(event.target);
      var likePostId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1].split("-")[1];
      var likeDislike = event.target.innerHTML;

      ajaxCall("GET", "/posts/likeOrDislike?likePostId="+likePostId+"&likeDislike="+likeDislike+"&currentUserId="+currentUserId, true)
        .then(likeOrDislikeSuccess, likeOrDislikeFail);

      function likeOrDislikeSuccess(data) {
        event.target.innerHTML = data;
      }
      function likeOrDislikeFail(data) {}
    }

    function findPostComments (postId) {
      console.log(viewPost);
      if (viewPost) {
        if (postId == "ALL") {
          var comments = [];
          viewPost.forEach(function(value) {
            var commentsCount = value.comments.list.length;
            if (!commentsCount) {
              commentsCount = 0;
            }

            var postComments = {
              postId: value.id,
              //comments: value.comments.list,
              commentsCount: commentsCount
            }
            comments.push(postComments);
          });
        } else {
          var comments = [];
          viewPost.forEach(function(value) {
            if (value.id == postId) {
              comments = value.comments.list;
            }
          });
        }
        return comments;
      } else {
        return 0;
      }

    }

    function showComments(event) {
      var postId = event.target.parentElement.parentElement.parentElement.parentElement.className.split("-");
      var postBox = event.target.parentElement.parentElement.parentElement;
      if (postId[0] == "viewPost postID") {
        //comment link
        postId = postId[1];
        //remove the view comments link
        event.target.parentElement.removeChild(event.target);
      } else {
        //comment button
        postId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.className.split("-")[1];
        postBox = event.target.parentElement.parentElement.parentElement.parentElement;
        //remove the view comments link
        var commentLink = postBox.children[postBox.children.length-1];
        if (commentLink) {
          if (commentLink.children[0].children[0]) {
            if (commentLink.children[0].children[0].className == "viewPost__showComments") {
              postBox.removeChild(commentLink);
            }
          }
        }
      }
      // check if comment button or link has already been clicked
      var rowClassNames = [];
      for (var i = 0; i < postBox.children.length; i++) {
        rowClassNames.push(postBox.children[i].className);
      }
      if (rowClassNames.indexOf("row mx-0 makeCommentBox") != -1 ||
      rowClassNames.indexOf("row mx-0 viewCommentBox") != -1) {
        console.log("bad");
        return;
      } else {
        console.log("good");
      }

      var allComments = findPostComments(postId);

      // // make enter a comment box
      var createComment = createCommentInput();

      if (allComments) {
        var commentStart = 0;
        var commentLimit = 5; // # of comments shown at start

        var commentBox = commentLoader(allComments, commentStart, commentLimit, 1);

        postBox.appendChild(commentBox);
        postBox.appendChild(createComment);

      } else {
        // postBox.appendChild(createComment.firstChild);
        var cancelComment = document.createElement("div");
        cancelComment.className = "text-center cancelComment";
        cancelComment.innerHTML = `
          <a class="viewPost__hideComments" href="">^ Cancel comment</a>
        `;
        postBox.appendChild(cancelComment);
        postBox.appendChild(createComment);

      }

    }

    function createCommentInput() {
      var createComment = document.createElement("div");
      createComment.className = "row mx-0 makeCommentBox";
      createComment.innerHTML = `
        <div class="viewPost__createComment">
          <div class="viewPost__createContainer">
            <textarea class="viewPost__inputComment" rows="3" placeholder="Write a comment..."></textarea>
          </div>
          <input class="mt-2 float-right btn btn-success" type="button" name="makeAPostComment" value="Comment">
        </div>
      `;
      return createComment;
    }

    function hideComments(event) {
      var postBox = event.target.parentElement.parentElement;
      var postId = postBox.parentNode.className.split("-")[1];
      var rowClassNames = [];
      for (var i = 0; i < postBox.children.length; i++) {
        rowClassNames.push(postBox.children[i].className);
      }
      if (rowClassNames.indexOf("row mx-0 viewCommentBox") != -1) {
        console.log("view Comment Box");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "row mx-0 viewCommentBox") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      } if (rowClassNames.indexOf("row mx-0 makeCommentBox") != -1) {
        console.log("make Comment Box");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "row mx-0 makeCommentBox") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      } if (rowClassNames.indexOf("text-center cancelComment") != -1) {
        console.log("cancel comment");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "text-center cancelComment") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      }

      //show view Comment link
      var comments = findPostComments(postId)
      if (findPostComments(postId)) {
        if (comments.length > 0) {
          var viewComments = document.createElement("div");
          viewComments.className = "row";
          viewComments.innerHTML = `
            <div class="col">
              <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${comments.length}</span>)</a>
            </div>
          `;
          postBox.appendChild(viewComments);
        }
      }
    }

    function addComment(event) {
      var inputComment = event.target.parentElement.children[0].children[0];
      var postId = event.target.parentElement.parentElement.parentElement.parentElement.className.split("-")[1];
      var userId = currentUserId;

      if (inputComment.value != "") {
        var commentData = ("commentUserId="+userId+"&"+
                    "commentPostId="+postId+"&"+
                    "commentContent="+inputComment.value);

        ajaxCall("POST", "/posts/createComment", true, commentData)
          .then(addCommentSuccess, addCommentFail);
      }
      function addCommentSuccess(data) {
        inputComment.value = "";
      }
      function addCommentFail(data) {

      }
    }

    // View Older Comments()
    function olderComments(event) {
      var postBox = event.target.parentElement.parentElement;
      var postId = postBox.parentElement.className.split("-")[1];
      var createComment = createCommentInput();
      var allComments = findPostComments(postId);
      var commentsLeft = Number(event.target.textContent.split("(")[1].split(")")[0]);
      var commentsShown = event.target.parentElement.children.length - 2;
      var commentLimit = 5; // # of comments shown after view more

      if (commentsLeft - commentLimit > 0) {
        var commentBox = commentLoader(allComments, commentsShown, commentsShown + commentLimit);
      } else {
        console.log(commentsShown);
        console.log(commentsShown + commentsLeft);
        var commentBox = commentLoader(allComments, commentsShown, commentsShown + commentsLeft);
      }

      //add new comments
      console.log(commentBox);
      for (var i = commentBox.children.length-1; i >= 0; i--) {
        event.target.parentElement.insertBefore(commentBox.children[i], event.target.parentElement.children[2]);
      }
      //remove hide comment and view older comment(#) to be updated
      event.target.parentElement.removeChild(event.target.parentElement.children[0]);
      event.target.parentElement.removeChild(event.target.parentElement.children[0]);

    }

    function deleteComment(event) {
      var commentId = event.target.parentElement.parentElement.parentElement.className.split("-")[1];
      var userId = currentUserId;
      var commentData = ("deleteCommentUserId="+userId+"&"+
                          "deleteCommentCommentId="+commentId);

      ajaxCall("POST", "/posts/deleteComment", true, commentData)
        .then(deleteCommentSuccess, deleteCommentFail);

      function deleteCommentSuccess(data) {
        var comment = event.target.parentElement.parentElement.parentElement;//delete this
        var commentClass = comment.className;
        var commentId = commentClass.split("-")[1];
        var commentParent = comment.parentElement;
        var postId = commentParent.parentElement.parentElement.className.split("-")[1];
        console.log(postId);
        console.log(viewPost);

        //remove dom element
        for (var i = 0; i < commentParent.children.length; i++) {
          if (commentParent.children[i].className == commentClass) {
            commentParent.removeChild(comment);
          }
        }

        //remove from viewPost
        viewPost.forEach(function(value) {
          if (value.id == postId) {
            for (var i = 0; i < value.comments.count; i++) {
              if (value.comments.list[i]) {
                console.log("hello");
                if (value.comments.list[i].id == commentId) {
                  value.comments.list.splice(i, 1);
                  //console.log(value.comments);
                }
              }
            }
          }
        });

      }
      function deleteCommentFail(data) {}

    }

    function commentLoader(allComments, commentStart, commentLimit, invert = 0) {
      var oldComments = allComments.length - commentLimit;
      var commentBox = document.createElement("div");
      commentBox.className = "row mx-0 viewCommentBox";
      if (oldComments > 0) {
        commentBox.innerHTML = `
          <a href="" class="viewPost__hideComments">^ Hide comments</a>
          <a href="" class="viewPost__viewOlderComments">View older Comments (${oldComments})</a>
        `;
      } else {
        commentBox.innerHTML = `
          <a href="" class="viewPost__hideComments">^ Hide comments</a>
        `;
      }
      var order = [];
      if (invert = 1) {
        for (var i = commentLimit-1; i >= commentStart; i--) {
          order.push(i);
        }
      } else {
        for (var i = commentStart; i < commentLimit; i++) {
          order.push(i);
        }
      }
      //console.log(order);
      console.log(allComments);
      //comments from users
      for (var i = 0; i < order.length; i++) {
        if (allComments[order[i]]) {
          var newComment = document.createElement("div");
          newComment.className = "viewPost__commentContainer commentId-"+allComments[order[i]].id;
          newComment.innerHTML = `
            <div class="viewPost__commentIconBox">
              <a class="viewPost__commentIconLink" href="/profiles/user/${allComments[order[i]].user_id}">
                <img class="viewPost__commentIcon" src="/user_data/${allComments[order[i]].img_src}" alt="profile icon">
              </a>
            </div>
            <div class="viewPost__commentContent">
              <a class="viewPost__commentName" href="/profiles/user/${allComments[order[i]].user_id}">${allComments[order[i]].name} </a>
              <span>${allComments[order[i]].content}</span>
              <div class="">
                ${allComments[order[i]].created_at}
              </div>
            </div>
          `;
          //add delete link to comment
          if (currentUserId == allComments[order[i]].user_id) {
            var deleteComment = document.createElement("div");
            deleteComment.innerHTML = `
              <a class="viewPost__deleteComment" href="">delete</a>
            `;
            newComment.children[1].appendChild(deleteComment);
          }
          commentBox.appendChild(newComment);
        }
      }
      // console.log(commentBox.children[commentBox.children.length-1]);
      // console.log(commentBox.children.length);
      return commentBox;
    }

    function deletePost(event) {
      var postId = event.target.parentElement.parentElement.parentElement.parentElement.className.split("-")[1];
      var userId = currentUserId;
      var postData = ("deletePostUserId="+userId+"&"+
                          "deletePostId="+postId);

      ajaxCall("POST", "/posts/deletePost", true, postData)
        .then(deletePostSuccess, deletePostFail);

      function deletePostSuccess(data) {
        //remove from DOM
        var post = event.target.parentElement.parentElement.parentElement.parentElement;
        post.parentElement.removeChild(post);

        //remove from viewPost
        // var deleteIndex;
        // for (var i = 0; i < viewPost.length; i++) {
        //   if (viewPost[i].id == postId) {
        //     deleteIndex = i;
        //   }
        // }
        // viewPost.splice(deleteIndex, 1);

      }
      function deletePostFail(data) {

      }

    }

    function editPost(event) {
      //console.log(event.target.parentElement.parentElement.parentElement.children[1]);
      var contentContainer = event.target.parentElement.parentElement.parentElement.children[1];
      // console.log(event.target.parentElement.parentElement.parentElement.children[1].children[0].innerText);
      var postContent = event.target.parentElement.parentElement.parentElement.children[1].children[0].innerText;

      //original
      contentContainer.children[0].style.display = "none";

      //hide edit/delete btn
      event.target.parentElement.style.display = "none";

      //edit
      var editContent = document.createElement("div");
      editContent.className = "viewPost__editContent";
      editContent.innerHTML = `
        <textarea class="viewPost__editInput">${postContent}</textarea>
        <div class="float-right">
        <input class="btn btn-success" type="button" name="viewPost__saveEdit" value="Save">
        <input class="btn btn-danger" type="button" name="viewPost__cancelEdit" value="Cancel">
        </div>
      `;

      contentContainer.appendChild(editContent);

      var editInput = editContent.querySelector(".viewPost__editInput");
      editInput.style.height = "";
      editInput.style.height = editInput.scrollHeight + 15 + "px";

      editInput.addEventListener("keydown", editPostInputDown);
      editInput.addEventListener("keyup", editPostInputUp);
      //editContent.addEventListener("click", postClickDir);
    }

    function editPostInputDown(event) {
      //resize
      event.target.style.height = "";
      event.target.style.height = event.target.scrollHeight + 15 + "px";

      //max length
      if (event.target.value.length > 1999) {
        if (event.keyCode != 8) {
          event.preventDefault();
        }
      }
    }

    function editPostInputUp(event) {
      if (event.target.value.length > 1999) {
        var temp = event.target.value;
        event.target.value = "";
        event.target.value = temp.substring(0, 2000);
      }
    }

    function editPostAction(event) {
      var postBox = event.target.parentElement.parentElement.parentElement.parentElement;

      if (event.target.name == "viewPost__saveEdit") {
        var userId = currentUserId;
        var postId = postBox.parentElement.className.split("-")[1];
        var content = event.target.parentElement.parentElement.children[0].value;

        var postData = ("editPostUserId="+userId+"&"+
                        "editPostId="+postId+"&"+
                        "editPostContent="+content);

        ajaxCall("POST", "/posts/editPost", true, postData)
          .then(editPostSuccess, editPostFail);

        function editPostSuccess(data) {
          // show edit and delete btn
          postBox.children[0].children[0].style.display = "block";
          // remove the edit textarea
          var contentRow = postBox.children[1];
          contentRow.removeChild(contentRow.children[contentRow.children.length-1]);
          contentRow.children[0].style.display = "block";
          // edit viewPost
          // viewPost.forEach(function(value) {
          //   if (value.id == postId) {
          //     value.content = content;
          //   }
          // });
        }
        function editPostFail(data) {}

      } else if (event.target.name == "viewPost__cancelEdit") {
        // show edit and delete btn
        postBox.children[0].children[0].style.display = "block";
        // remove the edit textarea
        var contentRow = postBox.children[1];
        contentRow.removeChild(contentRow.children[contentRow.children.length-1]);
        contentRow.children[0].style.display = "block";

      }
    }

    // ajax function use
    function currentLikeStats() {
      var allPosts = viewPostBox.querySelectorAll(".viewPost");
      var likeCounter = [];
      for (var i = 0; i < allPosts.length; i++) {
        //check if photo shown
        if (allPosts[i].children.length > 1) {
          var post = allPosts[i].children[1];
        } else {
          var post = allPosts[i].children[0];
        }
        
        if (post.children[3]) {
          var postId = allPosts[i].classList[1].split("-")[1];
          if (post.children[3].children[0].className == "col viewPost__showLikes") {
            var likeCount = post.children[3].children[0].children[0].innerText;
          } else {
            var likeCount = 0;
          }
          var postAndLike = {
            postId: postId,
            likeCount: likeCount
          }
          likeCounter.push(postAndLike);
        } else {
          var postAndLike = {
            postId: allPosts[i].classList[1].split("-")[1],
            likeCount: 0
          }
          likeCounter.push(postAndLike);
        }
      }
      if (likeCounter[0]) {
        return JSON.stringify(likeCounter);
      } else {
        return 0;
      }
    }

    function currentPostContent() {
      if (viewPost[0]) {
        var currentPostContent = [];

        viewPost.forEach(function(value) {
          var postContent = {
            postId: value.id,
            content: value.content
          }
          currentPostContent.push(postContent);
        });

        return JSON.stringify(currentPostContent);

      } else {
        return 0;
      }
    }

    function likeCountUpdater(postId, likeCount) {
      //var posts = viewPostBox.children;
      var tempposts = viewPostBox.querySelectorAll(".viewPost");
      var posts = [];
      for (var i = 0; i < tempposts.length; i++) { //convert nodelist to array
        posts.push(tempposts[i]);
      }
      console.log(posts);
      //photos page post
      var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
      if (photoDisplayContainer) {
        var singlePost = photoDisplayContainer.querySelector(".viewPost");
        posts.push(singlePost);
      }
      console.log(photoDisplayContainer);
      console.log(posts);
      //console.log(posts);
      for (var i = 0; i < posts.length; i++) {
        //console.log(posts[i].children[0].children);
        if (posts[i].children.length > 1) { //get postBox
          var likes = posts[i].children[1];
        } else {
          var likes = posts[i].children[0];
        }
        if (posts[i].classList[1] == "postID-"+postId) {
          console.log(likes.children);
          if (likes.children.length > 3) {
            //console.log(likes.children[3]);
            if (likes.children[3].children[0].className == "col viewPost__showLikes") {
              //console.log(likeCount);
              if (likeCount > 0) {
                if (likeCount == 1){
                  likes.children[3].children[0].children[0].innerHTML = likeCount;
                  likes.children[3].children[0].children[1].innerHTML = " person liked this";
                  console.log("good");
                } else {
                  likes.children[3].children[0].children[0].innerHTML = likeCount;
                  likes.children[3].children[0].children[1].innerHTML = " people liked this";
                  console.log("poopie");
                }
              } else {
                likes.removeChild(likes.children[3]);
                console.log("bad");
              }
            } else {
              createNewLikeCounter(likes, likeCount);
            }
          } else {
            createNewLikeCounter(likes, likeCount);
          }
        }
      }
    }

    function createNewLikeCounter(likes, likeCount) { //likes = postBox
      if (likeCount != 0) {
        console.log("kooya");
        //create new row for like counter
        var newCounter = document.createElement("div");
        newCounter.className = "row";
        newCounter.innerHTML = `
        <div class="col viewPost__showLikes">
            <span class="viewPost__likeCount">
              ${likeCount}
            </span>
            <span> person liked this</span>
        </div>`;
        if (likes.children.length > 3) {
          console.log("hiya");
          likes.insertBefore(newCounter, likes.children[3]);
        } else {
          console.log("booya");
          likes.appendChild(newCounter);
        }
      }
    }

    function commentUpdater(newComments) {
      viewPost.forEach(function(value) {
        //update ViewPost
        for (var i = 0; i < newComments.length; i++) {
          if (value.id == newComments[i].post_id) {

            if (value.comments.list != 0) {
              value.comments.list.unshift(newComments[i]);
            } else {
              value.comments.list = [];
              value.comments.list.push(newComments[i]);
            }
          }
        }
        value.comments.count = value.comments.list.length; //needed in the delete, delete uses the count property

        //update the DOM
        var tempAllPosts = viewPostBox.querySelectorAll(".viewPost");
        var allPosts = [];
        for (var i = 0; i < tempAllPosts.length; i++) { //convert nodeList to array
          allPosts.push(tempAllPosts[i]);
        }
        var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
        if (photoDisplayContainer) {
          var singlePost = photoDisplayContainer.querySelector(".viewPost");
          allPosts.push(singlePost);
        }
        for (var i = 0; i < allPosts.length; i++) {     
          var postId = allPosts[i].className.split("-")[1];
          if (postId == value.id) { //post # found
            var viewCommentBox = allPosts[i].querySelector(".viewCommentBox");
            var makeCommentBox = allPosts[i].querySelector(".makeCommentBox");
            var commentContainer = commentLoader(newComments, 0, newComments.length);
            //if photo is shown
            if (allPosts[i].children.length > 1) {
              var post = allPosts[i].children[1];
            } else {
              var post = allPosts[i].children[0];
            }

            if (viewCommentBox) {//there are comments - view and make shown
              if (commentContainer.children.length < 6) { // 4 comments
                for (var j = 1; j < commentContainer.children.length; j++) {
                  viewCommentBox.appendChild(commentContainer.children[j]);
                }
              } else { //more than 4 comments
                for (var j = 2; j < commentContainer.children.length; j++) {
                  viewCommentBox.appendChild(commentContainer.children[j]);
                }
              }

            } else if (!viewCommentBox && makeCommentBox) {//no comments made - only make shown
              post.removeChild(post.children[3]);
              post.insertBefore(commentContainer, post.children[3]);

            } else if (!viewCommentBox && !makeCommentBox) {//not opened - none shown
              //show view Comment link
              var totalComments = value.comments.list.length;
              var counterBox = allPosts[i].querySelector(".commentCount");
              if (counterBox) {
                if (totalComments > 0) {
                  counterBox.innerText = totalComments;
                } else {
                  post.removeChild(post.children[post.children.length-1]);
                }
              } else {
                if (totalComments > 0) {
                  var viewComments = document.createElement("div");
                  viewComments.className = "row";
                  viewComments.innerHTML = `
                    <div class="col">
                      <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${totalComments}</span>)</a>
                    </div>
                  `;
                  post.appendChild(viewComments);
                }
              }

            }

            // var commentCount = allPosts[i].querySelector(".commentCount");
            // if (commentCount) {
            //   commentCount.innerHTML =
            // }
          }
        }
      });
      //console.log(viewPost);
    }

    function deletedCommentFromDatabase(commentList) {
      console.log(commentList);
      if (commentList) {
        if (commentList[0] == "Last Comment") {
          var postId = commentList[1];
        } else {
          var postId = commentList[0].post_id;
        }
        viewPost.forEach(function(value) {
          if (value.id == postId) {
            var found = [];
            for (var i = 0; i < value.comments.list.length; i++) {
              var exists = 0;
              for (var j = 0; j < commentList.length; j++) {
                if (value.comments.list[i].id == commentList[j].id) {
                  exists = 1;
                }
                if (j == commentList.length - 1) {
                  if (exists != 1) { //comment is deleted if not in list eg. index will = 0
                    found.push(i); // post index
                    found.push(value.comments.list[i]);
                  }
                }
              }
            }

            console.log(found);
            if (found[0] >= 0) {
              // remove from viewPost
              value.comments.list.splice(found[0], 1);
              value.comments.count = value.comments.count - 1;
              // console.log(viewPost);

              //remove from DOM
              var tempPosts = viewPostBox.querySelectorAll(".viewPost");
              var allPosts = [];
              for (var i = 0; i < tempPosts.length; i++) { //covert nodeList to array
                allPosts.push(tempPosts[i]);
              }
              //single page post
              var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
              if (photoDisplayContainer) {
                var singlePost = photoDisplayContainer.querySelector(".viewPost");
                allPosts.push(singlePost);
              }
              for (var i = 0; i < allPosts.length; i++) {
                if (allPosts[i].children.length > 1) {
                  var post = allPosts[i].children[1];
                } else {
                  var post = allPosts[i].children[0];
                }
                var domPostId = allPosts[i].className.split("-")[1];

                if (domPostId == found[1].post_id) {
                  var viewCommentBox = allPosts[i].querySelectorAll(".viewCommentBox");
                  console.log(viewCommentBox);
                  if (viewCommentBox[0]) { //view shown
                    // console.log(viewCommentBox);
                    for (var j = 0; j < viewCommentBox[0].children.length; j++) {
                      var viewCommentId = viewCommentBox[0].children[j].className.split("-")[1];
                      if (viewCommentId == found[1].id) {
                        viewCommentBox[0].removeChild(viewCommentBox[0].children[j]);
                      }
                    }
                  } else { //view comments not shown

                    //show view Comment link
                    if (commentList[0] == "Last Comment") {
                      var totalComments = 0;
                    } else {
                      var totalComments = commentList.length;
                    }
                    var counterBox = allPosts[i].querySelector(".commentCount");
                    if (counterBox) {
                      if (totalComments > 0) {
                        counterBox.innerText = totalComments;
                      } else {
                        post.removeChild(post.children[post.children.length-1]);
                      }
                    } //else {
                    //   if (totalComments > 0) {
                    //     var viewComments = document.createElement("div");
                    //     viewComments.className = "row";
                    //     viewComments.innerHTML = `
                    //       <div class="col">
                    //         <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${totalComments}</span>)</a>
                    //       </div>
                    //     `;
                    //     post.appendChild(viewComments);
                    //   }
                    // }
                  }

                }
              }

            }

          }
        });
      } else {
        //location.reload();
      }
      //console.log(commentList);
    }

    function deletePostFromDatabase(newPosts) {//newPosts = posts not deleted
      var found = [];
      //last post
      if (viewPost.length == 1 && newPosts == false) {
        found.push("zero");
      }
      viewPost.forEach(function(value,index) {
        var exists = 0;

        for (var i = 0; i < newPosts.length; i++) {
          if (value.id == newPosts[i].id) {
            exists = 1;
          }
          if (i == newPosts.length - 1) {
            if (exists != 1) {
              if (index == 0) {
                found.push("zero");
              } else {
                found.push(index);
              }
              console.log(value);
              found.push(value);
            }
          }
        }
      });
      console.log(found);
      if (found.length > 2) {
        for (var i = 1; i < found.length; i += 2) {
          for (var j = 0; j < viewPost.length; j++) {
            if (viewPost[j].id == found[i].id) {
              viewPost.splice(j, 1);
            }
          }
          //console.log(viewPost.splice(found[i], 1));
          //console.log("DELETE = "+ i);
        }
        console.log(viewPost.length);
      } else if (found[0]) {
        //update viewPost
        if (found[0] == "zero") {
          viewPost.splice(0, 1);
        } else {
          viewPost.splice(found[0], 1);
        }

        //remove from dom
        console.log("hi");
        var tempPosts = viewPostBox.querySelectorAll(".viewPost");
        var allPosts = [];
        for (var i = 0; i < tempPosts.length; i++) { //convert nodeList to array
          allPosts.push(tempPosts[i]);
        }
        //single page post
        var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
        if (photoDisplayContainer) {
          var singlePost = photoDisplayContainer.querySelector(".viewPost");
          if (singlePost) {
            allPosts.push(singlePost);
          }
        }
        var postIndex;
        for (var i = 0; i < allPosts.length; i++) {
          console.log(allPosts[i]);
          var postId = allPosts[i].className.split("-")[1];
          if (found[i] == "zero") {
            //postIndex = i;
            allPosts[i].parentElement.removeChild(allPosts[i]);
          } else if (postId == found[1].id) {
            //postIndex = i;
            allPosts[i].parentElement.removeChild(allPosts[i]);
          }
        }
        //allPosts[postIndex].parentElement.removeChild(allPosts[postIndex]);

      }
    }

    function updatePostContent (post) {
      if (post) {
        //update viewPost
        viewPost.forEach(function(value) {
          if (value.id == post.id) {
            if (value.content != post.content) {
              value.content = post.content;
            }
          }
        });

        //update DOM
        var tempPosts = viewPostBox.querySelectorAll(".viewPost");
        var allPosts = [];
        for (var i = 0; i < tempPosts.length; i++) {
          allPosts.push(tempPosts[i]);
        }
        //single page post
        var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
        if (photoDisplayContainer) {
          var singlePost = photoDisplayContainer.querySelector(".viewPost");
          allPosts.push(singlePost);
        }
        for (var i = 0; i < allPosts.length; i++) {
          if (allPosts[i].children.length > 1) {
            var postDOM = allPosts[i].children[1];
          } else {
            var postDOM = allPosts[i].children[0];
          }
          
          var postId = allPosts[i].className.split("-")[1];
          if (postId == post.id) {
            var oldContent = postDOM.children[1].children[0];

            if (oldContent.innerText != post.content) {
              oldContent.innerText = post.content;
            }
          }
        }
      }
    }

    function displayPost (post, photos = 0) {
      if (!viewPost || viewPost == 0) {
        viewPost = [];
        //console.log(viewPost);
      }
      for (var i = 0; i <post.length; i++) {
        //update ViewPost
        if (photos != 1) {
          viewPost.push(post[i]);
        }
        //update DOM
        var newViewPost = document.createElement("div");
        newViewPost.className = "viewPost postID-"+post[i].id;
        newViewPost.innerHTML = `
        <div class='viewPost__postBox'>
          <div class="row mx-0">
            <div class="viewPost__postUserIconBox">
              <a class="viewPost__postUserIconLink" href="/profiles/user/${post[i].user_id}">
                <img class="viewPost__postUserIcon" src="/user_data/${post[i].img_src}" alt="profile picture">
              </a>
            </div>
            <a class="viewPost__name" href="/profiles/user/${post[i].user_id}">${post[i].name}</a>
            <span class="viewPost__date">${post[i].created_at}</span>
          </div>
          <div class="row mx-0">
            <div class="viewPost__content">
              ${post[i].content}
            </div>
          </div>
          <div class="row mx-0 viewPost__likeCommentShare">
            <div class="row mx-0">
              <div class="btn-group">
                <a class="btn btn-default likeOrDislikeBtn" href="">Like</a>
                <a class="btn btn-default showCommentsBtn" href="">Comment</a>
                <a class="btn btn-default" href="">Share</a>
              </div>
            </div>
          </div>
        </div>`;

        //if post has a photo
        if (post[i].photo == 1) {
          var photoContainer = document.createElement("div");
          photoContainer.className = "viewPost__photosPage--displayPhotoContainer";
          photoContainer.innerHTML = `
          <div class="viewPost__photosPage--displayPhotoBox">
            <img class="viewPost__photosPage--displayPhoto" src="/user_data/${post[i].user_id}/${post[i].photoName}">
          </div>
          `;
          newViewPost.insertBefore(photoContainer, newViewPost.children[0]);
        }

        //edit/delete button
        if (currentUserId == post[i].user_id) {
          var postMod = document.createElement("p");
          postMod.className = "viewPost__modLink";
          postMod.innerHTML = `
            <a class="viewPost__editPost" href="#">Edit</a> |
            <a class="viewPost__deletePost" href="#">Delete</a>
          `;
          if (post[i].photo == 1) {
          newViewPost.children[1].children[0].insertBefore(postMod, newViewPost.children[1].children[0].children[0]);
          } else {
          newViewPost.children[0].children[0].insertBefore(postMod, newViewPost.children[0].children[0].children[0]);
          }
        }

        // likes
        if (post[i].currentUserLike) {
          newViewPost.querySelector(".likeOrDislikeBtn").innerText = "Dislike";
        }
        if (post[i].likeCount > 0) {
          if (newViewPost.children.length > 1) {
            var postBox = newViewPost.children[1]; 
          } else {
            var postBox = newViewPost.children[0];
          }
          createNewLikeCounter(postBox, post[i].likeCount);
        }

        // comments
        var totalComments = post[i].comments.list.length;
        if (totalComments > 0) {
          var viewComments = document.createElement("div");
          viewComments.className = "row";
          viewComments.innerHTML = `
            <div class="col">
              <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${totalComments}</span>)</a>
            </div>
          `;
          newViewPost.children[newViewPost.children.length-1].appendChild(viewComments);
        }

        if (photos == 1) { // add to DOM
          var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
          photoDisplayContainer.appendChild(newViewPost);
          console.log(photoDisplayContainer);
        } else {
          viewPostBox.insertBefore(newViewPost, viewPostBox.children[0]);
        }
        newViewPost.addEventListener("click", postClickDir);
      }
      // convert php datetime to javascript date object
      // for (var i = 0; i < post.length; i++) {
      //   var postDate = post[i].created_at.split(" ")[0];
      //   postDate = postDate.split("-");
      //   var postTime = post[i].created_at.split(" ")[1];
      //   postTime = postTime.split(":");
      //
      //   var datetime = new Date(postDate[0], postDate[1]-1, postDate[2],
      //                           postTime[0], postTime[1], postTime[2], 0);
      //
      //   post[i].created_at = datetime;
      // }

      //console.log(post);
    }

    // AJAX CALL
    function ajaxCall(method, url, sync, postData=0) {
      var promiseObj = new Promise (function(resolve, reject) {
        var getPostInfo = new XMLHttpRequest();
        getPostInfo.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              //console.log(this.responseText);
              resolve(this.responseText);
            } else {
              reject(this.status);
            }
          }
        };

        getPostInfo.open(method, url, sync);
        if (method == "GET") {
          getPostInfo.send()
        } else if (method == "POST") {
          getPostInfo.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          getPostInfo.send(postData);
        }
      });
      return promiseObj;
    }

    // LIFE AJAX CALLER - REAL TIME
    function liveAjaxCall(currentPostInfo) {
      var promiseObj = new Promise (function(resolve, reject) {
        var getPostInfo = new XMLHttpRequest();
        getPostInfo.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
               console.log(this.responseText);
              //console.log(JSON.parse(this.responseText));
              resolve(this.responseText);
            } else {
              reject(this.status);
            }
          }
        };
        getPostInfo.open("POST", "/posts/realTimeEvents", true);
        getPostInfo.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        getPostInfo.send(currentPostInfo);
      });
      return promiseObj;
    }

    // LIVE EVENTS LIVE EVENTS LIVE EVENTS
    function postData() {
      var postCount = viewPostBox.children.length;
      var likeStats = currentLikeStats();
      var currentComments = JSON.stringify(findPostComments("ALL"));
      var postContent = currentPostContent();

      return ("postsUserId="+JSON.stringify(postsUserId)+"&"+ //in the script element
              "profilePostCount="+postCount+"&"+
              "currentUserId="+currentUserId+"&"+
              "likeCount="+likeStats+"&"+
              "currentComments="+currentComments+"&"+
              "currentPostContent="+postContent
      );
    }
    //console.log(postData().length);

    liveAjaxCall(postData())
      .then(realTimeSuccess, realTimeFailed);

    function realTimeSuccess(data) {
      if (data == "refresh poll" || data == "") {
        liveAjaxCall(postData())
          .then(realTimeSuccess, realTimeFailed);
      } else {
        data = JSON.parse(data);
        //new post
        if (data[0] == "New Post") {
          postCount = data[1].length;
          var newPostCount = data[2];
          var newPost = [];
          for (var i = newPostCount; i > 0; i--) {
            newPost.push(data[1][postCount-i]);
          }
          displayPost(newPost);
        }
        //new like
        if (data[0] == "New Like") {
          var postId = data[1];
          var likeCount = data[2];
          likeCountUpdater(postId, likeCount);
        }
        if (data[0] == "New Comment") {
          var newComments = data[1];
          commentUpdater(newComments);
        }
        if (data[0] == "Delete Comment") {
          var temp = [];
          if (!data[1]) {//last comment
            viewPost.forEach(function(value) {
              if (value.id == data[2]) { // id of post of comment-(data[2])
                if (value.comments.list[0]) {
                  temp.push("Last Comment"); // also user
                  temp.push(value.id);
                }
              }
            });
            if (temp[0]) {
              deletedCommentFromDatabase(temp); //last comment
            }
          } else { 
            deletedCommentFromDatabase(data[1]); // also user //not last comment
          }
        }
        if (data[0] == "Delete Post") {
          deletePostFromDatabase(data[1]); // only from database // when user clicks delete, it is deleted from dom and viewpost on success
        }
        if (data[0] == "New Post Content") {
          updatePostContent(data[1]);
        }
        //reload ajax
        liveAjaxCall(postData())
          .then(realTimeSuccess, realTimeFailed);
      }
    }

    function realTimeFailed(data) {
      //console.log("failed code= "+data);
      // liveAjaxCall(postData())
      //   .then(realTimeSuccess, realTimeFailed);
      // // when i call ajax again in this failed function, cannot connect error happens/ only temporary
    }







  }


})();

var search = (function() {

    var search = document.querySelector(".navbar-searchInput");
    if (search) {
        var searchResultContainer = document.querySelector(".searchResultContainer");
        
        if (searchResultContainer) {
            searchResultContainer.addEventListener("click", searchDir);
        }
        search.addEventListener("keyup", searchKeyUp);
        search.addEventListener("focus", searchKeyUp);
        document.addEventListener("click", searchHide);
        search.parentElement.addEventListener("keydown", formAction);

        function searchDir(event) {
            if (event.target.innerText == "Name(a-z)" || 
            event.target.innerText == "Name(z-a)" || 
            event.target.innerText == "Popularity(views)") {
                sortSearchResult(event.target.innerText);
            }
        }

        function sortSearchResult(sortDir) {
            if (sortDir == "Name(a-z)") {
                result.sort(function(a, b) {
                    var first = (a.full_name).toLowerCase();
                    var second = (b.full_name).toLowerCase();
                    if (first == second) {
                        return 0;
                    }
                    return first > second ? 1 : -1;
                });
                displayNewResults(result);
            } else if (sortDir == "Name(z-a)") {
                result.sort(function(a, b) {
                    var first = (a.full_name).toLowerCase();
                    var second = (b.full_name).toLowerCase();
                    if (first == second) {
                        return 0;
                    }
                    return first < second ? 1 : -1;
                });
                displayNewResults(result);
            } else if (sortDir == "Popularity(views)") {
                result.sort(function(a, b) {
                    var first = Number(a.profile_views);
                    var second = Number(b.profile_views);
                    if (first == second) {
                        return 0;
                    }
                    return first < second ? 1 : -1;
                });
                displayNewResults(result);
            }
        }

        function searchKeyUp(event) {
            console.log(event.keyCode);
            if (event.keyCode != 37 && event.keyCode != 38 && 
                event.keyCode != 39 && event.keyCode != 40 &&
                event.keyCode != 13) {
                console.log("hi");
                // AJAX REQUEST
                realTimeSearch = event.target.value;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        //input.innerHTML = this.responseText;
                        console.log(this.responseText);
                        var searchData = JSON.parse(this.responseText);
                        searchDropDown(searchData , search.value);
                    }
                };
                xmlhttp.open("GET", "/search?realTimeSearch=" + realTimeSearch, true);
                xmlhttp.send();
            } else { //Navigation arrows and enter
                //locate highlight
                var highlightIndex = "none";
                var list = search.parentElement.children[1];
                for (var i = 0; i < list.children.length; i++) {
                    var itemClass = list.children[i].children[0].classList;
                    if (itemClass[1]) { //.selectedHightlight has been added
                        highlightIndex = i;
                    }
                }

                if (event.keyCode == 38) {
                    if (highlightIndex == "none") {
                        list.children[list.children.length-1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[list.children.length-1].children[0].children[0].children[0].name;
                        search.value = searchTerm;
                    } else if (highlightIndex == 0) {
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[list.children.length-1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[list.children.length-1].children[0].children[0].children[0].name;
                        search.value = searchTerm;
                    } else {
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[highlightIndex - 1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[highlightIndex - 1].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        }
                    }

                } else if (event.keyCode == 40) {
                    if (highlightIndex == "none") { //beginning
                        list.children[0].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[0].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        }
                    } else if (highlightIndex == list.children.length -1) { // end
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[0].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[0].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        }
                    } else { //middle
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[highlightIndex + 1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[highlightIndex + 1].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        } else {
                            if (highlightIndex + 1 == list.children.length -1) {
                                search.value = list.children[highlightIndex + 1].children[0].children[0].children[0].name;
                            }
                        }
                    }
                }

            }

        }
        
        function searchDropDown(searchData, searchTerm) {
            var searchContainer = search.parentElement.parentElement;
            if (searchContainer.children[0].children.length > 1) {
                for(var i = searchContainer.children[0].children.length-1; i > 0; i--) {
                    searchContainer.children[0].removeChild(searchContainer.children[0].children[i]);
                }
            }

            if (searchData[0]) {
                var dropDownBox = document.createElement("div");
                dropDownBox.className = "navbar-searchDropDown";
                
                for (var i = 0; i < searchData.length; i++) {
                    var dropBoxItem = document.createElement("a");
                    dropBoxItem.className = "navbar__searchItem"
                    dropBoxItem.href = "/profiles/user/"+searchData[i].id;
                    dropBoxItem.innerHTML = `
                        <div class="navbar__searchItem--itemBox">
                            <div class="navbar__searchItem--imgBox">
                                <img class="navbar__searchItem--img" src="/user_data/${searchData[i].img_src}" alt="">
                            </div>    
                            <a class="navbar__searchItem--name" name="${searchData[i].id}">${searchData[i].first_name} ${searchData[i].last_name}</a>    
                        </div>
                    `;
                    dropDownBox.appendChild(dropBoxItem);
                    if (i > 4) {
                        var leftSearch = searchData.length - i - 1;
                        var dropBoxItem = document.createElement("a");
                        //dropBoxItem.type = "submit";
                        dropBoxItem.className = "navbar__searchItem";
                        dropBoxItem.innerHTML = `
                        <div class="navbar__searchItem--itemBox">
                            <div class="text-center">
                                <input class="navbar__searchItem--seeMore" name="${searchTerm}" type="submit" value="See ${leftSearch} more results...">  
                            </div>
                        </div>
                        `;
                        dropDownBox.appendChild(dropBoxItem);
                        break;
                    }
                }
                searchContainer.children[0].appendChild(dropDownBox);
            }
        }

        function searchHide(event) {
            //console.log(event.target);
            if (event) {
                //if (event.target.className) {
                    var item = event.target.className;
                    //console.log(item);
                    if (item != "form-control navbar__searchItem" && item != "form-control navbar__searchItem--itemBox" && 
                    item != "form-control navbar__searchItem--imgBox" && item != "form-control navbar__searchItem--img" && 
                    item != "form-control navbar__searchItem--name" && item != "form-control navbar-searchInput" && 
                    item != "navbar__searchItem--seeMore") {
        
                        var searchContainer = search.parentElement.parentElement;
                        if (searchContainer.children[0].children.length > 1) {
                            for(var i = searchContainer.children[0].children.length-1; i > 0; i--) {
                                searchContainer.children[0].removeChild(searchContainer.children[0].children[i]);
                            }
                        }
        
                    }
                //}
            }
           
        }

        function formAction(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                //empty search
                if (search.value == "" && event.keyCode == 13) {
                    window.location.replace("/search");
                }
                //locate highlight
                var highlightIndex = "none";
                var list = search.parentElement.children[1];
                if (list) {
                    for (var i = 0; i < list.children.length; i++) {
                        var itemClass = list.children[i].children[0].classList;
                        if (itemClass[1]) { //.selectedHightlight has been added
                            highlightIndex = i;
                        }
                    }
                }
                if (highlightIndex != "none") {
                    var seeMore = list.children[highlightIndex].querySelector(".navbar__searchItem--seeMore");
                    if (!seeMore) {
                        var userId = list.children[highlightIndex].children[0].children[1].name;
                        window.location.replace("/profiles/user/" + userId);
                    } else {
                        noneDropSearch();
                    }

                } else {
                    noneDropSearch();
                }
            }
        }

        function noneDropSearch() {
            if (search.value != "") {
                var enterSearch = search.value.split(" ");
                if (enterSearch.length > 1) {
                    var link = "/search?q=";
                    enterSearch.forEach(function (value) {
                        link = link + value + "+";
                    });
                    link = link.substring(0, link.length-1); //remove ending + sign
            
                    window.location.replace(link);
                } else {
                    window.location.replace("/search?q=" + enterSearch[0]);
                }
            }
        }

        function displayNewResults(result) {
            var searchResultBox = searchResultContainer.querySelector(".searchResultBox");
            var searchResultLength = searchResultBox.children.length;
            for (var i = 0; i < searchResultLength; i++) { // remove previous
                searchResultBox.removeChild(searchResultBox.children[0]);
            }

            result.forEach(function(item) {
                var resultItem = document.createElement("a");
                resultItem.className = "searchResult__aTagRemove";
                resultItem.href = "/profiles/user/" + item.id;
                resultItem.innerHTML = `
                    <div class='searchResult'>
                        <div class='row mx-0 py-2'>
                            <div class='col-sm-3'>
                                <div class="searchResult__imageContainer">
                                    <img class="searchResult__image" src="/user_data/${item.img_src}" alt="profile pic">
                                </div>
                            </div>
                            <div class='col-sm-9'>
                                <div class='searchResult__userDetails'>
                                    <p class="m-0"><span class="text-muted">Status: </span><strong>${item.status}</strong></p>
                                    <p class="m-0"><span class="text-muted">Name: </span><strong>${item.first_name+" "+item.last_name}</strong></p>
                                    <p class="m-0"><span class="text-muted">Email: </span><strong>${item.email}</strong></p>
                                    <p class="m-0"><span class="text-muted">Joined: </span><strong>${item.created_at}</strong></p>
                                    <p class="m-0"><span class="text-muted">Profile Views: </span><strong>${item.profile_views}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>                
                `;
                var userDetails = resultItem.querySelector(".searchResult__userDetails");
                var section = ["Birthday", "Gender", "Education", "Work", "Location"];
                var sectionInfo = [item.birthday, item.gender, item.education, item.work, item.location];
                //birthday, gender, education, work, location
                sectionInfo.forEach(function(value,index) {
                    if (value != "" && value != "0000-00-00" && value != "0") {
                        var newSection = document.createElement("p");
                        newSection.className = "m-0";
                        newSection.innerHTML = `
                            <span class='text-muted'>${section[index]}: </span><strong>${value}</strong>
                        `;
                        userDetails.insertBefore(newSection, userDetails.children[userDetails.children.length - 2]);
                    }
                });
                if (item.description != "") {
                    var description = document.createElement("p");
                    description.className = "m-0";
                    if (item.descLength > 35) {
                        description.innerHTML = `
                            <span class='text-muted'>Description: </span>
                            <strong>${item.shortDesc}...</strong>
                            <span class='searchResult__fakeATag'> Read More</span>
                        `;
                    } else {
                        description.innerHTML = `
                            <span class='text-muted'>Description: </span>
                            <strong>${item.description}</strong>
                        `;
                    }
                    userDetails.insertBefore(description, userDetails.children[userDetails.children.length - 2]);
                }
                
                searchResultBox.appendChild(resultItem);
            });
        }

    }
})();
var chatBox = (function() {

    var chatBox = document.querySelector(".chatBox");
    if (chatBox) {
        
        var convoList = chatBox.querySelector(".convoList");
        var convoView = chatBox.querySelector(".convoView");

        convoList.addEventListener("click", convoListDir);
        convoView.addEventListener("click", convoViewDir);
        convoView.querySelector(".convoView__textarea").
            addEventListener("keydown", chatKeyDown);
        convoList.querySelector(".convoList__search")
            .addEventListener("keyup", searchFriend);
        convoList.querySelector(".convoList__search")
            .addEventListener("focus", searchFriend);
        document.addEventListener("click", documentDir);

        //scroll to bottom on start
        convoView.querySelector(".convoView__display").scrollTop = 
        convoView.querySelector(".convoView__display").scrollHeight;

        function convoViewDir(event) {
            //console.log(event);
            if (event.target.className == "fa fa-chevron-left" || 
            event.target.className == "convoView__viewConvoListBtnBox") {
                chatBoxViewListSwitch("left");
            }
            if (event.target.className == "convoView__sendBtn") {
                sendMessage();
            }
        }

        function convoListDir(event) {
            console.log(event.target);
            if (event.target.className == "convoList__listBox" || event.target.className == "convoList__iconContainer" || 
            event.target.className == "convoList__iconBox" || event.target.className == "convoList__icon" || 
            event.target.className == "convoList__online" || event.target.className == "convoList__infoContainer" || 
            event.target.className == "m-0 convoList__infoContainer--date" || event.target.className == "m-0 convoList__infoContainer--name" || 
            event.target.className == "m-0 convoList__infoContainer--message" || event.target.className == "convoList__listBox convoList__selected") {
                conversationClick(event);
            }
        }

        function documentDir(event) {
            //console.log(event.target);
            var className = event.target.className;
            if (className != "convoList__search" && className != "convoList__searchListBox" && 
            className != "m-0 convoList__searchName" && className != "convoList__searchIcon" && 
            className != "convoList__searchIconBox" && className != "convoList__searchIconContainer") {
                originalList();
            } else if (className == "m-0 convoList__searchName" || className == "convoList__searchIcon" || 
            className == "convoList__searchIconBox" || className == "convoList__searchIconContainer" || 
            className == "convoList__searchListBox" || className == "convoList__searchNameContainer") {
                conversationClick(event);
            }

        }

        function conversationClick(event) {
            var convoId = findConversationId(event);
            console.log(convoId);
            ajaxCall("GET", "/chats/getConversation?convoId="+convoId, true)
                .then(conversationClickSuccess, conversationClickFail);

            function conversationClickSuccess(data) {
                console.log(data);
                var conversation = JSON.parse(data);
                //update convoViewData
                convoViewData = conversation;
                //update DOM
                convoViewMaker(conversation);
                if (window.innerWidth < 768) {
                    chatBoxViewListSwitch("right");
                }
                //change selected highlight once success
                for (var i = 0; i < convoList.children[1].children.length; i++) {
                    if (convoList.children[1].children[i].classList[1] == "convoList__selected" && 
                    convoList.children[1].children[i].id != convoId) {
                        convoList.children[1].children[i].classList.remove("convoList__selected");
                    } else if (convoList.children[1].children[i].id == convoId) {
                        convoList.children[1].children[i].classList.add("convoList__selected");
                    }
                }
            }
            function conversationClickFail(data) {}
        }

        function findConversationId(event) {
            if (event.target.className == "convoList__listBox" || event.target.className == "convoList_listBox convoList__selected") {
                return event.target.id;
            }
            if (event.target.className == "convoList__iconContainer") {
                return event.target.parentElement.id;
            }
            if (event.target.className == "convoList__iconBox") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__icon") {
                return event.target.parentElement.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__online") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__infoContainer") {
                return event.target.parentElement.id;
            }
            if (event.target.className == "m-0 convoList__infoContainer--date" || event.target.className == "m-0 convoList__infoContainer--name" || 
            event.target.className == "m-0 convoList__infoContainer--message") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__searchListBox") {
                return event.target.id;
            }
            if (event.target.className == "convoList__searchIconContainer" || event.target.className == "convoList__searchNameContainer") {
                return event.target.parentElement.id;
            }
            if (event.target.className == "m-0 convoList__searchName" || event.target.className == "convoList__searchIconBox") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__searchIcon") {
                return event.target.parentElement.parentElement.parentElement.id;
            }
        }

        function convoViewMaker(conversation) {
            convoView.id = conversation[0].id;
            convoView.querySelector(".convoView__icon")
                .src = "/user_data/"+conversation[0].img_src;
            var nameContainer = convoView.querySelector(".convoView__nameContainer");
            nameContainer.children[0].innerText = conversation[0].first_name+" "+conversation[0].last_name;
            if (conversation[0].status == "1") {
                var status = "Online";
                nameContainer.children[1].innerText = status;
            } else {
                var status = "Offline";
                nameContainer.children[1].innerText = status;
            }

            var display = convoView.querySelector(".convoView__display");
            var displayLength = display.children.length;
            if (displayLength > 0) { //remove previous messages
                for (var i = 0; i < displayLength; i++) {
                    display.removeChild(display.children[0]);
                }
            }

            conversation[1].forEach(function (item) {
                if (item.sender_id == currentUserId) {
                    var messageLocation = "message-right";
                    var whosMessageBox = "convoView__myMessageBox";
                    var whosMessage = "convoView__myMessage";
                } else {
                    var messageLocation = "message-left";
                    var whosMessageBox = "convoView__friendMessageBox";
                    var whosMessage = "convoView__friendMessage";
                }
                var messageBox = document.createElement("div");
                messageBox.className = "convoView__messageBox";
                messageBox.innerHTML = `
                    <div class="${messageLocation}">
                        <div class="${whosMessageBox}">
                            <div class="${whosMessage}">
                                <span>${item.message}</span>
                            </div>
                        </div>
                        <span class="convoView__date">${item.date_sent}</span>
                    </div>
                `;
                display.appendChild(messageBox);
                display.scrollTop = display.scrollHeight;

            });

            var textarea = convoView.querySelector(".convoView__textarea");
            if (conversation[0].chat_disabled == 1) {
                textarea.value = "";
                textarea.disabled = true;
                textarea.placeholder = conversation[0].chat_reason;
            } else {
                textarea.value = "";
                textarea.disabled = false;
                textarea.placeholder = "Enter message...";
            }

        }

        function chatBoxViewListSwitch(dir) {
            if (dir == "left") {
                convoView.classList.add("fade-out-towards-right-sm");
                convoList.style.width = "100%";
                convoList.style.display = "block";
                convoList.classList.add("fade-in-towards-right-sm");
                setTimeout(function() {
                    convoView.style.display = "none";
                    convoView.classList.remove("fade-out-towards-right-sm");
                    convoList.classList.remove("fade-in-towards-right-sm");
                }, 300);
                
            } else if (dir == "right") {
                convoList.classList.add("fade-out-towards-left-sm");
                convoView.style.width = "100%";
                convoView.style.display ="block";
                convoView.classList.add("fade-in-towards-left-sm");
                setTimeout(function() {
                    convoList.style.display = "none";
                    convoList.classList.remove("fade-out-towards-left-sm");
                    convoView.classList.remove("fade-in-towards-left-sm");
                }, 300);
            }
            //scroll to bottom on start
            convoView.querySelector(".convoView__display").scrollTop = 
                convoView.querySelector(".convoView__display").scrollHeight;
        }

        function chatKeyDown(event) {
            if (this.scrollHeight <= 140) {
                //resize text area
                event.target.parentElement.style.height = "";
                event.target.parentElement.style.height = this.scrollHeight + "px";// 15 + "px";
                //resize input box
                var inputBox = convoView.querySelector(".convoView__inputBox");
                var textBoxHeight = event.target.parentElement.style.height;
                var inputBoxHeight = 85 + Number(textBoxHeight.substr(0, textBoxHeight.length - 2)) - 49;
                inputBox.style.height = inputBoxHeight + "px";

                //resize display messages
                var display = convoView.querySelector(".convoView__display");
                var displayHeight = "calc(100% - 85px - 75px - "+(Number(textBoxHeight.substr(0, textBoxHeight.length - 2)) - 49)+"px)";
                display.style.height = displayHeight;
                display.scrollTop = display.scrollHeight;
            }
        }

        window.addEventListener("resize", function() {
            if (window.innerWidth > 767) {
                convoList.style.width = "300px";
                convoView.style.width = "calc(100% - 300px)";
                convoList.style.display = "block";
                convoView.style.display = "block";
            } else if (window.innerWidth < 768) {
                convoView.style.width = "100%";
                convoList.style.display = "none";
            }
        });

        function sendMessage() {
            var textarea = convoView.querySelector(".convoView__textarea");
            if (textarea.value != "") {
                var receiver_id = convoView.id;
                var sender_id = currentUserId;
                var message = textarea.value;

                var messageData = (
                    "sender_id="+sender_id+"&"+
                    "receiver_id="+receiver_id+"&"+ 
                    "message="+message
                );

                ajaxCall("POST", "chats/sendMessage", true, messageData)
                    .then(sendMessageSuccess, sendMessageFail);

                function sendMessageSuccess(data) {
                    //remove textarea value
                    postSendMessageUpdate();
                }
                function sendMessageFail(data) {

                }
            }
        }

        function postSendMessageUpdate() {
            // empty text
            var textarea = convoView.querySelector(".convoView__textarea");
            textarea.value = "";
            // return to orignal dimensions
            textarea.parentElement.style.height = "49px";
            textarea.parentElement.parentElement.style.height = "85px";
            // textarea.parentElement.parentElement.parentElement
            //     .children[1].style.height = "323.32px";
            textarea.parentElement.parentElement.parentElement
                .children[1].style.height = "calc(100% - 75px - 85px";
        }

        function searchFriend(event) {
            var name = event.target.value;
            ajaxCall("GET", "chats/searchFriend?friendName="+name, true)
                .then(searchFriendSuccess, searchFriendFail);
            
            function searchFriendSuccess(data) {
                data = JSON.parse(data);
                convoListDomLength = convoList.children[1].children.length;
                for(var i = 0; i < convoListDomLength; i++) {
                    convoList.children[1].removeChild(convoList.children[1].children[0]);
                }
                data.forEach(function(item) {
                    var searchItem = document.createElement("div");
                    searchItem.className = "convoList__searchListBox";
                    searchItem.id = item.id;
                    searchItem.innerHTML = `
                        <div class="convoList__searchIconContainer">
                            <div class="convoList__searchIconBox">
                                <img class="convoList__searchIcon" src="/user_data/${item.img_src}" alt="user_icon">
                            </div>
                        </div>
                        <div class="convoList__searchNameContainer">
                            <p class="m-0 convoList__searchName">${item.name}</p>
                        </div>
                    `;
                    convoList.children[1].appendChild(searchItem);
                });

            }
            function searchFriendFail(data) {}
        }

        function originalList() {
            convoListDomLength = convoList.children[1].children.length;
            for(var i = 0; i < convoListDomLength; i++) {
                convoList.children[1].removeChild(convoList.children[1].children[0]);
            }
            convoListData.forEach(function(item) {
                var listItem = document.createElement("div");
                listItem.className = "convoList__listBox";
                listItem.id = item.id;
                listItem.innerHTML = `
                    <div class="convoList__iconContainer">
                        <div class="convoList__iconBox">
                            <img class="convoList__icon" src="/user_data/${item.img_src}" alt="user icon">
                        </div>
                    </div>
                    <div class="convoList__infoContainer">
                        <p class="m-0 convoList__infoContainer--date">${item.last_date}</p>
                        <p class="m-0 convoList__infoContainer--name">${item.name}</p>
                        <p class="m-0 convoList__infoContainer--message">${item.last_message}</p>
                    </div>
                `;
                //online
                if (item.status == "1") {
                    var onlineDIV = document.createElement("div");
                    onlineDIV.className = "convoList__online";
                    listItem.children[0].appendChild(onlineDIV);
                }
                //selected
                if (item.id == convoView.id) {
                    listItem.classList.add("convoList__selected");
                }
                convoList.children[1].appendChild(listItem);
            });
        }

        // AJAX CALL
        function ajaxCall(method, url, sync, postData=0) {
            var promiseObj = new Promise (function(resolve, reject) {
            var sendData = new XMLHttpRequest();
            sendData.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        //console.log(this.responseText);
                        resolve(this.responseText);
                    } else {
                        reject(this.status);
                    }
                }
            };
    
            sendData.open(method, url, sync);
            if (method == "GET") {
                sendData.send()
            } else if (method == "POST") {
                sendData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                sendData.send(postData);
            }
            });
            return promiseObj;
        }

        //real time ajax polls
        function chatData() {
            return (
                "convoList="+JSON.stringify(convoListData)+"&"+
                "convoView="+JSON.stringify(convoViewData)
            );
        }

        ajaxCall("POST", "chats/realTimeChatEvents", true, chatData())
            .then(realTimeChatSuccess, realTimeChatFail);

        function realTimeChatSuccess(data) {
            // console.log(data);
            if (data != "") {
                data = JSON.parse(data);
                if (data[0] == "New Message") {
                    newMessageUpdate(data);
                } else if (data[0] == "New Status") {
                    newStatusUpdate(data);
                } else if (data[0] == "Chat Disabled") {
                    chatDisabledUpdate(data);
                } else if (data[0] == "New Conversation") {
                    newConversationUpdate(data);
                }
            }
            ajaxCall("POST", "chats/realTimeChatEvents", true, chatData())
            .then(realTimeChatSuccess, realTimeChatFail);
        }

        function realTimeChatFail(data) {

        }

        function newMessageUpdate(data) {
            console.log(data);
            //convo List data update
            convoListData.forEach(function(item,index) {
                if (item.id == data[1][0].id) {
                    convoListData.splice(index, 1);
                    convoListData.unshift(data[1][0]);
                    // console.log(convoListData);
                }
            });
            //console.log(convoListData);
            // convo list DOM update
            for (var i = 0; i < convoList.children[1].children.length; i++) {
                if (convoList.children[1].children[i].id == data[1][0].id) {
                    if (i != 0) {
                        convoList.children[1].removeChild(convoList.children[1].children[i]);
                        var newList = document.createElement("div");
                        newList.className = "convoList__listBox";
                        newList.id = data[1][0].id;
                        newList.innerHTML = `
                            <div class="convoList__iconContainer">
                                <div class="convoList__iconBox">
                                    <img class="convoList__icon" src="/user_data/${data[1][0].img_src}" alt="user icon">
                                </div>
                            </div>
                            <div class="convoList__infoContainer">
                                <p class="m-0 convoList__infoContainer--date"></p>
                                <p class="m-0 convoList__infoContainer--name">${data[1][0].name}</p>
                                <p class="m-0 convoList__infoContainer--message"></p>
                            </div>
                        `;
                        //online
                        if (data[1][0].status) {
                            var onlineDIV = "<div class='convoList__online></div>"
                            var onlineDIV = document.createElement("div");
                            onlineDIV.className = "convoList__online";
                            newList.children[0].appendChild(onlineDIV);
                        }
                        convoList.children[1].insertBefore(newList, convoList.children[1].children[0]);
                    }
                    var infoContainer = convoList.children[1].children[0].querySelector(".convoList__infoContainer");
                    infoContainer.children[0].innerText = data[1][0].last_date;
                    infoContainer.children[2].innerText = data[1][0].last_message;

                }
            }
            //convo View Data Update
            if (convoViewData[0].id == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    convoViewData[1].push(data[1][1][i]);
                }
                console.log(convoViewData);
            }
            //convo View DOM update
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    var newMessage = document.createElement("div");
                    newMessage.className = "convoView__messageBox";
                    if (data[1][1][i].sender_id == currentUserId) {
                        var messageDir = "message-right"
                        var messageBox = "convoView__myMessageBox";
                        var message = "convoView__myMessage";
                    } else {
                        var messageDir = "message-left"
                        var messageBox = "convoView__friendMessageBox";
                        var message = "convoView__friendMessage";
                    }
                    newMessage.innerHTML = `
                        <div class="${messageDir}">
                            <div class="${messageBox}">      
                                <div class="${message}">
                                    <span>${data[1][1][i].message}</span>
                                </div>
                            </div>
                        <span class="convoView__date">${data[1][1][i].date_sent}</span>
                        </div>
                    `;
                    convoView.querySelector(".convoView__display").appendChild(newMessage);
                    convoView.querySelector(".convoView__display").scrollTop = 
                        convoView.querySelector(".convoView__display").scrollHeight;
                }
                console.log(convoView);
            }

        }

        function newConversationUpdate(data) {
            //convoListData update
            convoListData.unshift(data[1][0]);
            //convoList DOM update
            var newList = document.createElement("div");
            newList.className = "convoList__listBox";
            newList.id = data[1][0].id;
            newList.innerHTML = `
                <div class="convoList__iconContainer">
                    <div class="convoList__iconBox">
                        <img class="convoList__icon" src="/user_data/${data[1][0].img_src}" alt="user icon">
                    </div>
                </div>
                <div class="convoList__infoContainer">
                    <p class="m-0 convoList__infoContainer--date">${data[1][0].last_date}</p>
                    <p class="m-0 convoList__infoContainer--name">${data[1][0].name}</p>
                    <p class="m-0 convoList__infoContainer--message">${data[1][0].last_message}</p>
                </div>
            `;
            //online
            if (data[1][0].status) {
                var onlineDIV = "<div class='convoList__online></div>"
                var onlineDIV = document.createElement("div");
                onlineDIV.className = "convoList__online";
                newList.children[0].appendChild(onlineDIV);
            }
            convoList.children[1].insertBefore(newList, convoList.children[1].children[0]);
             //convo View Data Update
             if (convoViewData[0].id == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    convoViewData[1].push(data[1][1][i]);
                }
                console.log(convoViewData);
            }
            //convo View DOM update
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    var newMessage = document.createElement("div");
                    newMessage.className = "convoView__messageBox";
                    if (data[1][1][i].sender_id == currentUserId) {
                        var messageDir = "message-right"
                        var messageBox = "convoView__myMessageBox";
                        var message = "convoView__myMessage";
                    } else {
                        var messageDir = "message-left"
                        var messageBox = "convoView__friendMessageBox";
                        var message = "convoView__friendMessage";
                    }
                    newMessage.innerHTML = `
                        <div class="${messageDir}">
                            <div class="${messageBox}">      
                                <div class="${message}">
                                    <span>${data[1][1][i].message}</span>
                                </div>
                            </div>
                        <span class="convoView__date">${data[1][1][i].date_sent}</span>
                        </div>
                    `;
                    convoView.querySelector(".convoView__display").appendChild(newMessage);
                    convoView.querySelector(".convoView__display").scrollTop = 
                        convoView.querySelector(".convoView__display").scrollHeight;
                }
                console.log(convoView);
            }
        
        }

        function newStatusUpdate(data) {
            //update convoListData
            convoListData.forEach(function (item, index) {
                if (item.id == data[1]) {
                    if (data[2] == "Online") {
                        convoListData[index].status = "1";
                    } else {
                        convoListData[index].status = "0";
                    }
                }
            });
            //update convoList DOM
            for(var i = 0; i < convoList.children[1].children.length; i++) {
                if (convoList.children[1].children[i].id == data[1]) {
                    if (data[2] == "Online") {
                        if (convoList.children[1].children[i].children[0].children.length < 2) {
                            var newOnline = document.createElement("div");
                            newOnline.className = "convoList__online";
                            convoList.children[1].children[i].children[0].appendChild(newOnline);
                        }
                    } else {
                        if (convoList.children[1].children[i].children[0].children.length > 1) {
                            convoList.children[1].children[i].children[0]
                                .removeChild(convoList.children[1].children[i].children[0].children[1]);
                        }
                    }
                }
            }
            //update convoViewData
            if (convoViewData[0].id == data[1]) {
                if (data[2] == "Online") {
                    convoViewData[0].status = "1";
                } else {
                    convoViewData[0].status = "0";
                }
            }
            //update convoView DOM
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1]) {
                convoView.children[0].children[1].children[1].children[1].innerText = data[2];
            }
        }


        function chatDisabledUpdate(data) {
            //update convoListData
            convoListData.forEach(function(item, index) {
                if (item.id == data[1].id) {
                    convoListData.splice(index, 1);
                    convoListData.splice(index, 0, data[1]);
                }
            });
            //update convoViewData
            if (convoViewData[0].id == data[1].id) {
                if (data[0].chat_disabled == 1) {
                    convoViewData[0].chat_disabled = 1;
                    convoViewData[0].chat_reason = data[0].chat_reason;
                } else {
                    convoViewData[0].chat_disabled = 0;
                    delete convoViewData[0].chat_reason;
                }
            }
            //update convoView DOM
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1].id) {
                if (data[1].chat_disabled == 1) {
                    var textarea = convoView.querySelector(".convoView__textarea");
                    textarea.disabled = true;
                    textarea.placeholder = data[1].chat_reason;
                } else {
                    var textarea = convoView.querySelector(".convoView__textarea");
                    textarea.disabled = false;
                    textarea.placeholder = "Enter message...";
                }
            }

        }


    }
})();
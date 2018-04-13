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
      // if (event.target.id == "settings_ImgInput") {
      //   settingsImageUpload(event);
      // }
    }

    var settings_ImgInput = profile.querySelector("#settings_ImgInput");
    settings_ImgInput.addEventListener("change", settingsImageUpload);


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
    }

    function settingsImageUpload(event) {
      var newImage = event.target.files[0];
      var uploadMessage = event.target.parentElement.children[2];
      var settingsImage = event.target.parentElement.parentElement.children[0].children[0];
      console.log(newImage);
      console.log(uploadMessage);
      console.log(settingsImage);
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

})();


var getPost = (function() {

  var getProfilePost = document.querySelector(".profilePage");
  if (getProfilePost) {

    var postContainer = getProfilePost.querySelector(".profilePage__displayPost");
    var likeOrDislikeBtn = getProfilePost.querySelectorAll(".likeOrDislikeBtn");
    //var likeCount = getProfilePost.querySelector(".viewPost__likeCount");
    var allPosts = getProfilePost.querySelectorAll(".viewPost");

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
      event.preventDefault();
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
              <img class="viewPost__commentIcon" src="/user_data/${allComments[order[i]].img_src}" alt="profile icon">
            </div>
            <div class="viewPost__commentContent">
              <a href="/profiles/user/${allComments[order[i]].user_id}">${allComments[order[i]].name} </a>
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
        var deleteIndex;
        for (var i = 0; i < viewPost.length; i++) {
          if (viewPost[i].id == postId) {
            deleteIndex = i;
          }
        }
        viewPost.splice(deleteIndex, 1);

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
      var allPosts = getProfilePost.querySelectorAll(".viewPost");
      var likeCounter = [];
      for (var i = 0; i < allPosts.length; i++) {
        //console.log(allPosts[i].children[0].children);
        if (allPosts[i].children[0].children[3]) {
          var postId = allPosts[i].classList[1].split("-")[1];
          if (allPosts[i].children[0].children[3].children[0].className == "col viewPost__showLikes") {
            var likeCount = allPosts[i].children[0].children[3].children[0].children[0].innerText;
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
      var posts = postContainer.children;
      for (var i = 0; i < posts.length; i++) {
        //console.log(posts[i].children[0].children);
        var likes = posts[i].children[0];
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

    function createNewLikeCounter(likes, likeCount) {
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
      //update viewPost
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
        var allPosts = getProfilePost.querySelectorAll(".viewPost");
        for (var i = 0; i < allPosts.length; i++) {
          var postId = allPosts[i].className.split("-")[1];
          if (postId == value.id) { //post # found
            var viewCommentBox = allPosts[i].querySelector(".viewCommentBox");
            var makeCommentBox = allPosts[i].querySelector(".makeCommentBox");
            var commentContainer = commentLoader(newComments, 0, newComments.length);

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
              allPosts[i].children[0].removeChild(allPosts[i].children[0].children[3]);
              allPosts[i].children[0].insertBefore(commentContainer, allPosts[i].children[0].children[3]);

            } else if (!viewCommentBox && !makeCommentBox) {//not opened - none shown
              //show view Comment link
              var totalComments = value.comments.list.length;
              var counterBox = allPosts[i].querySelector(".commentCount");
              if (counterBox) {
                if (totalComments > 0) {
                  counterBox.innerText = totalComments;
                } else {
                  allPosts[i].children[0].removeChild(allPosts[i].children[0].children[allPosts[i].children[0].children.length-1]);
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
                  allPosts[i].children[0].appendChild(viewComments);
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
      if (commentList) {
        var postId = commentList[0].post_id;

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
                  if (exists != 1) { //found the deleted comment
                    found.push(i);
                    found.push(value.comments.list[i]);
                  }
                }
              }
            }

            console.log(found);
            if (found[0]) {
              // remove from viewPost
              value.comments.list.splice(found[0], 1);
              value.comments.count = value.comments.count - 1;

              //remove from DOM
              var allPosts = getProfilePost.querySelectorAll(".viewPost");
              for (var i = 0; i < allPosts.length; i++) {
                var domPostId = allPosts[i].className.split("-")[1];
                if (domPostId == found[1].post_id) {
                  var viewCommentBox = allPosts[i].querySelectorAll(".viewCommentBox");

                  if (viewCommentBox[0]) { //view shown
                    console.log(viewCommentBox);
                    for (var j = 0; j < viewCommentBox[0].children.length; j++) {
                      var viewCommentId = viewCommentBox[0].children[j].className.split("-")[1];
                      if (viewCommentId == found[1].id) {
                        viewCommentBox[0].removeChild(viewCommentBox[0].children[j]);
                      }
                    }
                  } else { //view comments not shown

                    //show view Comment link
                    var totalComments = commentList.length;
                    var counterBox = allPosts[i].querySelector(".commentCount");
                    if (counterBox) {
                      if (totalComments > 0) {
                        counterBox.innerText = totalComments;
                      } else {
                        allPosts[i].children[0].removeChild(allPosts[i].children[0].children[allPosts[i].children[0].children.length-1]);
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
                    //     allPosts[i].children[0].appendChild(viewComments);
                    //   }
                    // }
                  }

                }
              }

            }

          }
        });
      }
      //console.log(commentList);
    }

    function deletePostFromDatabase(newPosts) {
      var found = [];
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
              found.push(value);
              console.log(found);
            }
          }
        }
      });

      if (found[0]) {
        //update viewPost
        if (found[0] == "zero") {
          viewPost.splice(0, 1);
        } else {
          viewPost.splice(found[0], 1);
        }

        //remove from dom
        var allPosts = getProfilePost.querySelectorAll(".viewPost");
        var postIndex;
        for (var i = 0; i < allPosts.length; i++) {
          var postId = allPosts[i].className.split("-")[1];
          if (postId == found[1].id) {
            postIndex = i;
          }
        }
        allPosts[postIndex].parentElement.removeChild(allPosts[postIndex]);

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
        var allPosts = getProfilePost.querySelectorAll(".viewPost");
        for (var i = 0; i < allPosts.length; i++) {
          var postId = allPosts[i].className.split("-")[1];
          if (postId == post.id) {
            var oldContent = allPosts[i].children[0].children[1].children[0];

            if (oldContent.innerText != post.content) {
              oldContent.innerText = post.content;
            }
          }
        }
      }
    }

    function displayPost (post) {
      if (!viewPost || viewPost == 0) {
        viewPost = [];
        //console.log(viewPost);
      }
      for (var i = 0; i <post.length; i++) {
        //update ViewPost
        viewPost.push(post[i]);
        //update DOM
        var newViewPost = document.createElement("div");
        newViewPost.className = "viewPost postID-"+post[i].id;
        newViewPost.innerHTML = `
        <div class='viewPost__postBox'>
          <div class="row mx-0">
            <div class="viewPost__postUserIconBox">
              <img class="viewPost__postUserIcon" src="/user_data/${post[i].img_src}" alt="profile picture">
            </div>
            <a class="viewPost__name" href="#">${post[i].name}</a>
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

        if (currentUserId == post[i].user_id) {
          var postMod = document.createElement("p");
          postMod.className = "viewPost__modLink";
          postMod.innerHTML = `
            <a class="viewPost__editPost" href="#">Edit</a> |
            <a class="viewPost__deletePost" href="#">Delete</a>
          `;
          newViewPost.children[0].children[0].insertBefore(postMod, newViewPost.children[0].children[0].children[0]);
        }

        postContainer.insertBefore(newViewPost, postContainer.children[0]);
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
      var profileUserId = (window.location.href).split("/");
      profileUserId = profileUserId[profileUserId.length-1];
      var postCount = postContainer.children.length;
      var likeStats = currentLikeStats();
      var currentComments = JSON.stringify(findPostComments("ALL"));
      var postContent = currentPostContent();

      return ("profilePost="+profileUserId+"&"+
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
          deletedCommentFromDatabase(data[1]); // also user
        }
        if (data[0] == "Delete Post") {
          deletePostFromDatabase(data[1]); // also user
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

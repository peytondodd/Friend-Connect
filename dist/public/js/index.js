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

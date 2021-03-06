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

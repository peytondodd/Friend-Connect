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

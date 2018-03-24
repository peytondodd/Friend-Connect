var indexPage = (function() {

  var index = document.querySelector(".index");
  var aboutBox = index.querySelector(".about-btn-box");
  var about = document.querySelector(".about");
  var email = index.querySelector(".email");
  var confirmEmail = index.querySelector(".confirm-email");
  var password = index.querySelector(".password");
  var confirmPassword = index.querySelector(".confirm-password");

  aboutBox.addEventListener("click", aboutTransition);
  email.addEventListener("keyup", showConfirmEmail);
  password.addEventListener("keyup", showConfirmPassword);

  function aboutTransition() {
    about.scrollIntoView({behavior: "smooth"});
  }

  function showConfirmEmail(event) {
    if (event.target.value.length <= 6) {
      confirmEmail.style.display = "none";
    }
    if (event.target.value.length > 6) {
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

})();

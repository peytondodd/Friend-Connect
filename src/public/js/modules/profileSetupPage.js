var profileSetupPage = (function() {
  var profileSetupPage = document.querySelector(".profileSetupPage-bg");
  var imgSelect = profileSetupPage.querySelector(".profileSetupPage2-profileSelector");
  var currentProfileIMG = profileSetupPage.querySelector(".profileSetupPage2-profileIMG");


  imgSelect.addEventListener("click", selectedIMG);


  function selectedIMG(event) {
    console.log(event.target);
    //console.log(event.target.children[0]);

    currentProfileIMG.src = event.target.src;

  }



})();

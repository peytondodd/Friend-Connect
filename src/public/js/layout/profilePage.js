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

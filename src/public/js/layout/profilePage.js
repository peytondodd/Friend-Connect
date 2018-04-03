var profilePage = (function() {

  var profile = document.querySelector(".profilePage");
  if (profile) {
    //CACHE
    var descBox = profile.querySelector(".profilePage__description");
    var descReadMoreBtn = descBox.querySelector(".descReadMore");

    //BIND
    if (descReadMoreBtn) {
      descReadMoreBtn.addEventListener("click", descReadMore);
    }

    //FUNCTIONS
    function descReadMore(event) {
      event.preventDefault();
      descBox.children[1].innerHTML = user_descFull + " <a class='descShowLess' href=''>Show Less</a>";
      // cache and bind Show Less button
      var descShowLessBtn = descBox.querySelector(".descShowLess");
      descShowLessBtn.addEventListener("click", descShowLess);
    }

    function descShowLess(event) {
      event.preventDefault();
      descBox.children[1].innerHTML = user_descShort;
      var descReadMoreBtn = descBox.querySelector(".descReadMore");
      descReadMoreBtn.addEventListener("click", descReadMore);
    }


    //css custom
    //document.body.style.backgroundColor = "#EEE";



  }
})();

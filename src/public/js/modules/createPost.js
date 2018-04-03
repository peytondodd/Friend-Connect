
var createPost = (function() {

  var createAPost = document.querySelector(".createPost");
  if (createAPost) {

    //console.log("from createPost.js");
    var input = createAPost.querySelector(".createPost__input");
    var inputBox = input.parentNode;
    var iconBox = createAPost.querySelector(".createPost__iconBox");
    var postName = createAPost.querySelector(".createPost__name");
    var textWidth = createAPost.querySelector(".createPost__textWidthCount");

    input.addEventListener("focus", inputFocus);
    input.addEventListener("focusout", inputFocusOut);
    input.addEventListener("keydown", inputType);
    window.addEventListener("resize", responsive);


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

    function inputType(event) {
      //console.log(event);
      event.target.style.fontSize = "25px";
      //textWidth.style.fontSize = "25px";
      if (event.target.value.length > 50) {
        event.target.style.fontSize = "20px";
        //textWidth.style.fontSize = "20px";
      }
      if (event.target.value.length > 100) {
        event.target.style.fontSize = "16px";
        //textWidth.style.fontSize = "16px";
      }

      if (textWidth.offsetWidth > event.target.offsetWidth-10) {
        event.target.rows++;
        textWidth.innerHTML = "";
      }
      if (event.keyCode >= 32 ) {
      textWidth.innerHTML += event.key;
      }

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


  }

})();

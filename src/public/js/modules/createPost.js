
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
      submitPost.open("POST", "/posts/create",true);
      submitPost.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      submitPost.send("createPostContent="+input.value);

    }

  }

})();

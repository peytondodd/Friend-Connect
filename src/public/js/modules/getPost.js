
var getPost = (function() {

  var getProfilePost = document.querySelector(".profilePage");
  if (getProfilePost) {

    var postContainer = getProfilePost.querySelector(".profilePage__displayPost");

    function displayPost (post) {

      var newViewPost = document.createElement("div");
      newViewPost.className = "viewPost";
      newViewPost.innerHTML = `
      <div class='viewPost__postBox'>
        <div class="row mx-0">
          <div class="viewPost__postUserIconBox">
            <img class="viewPost__postUserIcon" src=${postIconSrc} alt="profile picture">
          </div>
          <a class="viewPost__name" href="#">${postName}</a>
          <span class="viewPost__date">${post.created_at}</span>
        </div>
        <div class="row mx-0">
          <div class="viewPost__content">
            ${post.content}
          </div>
        </div>
        <div class="row mx-0 viewPost__likeCommentShare">
          <div class="row mx-0">
            <div class="btn-group">
              <a class="btn btn-default" href="">Like</a>
              <a class="btn btn-default" href="">Comment</a>
              <a class="btn btn-default" href="">Share</a>
            </div>
          </div>
        </div>
      </div>`;

      postContainer.insertBefore(newViewPost, postContainer.children[0]);
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
    console.log(postCount);

    //var postCount = 0;
    // AJAX CALL FOR POSTS
    function receiveProfilePost(count) {
      var promiseObj = new Promise (function(resolve, reject) {
        var userId = (window.location.href).split("/");
        userId = userId[userId.length-1];

        var getPost = new XMLHttpRequest();
        getPost.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              var posts = this.responseText;
              //var posts = this.responseText;
              resolve(posts);
            } else {
              reject(this.status);
            }
          }
        };

        getPost.open("GET", "/posts/get?profilePost="+userId+"&postCount="+count, true);
        getPost.send();
      });
      return promiseObj;
    }

    receiveProfilePost(postCount)
      .then(success, failed);

    function success(data) {
      if (data == "refresh poll") {
        receiveProfilePost(postCount)
          .then(success, failed);
      } else {
        data = JSON.parse(data);
        postCount = data.length;
        displayPost(data[data.length-1]);
        receiveProfilePost(postCount)
          .then(success, failed);
      }

      // postCount = data.length;
      // displayPost(data[data.length-1]);
      // receiveProfilePost(postCount)
      //   .then(success, failed);
    }

    function failed(data) {
      console.log("failed code= "+data);
      // receiveProfilePost(postCount)
      //   .then(success, failed);
    }


  }










})();

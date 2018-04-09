
var getPost = (function() {

  var getProfilePost = document.querySelector(".profilePage");
  if (getProfilePost) {

    var postContainer = getProfilePost.querySelector(".profilePage__displayPost");
    var likeOrDislikeBtn = getProfilePost.querySelectorAll(".likeOrDislikeBtn");
    //var likeCount = getProfilePost.querySelector(".viewPost__likeCount");
    //var allPosts = getProfilePost.querySelectorAll(".viewPost");

    likeOrDislikeBtn.forEach(function(btn) {
      btn.addEventListener("click", likeOrDislike);
    });


    function likeOrDislike(event) {
      event.preventDefault();
      var likePostId = this.name;
      var likeDislike = this.innerHTML;

      ajaxCall("GET", "/posts/likeOrDislike?likePostId="+likePostId+"&likeDislike="+likeDislike+"&currentUserId="+currentUserId, true)
        .then(likeOrDislikeSuccess, likeOrDislikeFail);

      function likeOrDislikeSuccess(data) {
        event.target.innerHTML = data;
      }
      function likeOrDislikeFail(data) {}
    }

    function currentLikeStats() {
      var allPosts = getProfilePost.querySelectorAll(".viewPost");
      var likeCounter = [];
      for (var i = 0; i < allPosts.length; i++) {
        //console.log(allPosts[i].children[0].children);
        if (allPosts[i].children[0].children[3]) {
          if (allPosts[i].children[0].children[3].children[0].className == "col viewPost__showLikes") {
            var postId = allPosts[i].classList[1].split("-")[1];
            var likeCount = allPosts[i].children[0].children[3].children[0].children[0].innerText;
            var postAndLike = {
              postId: postId,
              likeCount: likeCount
            }
            likeCounter.push(postAndLike);
          }
        } else {
          var postAndLike = {
            postId: allPosts[i].classList[1].split("-")[1],
            likeCount: 0
          }
          likeCounter.push(postAndLike);
        }
      }
      //console.log(likeCounter);
      return JSON.stringify(likeCounter);
    }

    function likeCountUpdater(postId, likeCount) {
      var posts = postContainer.children;
      for (var i = 0; i < posts.length; i++) {
        //console.log(posts[i].children[0].children);
        var likes = posts[i].children[0];
        if (posts[i].classList[1] == "postID-"+postId) {
          if (likes.children.length > 3) {
            //console.log(likes.children[3]);
            if (likes.children[3].children[0].className == "col viewPost__showLikes") {
              //console.log(likeCount);
              if (likeCount > 0) {
                if (likeCount == 1){
                  likes.children[3].children[0].children[0].innerHTML = likeCount;
                  likes.children[3].children[0].children[1].innerHTML = " person liked this";
                  console.log("good");
                } else {
                  likes.children[3].children[0].children[0].innerHTML = likeCount;
                  likes.children[3].children[0].children[1].innerHTML = " people liked this";
                }
              } else {
                likes.removeChild(likes.children[3]);
                console.log("bad");
              }
            }
          } else {
            if (likeCount != 0) {
              //create new row for like counter
              var newCounter = document.createElement("div");
              newCounter.className = "row";
              newCounter.innerHTML = `
              <div class="col viewPost__showLikes">
                  <span class="viewPost__likeCount">
                    ${likeCount}
                  </span>
                  <span> person liked this</span>
              </div>`;
              if (likes.length > 3) {
                likes.insertBefore(newCounter, likes[3]);
              } else {
                likes.appendChild(newCounter);
              }
            }
          }
        }
      }
    }

    function displayPost (post) {
      var newViewPost = document.createElement("div");
      newViewPost.className = "viewPost postID-"+post.id;
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

    // AJAX CALL
    function ajaxCall(method, url, sync) {
      var promiseObj = new Promise (function(resolve, reject) {
        var getPostInfo = new XMLHttpRequest();
        getPostInfo.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log(this.responseText);
              resolve(this.responseText);
            } else {
              reject(this.status);
            }
          }
        };

        getPostInfo.open(method, url, sync);
        getPostInfo.send();
      });
      return promiseObj;
    }

    // LIFE AJAX CALLER - REAL TIME
    function liveAjaxCall(currentPostInfo) {
      var promiseObj = new Promise (function(resolve, reject) {
        var getPostInfo = new XMLHttpRequest();
        getPostInfo.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log(this.responseText);
              resolve(this.responseText);
            } else {
              reject(this.status);
            }
          }
        };
        getPostInfo.open("POST", "/posts/realTimeEvents", true);
        getPostInfo.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        getPostInfo.send(currentPostInfo);
      });
      return promiseObj;
    }

    // LIVE EVENTS LIVE EVENTS LIVE EVENTS
    function postData() {
      var profileUserId = (window.location.href).split("/");
      profileUserId = profileUserId[profileUserId.length-1];
      var postCount = postContainer.children.length;
      var likeStats = currentLikeStats();
      console.log(JSON.parse(likeStats));
      return ("profilePost="+profileUserId+"&"+
              "profilePostCount="+postCount+"&"+
              "currentUserId="+currentUserId+"&"+
              "likeCount="+likeStats);

    }
    //console.log(postData().length);

    liveAjaxCall(postData())
      .then(realTimeSuccess, realTimeFailed);

    function realTimeSuccess(data) {
      if (data == "refresh poll" || data == "") {
        liveAjaxCall(postData())
          .then(realTimeSuccess, realTimeFailed);
      } else {
        data = JSON.parse(data);
        //new post
        if (data[0] == "New Post") {
          postCount = data[1].length;
          displayPost(data[1][data[1].length-1]);
        }
        //new like
        if (data[0] == "New Like") {
          var postId = data[1];
          var likeCount = data[2];
          likeCountUpdater(postId, likeCount);
        }
        //reload ajax
        liveAjaxCall(postData())
          .then(realTimeSuccess, realTimeFailed);
      }
    }

    function realTimeFailed(data) {
      //console.log("failed code= "+data);
      // liveAjaxCall(postData())
      //   .then(realTimeSuccess, realTimeFailed);
      // // when i call ajax again in this failed function, cannot connect error happens/ only temporary
    }







  }


})();

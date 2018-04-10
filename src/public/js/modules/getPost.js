
var getPost = (function() {

  var getProfilePost = document.querySelector(".profilePage");
  if (getProfilePost) {

    var postContainer = getProfilePost.querySelector(".profilePage__displayPost");
    var likeOrDislikeBtn = getProfilePost.querySelectorAll(".likeOrDislikeBtn");
    //var likeCount = getProfilePost.querySelector(".viewPost__likeCount");
    var allPosts = getProfilePost.querySelectorAll(".viewPost");

    // likeOrDislikeBtn.forEach(function(btn) {
    //   btn.addEventListener("click", likeOrDislike);
    // });

    allPosts.forEach(function(post) {
      post.addEventListener("click", postClickDir);
      // post.addEventListener("change", function() {
      //   //console.log("hya");
      //   allPost.addEventListener("click", postClickDir);
      // });
    });

    function postClickDir(event) {
      event.preventDefault();
      // LIKE  AND DISLIKE CLICKS
      if (event.target.className == "btn btn-default likeOrDislikeBtn") {
        likeOrDislike(event);
      }
      // SHOW COMMENT BUTTONS
      if (event.target.className == "btn btn-default showCommentsBtn" ||
      event.target.className == "viewPost__showComments") {
        showComments(event);
      }
      if (event.target.className == "viewPost__hideComments") {
        hideComments(event);
      }
      // console.log(event.target);
    }


    function likeOrDislike(event) {
      //console.log(event.target);
      var likePostId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1].split("-")[1];
      var likeDislike = event.target.innerHTML;

      ajaxCall("GET", "/posts/likeOrDislike?likePostId="+likePostId+"&likeDislike="+likeDislike+"&currentUserId="+currentUserId, true)
        .then(likeOrDislikeSuccess, likeOrDislikeFail);

      function likeOrDislikeSuccess(data) {
        event.target.innerHTML = data;
      }
      function likeOrDislikeFail(data) {}
    }

    function findPostComments (postId) {
      var comments = [];
      viewPost.forEach(function(value) {
        if (value.id == postId) {
          comments = value.comments.list;
        }
      });
      return comments;
    }

    function showComments(event) {
      var postId = event.target.parentElement.parentElement.parentElement.parentElement.className.split("-");
      var postBox = event.target.parentElement.parentElement.parentElement;
      if (postId[0] == "viewPost postID") {
        //comment link
        postId = postId[1];
        //remove the view comments link
        event.target.parentElement.removeChild(event.target);
      } else {
        //comment button
        postId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.className.split("-")[1];
        postBox = event.target.parentElement.parentElement.parentElement.parentElement;
        //remove the view comments link
        var commentLink = postBox.children[postBox.children.length-1];
        if (commentLink) {
          if (commentLink.children[0].children[0]) {
            if (commentLink.children[0].children[0].className == "viewPost__showComments") {
              postBox.removeChild(commentLink);
            }
          }
        }
      }
      // check if comment button or link has already been clicked
      var rowClassNames = [];
      for (var i = 0; i < postBox.children.length; i++) {
        rowClassNames.push(postBox.children[i].className);
      }
      if (rowClassNames.indexOf("row mx-0 makeCommentBox") != -1 ||
      rowClassNames.indexOf("row mx-0 viewCommentBox") != -1) {
        console.log("bad");
        return;
      } else {
        console.log("good");
      }

      var allComments = findPostComments(postId);

      // // make enter a comment box
      var createComment = document.createElement("div");
      createComment.className = "row mx-0 makeCommentBox";
      createComment.innerHTML = `
        <div class="viewPost__createComment">
          <div class="viewPost__createContainer">
            <textarea class="viewPost__inputComment" rows="3" placeholder="Write a comment..."></textarea>
          </div>
          <input class="mt-2 float-right btn btn-success" type="button" value="Comment">
        </div>
      `;

      if (allComments) {
        var commentStart = 0;
        var commentEnd = 3;

        var commentBox = document.createElement("div");
        commentBox.className = "row mx-0 viewCommentBox";
        commentBox.innerHTML = `
          <a href="" class="viewPost__hideComments">^ Hide comments</a>
          <a href="" class="viewPost__viewOlderComments">View older Comments (20)</a>
        `;
        //comments from users
        for (var i = commentStart; i < commentEnd; i++) {
          var newComment = document.createElement("div");
          newComment.className = "viewPost__commentContainer";
          newComment.innerHTML = `
            <div class="viewPost__commentIconBox">
              <img class="viewPost__commentIcon" src="/user_data/${allComments[i].img_src}" alt="profile icon">
            </div>
            <div class="viewPost__commentContent">
              <a href="/profiles/user/${allComments[i].user_id}">${allComments[i].name} </a>
              <span>${allComments[i].content}</span>
              <div class="">
                ${allComments[i].created_at}
              </div>
            </div>
          `;
          commentBox.appendChild(newComment);
        }
        postBox.appendChild(commentBox);
        postBox.appendChild(createComment);

      } else {
        // postBox.appendChild(createComment.firstChild);
        var cancelComment = document.createElement("div");
        cancelComment.className = "text-center cancelComment";
        cancelComment.innerHTML = `
          <a class="viewPost__hideComments" href="">^ Cancel comment</a>
        `;
        postBox.appendChild(cancelComment);
        postBox.appendChild(createComment);

      }

    }

    function hideComments(event) {
      var postBox = event.target.parentElement.parentElement;
      var postId = postBox.parentNode.className.split("-")[1];
      var rowClassNames = [];
      for (var i = 0; i < postBox.children.length; i++) {
        rowClassNames.push(postBox.children[i].className);
      }
      if (rowClassNames.indexOf("row mx-0 viewCommentBox") != -1) {
        console.log("view Comment Box");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "row mx-0 viewCommentBox") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      } if (rowClassNames.indexOf("row mx-0 makeCommentBox") != -1) {
        console.log("make Comment Box");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "row mx-0 makeCommentBox") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      } if (rowClassNames.indexOf("text-center cancelComment") != -1) {
        console.log("cancel comment");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "text-center cancelComment") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      }

      //show view Comment link
      var comments = findPostComments(postId)
      if (findPostComments(postId)) {
        if (comments.length > 0) {
          var viewComments = document.createElement("div");
          viewComments.className = "row";
          viewComments.innerHTML = `
            <div class="col">
              <a href="" class="viewPost__showComments">View comments (${comments.length})</a>
            </div>
          `;
          postBox.appendChild(viewComments);
        }
      }

    }

    // ajax function use
    function currentLikeStats() {
      var allPosts = getProfilePost.querySelectorAll(".viewPost");
      var likeCounter = [];
      for (var i = 0; i < allPosts.length; i++) {
        //console.log(allPosts[i].children[0].children);
        if (allPosts[i].children[0].children[3]) {
          var postId = allPosts[i].classList[1].split("-")[1];
          if (allPosts[i].children[0].children[3].children[0].className == "col viewPost__showLikes") {
            var likeCount = allPosts[i].children[0].children[3].children[0].children[0].innerText;
          } else {
            var likeCount = 0;
          }
          var postAndLike = {
            postId: postId,
            likeCount: likeCount
          }
          likeCounter.push(postAndLike);
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
          console.log(likes.children);
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
                  console.log("poopie");
                }
              } else {
                likes.removeChild(likes.children[3]);
                console.log("bad");
              }
            } else {
              createNewLikeCounter(likes, likeCount);
            }
          } else {
            createNewLikeCounter(likes, likeCount);
          }
        }
      }
    }

    function createNewLikeCounter(likes, likeCount) {
      if (likeCount != 0) {
        console.log("kooya");
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
        if (likes.children.length > 3) {
          console.log("hiya");
          likes.insertBefore(newCounter, likes.children[3]);
        } else {
          console.log("booya");
          likes.appendChild(newCounter);
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
              <a class="btn btn-default likeOrDislikeBtn" href="">Like</a>
              <a class="btn btn-default showCommentsBtn" href="">Comment</a>
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

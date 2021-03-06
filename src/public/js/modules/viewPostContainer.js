
var viewPostContainer = (function() {

  var viewPostBox = document.querySelector(".viewPostBox");
  if (viewPostBox) {

    var likeOrDislikeBtn = viewPostBox.querySelectorAll(".likeOrDislikeBtn");
    //var likeCount = viewPostBox.querySelector(".viewPost__likeCount");
    var allPosts = viewPostBox.querySelectorAll(".viewPost");

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
      if (event.target.className != "viewPost__name" && 
      event.target.className != "viewPost__postUserIconLink" && 
      event.target.className != "viewPost__postUserIcon" &&
      event.target.className != "viewPost__commentIconLink" && 
      event.target.className != "viewPost__commentIcon" && 
      event.target.className != "viewPost__commentName") {
        event.preventDefault();
      }
      //console.log(event.target);
      //event.preventDefault();
      //console.log(event.target);
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
      if (event.target.name == "makeAPostComment") {
        addComment(event);
      }
      if (event.target.className == "viewPost__viewOlderComments") {
        olderComments(event);
      }
      if (event.target.className == "viewPost__deleteComment") {
        deleteComment(event);
      }
      if (event.target.className == "viewPost__deletePost") {
        deletePost(event);
      }
      if (event.target.className == "viewPost__editPost") {
        editPost(event);
      }
      if (event.target.name == "viewPost__saveEdit" ||
      event.target.name == "viewPost__cancelEdit") {
        editPostAction(event);
      }

      //console.log(event.target);
    }
    if (pageAction) {
      if (pageAction[0] == "post") {
      //  var profile = document.querySelector(".profilePage");
      //   profile.children[1].style.display = "none";
      //   if (profile.children.length > 2) {
      //     for (var i = profile.children.length-1; i > 1; i--) {
      //       profile.removeChild(profile.children[i]);
      //     }
      //   }
        var post = [];
        viewPost.forEach(function(value) {
          if (value.id == pageAction[1]) {
            post.push(value);
          }
        });
        if (post[0]) {
          displayPost(post, 1);
        } else {
          window.location.replace("/profiles/user/"+viewUserInfo.id);
        }
      }
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
      // console.log(viewPost);
      if (viewPost) {
        if (postId == "ALL") {
          var comments = [];
          viewPost.forEach(function(value) {
            var commentsCount = value.comments.list.length;
            if (!commentsCount) {
              commentsCount = 0;
            }

            var postComments = {
              postId: value.id,
              //comments: value.comments.list,
              commentsCount: commentsCount
            }
            comments.push(postComments);
          });
        } else {
          var comments = [];
          viewPost.forEach(function(value) {
            if (value.id == postId) {
              comments = value.comments.list;
            }
          });
        }
        return comments;
      } else {
        return 0;
      }

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
        // console.log("bad");
        return;
      } else {
        // console.log("good");
      }

      var allComments = findPostComments(postId);

      // // make enter a comment box
      var createComment = createCommentInput();

      if (allComments) {
        var commentStart = 0;
        var commentLimit = 5; // # of comments shown at start

        var commentBox = commentLoader(allComments, commentStart, commentLimit, 1);

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

    function createCommentInput() {
      var createComment = document.createElement("div");
      createComment.className = "row mx-0 makeCommentBox";
      createComment.innerHTML = `
        <div class="viewPost__createComment">
          <div class="viewPost__createContainer">
            <textarea class="viewPost__inputComment" rows="3" placeholder="Write a comment..."></textarea>
          </div>
          <input class="mt-2 float-right btn btn-success" type="button" name="makeAPostComment" value="Comment">
        </div>
      `;
      return createComment;
    }

    function hideComments(event) {
      var postBox = event.target.parentElement.parentElement;
      var postId = postBox.parentNode.className.split("-")[1];
      var rowClassNames = [];
      for (var i = 0; i < postBox.children.length; i++) {
        rowClassNames.push(postBox.children[i].className);
      }
      if (rowClassNames.indexOf("row mx-0 viewCommentBox") != -1) {
        // console.log("view Comment Box");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "row mx-0 viewCommentBox") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      } if (rowClassNames.indexOf("row mx-0 makeCommentBox") != -1) {
        // console.log("make Comment Box");
        for (var i = 0; i < postBox.children.length; i++) {
          if (postBox.children[i].className == "row mx-0 makeCommentBox") {
            postBox.removeChild(postBox.children[i]);
          }
        }
      } if (rowClassNames.indexOf("text-center cancelComment") != -1) {
        // console.log("cancel comment");
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
              <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${comments.length}</span>)</a>
            </div>
          `;
          postBox.appendChild(viewComments);
        }
      }
    }

    function addComment(event) {
      var inputComment = event.target.parentElement.children[0].children[0];
      var postId = event.target.parentElement.parentElement.parentElement.parentElement.className.split("-")[1];
      var userId = currentUserId;

      if (inputComment.value != "") {
        var commentData = ("commentUserId="+userId+"&"+
                    "commentPostId="+postId+"&"+
                    "commentContent="+inputComment.value);

        ajaxCall("POST", "/posts/createComment", true, commentData)
          .then(addCommentSuccess, addCommentFail);
      }
      function addCommentSuccess(data) {
        inputComment.value = "";
      }
      function addCommentFail(data) {

      }
    }

    // View Older Comments()
    function olderComments(event) {
      var postBox = event.target.parentElement.parentElement;
      var postId = postBox.parentElement.className.split("-")[1];
      var createComment = createCommentInput();
      var allComments = findPostComments(postId);
      var commentsLeft = Number(event.target.textContent.split("(")[1].split(")")[0]);
      var commentsShown = event.target.parentElement.children.length - 2;
      var commentLimit = 5; // # of comments shown after view more

      if (commentsLeft - commentLimit > 0) {
        var commentBox = commentLoader(allComments, commentsShown, commentsShown + commentLimit);
      } else {
        // console.log(commentsShown);
        // console.log(commentsShown + commentsLeft);
        var commentBox = commentLoader(allComments, commentsShown, commentsShown + commentsLeft);
      }

      //add new comments
      // console.log(commentBox);
      for (var i = commentBox.children.length-1; i >= 0; i--) {
        event.target.parentElement.insertBefore(commentBox.children[i], event.target.parentElement.children[2]);
      }
      //remove hide comment and view older comment(#) to be updated
      event.target.parentElement.removeChild(event.target.parentElement.children[0]);
      event.target.parentElement.removeChild(event.target.parentElement.children[0]);

    }

    function deleteComment(event) {
      var commentId = event.target.parentElement.parentElement.parentElement.className.split("-")[1];
      var userId = currentUserId;
      var commentData = ("deleteCommentUserId="+userId+"&"+
                          "deleteCommentCommentId="+commentId);

      ajaxCall("POST", "/posts/deleteComment", true, commentData)
        .then(deleteCommentSuccess, deleteCommentFail);

      function deleteCommentSuccess(data) {
        var comment = event.target.parentElement.parentElement.parentElement;//delete this
        var commentClass = comment.className;
        var commentId = commentClass.split("-")[1];
        var commentParent = comment.parentElement;
        var postId = commentParent.parentElement.parentElement.className.split("-")[1];
        // console.log(postId);
        // console.log(viewPost);

        //remove dom element
        for (var i = 0; i < commentParent.children.length; i++) {
          if (commentParent.children[i].className == commentClass) {
            commentParent.removeChild(comment);
          }
        }

        //remove from viewPost
        viewPost.forEach(function(value) {
          if (value.id == postId) {
            for (var i = 0; i < value.comments.count; i++) {
              if (value.comments.list[i]) {
                // console.log("hello");
                if (value.comments.list[i].id == commentId) {
                  value.comments.list.splice(i, 1);
                  //console.log(value.comments);
                }
              }
            }
          }
        });

      }
      function deleteCommentFail(data) {}

    }

    function commentLoader(allComments, commentStart, commentLimit, invert = 0) {
      var oldComments = allComments.length - commentLimit;
      var commentBox = document.createElement("div");
      commentBox.className = "row mx-0 viewCommentBox";
      if (oldComments > 0) {
        commentBox.innerHTML = `
          <a href="" class="viewPost__hideComments">^ Hide comments</a>
          <a href="" class="viewPost__viewOlderComments">View older Comments (${oldComments})</a>
        `;
      } else {
        commentBox.innerHTML = `
          <a href="" class="viewPost__hideComments">^ Hide comments</a>
        `;
      }
      var order = [];
      if (invert = 1) {
        for (var i = commentLimit-1; i >= commentStart; i--) {
          order.push(i);
        }
      } else {
        for (var i = commentStart; i < commentLimit; i++) {
          order.push(i);
        }
      }
      //console.log(order);
      // console.log(allComments);
      //comments from users
      for (var i = 0; i < order.length; i++) {
        if (allComments[order[i]]) {
          var newComment = document.createElement("div");
          newComment.className = "viewPost__commentContainer commentId-"+allComments[order[i]].id;
          newComment.innerHTML = `
            <div class="viewPost__commentIconBox">
              <a class="viewPost__commentIconLink" href="/profiles/user/${allComments[order[i]].user_id}">
                <img class="viewPost__commentIcon" src="/user_data/${allComments[order[i]].img_src}" alt="profile icon">
              </a>
            </div>
            <div class="viewPost__commentContent">
              <a class="viewPost__commentName" href="/profiles/user/${allComments[order[i]].user_id}">${allComments[order[i]].name} </a>
              <span>${allComments[order[i]].content}</span>
              <div class="">
                ${allComments[order[i]].created_at}
              </div>
            </div>
          `;
          //add delete link to comment
          if (currentUserId == allComments[order[i]].user_id) {
            var deleteComment = document.createElement("div");
            deleteComment.innerHTML = `
              <a class="viewPost__deleteComment" href="">delete</a>
            `;
            newComment.children[1].appendChild(deleteComment);
          }
          commentBox.appendChild(newComment);
        }
      }
      // console.log(commentBox.children[commentBox.children.length-1]);
      // console.log(commentBox.children.length);
      return commentBox;
    }

    function deletePost(event) {
      var postId = event.target.parentElement.parentElement.parentElement.parentElement.className.split("-")[1];
      var userId = currentUserId;
      var postData = ("deletePostUserId="+userId+"&"+
                          "deletePostId="+postId);

      ajaxCall("POST", "/posts/deletePost", true, postData)
        .then(deletePostSuccess, deletePostFail);

      function deletePostSuccess(data) {
        //remove from DOM
        var post = event.target.parentElement.parentElement.parentElement.parentElement;
        post.parentElement.removeChild(post);

        //remove from viewPost
        // var deleteIndex;
        // for (var i = 0; i < viewPost.length; i++) {
        //   if (viewPost[i].id == postId) {
        //     deleteIndex = i;
        //   }
        // }
        // viewPost.splice(deleteIndex, 1);

      }
      function deletePostFail(data) {

      }

    }

    function editPost(event) {
      //console.log(event.target.parentElement.parentElement.parentElement.children[1]);
      var contentContainer = event.target.parentElement.parentElement.parentElement.children[1];
      // console.log(event.target.parentElement.parentElement.parentElement.children[1].children[0].innerText);
      var postContent = event.target.parentElement.parentElement.parentElement.children[1].children[0].innerText;

      //original
      contentContainer.children[0].style.display = "none";

      //hide edit/delete btn
      event.target.parentElement.style.display = "none";

      //edit
      var editContent = document.createElement("div");
      editContent.className = "viewPost__editContent";
      editContent.innerHTML = `
        <textarea class="viewPost__editInput">${postContent}</textarea>
        <div class="float-right">
        <input class="btn btn-success" type="button" name="viewPost__saveEdit" value="Save">
        <input class="btn btn-danger" type="button" name="viewPost__cancelEdit" value="Cancel">
        </div>
      `;

      contentContainer.appendChild(editContent);

      var editInput = editContent.querySelector(".viewPost__editInput");
      editInput.style.height = "";
      editInput.style.height = editInput.scrollHeight + 15 + "px";

      editInput.addEventListener("keydown", editPostInputDown);
      editInput.addEventListener("keyup", editPostInputUp);
      //editContent.addEventListener("click", postClickDir);
    }

    function editPostInputDown(event) {
      //resize
      event.target.style.height = "";
      event.target.style.height = event.target.scrollHeight + 15 + "px";

      //max length
      if (event.target.value.length > 1999) {
        if (event.keyCode != 8) {
          event.preventDefault();
        }
      }
    }

    function editPostInputUp(event) {
      if (event.target.value.length > 1999) {
        var temp = event.target.value;
        event.target.value = "";
        event.target.value = temp.substring(0, 2000);
      }
    }

    function editPostAction(event) {
      var postBox = event.target.parentElement.parentElement.parentElement.parentElement;

      if (event.target.name == "viewPost__saveEdit") {
        var userId = currentUserId;
        var postId = postBox.parentElement.className.split("-")[1];
        var content = event.target.parentElement.parentElement.children[0].value;

        var postData = ("editPostUserId="+userId+"&"+
                        "editPostId="+postId+"&"+
                        "editPostContent="+content);

        ajaxCall("POST", "/posts/editPost", true, postData)
          .then(editPostSuccess, editPostFail);

        function editPostSuccess(data) {
          // show edit and delete btn
          postBox.children[0].children[0].style.display = "block";
          // remove the edit textarea
          var contentRow = postBox.children[1];
          contentRow.removeChild(contentRow.children[contentRow.children.length-1]);
          contentRow.children[0].style.display = "block";
          // edit viewPost
          // viewPost.forEach(function(value) {
          //   if (value.id == postId) {
          //     value.content = content;
          //   }
          // });
        }
        function editPostFail(data) {}

      } else if (event.target.name == "viewPost__cancelEdit") {
        // show edit and delete btn
        postBox.children[0].children[0].style.display = "block";
        // remove the edit textarea
        var contentRow = postBox.children[1];
        contentRow.removeChild(contentRow.children[contentRow.children.length-1]);
        contentRow.children[0].style.display = "block";

      }
    }

    // ajax function use
    function currentLikeStats() {
      var allPosts = viewPostBox.querySelectorAll(".viewPost");
      var likeCounter = [];
      for (var i = 0; i < allPosts.length; i++) {
        //check if photo shown
        if (allPosts[i].children.length > 1) {
          var post = allPosts[i].children[1];
        } else {
          var post = allPosts[i].children[0];
        }
        
        if (post.children[3]) {
          var postId = allPosts[i].classList[1].split("-")[1];
          if (post.children[3].children[0].className == "col viewPost__showLikes") {
            var likeCount = post.children[3].children[0].children[0].innerText;
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
      if (likeCounter[0]) {
        return JSON.stringify(likeCounter);
      } else {
        return 0;
      }
    }

    function currentPostContent() {
      if (viewPost[0]) {
        var currentPostContent = [];

        viewPost.forEach(function(value) {
          var postContent = {
            postId: value.id,
            content: value.content
          }
          currentPostContent.push(postContent);
        });

        return JSON.stringify(currentPostContent);

      } else {
        return 0;
      }
    }

    function likeCountUpdater(postId, likeCount) {
      //var posts = viewPostBox.children;
      var tempposts = viewPostBox.querySelectorAll(".viewPost");
      var posts = [];
      for (var i = 0; i < tempposts.length; i++) { //convert nodelist to array
        posts.push(tempposts[i]);
      }
      // console.log(posts);
      //photos page post
      var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
      if (photoDisplayContainer) {
        var singlePost = photoDisplayContainer.querySelector(".viewPost");
        posts.push(singlePost);
      }
      // console.log(photoDisplayContainer);
      // console.log(posts);
      //console.log(posts);
      for (var i = 0; i < posts.length; i++) {
        //console.log(posts[i].children[0].children);
        if (posts[i].children.length > 1) { //get postBox
          var likes = posts[i].children[1];
        } else {
          var likes = posts[i].children[0];
        }
        if (posts[i].classList[1] == "postID-"+postId) {
          // console.log(likes.children);
          if (likes.children.length > 3) {
            //console.log(likes.children[3]);
            if (likes.children[3].children[0].className == "col viewPost__showLikes") {
              //console.log(likeCount);
              if (likeCount > 0) {
                if (likeCount == 1){
                  likes.children[3].children[0].children[0].innerHTML = likeCount;
                  likes.children[3].children[0].children[1].innerHTML = " person liked this";
                  // console.log("good");
                } else {
                  likes.children[3].children[0].children[0].innerHTML = likeCount;
                  likes.children[3].children[0].children[1].innerHTML = " people liked this";
                  // console.log("poopie");
                }
              } else {
                likes.removeChild(likes.children[3]);
                // console.log("bad");
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

    function createNewLikeCounter(likes, likeCount) { //likes = postBox
      if (likeCount != 0) {
        // console.log("kooya");
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
          // console.log("hiya");
          likes.insertBefore(newCounter, likes.children[3]);
        } else {
          // console.log("booya");
          likes.appendChild(newCounter);
        }
      }
    }

    function commentUpdater(newComments) {
      viewPost.forEach(function(value) {
        //update ViewPost
        for (var i = 0; i < newComments.length; i++) {
          if (value.id == newComments[i].post_id) {

            if (value.comments.list != 0) {
              value.comments.list.unshift(newComments[i]);
            } else {
              value.comments.list = [];
              value.comments.list.push(newComments[i]);
            }
          }
        }
        value.comments.count = value.comments.list.length; //needed in the delete, delete uses the count property

        //update the DOM
        var tempAllPosts = viewPostBox.querySelectorAll(".viewPost");
        var allPosts = [];
        for (var i = 0; i < tempAllPosts.length; i++) { //convert nodeList to array
          allPosts.push(tempAllPosts[i]);
        }
        var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
        if (photoDisplayContainer) {
          var singlePost = photoDisplayContainer.querySelector(".viewPost");
          allPosts.push(singlePost);
        }
        for (var i = 0; i < allPosts.length; i++) {     
          var postId = allPosts[i].className.split("-")[1];
          if (postId == value.id) { //post # found
            var viewCommentBox = allPosts[i].querySelector(".viewCommentBox");
            var makeCommentBox = allPosts[i].querySelector(".makeCommentBox");
            var commentContainer = commentLoader(newComments, 0, newComments.length);
            //if photo is shown
            if (allPosts[i].children.length > 1) {
              var post = allPosts[i].children[1];
            } else {
              var post = allPosts[i].children[0];
            }

            if (viewCommentBox) {//there are comments - view and make shown
              if (commentContainer.children.length < 6) { // 4 comments
                for (var j = 1; j < commentContainer.children.length; j++) {
                  viewCommentBox.appendChild(commentContainer.children[j]);
                }
              } else { //more than 4 comments
                for (var j = 2; j < commentContainer.children.length; j++) {
                  viewCommentBox.appendChild(commentContainer.children[j]);
                }
              }

            } else if (!viewCommentBox && makeCommentBox) {//no comments made - only make shown
              post.removeChild(post.children[3]);
              post.insertBefore(commentContainer, post.children[3]);

            } else if (!viewCommentBox && !makeCommentBox) {//not opened - none shown
              //show view Comment link
              var totalComments = value.comments.list.length;
              var counterBox = allPosts[i].querySelector(".commentCount");
              if (counterBox) {
                if (totalComments > 0) {
                  counterBox.innerText = totalComments;
                } else {
                  post.removeChild(post.children[post.children.length-1]);
                }
              } else {
                if (totalComments > 0) {
                  var viewComments = document.createElement("div");
                  viewComments.className = "row";
                  viewComments.innerHTML = `
                    <div class="col">
                      <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${totalComments}</span>)</a>
                    </div>
                  `;
                  post.appendChild(viewComments);
                }
              }

            }

            // var commentCount = allPosts[i].querySelector(".commentCount");
            // if (commentCount) {
            //   commentCount.innerHTML =
            // }
          }
        }
      });
      //console.log(viewPost);
    }

    function deletedCommentFromDatabase(commentList) {
      // console.log(commentList);
      if (commentList) {
        if (commentList[0] == "Last Comment") {
          var postId = commentList[1];
        } else {
          var postId = commentList[0].post_id;
        }
        viewPost.forEach(function(value) {
          if (value.id == postId) {
            var found = [];
            for (var i = 0; i < value.comments.list.length; i++) {
              var exists = 0;
              for (var j = 0; j < commentList.length; j++) {
                if (value.comments.list[i].id == commentList[j].id) {
                  exists = 1;
                }
                if (j == commentList.length - 1) {
                  if (exists != 1) { //comment is deleted if not in list eg. index will = 0
                    found.push(i); // post index
                    found.push(value.comments.list[i]);
                  }
                }
              }
            }

            // console.log(found);
            if (found[0] >= 0) {
              // remove from viewPost
              value.comments.list.splice(found[0], 1);
              value.comments.count = value.comments.count - 1;
              // console.log(viewPost);

              //remove from DOM
              var tempPosts = viewPostBox.querySelectorAll(".viewPost");
              var allPosts = [];
              for (var i = 0; i < tempPosts.length; i++) { //covert nodeList to array
                allPosts.push(tempPosts[i]);
              }
              //single page post
              var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
              if (photoDisplayContainer) {
                var singlePost = photoDisplayContainer.querySelector(".viewPost");
                allPosts.push(singlePost);
              }
              for (var i = 0; i < allPosts.length; i++) {
                if (allPosts[i].children.length > 1) {
                  var post = allPosts[i].children[1];
                } else {
                  var post = allPosts[i].children[0];
                }
                var domPostId = allPosts[i].className.split("-")[1];

                if (domPostId == found[1].post_id) {
                  var viewCommentBox = allPosts[i].querySelectorAll(".viewCommentBox");
                  // console.log(viewCommentBox);
                  if (viewCommentBox[0]) { //view shown
                    // console.log(viewCommentBox);
                    for (var j = 0; j < viewCommentBox[0].children.length; j++) {
                      var viewCommentId = viewCommentBox[0].children[j].className.split("-")[1];
                      if (viewCommentId == found[1].id) {
                        viewCommentBox[0].removeChild(viewCommentBox[0].children[j]);
                      }
                    }
                  } else { //view comments not shown

                    //show view Comment link
                    if (commentList[0] == "Last Comment") {
                      var totalComments = 0;
                    } else {
                      var totalComments = commentList.length;
                    }
                    var counterBox = allPosts[i].querySelector(".commentCount");
                    if (counterBox) {
                      if (totalComments > 0) {
                        counterBox.innerText = totalComments;
                      } else {
                        post.removeChild(post.children[post.children.length-1]);
                      }
                    } //else {
                    //   if (totalComments > 0) {
                    //     var viewComments = document.createElement("div");
                    //     viewComments.className = "row";
                    //     viewComments.innerHTML = `
                    //       <div class="col">
                    //         <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${totalComments}</span>)</a>
                    //       </div>
                    //     `;
                    //     post.appendChild(viewComments);
                    //   }
                    // }
                  }

                }
              }

            }

          }
        });
      } else {
        //location.reload();
      }
      //console.log(commentList);
    }

    function deletePostFromDatabase(newPosts) {//newPosts = posts not deleted
      var found = [];
      //last post
      if (viewPost.length == 1 && newPosts == false) {
        found.push("zero");
      }
      viewPost.forEach(function(value,index) {
        var exists = 0;

        for (var i = 0; i < newPosts.length; i++) {
          if (value.id == newPosts[i].id) {
            exists = 1;
          }
          if (i == newPosts.length - 1) {
            if (exists != 1) {
              if (index == 0) {
                found.push("zero");
              } else {
                found.push(index);
              }
              // console.log(value);
              found.push(value);
            }
          }
        }
      });
      // console.log(found);
      if (found.length > 2) {
        for (var i = 1; i < found.length; i += 2) {
          for (var j = 0; j < viewPost.length; j++) {
            if (viewPost[j].id == found[i].id) {
              viewPost.splice(j, 1);
            }
          }
          //console.log(viewPost.splice(found[i], 1));
          //console.log("DELETE = "+ i);
        }
        // console.log(viewPost.length);
      } else if (found[0]) {
        //update viewPost
        if (found[0] == "zero") {
          viewPost.splice(0, 1);
        } else {
          viewPost.splice(found[0], 1);
        }

        //remove from dom
        // console.log("hi");
        var tempPosts = viewPostBox.querySelectorAll(".viewPost");
        var allPosts = [];
        for (var i = 0; i < tempPosts.length; i++) { //convert nodeList to array
          allPosts.push(tempPosts[i]);
        }
        //single page post
        var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
        if (photoDisplayContainer) {
          var singlePost = photoDisplayContainer.querySelector(".viewPost");
          if (singlePost) {
            allPosts.push(singlePost);
          }
        }
        var postIndex;
        for (var i = 0; i < allPosts.length; i++) {
          // console.log(allPosts[i]);
          var postId = allPosts[i].className.split("-")[1];
          if (found[i] == "zero") {
            //postIndex = i;
            allPosts[i].parentElement.removeChild(allPosts[i]);
          } else if (postId == found[1].id) {
            //postIndex = i;
            allPosts[i].parentElement.removeChild(allPosts[i]);
          }
        }
        //allPosts[postIndex].parentElement.removeChild(allPosts[postIndex]);

      }
    }

    function updatePostContent (post) {
      if (post) {
        //update viewPost
        viewPost.forEach(function(value) {
          if (value.id == post.id) {
            if (value.content != post.content) {
              value.content = post.content;
            }
          }
        });

        //update DOM
        var tempPosts = viewPostBox.querySelectorAll(".viewPost");
        var allPosts = [];
        for (var i = 0; i < tempPosts.length; i++) {
          allPosts.push(tempPosts[i]);
        }
        //single page post
        var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
        if (photoDisplayContainer) {
          var singlePost = photoDisplayContainer.querySelector(".viewPost");
          allPosts.push(singlePost);
        }
        for (var i = 0; i < allPosts.length; i++) {
          if (allPosts[i].children.length > 1) {
            var postDOM = allPosts[i].children[1];
          } else {
            var postDOM = allPosts[i].children[0];
          }
          
          var postId = allPosts[i].className.split("-")[1];
          if (postId == post.id) {
            var oldContent = postDOM.children[1].children[0];

            if (oldContent.innerText != post.content) {
              oldContent.innerText = post.content;
            }
          }
        }
      }
    }

    function displayPost (post, photos = 0) {
      if (!viewPost || viewPost == 0) {
        viewPost = [];
        //console.log(viewPost);
      }
      for (var i = 0; i <post.length; i++) {
        //update ViewPost
        if (photos != 1) {
          viewPost.push(post[i]);
        }
        //update DOM
        var newViewPost = document.createElement("div");
        newViewPost.className = "viewPost postID-"+post[i].id;
        newViewPost.innerHTML = `
        <div class='viewPost__postBox'>
          <div class="row mx-0">
            <div class="viewPost__postUserIconBox">
              <a class="viewPost__postUserIconLink" href="/profiles/user/${post[i].user_id}">
                <img class="viewPost__postUserIcon" src="/user_data/${post[i].img_src}" alt="profile picture">
              </a>
            </div>
            <a class="viewPost__name" href="/profiles/user/${post[i].user_id}">${post[i].name}</a>
            <span class="viewPost__date">${post[i].created_at}</span>
          </div>
          <div class="row mx-0">
            <div class="viewPost__content">
              ${post[i].content}
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

        //if post has a photo
        if (post[i].photo == 1) {
          var photoContainer = document.createElement("div");
          photoContainer.className = "viewPost__photosPage--displayPhotoContainer";
          photoContainer.innerHTML = `
          <div class="viewPost__photosPage--displayPhotoBox">
            <img class="viewPost__photosPage--displayPhoto" src="/user_data/${post[i].user_id}/${post[i].photoName}">
          </div>
          `;
          newViewPost.insertBefore(photoContainer, newViewPost.children[0]);
        }

        //edit/delete button
        if (currentUserId == post[i].user_id) {
          var postMod = document.createElement("p");
          postMod.className = "viewPost__modLink";
          postMod.innerHTML = `
            <a class="viewPost__editPost" href="#">Edit</a> |
            <a class="viewPost__deletePost" href="#">Delete</a>
          `;
          if (post[i].photo == 1) {
          newViewPost.children[1].children[0].insertBefore(postMod, newViewPost.children[1].children[0].children[0]);
          } else {
          newViewPost.children[0].children[0].insertBefore(postMod, newViewPost.children[0].children[0].children[0]);
          }
        }

        // likes
        if (post[i].currentUserLike) {
          newViewPost.querySelector(".likeOrDislikeBtn").innerText = "Dislike";
        }
        if (post[i].likeCount > 0) {
          if (newViewPost.children.length > 1) {
            var postBox = newViewPost.children[1]; 
          } else {
            var postBox = newViewPost.children[0];
          }
          createNewLikeCounter(postBox, post[i].likeCount);
        }

        // comments
        var totalComments = post[i].comments.list.length;
        if (totalComments > 0) {
          var viewComments = document.createElement("div");
          viewComments.className = "row";
          viewComments.innerHTML = `
            <div class="col">
              <a href="" class="viewPost__showComments">View comments (<span class="commentCount">${totalComments}</span>)</a>
            </div>
          `;
          newViewPost.children[newViewPost.children.length-1].appendChild(viewComments);
        }

        if (photos == 1) { // add to DOM
          var photoDisplayContainer = document.querySelector(".profilePage__photosPage__displayContainer");
          photoDisplayContainer.appendChild(newViewPost);
          // console.log(photoDisplayContainer);
        } else {
          viewPostBox.insertBefore(newViewPost, viewPostBox.children[0]);
        }
        newViewPost.addEventListener("click", postClickDir);
      }
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
    function ajaxCall(method, url, sync, postData=0) {
      var promiseObj = new Promise (function(resolve, reject) {
        var getPostInfo = new XMLHttpRequest();
        getPostInfo.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              //console.log(this.responseText);
              resolve(this.responseText);
            } else {
              reject(this.status);
            }
          }
        };

        getPostInfo.open(method, url, sync);
        if (method == "GET") {
          getPostInfo.send()
        } else if (method == "POST") {
          getPostInfo.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          getPostInfo.send(postData);
        }
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
              //  console.log(this.responseText);
              //console.log(JSON.parse(this.responseText));
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
      var postCount = viewPostBox.children.length;
      var likeStats = currentLikeStats();
      var currentComments = JSON.stringify(findPostComments("ALL"));
      var postContent = currentPostContent();

      return ("postsUserId="+JSON.stringify(postsUserId)+"&"+ //in the script element
              "profilePostCount="+postCount+"&"+
              "currentUserId="+currentUserId+"&"+
              "likeCount="+likeStats+"&"+
              "currentComments="+currentComments+"&"+
              "currentPostContent="+postContent
      );
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
          var newPostCount = data[2];
          var newPost = [];
          for (var i = newPostCount; i > 0; i--) {
            newPost.push(data[1][postCount-i]);
          }
          displayPost(newPost);
        }
        //new like
        if (data[0] == "New Like") {
          var postId = data[1];
          var likeCount = data[2];
          likeCountUpdater(postId, likeCount);
        }
        if (data[0] == "New Comment") {
          var newComments = data[1];
          commentUpdater(newComments);
        }
        if (data[0] == "Delete Comment") {
          var temp = [];
          if (!data[1]) {//last comment
            viewPost.forEach(function(value) {
              if (value.id == data[2]) { // id of post of comment-(data[2])
                if (value.comments.list[0]) {
                  temp.push("Last Comment"); // also user
                  temp.push(value.id);
                }
              }
            });
            if (temp[0]) {
              deletedCommentFromDatabase(temp); //last comment
            }
          } else { 
            deletedCommentFromDatabase(data[1]); // also user //not last comment
          }
        }
        if (data[0] == "Delete Post") {
          deletePostFromDatabase(data[1]); // only from database // when user clicks delete, it is deleted from dom and viewpost on success
        }
        if (data[0] == "New Post Content") {
          updatePostContent(data[1]);
        }
        //reload ajax
        liveAjaxCall(postData())
          .then(realTimeSuccess, realTimeFailed);
      }
    }

    function realTimeFailed(data) {
      liveAjaxCall(postData())
      .then(realTimeSuccess, realTimeFailed);
      //console.log("failed code= "+data);
      // liveAjaxCall(postData())
      //   .then(realTimeSuccess, realTimeFailed);
      // // when i call ajax again in this failed function, cannot connect error happens/ only temporary
    }







  }


})();

var friendrequest = (function() {

    var friendrequestcontainer = document.querySelector(".friendrequestcontainer");

    if (friendrequestcontainer) {

        var total = document.querySelector(".friendrequest__total");
        friendrequestcontainer.addEventListener("click", friendRequestDir);

        function friendRequestDir(event) {
            console.log(event.target);
            if (event.target.innerText == "Accept") {
                acceptFriend(event);
            } else if (event.target.innerText == "Decline") {
                declineFriend(event);
            } else if (event.target.innerText == "Block") {
                blockFriend(event);
            } 
        }

        function acceptFriend(event) {
            var friendId = event.target.parentElement.parentElement.id;
            ajaxCall("GET", "/friends/accept?acceptFriendId="+friendId, true)
                .then(acceptFriendSuccess, acceptFriendFail);
            function acceptFriendSuccess(data) {
                if (data == "Friends") {
                    var removeRequest = event.target.parentElement.parentElement.parentElement;
                    friendrequestcontainer.removeChild(removeRequest);
                    total.innerText = Number(total.innerText) - 1;
                }
            }
            function acceptFriendFail(data) {}
        }

        function declineFriend(event) {
            var friendId = event.target.parentElement.parentElement.id;
            ajaxCall("GET", "/friends/decline?declineFriendId="+friendId, true)
                .then(declineFriendSuccess, declineFriendFail);
            function declineFriendSuccess(data) {
                if (data == "Add Friend") {
                    var removeRequest = event.target.parentElement.parentElement.parentElement;
                    friendrequestcontainer.removeChild(removeRequest);
                    total.innerText = Number(total.innerText) - 1;
                }
            }
            function declineFriendFail(data) {}
        }

        function blockFriend(event) {
            var friendId = event.target.parentElement.parentElement.id;
            ajaxCall("GET", "/friends/block?blockFriendId="+friendId, true)
                .then(blockFriendSuccess, blockFriendFail);
            function blockFriendSuccess(data) {
                if (data == "Unblock") {
                    var removeRequest = event.target.parentElement.parentElement.parentElement;
                    friendrequestcontainer.removeChild(removeRequest);
                    total.innerText = Number(total.innerText) - 1;
                }
            }
            function blockFriendFail(data) {}
        }

         // AJAX CALL
         function ajaxCall(method, url, sync, postData=0) {
            var promiseObj = new Promise (function(resolve, reject) {
            var sendData = new XMLHttpRequest();
            sendData.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        //console.log(this.responseText);
                        resolve(this.responseText);
                    } else {
                        reject(this.status);
                    }
                }
            };
    
            sendData.open(method, url, sync);
            if (method == "GET") {
                sendData.send()
            } else if (method == "POST") {
                sendData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                sendData.send(postData);
            }
            });
            return promiseObj;
        }

        // NO REALTIME YET

    }

})();
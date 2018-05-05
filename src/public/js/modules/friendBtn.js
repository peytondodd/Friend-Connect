var friendBtn = (function() {

    var friendBtnBox = document.querySelector(".profilePage__header--friendBtnBox");
    if (friendBtnBox) {
        var friendStatus = friendBtnBox.querySelector("button[name='friendBtn-Status']");
    }
    if (friendStatus) {

        friendBtnBox.addEventListener("click", friendBtnClick);
        
        function friendBtnClick(event) {
            //console.log(event.target.innerText);
            if (event.target.innerText == "Add Friend") {
                addFriend();
            }
            if (event.target.innerText == "Cancel") {
                cancelFriend();
            }
            if (event.target.innerText == "Accept") {
                acceptFriend();
            }
            if (event.target.innerText == "Decline") {
                declineFriend();
            }
            if (event.target.innerText == "Unfriend") {
                unfriendFriend();
            }
            if (event.target.innerText == "Block") {
                blockFriend();
            }
            if (event.target.innerText == "Unblock") {
                unblockFriend();
            }
            
        }

        // Add friend
        function addFriend() {
            ajaxCall("GET", "/friends/add?addFriendId="+viewUserInfo.id, true)
                .then(addFriendSuccess, addFriendFail);
            
            function addFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }

                friendBtnBox.appendChild(friendActionBtn("Cancel"));
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function addFriendFail(data) {}
        }
        // Cancel Friend
        function cancelFriend() {
            ajaxCall("GET", "/friends/cancel?cancelFriendId="+viewUserInfo.id, true)
                .then(cancelFriendSuccess, cancelFriendFail);
            
            function cancelFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function cancelFriendFail(data) {}
        }

        // accept Friend
        function acceptFriend() {
            ajaxCall("GET", "/friends/accept?acceptFriendId="+viewUserInfo.id, true)
            .then(acceptFriendSuccess, acceptFriendFail);

            function acceptFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Unfriend"));
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function acceptFriendFail(data) {}
        }

        // unfriend Friend
        function unfriendFriend() {
            ajaxCall("GET", "/friends/unfriend?unfriendFriendId="+viewUserInfo.id, true)
            .then(unfriendFriendSuccess, unfriendFriendFail);

            function unfriendFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function unfriendFriendFail(data) {}
        }

        // decline friend
        function declineFriend() {
            ajaxCall("GET", "/friends/decline?declineFriendId="+viewUserInfo.id, true)
            .then(declineFriendSuccess, declineFriendFail);

            function declineFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                friendBtnBox.appendChild(friendActionBtn("Block"));
            }
            function declineFriendFail(data) {}
        }

        // block friend
        function blockFriend() {
            ajaxCall("GET", "/friends/block?blockFriendId="+viewUserInfo.id, true)
            .then(blockFriendSuccess, blockFriendFail);

            function blockFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
            }
            function blockFriendFail(data) {}
        }
        //unblock Friend
        function unblockFriend() {
            ajaxCall("GET", "/friends/unblock?unblockFriendId="+viewUserInfo.id, true)
            .then(unblockFriendSuccess, unblockFriendFail);
            function unblockFriendSuccess(data) {
                friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data;
                while(friendBtnBox.children.length > 1) {
                    friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                }
                if (data == "Add Friend") {
                    friendBtnBox.appendChild(friendActionBtn("Block"));
                } else if (data == "Accept") {
                    friendBtnBox.appendChild(friendActionBtn("Decline"));
                    friendBtnBox.appendChild(friendActionBtn("Block"));
                } else if (data == "Friends") {
                    friendBtnBox.appendChild(friendActionBtn("Unfriend"));
                    friendBtnBox.appendChild(friendActionBtn("Block"));
                }
            }
            function unblockFriendFail(data) {}
        }

        //friendActionBTN MAKER
        function friendActionBtn(btnName) {
            var friendActionBtn = document.createElement("button");
            friendActionBtn.className = "btn btn-danger profilePage__header-friendBtn";
            friendActionBtn.type = "button";
            friendActionBtn.name = "friendBtn-Status-Action";
            friendActionBtn.innerText = btnName;
            return friendActionBtn;
        }

        // AJAX CALL
        function ajaxCall(method, url, sync, postData=0) {
            var promiseObj = new Promise (function(resolve, reject) {
            var friendAction = new XMLHttpRequest();
            friendAction.onreadystatechange = function() {
                if (this.readyState == 4) {
                if (this.status == 200) {
                    //console.log(this.responseText);
                    resolve(this.responseText);
                } else {
                    reject(this.status);
                }
                }
            };
    
            friendAction.open(method, url, sync);
            if (method == "GET") {
                friendAction.send()
            } else if (method == "POST") {
                friendAction.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                friendAction.send(postData);
            }
            });
            return promiseObj;
        }

        // LIFE AJAX CALLER - REAL TIME
        function liveAjaxCall(statusData) {
            var promiseObj = new Promise (function(resolve, reject) {
            var getFriendStatus = new XMLHttpRequest();
            getFriendStatus.onreadystatechange = function() {
                if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.responseText);
                } else {
                    reject(this.status);
                }
                }
            };
            getFriendStatus.open("POST", "/posts/realTimeEvents", true);
            getFriendStatus.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            getFriendStatus.send(statusData);
            });
            return promiseObj;
        }

        // LIVE EVENTS LIVE EVENTS LIVE EVENTS
        var oldFriendStatus = friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText;
        var viewedFriendId = viewUserInfo.id;
        var timestamp = "0000-00-00 00:00:00";

        ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
            .then(liveStatusSuccess, liveStatusFail);
        
        function liveStatusSuccess(data) {
            if (data != "") {
                // console.log(data);
                data = JSON.parse(data);
            
                var currentStatus = friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText;
                if (data.newStatus != currentStatus) {
                    friendBtnBox.querySelector("button[name='friendBtn-Status']").innerText = data.newStatus;
                    while(friendBtnBox.children.length > 1) {
                        friendBtnBox.removeChild(friendBtnBox.children[friendBtnBox.children.length - 1]);
                    }
                    if (data.newStatus == "Pending") {
                        friendBtnBox.appendChild(friendActionBtn("Cancel"));
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Accept") {
                        friendBtnBox.appendChild(friendActionBtn("Decline"));
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Friends") {
                        friendBtnBox.appendChild(friendActionBtn("Unfriend"));
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Add Friend") {
                        friendBtnBox.appendChild(friendActionBtn("Block"));
                    } else if (data.newStatus == "Unblock") {
                        //nothing
                    } else if (data.newStatus == "No Access") {
                        //redirect back
                        window.location.replace("/profiles/blocked");
                    }
                }
                var oldFriendStatus = data.newStatus;
                var timestamp = data.newTimestamp;
                // console.log(oldFriendStatus);
                ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
                    .then(liveStatusSuccess, liveStatusFail);
            } else {
                // ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
                //     .then(liveStatusSuccess, liveStatusFail);
            }

        }
        function liveStatusFail(data) {
            ajaxCall("GET", "/friends/realtimestatus?oldFriendStatus="+oldFriendStatus+"&viewFriendId="+viewedFriendId+"&timestamp="+timestamp, true)
                .then(liveStatusSuccess, liveStatusFail);
        }

    }

  


})();
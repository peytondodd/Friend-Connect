var chatBox = (function() {

    var chatBox = document.querySelector(".chatBox");
    if (chatBox) {
        
        var convoList = chatBox.querySelector(".convoList");
        var convoView = chatBox.querySelector(".convoView");

        convoList.addEventListener("click", convoListDir);
        convoView.addEventListener("click", convoViewDir);
        convoView.querySelector(".convoView__textarea").
            addEventListener("keydown", chatKeyDown);
        convoList.querySelector(".convoList__search")
            .addEventListener("keyup", searchFriend);
        convoList.querySelector(".convoList__search")
            .addEventListener("focus", searchFriend);
        document.addEventListener("click", documentDir);

        //scroll to bottom on start
        convoView.querySelector(".convoView__display").scrollTop = 
        convoView.querySelector(".convoView__display").scrollHeight;

        function convoViewDir(event) {
            //console.log(event);
            if (event.target.className == "fa fa-chevron-left" || 
            event.target.className == "convoView__viewConvoListBtnBox") {
                chatBoxViewListSwitch("left");
            }
            if (event.target.className == "convoView__sendBtn") {
                sendMessage();
            }
        }

        function convoListDir(event) {
            // console.log(event.target);
            if (event.target.className == "convoList__listBox" || event.target.className == "convoList__iconContainer" || 
            event.target.className == "convoList__iconBox" || event.target.className == "convoList__icon" || 
            event.target.className == "convoList__online" || event.target.className == "convoList__infoContainer" || 
            event.target.className == "m-0 convoList__infoContainer--date" || event.target.className == "m-0 convoList__infoContainer--name" || 
            event.target.className == "m-0 convoList__infoContainer--message" || event.target.className == "convoList__listBox convoList__selected") {
                conversationClick(event);
            }
        }

        function documentDir(event) {
            //console.log(event.target);
            var className = event.target.className;
            if (className != "convoList__search" && className != "convoList__searchListBox" && 
            className != "m-0 convoList__searchName" && className != "convoList__searchIcon" && 
            className != "convoList__searchIconBox" && className != "convoList__searchIconContainer") {
                originalList();
            } else if (className == "m-0 convoList__searchName" || className == "convoList__searchIcon" || 
            className == "convoList__searchIconBox" || className == "convoList__searchIconContainer" || 
            className == "convoList__searchListBox" || className == "convoList__searchNameContainer") {
                conversationClick(event);
            }

        }

        function conversationClick(event) {
            var convoId = findConversationId(event);
            // console.log(convoId);
            ajaxCall("GET", "/chats/getConversation?convoId="+convoId, true)
                .then(conversationClickSuccess, conversationClickFail);

            function conversationClickSuccess(data) {
                // console.log(data);
                var conversation = JSON.parse(data);
                //update convoViewData
                convoViewData = conversation;
                //update DOM
                convoViewMaker(conversation);
                if (window.innerWidth < 768) {
                    chatBoxViewListSwitch("right");
                }
                //change selected highlight once success
                for (var i = 0; i < convoList.children[1].children.length; i++) {
                    if (convoList.children[1].children[i].classList[1] == "convoList__selected" && 
                    convoList.children[1].children[i].id != convoId) {
                        convoList.children[1].children[i].classList.remove("convoList__selected");
                    } else if (convoList.children[1].children[i].id == convoId) {
                        convoList.children[1].children[i].classList.add("convoList__selected");
                    }
                }
            }
            function conversationClickFail(data) {}
        }

        function findConversationId(event) {
            if (event.target.className == "convoList__listBox" || event.target.className == "convoList_listBox convoList__selected") {
                return event.target.id;
            }
            if (event.target.className == "convoList__iconContainer") {
                return event.target.parentElement.id;
            }
            if (event.target.className == "convoList__iconBox") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__icon") {
                return event.target.parentElement.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__online") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__infoContainer") {
                return event.target.parentElement.id;
            }
            if (event.target.className == "m-0 convoList__infoContainer--date" || event.target.className == "m-0 convoList__infoContainer--name" || 
            event.target.className == "m-0 convoList__infoContainer--message") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__searchListBox") {
                return event.target.id;
            }
            if (event.target.className == "convoList__searchIconContainer" || event.target.className == "convoList__searchNameContainer") {
                return event.target.parentElement.id;
            }
            if (event.target.className == "m-0 convoList__searchName" || event.target.className == "convoList__searchIconBox") {
                return event.target.parentElement.parentElement.id;
            }
            if (event.target.className == "convoList__searchIcon") {
                return event.target.parentElement.parentElement.parentElement.id;
            }
        }

        function convoViewMaker(conversation) {
            convoView.id = conversation[0].id;
            convoView.querySelector(".convoView__icon")
                .src = "/user_data/"+conversation[0].img_src;
            var nameContainer = convoView.querySelector(".convoView__nameContainer");
            nameContainer.children[0].innerText = conversation[0].first_name+" "+conversation[0].last_name;
            if (conversation[0].status == "1") {
                var status = "Online";
                nameContainer.children[1].innerText = status;
            } else {
                var status = "Offline";
                nameContainer.children[1].innerText = status;
            }

            var display = convoView.querySelector(".convoView__display");
            var displayLength = display.children.length;
            if (displayLength > 0) { //remove previous messages
                for (var i = 0; i < displayLength; i++) {
                    display.removeChild(display.children[0]);
                }
            }

            conversation[1].forEach(function (item) {
                if (item.sender_id == currentUserId) {
                    var messageLocation = "message-right";
                    var whosMessageBox = "convoView__myMessageBox";
                    var whosMessage = "convoView__myMessage";
                } else {
                    var messageLocation = "message-left";
                    var whosMessageBox = "convoView__friendMessageBox";
                    var whosMessage = "convoView__friendMessage";
                }
                var messageBox = document.createElement("div");
                messageBox.className = "convoView__messageBox";
                messageBox.innerHTML = `
                    <div class="${messageLocation}">
                        <div class="${whosMessageBox}">
                            <div class="${whosMessage}">
                                <span>${item.message}</span>
                            </div>
                        </div>
                        <span class="convoView__date">${item.date_sent}</span>
                    </div>
                `;
                display.appendChild(messageBox);
                display.scrollTop = display.scrollHeight;

            });

            var textarea = convoView.querySelector(".convoView__textarea");
            if (conversation[0].chat_disabled == 1) {
                textarea.value = "";
                textarea.disabled = true;
                textarea.placeholder = conversation[0].chat_reason;
            } else {
                textarea.value = "";
                textarea.disabled = false;
                textarea.placeholder = "Enter message...";
            }

        }

        function chatBoxViewListSwitch(dir) {
            if (dir == "left") {
                convoView.classList.add("fade-out-towards-right-sm");
                convoList.style.width = "100%";
                convoList.style.display = "block";
                convoList.classList.add("fade-in-towards-right-sm");
                setTimeout(function() {
                    convoView.style.display = "none";
                    convoView.classList.remove("fade-out-towards-right-sm");
                    convoList.classList.remove("fade-in-towards-right-sm");
                }, 300);
                
            } else if (dir == "right") {
                convoList.classList.add("fade-out-towards-left-sm");
                convoView.style.width = "100%";
                convoView.style.display ="block";
                convoView.classList.add("fade-in-towards-left-sm");
                setTimeout(function() {
                    convoList.style.display = "none";
                    convoList.classList.remove("fade-out-towards-left-sm");
                    convoView.classList.remove("fade-in-towards-left-sm");
                }, 300);
            }
            //scroll to bottom on start
            convoView.querySelector(".convoView__display").scrollTop = 
                convoView.querySelector(".convoView__display").scrollHeight;
        }

        function chatKeyDown(event) {
            if (this.scrollHeight <= 140) {
                //resize text area
                event.target.parentElement.style.height = "";
                event.target.parentElement.style.height = this.scrollHeight + "px";// 15 + "px";
                //resize input box
                var inputBox = convoView.querySelector(".convoView__inputBox");
                var textBoxHeight = event.target.parentElement.style.height;
                var inputBoxHeight = 85 + Number(textBoxHeight.substr(0, textBoxHeight.length - 2)) - 49;
                inputBox.style.height = inputBoxHeight + "px";

                //resize display messages
                var display = convoView.querySelector(".convoView__display");
                var displayHeight = "calc(100% - 85px - 75px - "+(Number(textBoxHeight.substr(0, textBoxHeight.length - 2)) - 49)+"px)";
                display.style.height = displayHeight;
                display.scrollTop = display.scrollHeight;
            }
        }

        window.addEventListener("resize", function() {
            if (window.innerWidth > 767) {
                convoList.style.width = "300px";
                convoView.style.width = "calc(100% - 300px)";
                convoList.style.display = "block";
                convoView.style.display = "block";
            } else if (window.innerWidth < 768) {
                convoView.style.width = "100%";
                convoList.style.display = "none";
            }
        });

        function sendMessage() {
            var textarea = convoView.querySelector(".convoView__textarea");
            if (textarea.value != "") {
                var receiver_id = convoView.id;
                var sender_id = currentUserId;
                var message = textarea.value;

                var messageData = (
                    "sender_id="+sender_id+"&"+
                    "receiver_id="+receiver_id+"&"+ 
                    "message="+message
                );

                ajaxCall("POST", "chats/sendMessage", true, messageData)
                    .then(sendMessageSuccess, sendMessageFail);

                function sendMessageSuccess(data) {
                    //remove textarea value
                    postSendMessageUpdate();
                }
                function sendMessageFail(data) {

                }
            }
        }

        function postSendMessageUpdate() {
            // empty text
            var textarea = convoView.querySelector(".convoView__textarea");
            textarea.value = "";
            // return to orignal dimensions
            textarea.parentElement.style.height = "49px";
            textarea.parentElement.parentElement.style.height = "85px";
            // textarea.parentElement.parentElement.parentElement
            //     .children[1].style.height = "323.32px";
            textarea.parentElement.parentElement.parentElement
                .children[1].style.height = "calc(100% - 75px - 85px";
        }

        function searchFriend(event) {
            var name = event.target.value;
            ajaxCall("GET", "chats/searchFriend?friendName="+name, true)
                .then(searchFriendSuccess, searchFriendFail);
            
            function searchFriendSuccess(data) {
                data = JSON.parse(data);
                convoListDomLength = convoList.children[1].children.length;
                for(var i = 0; i < convoListDomLength; i++) {
                    convoList.children[1].removeChild(convoList.children[1].children[0]);
                }
                data.forEach(function(item) {
                    var searchItem = document.createElement("div");
                    searchItem.className = "convoList__searchListBox";
                    searchItem.id = item.id;
                    searchItem.innerHTML = `
                        <div class="convoList__searchIconContainer">
                            <div class="convoList__searchIconBox">
                                <img class="convoList__searchIcon" src="/user_data/${item.img_src}" alt="user_icon">
                            </div>
                        </div>
                        <div class="convoList__searchNameContainer">
                            <p class="m-0 convoList__searchName">${item.name}</p>
                        </div>
                    `;
                    convoList.children[1].appendChild(searchItem);
                });

            }
            function searchFriendFail(data) {}
        }

        function originalList() {
            convoListDomLength = convoList.children[1].children.length;
            for(var i = 0; i < convoListDomLength; i++) {
                convoList.children[1].removeChild(convoList.children[1].children[0]);
            }
            convoListData.forEach(function(item) {
                var listItem = document.createElement("div");
                listItem.className = "convoList__listBox";
                listItem.id = item.id;
                listItem.innerHTML = `
                    <div class="convoList__iconContainer">
                        <div class="convoList__iconBox">
                            <img class="convoList__icon" src="/user_data/${item.img_src}" alt="user icon">
                        </div>
                    </div>
                    <div class="convoList__infoContainer">
                        <p class="m-0 convoList__infoContainer--date">${item.last_date}</p>
                        <p class="m-0 convoList__infoContainer--name">${item.name}</p>
                        <p class="m-0 convoList__infoContainer--message">${item.last_message}</p>
                    </div>
                `;
                //online
                if (item.status == "1") {
                    var onlineDIV = document.createElement("div");
                    onlineDIV.className = "convoList__online";
                    listItem.children[0].appendChild(onlineDIV);
                }
                //selected
                if (item.id == convoView.id) {
                    listItem.classList.add("convoList__selected");
                }
                convoList.children[1].appendChild(listItem);
            });
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

        //real time ajax polls
        function chatData() {
            return (
                "convoList="+JSON.stringify(convoListData)+"&"+
                "convoView="+JSON.stringify(convoViewData)
            );
        }

        ajaxCall("POST", "chats/realTimeChatEvents", true, chatData())
            .then(realTimeChatSuccess, realTimeChatFail);

        function realTimeChatSuccess(data) {
            // console.log(data);
            if (data != "") {
                data = JSON.parse(data);
                if (data[0] == "New Message") {
                    newMessageUpdate(data);
                } else if (data[0] == "New Status") {
                    newStatusUpdate(data);
                } else if (data[0] == "Chat Disabled") {
                    chatDisabledUpdate(data);
                } else if (data[0] == "New Conversation") {
                    newConversationUpdate(data);
                }
            }
            ajaxCall("POST", "chats/realTimeChatEvents", true, chatData())
            .then(realTimeChatSuccess, realTimeChatFail);
        }

        function realTimeChatFail(data) {

        }

        function newMessageUpdate(data) {
            // console.log(data);
            //convo List data update
            convoListData.forEach(function(item,index) {
                if (item.id == data[1][0].id) {
                    convoListData.splice(index, 1);
                    convoListData.unshift(data[1][0]);
                    // console.log(convoListData);
                }
            });
            //console.log(convoListData);
            // convo list DOM update
            for (var i = 0; i < convoList.children[1].children.length; i++) {
                if (convoList.children[1].children[i].id == data[1][0].id) {
                    if (i != 0) {
                        convoList.children[1].removeChild(convoList.children[1].children[i]);
                        var newList = document.createElement("div");
                        newList.className = "convoList__listBox";
                        newList.id = data[1][0].id;
                        newList.innerHTML = `
                            <div class="convoList__iconContainer">
                                <div class="convoList__iconBox">
                                    <img class="convoList__icon" src="/user_data/${data[1][0].img_src}" alt="user icon">
                                </div>
                            </div>
                            <div class="convoList__infoContainer">
                                <p class="m-0 convoList__infoContainer--date"></p>
                                <p class="m-0 convoList__infoContainer--name">${data[1][0].name}</p>
                                <p class="m-0 convoList__infoContainer--message"></p>
                            </div>
                        `;
                        //online
                        if (data[1][0].status) {
                            var onlineDIV = "<div class='convoList__online></div>"
                            var onlineDIV = document.createElement("div");
                            onlineDIV.className = "convoList__online";
                            newList.children[0].appendChild(onlineDIV);
                        }
                        convoList.children[1].insertBefore(newList, convoList.children[1].children[0]);
                    }
                    var infoContainer = convoList.children[1].children[0].querySelector(".convoList__infoContainer");
                    infoContainer.children[0].innerText = data[1][0].last_date;
                    infoContainer.children[2].innerText = data[1][0].last_message;

                }
            }
            //convo View Data Update
            if (convoViewData[0].id == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    convoViewData[1].push(data[1][1][i]);
                }
                // console.log(convoViewData);
            }
            //convo View DOM update
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    var newMessage = document.createElement("div");
                    newMessage.className = "convoView__messageBox";
                    if (data[1][1][i].sender_id == currentUserId) {
                        var messageDir = "message-right"
                        var messageBox = "convoView__myMessageBox";
                        var message = "convoView__myMessage";
                    } else {
                        var messageDir = "message-left"
                        var messageBox = "convoView__friendMessageBox";
                        var message = "convoView__friendMessage";
                    }
                    newMessage.innerHTML = `
                        <div class="${messageDir}">
                            <div class="${messageBox}">      
                                <div class="${message}">
                                    <span>${data[1][1][i].message}</span>
                                </div>
                            </div>
                        <span class="convoView__date">${data[1][1][i].date_sent}</span>
                        </div>
                    `;
                    convoView.querySelector(".convoView__display").appendChild(newMessage);
                    convoView.querySelector(".convoView__display").scrollTop = 
                        convoView.querySelector(".convoView__display").scrollHeight;
                }
                // console.log(convoView);
            }

        }

        function newConversationUpdate(data) {
            //convoListData update
            convoListData.unshift(data[1][0]);
            //convoList DOM update
            var newList = document.createElement("div");
            newList.className = "convoList__listBox";
            newList.id = data[1][0].id;
            newList.innerHTML = `
                <div class="convoList__iconContainer">
                    <div class="convoList__iconBox">
                        <img class="convoList__icon" src="/user_data/${data[1][0].img_src}" alt="user icon">
                    </div>
                </div>
                <div class="convoList__infoContainer">
                    <p class="m-0 convoList__infoContainer--date">${data[1][0].last_date}</p>
                    <p class="m-0 convoList__infoContainer--name">${data[1][0].name}</p>
                    <p class="m-0 convoList__infoContainer--message">${data[1][0].last_message}</p>
                </div>
            `;
            //online
            if (data[1][0].status) {
                var onlineDIV = "<div class='convoList__online></div>"
                var onlineDIV = document.createElement("div");
                onlineDIV.className = "convoList__online";
                newList.children[0].appendChild(onlineDIV);
            }
            convoList.children[1].insertBefore(newList, convoList.children[1].children[0]);
             //convo View Data Update
             if (convoViewData[0].id == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    convoViewData[1].push(data[1][1][i]);
                }
                // console.log(convoViewData);
            }
            //convo View DOM update
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1][0].id) {
                for (var i = 0; i < data[1][1].length; i++) {
                    var newMessage = document.createElement("div");
                    newMessage.className = "convoView__messageBox";
                    if (data[1][1][i].sender_id == currentUserId) {
                        var messageDir = "message-right"
                        var messageBox = "convoView__myMessageBox";
                        var message = "convoView__myMessage";
                    } else {
                        var messageDir = "message-left"
                        var messageBox = "convoView__friendMessageBox";
                        var message = "convoView__friendMessage";
                    }
                    newMessage.innerHTML = `
                        <div class="${messageDir}">
                            <div class="${messageBox}">      
                                <div class="${message}">
                                    <span>${data[1][1][i].message}</span>
                                </div>
                            </div>
                        <span class="convoView__date">${data[1][1][i].date_sent}</span>
                        </div>
                    `;
                    convoView.querySelector(".convoView__display").appendChild(newMessage);
                    convoView.querySelector(".convoView__display").scrollTop = 
                        convoView.querySelector(".convoView__display").scrollHeight;
                }
                // console.log(convoView);
            }
        
        }

        function newStatusUpdate(data) {
            //update convoListData
            convoListData.forEach(function (item, index) {
                if (item.id == data[1]) {
                    if (data[2] == "Online") {
                        convoListData[index].status = "1";
                    } else {
                        convoListData[index].status = "0";
                    }
                }
            });
            //update convoList DOM
            for(var i = 0; i < convoList.children[1].children.length; i++) {
                if (convoList.children[1].children[i].id == data[1]) {
                    if (data[2] == "Online") {
                        if (convoList.children[1].children[i].children[0].children.length < 2) {
                            var newOnline = document.createElement("div");
                            newOnline.className = "convoList__online";
                            convoList.children[1].children[i].children[0].appendChild(newOnline);
                        }
                    } else {
                        if (convoList.children[1].children[i].children[0].children.length > 1) {
                            convoList.children[1].children[i].children[0]
                                .removeChild(convoList.children[1].children[i].children[0].children[1]);
                        }
                    }
                }
            }
            //update convoViewData
            if (convoViewData[0].id == data[1]) {
                if (data[2] == "Online") {
                    convoViewData[0].status = "1";
                } else {
                    convoViewData[0].status = "0";
                }
            }
            //update convoView DOM
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1]) {
                convoView.children[0].children[1].children[1].children[1].innerText = data[2];
            }
        }


        function chatDisabledUpdate(data) {
            //update convoListData
            convoListData.forEach(function(item, index) {
                if (item.id == data[1].id) {
                    convoListData.splice(index, 1);
                    convoListData.splice(index, 0, data[1]);
                }
            });
            //update convoViewData
            if (convoViewData[0].id == data[1].id) {
                if (data[0].chat_disabled == 1) {
                    convoViewData[0].chat_disabled = 1;
                    convoViewData[0].chat_reason = data[0].chat_reason;
                } else {
                    convoViewData[0].chat_disabled = 0;
                    delete convoViewData[0].chat_reason;
                }
            }
            //update convoView DOM
            var domConvoViewId = chatBox.querySelector(".convoView").id;
            if (domConvoViewId == data[1].id) {
                if (data[1].chat_disabled == 1) {
                    var textarea = convoView.querySelector(".convoView__textarea");
                    textarea.disabled = true;
                    textarea.placeholder = data[1].chat_reason;
                } else {
                    var textarea = convoView.querySelector(".convoView__textarea");
                    textarea.disabled = false;
                    textarea.placeholder = "Enter message...";
                }
            }

        }


    }
})();
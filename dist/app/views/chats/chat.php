<?php
  $convoList = $data["convoList"];
  $convoView = $data["convoView"];

  // echo date_default_timezone_get();
  //phpinfo();
  // echo "<pre>";
  // print_r($convoList);
  // echo "</pre>";
?>
<?php require APPROOT . "/views/inc/header.php"; ?>

<div class="container">

  <div class="chatContainer">
    <div class="chatBox">
      <div class="convoList">
        <div class="convoList__searchContainer">
          <input class="convoList__search" type="text" placeholder="Search friends...">
        </div>
        <div class="convoList__listContainer">
          <?php if ($convoList) : ?>

            <?php for($i = 0; $i < count($convoList); $i++) : ?>
              <div class="convoList__listBox <?php echo ($convoList[$i]->id == $convoView[0]->id) ? "convoList__selected" : ""; ?>" 
              id="<?php echo $convoList[$i]->id; ?>">
                <div class="convoList__iconContainer">
                  <div class="convoList__iconBox">
                    <img class="convoList__icon" src="/user_data/<?php echo $convoList[$i]->img_src; ?>" alt="user icon">
                  </div>
                  <?php if ($convoList[$i]->status) : ?>
                    <div class="convoList__online"></div>
                  <?php endif; ?>
                </div>
                <div class="convoList__infoContainer">
                  <p class="m-0 convoList__infoContainer--date"><?php echo $convoList[$i]->last_date; ?></p>
                  <p class="m-0 convoList__infoContainer--name"><?php echo $convoList[$i]->name; ?></p>
                  <p class="m-0 convoList__infoContainer--message"><?php echo $convoList[$i]->last_message; ?></p>
                </div>
              </div>
            <?php endfor; ?>

          <?php endif; ?>
        </div>
      </div>
      <div class="convoView" id="<?php echo ($convoView) ? $convoView[0]->id : ""; ?>">
        <div class="convoView__heading">
          <div class="convoView__viewConvoListBtnBox">
            <span><i class="fa fa-chevron-left"></i></span>
          </div>
          <div class="convoView__friendDetails">
            <div class="convoView__iconContainer">
              <div class="convoView__iconBox">
                <img class="convoView__icon" src="/user_data/<?php echo ($convoView) ? $convoView[0]->img_src : ""; ?>" alt="user icon">
              </div>
            </div>
            <div class="convoView__nameContainer">
              <p class="m-0 convoView__name"><?php echo ($convoView) ? $convoView[0]->first_name." ".$convoView[0]->last_name : ""; ?></p>
              <?php if ($convoView) : ?> 
                <?php if ($convoView[0]->status) : ?>
                  <p class="m-0 convoView__status">Online</p>
                <?php else : ?>
                  <p class="m-0 convoView__status">Offline</p>
                <?php endif; ?>
              <?php else : ?>
                <p class="m-0 convoView__status"></p>
              <?php endif; ?>
            </div>
          </div>
        </div>
        <div class="convoView__display">
          <?php if ($convoView) : ?>
            <?php foreach ($convoView[1] as $value) : ?>
              <div class="convoView__messageBox">
                <div class="<?php echo ($value->sender_id == $_SESSION["user_id"] ? "message-right" : "message-left") ?>">
                  <div class="<?php echo ($value->sender_id == $_SESSION["user_id"] ? "convoView__myMessageBox" : "convoView__friendMessageBox") ?>">
                    <div class="<?php echo ($value->sender_id == $_SESSION["user_id"] ? "convoView__myMessage" : "convoView__friendMessage") ?>">
                      <span><?php echo $value->message; ?></span>
                    </div>
                  </div>
                  <span class="convoView__date"><?php echo $value->date_sent; ?></span>
                </div>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>
        <div class="convoView__inputBox">
          <div class="convoView__textareaBox">
            <?php if ($convoView) : ?>
              <?php if ($convoView[0]->chat_disabled == 1) : ?>
                <textarea disabled class="convoView__textarea" name="" id="" placeholder="<?php echo $convoView[0]->chat_reason; ?>"></textarea>
              <?php else : ?>
                <textarea class="convoView__textarea" name="" id="" placeholder="Enter message..."></textarea>
              <?php endif; ?>
            <?php else : ?>
              <textarea class="convoView__textarea" name="" id="" placeholder="Enter message..."></textarea>
            <?php endif; ?>
          </div>
          <div class="convoView__submitBox">
            <input class="convoView__sendBtn" type="button" value="Send">
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
  var currentUserId = <?php echo $_SESSION["user_id"]; ?>;
  var convoListData = <?php echo json_encode($convoList); ?>;
  var convoViewData = <?php echo json_encode($convoView); ?>;

  console.log(convoListData);
  console.log(convoViewData);

// var chatBox = document.querySelector(".chatBox");
// var inputMessage = document.querySelector(".inputMessage");
// var friendId = (window.location.href).split("/");
// friendId = friendId[friendId.length-1];
// var timestamp = "0000-00-00 00:00:00";

// inputMessage.addEventListener("keypress", messageSender);

// function messageReceiver(method, url) {
//   var promiseObj = new Promise (function(resolve,reject) {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open(method, url, true);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = function() {
//       if (this.readyState == 4) {
//         if (this.status == 200) {
//           //success
//           console.log("SUCCESS");
//           //console.log(this.responseText);
//           var resp = JSON.parse(this.responseText);
//           //console.log(resp);
//           //empty chatBox
//           if (chatBox.childElementCount > 0) {
//             var chatLength = chatBox.childElementCount;
//             for (var i=0; i < chatLength; i++) {
//               chatBox.removeChild(chatBox.children[0]);
//             }
//           }

//           resolve(resp);
//         } else {
//           console.log("FAILED");

//           reject(this.status);
//           console.log(this.status);
//         }
//       } else {
//         //console.log("still processing");
//       }
//     }
//     //console.log("request sent successfully");
//   });
//   return promiseObj;
// }
// //
// messageReceiver("GET", "/chats/user/"+friendId+"?timestamp="+timestamp, true)
//   .then(success, failed);


// function success(data) {

//   //console.log(data);
//   //console.log(chatBox.children);
//   for (var i = 0; i < data.length; i++) {
//     if (data[i].sender_id == friendId) { // current is receiving
//       var user = data[i].friend_firstName;
//       var message = data[i].message;
//       var time = data[i].date_sent;
//       var paraName = document.createElement("p");
//       paraName.innerHTML = user + " - " + time;
//       paraName.style.fontWeight = "900";
//       paraName.className = "text-left";
//       chatBox.appendChild(paraName);
//       var paraMessage = document.createElement("p");
//       paraMessage.innerHTML = message;
//       paraMessage.style.backgroundColor = "lightgreen";
//       paraMessage.className = "text-left";
//       chatBox.appendChild(paraMessage);

//     } else { // current is sending
//         var user = data[i].my_firstName;
//         var message = data[i].message;
//         var time = data[i].date_sent;
//         var paraName = document.createElement("p");
//         paraName.innerHTML = user + " - " + time;
//         paraName.style.fontWeight = "900";
//         paraName.className = "text-right";
//         chatBox.appendChild(paraName);
//         var paraMessage = document.createElement("p");
//         paraMessage.innerHTML = message;
//         paraMessage.style.backgroundColor = "lightblue";
//         paraMessage.className = "text-right";
//         chatBox.appendChild(paraMessage);
//     }
//   }
//   chatBox.scrollTop = chatBox.scrollHeight;
//   timestamp = data[data.length-1].date_sent;

//   messageReceiver("GET", "/chats/user/"+friendId+"?timestamp="+timestamp, true)
//     .then(success, failed);
// }
// function failed(statusCode){
//  console.log("failed with status", status);
// }

// function messageSender (event) {

//   var message = event.target.value;
//   //console.log(event);

//   if (event.keyCode === 13) {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {

//           console.log(this.responseText);
//           event.target.value = "";
//         }
//     };

//     xmlhttp.open("GET", "/chats/user/"+friendId+"?message="+message, true);
//     xmlhttp.send();
//   }

// }

</script>

<?php require APPROOT . "/views/inc/footer.php"; ?>

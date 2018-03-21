<?php require APPROOT . "/views/inc/header.php"; ?>

<h1><?php echo $data["id"]; ?></h1>

<div class="chatBox border" style="height: 300px; background-color: white; overflow-y: scroll;">

</div>

<!-- <form class="" action="/chats/user/<?php echo $data["id"]; ?>" method="post"> -->

  <input class="inputMessage form-control" type="text" name="inputMessage" placeholder="Enter message">

  <input class="form-control btn btn-success" type="submit" name="" value="Send">
<!--
</form> -->

<script>

var chatBox = document.querySelector(".chatBox");
var inputMessage = document.querySelector(".inputMessage");
var friendId = (window.location.href).split("/");
friendId = friendId[friendId.length-1];
var timestamp = "0000-00-00 00:00:00";

inputMessage.addEventListener("keypress", messageSender);

function messageReceiver(method, url) {
  var promiseObj = new Promise (function(resolve,reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          //success
          console.log("SUCCESS");
          //console.log(this.responseText);
          var resp = JSON.parse(this.responseText);
          //console.log(resp);
          //empty chatBox
          if (chatBox.childElementCount > 0) {
            var chatLength = chatBox.childElementCount;
            for (var i=0; i < chatLength; i++) {
              chatBox.removeChild(chatBox.children[0]);
            }
          }

          resolve(resp);
        } else {
          console.log("FAILED");

          reject(this.status);
          console.log(this.status);
        }
      } else {
        //console.log("still processing");
      }
    }
    //console.log("request sent successfully");
  });
  return promiseObj;
}
//
messageReceiver("GET", "/chats/user/"+friendId+"?timestamp="+timestamp, true)
  .then(success, failed);


function success(data) {

  //console.log(data);
  //console.log(chatBox.children);
  for (var i = 0; i < data.length; i++) {
    if (data[i].sender_id == friendId) { // current is receiving
      var user = data[i].friend_firstName;
      var message = data[i].message;
      var time = data[i].date_sent;
      var paraName = document.createElement("p");
      paraName.innerHTML = user + " - " + time;
      paraName.style.fontWeight = "900";
      paraName.className = "text-left";
      chatBox.appendChild(paraName);
      var paraMessage = document.createElement("p");
      paraMessage.innerHTML = message;
      paraMessage.style.backgroundColor = "lightgreen";
      paraMessage.className = "text-left";
      chatBox.appendChild(paraMessage);

    } else { // current is sending
        var user = data[i].my_firstName;
        var message = data[i].message;
        var time = data[i].date_sent;
        var paraName = document.createElement("p");
        paraName.innerHTML = user + " - " + time;
        paraName.style.fontWeight = "900";
        paraName.className = "text-right";
        chatBox.appendChild(paraName);
        var paraMessage = document.createElement("p");
        paraMessage.innerHTML = message;
        paraMessage.style.backgroundColor = "lightblue";
        paraMessage.className = "text-right";
        chatBox.appendChild(paraMessage);
    }
  }
  chatBox.scrollTop = chatBox.scrollHeight;
  timestamp = data[data.length-1].date_sent;

  messageReceiver("GET", "/chats/user/"+friendId+"?timestamp="+timestamp, true)
    .then(success, failed);
}
function failed(statusCode){
 console.log("failed with status", status);
}

function messageSender (event) {

  var message = event.target.value;
  //console.log(event);

  if (event.keyCode === 13) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          console.log(this.responseText);
          event.target.value = "";
        }
    };

    xmlhttp.open("GET", "/chats/user/"+friendId+"?message="+message, true);
    xmlhttp.send();
  }

}

</script>

<?php require APPROOT . "/views/inc/footer.php"; ?>

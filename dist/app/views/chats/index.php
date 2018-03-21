<?php require APPROOT . "/views/inc/header.php"; ?>

<h1><?php echo $data["id"]; ?></h1>

<div class="border" style="height: 300px; background-color: white; overflow-y: scroll;">

</div>

<form class="" action="/chats/user/<?php echo $data["id"]; ?>" method="post">

  <input class="form-control" type="text" name="inputMessage" placeholder="Enter message">

  <input class="form-control btn btn-success" type="submit" name="" value="Send">

</form>



<?php require APPROOT . "/views/inc/footer.php"; ?>

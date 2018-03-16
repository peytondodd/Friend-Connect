<?php require APPROOT . "/views/inc/header.php"; ?>

<h1>Welcome to <?php echo $data["first_name"] . "'s profile."; ?></h1>
<form enctype="multipart/form-data" action="<?php $_SERVER['PHP_SELF']; ?>" method="post">
  <input type="file" name="fileupload">
  <input type="submit" name="upload" value="upload file">
</form>
<?php require APPROOT . "/views/inc/footer.php"; ?>

<?php require APPROOT . "/views/inc/header.php"; ?>

<h1>Welcome to <?php echo $data["first_name"] . "'s profile."; ?></h1>

<?php if ($data["profile_img"] == 1) : ?>

  <?php
    $ext = array("jpeg", "jpg", "png");
    $found = false;
    $i = 0;
    do {
      if (file_exists("images/".$data['id']."/profile.".$data['id'].".".$ext[$i])) {
        $found = true;
      } else {
        $i++;
      }
    } while (!$found)
  ?>

  <img src="/images/<?php echo $data['id']; ?>/profile.<?php echo $data['id'].".".$ext[$i]; ?>" alt="profile image">
<?php elseif ($data["profile_img"] == 0) : ?>
  <img src="/images/default-profile.jpeg" alt="profile image">
<?php endif; ?>

<?php if ($data["status"] == 0) : ?>
  <p>Status: Offline</p>
<?php elseif ($data["status"] == 1) : ?>
  <p>Status: Online</p>
<?php endif; ?>

<p>Name: <?php echo $data["first_name"] . " " . $data["last_name"]; ?></p>

<?php if ($data["birthday"] != "0000-00-00") : ?>
  <p>Birthday <?php echo $data["birthday"]; ?></p>
<?php else : ?>
  <p>Birthday: </p>
<?php endif; ?>

<?php if ($data["gender"] == 0) : ?>
  <p>Gender: </p>
<?php elseif ($data["gender"] == 1) : ?>
  <p>Gender: Male</p>
<?php elseif ($data["gender"] == 2) : ?>
  <p>Gender: Female</p>
<?php endif; ?>

<p>Education: <?php echo $data["education"]; ?></p>
<p>Work: <?php echo $data["work"]; ?></p>
<p>Location: <?php echo $data["location"]; ?></p>
<p>Description: <?php echo $data["description"]; ?></p>

<?php require APPROOT . "/views/inc/footer.php"; ?>

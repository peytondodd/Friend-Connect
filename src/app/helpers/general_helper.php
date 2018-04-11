<?php

function getProfileImgSrc($profileId, $profileImg, $profileImgId) {
  if ($profileImg == 1) {
      $ext = array("jpeg", "jpg", "png", "bmp", "gif");
      $found = false;
      $i = 0;
      do {
        if (file_exists("user_data/".$profileId."/profile.".$profileId.".".$ext[$i])) {
          $found = true;
          $ext = $ext[$i];
        } else {
          $i++;
        }
      } while (!$found && $i < 5);
      return $profileId . "/profile." . $profileId . "." . $ext;
  }elseif ($profileImg == 0) {
    return "default/default-profile-" . $profileImgId . ".jpg";
  }
}


?>

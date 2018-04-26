<?php

  $result = $data["result"];
  $term = $data["term"];
  $allUsersCount = $data["allUsersCount"];
  // echo "<pre>";
  // var_dump($result);
  // echo "</pre>";

?>
<?php require APPROOT . "/views/inc/header.php"; ?>

<div class="container" style="height: 2000px;">

  <?php if (empty($result)) : ?>
    <h1 class="text-center">0 Results for "<?php echo $term; ?>"</h1>
  <?php else : ?>
    <div class="searchResultContainer">
      <p><a href="/search">View All Users(<?php echo $allUsersCount; ?>)</a></p>
      <p>Sort results on page by: 
        <span class="searchResult__fakeATag">Name(a-z)</span> - 
        <span class="searchResult__fakeATag">Name(z-a)</span> - 
        <span class="searchResult__fakeATag">Popularity(views)</span>
      </p>
      <?php if ($term != "") : ?>
        <p>You searched for : "<?php echo $term; ?>"</p>
      <?php endif; ?>
      <div class="searchResultBox">
        <?php foreach($result as $value) : ?>
          <a class="searchResult__aTagRemove" href="/profiles/user/<?php echo $value->id; ?>">
            <div class="searchResult">
              <div class="row mx-0 py-2">
                <div class="col-sm-3">
                  <div class="searchResult__imageContainer">
                    <img class="searchResult__image" src="/user_data/<?php echo $value->img_src?>" alt="profile pic">
                  </div>
                </div>
                <div class="col-sm-9">
                  <div class="searchResult__userDetails">
                    <p class="m-0"><span class="text-muted">Status: </span><strong><?php echo $value->status; ?></strong></p>
                    <p class="m-0"><span class="text-muted">Name: </span><strong><?php echo $value->first_name." ".$value->last_name; ?></strong></p>
                    <p class="m-0"><span class="text-muted">Email: </span><strong><?php echo $value->email; ?></strong></p>
                    <?php if ($value->birthday != "" && $value->birthday != "0000-00-00") : ?>
                      <p class="m-0"><span class="text-muted">Birthday: </span><strong><?php echo $value->birthday;?></strong></p>
                    <?php endif; ?>
                    <?php if ($value->gender != "" && $value->gender != "0") : ?>
                      <p class="m-0"><span class="text-muted">Gender: </span><strong><?php echo $value->gender; ?></strong></p>
                    <?php endif; ?>
                    <?php if ($value->education != "") : ?>
                      <p class="m-0"><span class="text-muted">Education: </span><strong><?php echo $value->education; ?></strong></p>
                    <?php endif; ?>
                    <?php if ($value->work != "") : ?>
                      <p class="m-0"><span class="text-muted">Work: </span><strong><?php echo $value->work; ?></strong></p>
                    <?php endif; ?>
                    <?php if ($value->location != "") : ?>
                      <p class="m-0"><span class="text-muted">Location: </span><strong><?php echo $value->location; ?></strong></p>
                    <?php endif; ?>
                    <?php if ($value->description != "") : ?>
                      <p class="m-0"><span class="text-muted">Description: </span>
                        <?php if ($value->descLength > 35) : ?>
                          <strong><?php echo $value->shortDesc."..."; ?></strong>
                          <span class="searchResult__fakeATag"> Read More</span>
                        <?php else : ?>
                          <strong><?php echo $value->description; ?></strong>
                        <?php endif; ?>
                      </p>
                    <?php endif; ?>
                    <p class="m-0"><span class="text-muted">Joined: </span><strong><?php echo $value->created_at; ?></strong></p>
                    <p class="m-0"><span class="text-muted">Profile Views: </span><strong><?php echo $value->profile_views; ?></strong></p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  <?php endif; ?>

</div>


<script>
  var result = <?php echo json_encode($result); ?>;
  console.log(result);
</script>

<?php require APPROOT . "/views/inc/footer.php"; ?>

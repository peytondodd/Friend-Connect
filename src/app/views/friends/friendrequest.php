<?php
    //echo "cool";
    $users = $data["users"];
    
    // echo "<pre>";
    // print_r($users);
    // echo "</pre>";
?>

<?php require APPROOT . "/views/inc/header.php"; ?>

<div class="container">

    <h1>Friend Requests</h1>
    <p>Total Request = <span class="friendrequest__total"><?php echo ($users) ? count($users) : 0 ;?></span></p>

    <?php if ($users) :?>
        <div class="friendrequestcontainer">
            <?php foreach($users as $value) : ?>
                <div class="row mb-3">

                    <div class="friendrequest" id="<?php echo $value->id; ?>">
                        <div class="friendrequest__iconContainer">
                            <a href="/profiles/user/<?php echo $value->id; ?>">
                                <img class="friendrequest__icon" src="/user_data/<?php echo $value->img_src; ?>" alt="user icon">
                            </a>
                        </div>
                        <div class="friendrequest__userinfo">
                            <p class="m-0"><a href="/profiles/user/<?php echo $value->id; ?>"><?php echo $value->name; ?></a></p>
                            <button class="btn btn-success">Accept</button>
                            <button class="btn btn-danger">Decline</button>
                            <button class="btn btn-danger">Block</button>
                        </div>
                    </div>

                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>



</div>

<?php require APPROOT . "/views/inc/footer.php"; ?>
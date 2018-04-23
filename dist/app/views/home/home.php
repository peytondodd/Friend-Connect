<?php 
    $nameOfUser = $_SESSION["user_first_name"]." ".$_SESSION["user_last_name"];
    $currentUserPicture = $data["currentUserPicture"];
    $viewPost = $data["listOfPost"];
    $userIdList = json_encode($data["userIdList"]);
?>
<?php require APPROOT . "/views/inc/header.php"; ?>
<h1>Hello <?php echo $_SESSION["user_first_name"]; ?></h1>
<div class="container">

    <div class="row">
        <div class="col-md-4">
            <div class="mb-3 bg-primary">navigator</div>
        </div>
        <div class="col-md-8">
            <div class="row mb-3">
                <div class="col">
                    <div class="createPost">
                        <div class="createPost__title">
                        <p class="mb-0">Create a post</p>
                        </div>
                        <div class="row">
                        <!-- <div class="col-2"> -->
                            <div class="createPost__iconBox">
                            <img class="createPost__icon" src="/user_data/<?php echo $currentUserPicture; ?>" alt="profile picture">
                            </div>
                            <span class="createPost__name"><?php echo $nameOfUser; ?></span>
                        <!-- </div> -->
                        <!-- <div class="col"> -->
                            <div class="createPost__inputBox">
                            <textarea class="createPost__input" name="name" rows="3" placeholder="Share your thoughts with your friends..."></textarea>
                            </div>
                        <!-- </div> -->
                        </div>
                        <div class="createPost__postBtnBox">
                        <span><span class="createPost__charCounter">0</span>/2000</span>
                        <input class="btn btn-success createPost__postBtn" type="button" name="button" value="Post">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col viewPostBox">
                    <?php if ($viewPost != 0) : ?>
                        <?php for($i = 0; $i < count($viewPost); $i++) : ?>
                        <div class="viewPost postID-<?php echo $viewPost[$i]->id; ?>">
                        <?php if ($viewPost[$i]->photo == 1) : ?>
                            <div class="viewPost__photosPage--displayPhotoContainer">
                            <div class="viewPost__photosPage--displayPhotoBox">
                                <img class="viewPost__photosPage--displayPhoto" src="/user_data/<?php echo $viewPost[$i]->user_id."/".$viewPost[$i]->photoName; ?>">
                            </div>
                            </div>
                        <?php endif; ?>
                            <div class="viewPost__postBox">
                            <div class="row mx-0">
                                <?php if ($_SESSION["user_id"] == $viewPost[$i]->user_id) : ?>
                                <p class="viewPost__modLink">
                                    <a class="viewPost__editPost" href="#">Edit</a> |
                                    <a class="viewPost__deletePost" href="#">Delete</a>
                                </p>

                                <?php endif; ?>
                                <div class="viewPost__postUserIconBox">
                                    <a class="viewPost__postUserIconLink" href="/profiles/user/<?php echo $viewPost[$i]->user_id; ?>">
                                        <img class="viewPost__postUserIcon" src="/user_data/<?php echo $viewPost[$i]->img_src; ?>" alt="profile picture">
                                    </a>
                                </div>
                                <a class="viewPost__name" href="/profiles/user/<?php echo $viewPost[$i]->user_id; ?>"><?php echo $viewPost[$i]->name; ?></a>
                                <span class="viewPost__date"><?php echo $viewPost[$i]->created_at; ?></span>
                            </div>
                            <div class="row mx-0">
                                <div class="viewPost__content">
                                <?php echo $viewPost[$i]->content; ?>
                                </div>
                            </div>
                            <div class="row mx-0 viewPost__likeCommentShare">
                                <div class="row mx-0">
                                <div class="btn-group">
                                    <?php if ($viewPost[$i]->currentUserLike) :?>
                                    <a class="btn btn-default likeOrDislikeBtn" href="" name="<?php echo $viewPost[$i]->id; ?>">Dislike</a>
                                    <?php else : ?>
                                    <a class="btn btn-default likeOrDislikeBtn" href="" name="<?php echo $viewPost[$i]->id; ?>">Like</a>
                                    <?php endif; ?>
                                    <a class="btn btn-default showCommentsBtn" href="">Comment</a>
                                    <a class="btn btn-default" href="">Share</a>
                                </div>
                                </div>
                            </div>

                            <?php if ($viewPost[$i]->likeCount > 0) : ?>
                                <div class="row">
                                <div class="col viewPost__showLikes">
                                    <?php if ($viewPost[$i]->likeCount == 1) : ?>
                                    <span class="viewPost__likeCount">
                                        <?php echo $viewPost[$i]->likeCount; ?>
                                    </span>
                                    <span> person liked this</span>
                                    <?php endif; ?>
                                    <?php if ($viewPost[$i]->likeCount > 1) : ?>
                                    <span class="viewPost__likeCount">
                                        <?php echo $viewPost[$i]->likeCount; ?>
                                    </span>
                                    <span> people liked this</span>
                                    <?php endif; ?>
                                </div>
                                </div>
                            <?php endif; ?>

                            <?php if ($viewPost[$i]->comments->count > 0) : ?>
                                <div class="row">
                                <div class="col">
                                    <a href="" class="viewPost__showComments">View comments (<span class="commentCount"><?php echo $viewPost[$i]->comments->count; ?></span>)</a>
                                </div>
                                </div>
                            <?php endif; ?>



                            </div>
                        </div>
                        <?php endfor; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

</div>
<script>
    var currentUserId = <?php echo $_SESSION["user_id"]; ?>;
    var viewPost = <?php echo json_encode($viewPost); ?>;
    var postsUserId = <?php echo $userIdList; ?>;
    var pageAction = null;
</script>
<?php require APPROOT . "/views/inc/footer.php"; ?>

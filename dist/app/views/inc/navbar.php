<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3">
  <div class="container">
    <a class="navbar-brand" href="<?php echo URLROOT; ?>"><?php echo SITENAME; ?></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">

      <ul class="navbar-nav mr-auto">
        <?php if (isLoggedIn()) : ?>
          <div class="">
            <form class="" action="<?php $_SERVER['PHP_SELF'] ?>" method="get">
              <input class="form-control" type="search" name="" value="">
            </form>
          </div>
        <?php else : ?>
          <li class="nav-item">
            <a class="nav-link" href="<?php echo URLROOT; ?>">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">About</a>
          </li>
        <?php endif; ?>
      </ul>

      <ul class="navbar-nav ml-auto">
          <?php if (isLoggedIn()) : ?>
            <li class="nav-item">
              <a class="nav-link" href="<?php echo URLROOT; ?>/profile/user/<?php echo $_SESSION['user_id'] ?>"><?php echo ucwords($_SESSION["user_first_name"]) . " " . ucwords($_SESSION["user_last_name"]) ?></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="<?php echo URLROOT; ?>">Home</a>
            </li>
            <li class="nav-item dropdown">
               <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

               </a>
               <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                 <a class="dropdown-item" href="<?php echo URLROOT; ?>/profile/user/<?php echo $_SESSION['user_id'] ?>">Profile</a>
                 <a class="dropdown-item" href="#">Account Settings</a>
                 <a class="dropdown-item" href="#">About</a>
                 <div class="dropdown-divider"></div>
                 <a class="dropdown-item" href="<?php echo URLROOT; ?>/logout">Logout</a>
               </div>
             </li>
          <?php else : ?>
            <li class="nav-item">
              <a class="nav-link" href="<?php echo URLROOT; ?>/register">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="<?php echo URLROOT; ?>/login">Login</a>
            </li>
          <?php endif; ?>
      </ul>

    </div>
  </div>
</nav>

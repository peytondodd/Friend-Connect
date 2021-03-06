<?php

  class User {
    public function __construct() {
      // Initialize database
      $this->db = new Database;
    }

    // LOG USER IN
    public function login($email, $password) {
      if (!$this->findUserByEmail($email)) {
        return false;
      } else { // email found
        $this->db->query("SELECT * FROM users WHERE email = :email");
        $this->db->bind(":email", $email);
        $row = $this->db->single();
        $hashed_password = $row->password;
        if (password_verify($password, $hashed_password)) {
          return $row;
        } else {
          return false;
        }
      }
    }

    // REGISTER USER
    public function register($data) {
      // Create query
      $this->db->query("INSERT INTO users (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)");

      // Bind values
      $this->db->bind(":first_name", $data["first_name"]);
      $this->db->bind(":last_name", $data["last_name"]);
      $this->db->bind(":email", $data["register_email"]);
      $this->db->bind(":password", $data["password"]);

      // Execute
      if ($this->db->execute()) {
        return true;
      } else {
        return false;
      }
    }

    // CREATE USER INFO
    public function createUserInfo($email) {
      $newUser = $this->findUserByEmail($email);
      if (!$newUser) {
        return false;
      } else {
        // create query
        $this->db->query("INSERT INTO user_info (user_id, status, profile_img, gender, profile_setup) VALUES (:a1, :a2, :a3, :a4, :a5)");
        $this->db->bind(":a1", $newUser->id);
        $this->db->bind(":a2", 0);
        $this->db->bind(":a3", 0);
        $this->db->bind(":a4", 0);
        $this->db->bind(":a5", 0);

        $this->db->execute();
      }
    }

    // FIND USER INFO BY ID
    public function findUserInfoById($id) {
      // create query
      $this->db->query("SELECT * FROM user_info WHERE user_id = :id");
      // bind values
      $this->db->bind(":id", $id);

      $row = $this->db->single();

      return $row;
    }

    // Get User Name
    public function nameOfUser($userId) {
      $this->db->query("SELECT first_name, last_name FROM users
                        WHERE id = :id");
      $this->db->bind(":id", $userId);
      $row = $this->db->single();
      return ucwords($row->first_name." ".$row->last_name);
    }

    // Update Name
    public function updateName($userId, $firstName, $lastName) {
      $this->db->query("UPDATE users SET
                        first_name = :first_name,
                        last_name = :last_name
                        WHERE id = :id");
      $this->db->bind(":id", $userId);
      $this->db->bind(":first_name", $firstName);
      $this->db->bind(":last_name", $lastName);

      if ($this->db->execute()) {
        return true;
      } else {
        return false;
      }
    }

    // UPDATE USER INFO
    public function updateUserInfo($userInfo) {
      $this->db->query("UPDATE user_info SET
                        status = :status,
                        profile_img = :profile_img,
                        profile_img_id = :profile_img_id,
                        birthday = :birthday,
                        gender = :gender,
                        education = :education,
                        work = :work,
                        location = :location,
                        description = :description,
                        profile_setup = :profile_setup
                        WHERE user_id = :user_id");
      $this->db->bind(":user_id", $_SESSION["user_id"]);
      $this->db->bind(":status", $userInfo["status"]);
      $this->db->bind(":profile_img", $userInfo["profile_img"]);
      $this->db->bind(":profile_img_id", $userInfo["profile_img_id"]);
      $this->db->bind(":birthday", $userInfo["birthday"]);
      $this->db->bind(":gender", $userInfo["gender"]);
      $this->db->bind(":education", $userInfo["education"]);
      $this->db->bind(":work", $userInfo["work"]);
      $this->db->bind(":location", $userInfo["location"]);
      $this->db->bind(":description", $userInfo["description"]);
      $this->db->bind(":profile_setup", $userInfo["profile_setup"]);

      if ($this->db->execute()) {
        return true;
      } else {
        return false;
      }
    }

    // UPDATE USER STATUS
    public function updateUserStatus($status) {
      $this->db->query("UPDATE user_info SET status = :status WHERE user_id = :user_id");
      $this->db->bind(":user_id", $_SESSION["user_id"]);
      $this->db->bind(":status", $status);

      $this->db->execute();

    }

    // GET USER BY ID
    public function findUserById($id) {
      $this->db->query("SELECT * FROM users WHERE id = :id");
      $this->db->bind(":id", $id);
      $row = $this->db->single();
      if ($this->db->rowCount() > 0) {
        return $row;
      } else {
        return false;
      }
    }

    // FIND USER BY EMAIL
    public function findUserByEmail($email) {
      // create query
      $this->db->query("SELECT * FROM users WHERE email = :email");
      // bind values
      $this->db->bind(":email", $email);

      $row = $this->db->single();

      // check row
      if ($this->db->rowCount() > 0) {
        //return true;
        return $row;
      } else {
        return false;
      }
    }

    // GET ALL USERS
    public function getAllUsers() {
      $this->db->query("SELECT * FROM users INNER JOIN user_info ON user_info.user_id = users.id");
      $rows = $this->db->resultSet();

      // remove passwords
      foreach ($rows as $row) {
        unset($row->password);
      }

      return $rows;
    }

    // UPDATE VIEWS
    public function updateProfileViews($profileId, $newViewCount) {
      $this->db->query("UPDATE user_info 
                        SET profile_views = :profile_views
                        WHERE user_id = :user_id");
      $this->db->bind(":user_id", $profileId);
      $this->db->bind(":profile_views", $newViewCount);

      if ($this->db->execute()) {
        return true;
      } else {
        return false;
      }
    }


  }

?>

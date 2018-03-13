<?php

  class User {
    public function __construct() {
      // Initialize database
      $this->db = new Database;
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


    // FIND USER BY EMAIL
    public function findUserByEmail($email) {
      // create query
      $this->db->query("SELECT * FROM users WHERE email = :email");
      // bind values
      $this->db->bind(":email", $email);

      $row = $this->db->single();

      // check row
      if ($this->db->rowCount() > 0) {
        return true;
      } else {
        return false;
      }
    }


  }

?>

<?php

class Search extends Controller {

  public function __construct() {
    $this->userModel = $this->model("User");

  }

  public function index() {
    $data = $this->userModel->getAllUsers();

    if (isset($_REQUEST["q"]) || isset($_REQUEST["realTimeSearch"])) {
      if (isset($_REQUEST["q"])) {
        $q = $_REQUEST["q"];
      } elseif (isset($_REQUEST["realTimeSearch"])) {
        $q = $_REQUEST["realTimeSearch"];
      }
      
      if ($q != "") {

        $q = strtolower($q);
        $q = explode(" ", $q);

        $filtered = [];
        foreach ($data as $user) {
          for ($i = 0; $i < count($q); $i++) {
            if (strpos(strtolower($user->first_name), $q[$i]) !== false) {
              if (!in_array($user, $filtered)) {
                $filtered[] = $user;
              }
            }
            if (strpos(strtolower($user->last_name), $q[$i]) !== false) {
              if (!in_array($user, $filtered)) {
                $filtered[] = $user;
              }
            }
            if (strpos(strtolower($user->email), $q[$i]) !== false) {
              if (!in_array($user, $filtered)) {
                $filtered[] = $user;
              }
            }
            if (strpos(strtolower($user->education), $q[$i]) !== false) {
              if (!in_array($user, $filtered)) {
                $filtered[] = $user;
              }
            }
            if (strpos(strtolower($user->work), $q[$i]) !== false) {
              if (!in_array($user, $filtered)) {
                $filtered[] = $user;
              }
            }
            if (strpos(strtolower($user->location), $q[$i]) !== false) {
              if (!in_array($user, $filtered)) {
                $filtered[] = $user;
              }
            }
          }
        }
        // Add photo img_src
        foreach($filtered as $value) {
          $value->img_src = getProfileImgSrc($value->id, $value->profile_img, $value->profile_img_id);
        }

        // echo "<pre>";
        // print_r($filtered);
        // echo "</pre>";
        if (isset($_REQUEST["q"])) {
          //$filtered = 
          $this->highlightFound($filtered, $q);
          $this->view("search/search", $filtered);
        } elseif (isset($_REQUEST["realTimeSearch"])) {
          echo json_encode($filtered);
          return;
        }
        return;
      } else {
        echo json_encode([]);
        return;

      }

    }else {
      echo "not found";
    }

    $this->view("search/search", $data);
  }

  function highlightFound($filtered, $term) {
    

    for ($i = 0; $i < count($filtered); $i++) {
      foreach ($filtered[$i] as $key => $value) {
        $highlight = [];
        for ($j = 0; $j < count($term); $j++) {
          if (!empty($highlight)) {
            foreach ($highlight as $subValue) {
              if ($subValue->value == $term[$j]) {
                $found = $this->stringFinder($value, $term[$j], $subValue->end);
                if ($found) {
                  if (!in_array($found, $highlight)) {
                    $highlight[] = $found;
                  }
                }
              } else {
                $found = $this->stringFinder($value, $term[$j], 0);
                if ($found) {
                  if (!in_array($found, $highlight)) {
                    $highlight[] = $found;
                  }
                }
              }
            }
          } else {
            $found = $this->stringFinder($value, $term[$j], 0);
            if ($found) {
              $highlight[] = $found;
            }
          }
        }

        // echo $value;
        // echo "<pre>";
        // print_r($highlight);
        // echo "</pre>";
        if (!empty($highlight)) {
          $spanStart = "<span class='text-highlight'>";
          $spanEnd = "</span>";
          $extend = 0;
          $increment = strlen($spanStart) + strlen($spanEnd);
          usort($highlight, function($a, $b) {
            if ($a->start == $b->start) {
              return 0;
            }
            return ($a->start < $b->start) ? -1 : 1;
          });
          
          for ($k = 0; $k < count($highlight); $k++) {
            $filtered[$i]->$key = substr_replace($filtered[$i]->$key, $spanEnd, $highlight[$k]->end + $extend, 0);
            $filtered[$i]->$key = substr_replace($filtered[$i]->$key, $spanStart, $highlight[$k]->start + $extend, 0);
           
            // substr_replace($filtered[$i]->$key, $spanEnd + $extend, $highlight->end, 0);
            // substr_replace($filtered[$i]->$key, $spanStart + $extend, $highlight->start, 0);
            $extend += $increment;
          }
          echo $filtered[$i]->$key;
          echo "--------";
        }
      }
    }
    

  }

  function stringFinder($string, $term, $pos) {
    $found = strpos(strtolower($string), $term, $pos);

    if ($found !== false) {
      $result = new stdClass;
      $result->value = $term;
      $result->start = $found;
      $result->end = $found + strlen($term);
      return $result;
    } else {
      return false;
    }
  }

}




?>

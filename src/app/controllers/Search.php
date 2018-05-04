<?php

class Search extends Controller {

  public function __construct() {
    if (!isset($_SESSION["user_id"])) {
      redirect("login");
    }
    $this->userModel = $this->model("User");

  }

  public function index() {
    $data = $this->userModel->getAllUsers();
    $allUsersCount = count($data);

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
          if ($user->status == 1) {
            $user->status = "Online";
          } else {
            $user->status = "Offline";
          }
          if ($user->gender == 1) {
            $user->gender = "Male";
          } elseif($user->gender == 2) {
            $user->gender = "Female";
          } else {
            $user->gender == "None";
          }
          // echo $user->gender;
          for ($i = 0; $i < count($q); $i++) {
            if ($q[$i]) {
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
              if (strpos(strtolower($user->status), $q[$i]) !== false) {
                if (!in_array($user, $filtered)) {
                  $filtered[] = $user;
                }
              }
              if (strpos(strtolower($user->birthday), $q[$i]) !== false) {
                if (!in_array($user, $filtered)) {
                  $filtered[] = $user;
                }
              }
              if (strpos(strtolower($user->email), $q[$i]) !== false) {
                if (!in_array($user, $filtered)) {
                  $filtered[] = $user;
                }
              }
              if (strpos(strtolower($user->gender), $q[$i]) !== false) {
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
              if (strpos(strtolower($user->description), $q[$i]) !== false) {
                if (!in_array($user, $filtered)) {
                  $filtered[] = $user;
                }
              }
            }
          }
        }
        // Add photo img_src
        foreach($filtered as $value) {
          $value->img_src = getProfileImgSrc($value->id, $value->profile_img, $value->profile_img_id);
          //shorten desciption before <span> highlight
          $value->shortDesc = substr($value->description, 0, 35);
          //original description length before <span> highlight
          $value->descLength = strlen($value->description);
          //full name that will not highlighted (for sorting)
          $value->full_name = $value->first_name. " " .$value->last_name;
        }

        // echo "<pre>";
        // print_r($filtered);
        // echo "</pre>";
        if (isset($_REQUEST["q"])) {

          $this->highlightFound($filtered, $q);

          $data = [
            "result" => $filtered,
            "term" => $_REQUEST["q"],
            "allUsersCount" => $allUsersCount
          ];
          $this->view("search/search", $data);
        } elseif (isset($_REQUEST["realTimeSearch"])) {
          echo json_encode($filtered);
          return;
        }
        return;
      } else {
        echo json_encode([]); //redirect to search
        return;

      }

    }else {
      $result = $this->userModel->getAllUsers();
      $term = "";
      $allUsersCount = count($data);

      foreach($result as $value) {
        if ($value->status == 1) {
          $value->status = "Online";
        } else {
          $value->status = "Offline";
        }
        if ($value->gender == 1) {
          $value->gender = "Male";
        } elseif($value->gender == 2) {
          $value->gender = "Female";
        } else {
          $value->gender == "None";
        }
        //photo img_src
        $value->img_src = getProfileImgSrc($value->id, $value->profile_img, $value->profile_img_id);
        //shorten desciption before <span> highlight
        $value->shortDesc = substr($value->description, 0, 35);
        //original description length before <span> highlight
        $value->descLength = strlen($value->description);
         //full name that will not highlighted (for sorting)
         $value->full_name = $value->first_name. " " .$value->last_name;
      }

      $data = [
        "result" => $result,
        "term" => $term,
        "allUsersCount" => $allUsersCount
      ];
      $this->view("search/search", $data);
    }

    //$this->view("search/search", $data);
  }

  function highlightFound($filtered, $term) {
    

    for ($i = 0; $i < count($filtered); $i++) {
      foreach ($filtered[$i] as $key => $value) {
        if ($key != "id" && $key !="user_id" && $key != "profile_img" && 
        $key != "profile_img_id" && $key != "profile_setup" && $key != "img_src" && 
        $key != "profile_views" && $key != "full_name") {
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
                } else { // two different terms
                  $found = $this->stringFinder($value, $term[$j], 0);
                  if ($found) {
                    if (!in_array($found, $highlight)) {
                      $allow = "yes";
                      foreach($highlight as $highIndex => $subberValue) {//fixing interjoined terms
                        if (!($found->start < $subberValue->start && $found->end < $subberValue->start) 
                        && !($found->start > $subberValue->end && $found->end > $subberValue->end)) {
                          if (strlen($found->value) > strlen($subberValue->value)) {
                            unset($highlight[$highIndex]);//remove if found term is longer/ overlapping short term
                            //$highlight[] = $found;
                            
                          } elseif (strlen($found->value) < strlen($subberValue->value)) {
                            //do nothing
                            //echo "NO ".$found->value." ".$found->start."-".$found->end."-".$subberValue->start."-".$subberValue->end;
                            $allow = "no";
                          }
                          
                        }
                      }
                      if ($allow == "yes") {
                        //array_values($arr);
                        $tempArr = [];
                        foreach($highlight as $tempVal) {
                          $tempArr[] = $tempVal;
                        }
                        $highlight = $tempArr;
                        $highlight[] = $found;
                      }
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

          // echo $key;
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
              // echo "<pre>";
              // echo $key;
              // print_r($highlight);
              // echo "</pre>";
            }
            // echo $key;
            // echo "--------";
          }

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

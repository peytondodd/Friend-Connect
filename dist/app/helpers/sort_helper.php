<?php

function dateCompare($a, $b) {
  if ($a->created_at == $b->created_at) {
    return 0;
  }
  return ($a->created_at > $b->created_at) ? -1 : 1;
  //latest date to earliest date
}

function sortOldToNew($a, $b) {
  if ($a->created_at == $b->created_at) {
    return 0;
  }
  return ($a->created_at < $b->created_at) ? -1 : 1;
  //oldest to newest date/ new at bottom
}

function messagesOldToNew($a ,$b) {
  if ($a->date_sent == $b->date_sent) {
    return 0;
  }
  return ($a->date_sent < $b->date_sent) ? -1 : 1;
}

?>

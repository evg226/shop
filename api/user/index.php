<?php
session_start();
//$id=(int)htmlspecialchars(strip_tags($_POST['id']));
if (isset($_SESSION["user"])&&$id===$_SESSION["user"][$id]) {
    $user = $_SESSION["user"];
    unset($user['id']);
    echo json_encode($user);
} else {
    echo 0;
}




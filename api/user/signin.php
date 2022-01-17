<?php
session_start();
require_once "../db.php";

$email=(string)htmlspecialchars(strip_tags($_POST["email"]));
$password=md5((string)htmlspecialchars(strip_tags($_POST["password"])));

$query="SELECT id,login,name,surname,role FROM users WHERE login='$email' AND password='$password'";
$result = mysqli_query($connection, $query);

$user = mysqli_fetch_assoc($result);

if($user) {
    $_SESSION["user"]=$user;

    unset($user['id']);
    echo json_encode($user);

} else {
    require_once("../error.php");
    die (sendError("Login or password is incorrect"));
};

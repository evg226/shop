<?php
session_start();
require_once "../db.php";
require_once ("../error.php");

$email=(string)trim(htmlspecialchars(strip_tags($_POST["email"])));
$password=(string)trim(htmlspecialchars(strip_tags($_POST["password"])));
$userName=(string)trim(htmlspecialchars(strip_tags($_POST["name"])));
$userSurname=(string)trim(htmlspecialchars(strip_tags($_POST["surname"])));

if (!$password||!$email) die ("Email or password id empty");
$password=md5($password);

$query="INSERT into users (login,password,name,surname) values('$email','$password','$userName','$userSurname')";
//echo $query;
mysqli_query($connection, $query);
if(mysqli_errno($connection)==106) die (sendError("Login $email is busy"));
if(mysqli_error($connection)) die (sendError(mysqli_error($connection)));
$id=mysqli_insert_id($connection);
$user=[
    "id"=>$id,"login"=>$email,"name"=>$userName,"surname"=>$userSurname,"role"=>"USER"
];
if($id) {
    $_SESSION["user"]=$user;
    unset($user['id']);
    echo json_encode($user);
} else
    die (sendError(mysqli_error($connection)));



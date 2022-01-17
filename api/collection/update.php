<?php
require "../user/checkAdmin.php";
require_once "../db.php";
require_once ("../error.php");

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$query="UPDATE collections SET name='$name' WHERE id=$id";
if (!$name) die("Name is empty");
mysqli_query($connection, $query);
if (mysqli_error($connection)){
    die (sendError(mysqli_error($connection)));
} else {
    echo mysqli_affected_rows($connection);
}



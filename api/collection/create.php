<?php
require "../user/checkAdmin.php";
require_once "../db.php";

$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$query="INSERT INTO collections (name) values ('$name')";
if (!$name) die("Name is empty");
mysqli_query($connection, $query);
if (mysqli_error($connection)){
    echo mysqli_error($connection);
} else {
    $id=mysqli_insert_id($connection);
    echo json_encode($id);
}



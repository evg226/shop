<?php
require "../user/checkAdmin.php";
require_once "../db.php";
require_once ("../error.php");

$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$collectionId=(int)htmlspecialchars(strip_tags($_POST["collectionId"]));
$query="INSERT INTO categories (name,collection_id) values ('$name',$collectionId)";
if ($name&&$collectionId) {
    mysqli_query($connection, $query);
    if (mysqli_error($connection)) {
        die (sendError(mysqli_error($connection)));
    } else {
        $id = mysqli_insert_id($connection);
        echo json_encode($id);
    }
} else {
    die("Name or collection is empty");
}



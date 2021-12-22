<?php
require "../user/checkAdmin.php";
require_once "../db.php";

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$collectionId=(int)htmlspecialchars(strip_tags($_POST["collectionId"]));
if (!$name||!$collectionId) die("Name or collection is empty");

$query="UPDATE categories SET name='$name', collection_id=$collectionId WHERE id=$id";

mysqli_query($connection, $query);
if (mysqli_error($connection)){
    echo mysqli_error($connection);
} else {
    echo mysqli_affected_rows($connection);
}

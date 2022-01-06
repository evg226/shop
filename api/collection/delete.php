<?php
require "../user/checkAdmin.php";
require "../db.php";
require_once ("../error.php");

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$query="DELETE FROM collections WHERE id=$id";

mysqli_query($connection, $query);
if (mysqli_error($connection)){
    die (sendError(mysqli_error($connection)));
} else {
    echo mysqli_affected_rows($connection);
}

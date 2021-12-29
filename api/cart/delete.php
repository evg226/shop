<?php
require "../user/checkAuth.php";
require_once "../db.php";

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));

$query = "DELETE FROM cart WHERE id=$id and userId=$userId";

if(mysqli_query($connection, $query)) {
    echo mysqli_affected_rows($connection);
} else {
    require_once("../error.php");
    die (sendError(mysqli_error($connection)));

}

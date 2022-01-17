<?php
require "../user/checkAdmin.php";
require_once "../db.php";
require_once("../error.php");

$orderId=(string)htmlspecialchars(strip_tags($_POST["id"]));
$status=(string)htmlspecialchars(strip_tags($_POST["status"]));

$query="UPDATE orders SET status='$status' 
        WHERE id=$orderId";
//die (sendError($query));

$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) {
    die (sendError(mysqli_error($connection)));
} else{
    echo mysqli_affected_rows($connection);
}

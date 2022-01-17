<?php
require "../user/checkAuth.php";
require_once "../db.php";
require_once("../error.php");

$orderId=(string)htmlspecialchars(strip_tags($_POST["id"]));
$query="UPDATE orders SET status='cancelled' 
        WHERE user_id=$userId AND status='created' AND id=$orderId";

$orders=[];
$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) {
    die (sendError(mysqli_error($connection)));
} else{
    echo mysqli_affected_rows($connection);
}
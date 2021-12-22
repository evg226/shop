<?php
require "../user/checkAuth.php";
require_once "../db.php";

$order=(string)htmlspecialchars(strip_tags($_POST["orderDate"]));
$query="DELETE FROM orders 
        WHERE user_id=$userId AND status='created'AND start_date='$order'";

$orders=[];
$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) {
    echo mysqli_error($connection);
} else{
    echo mysqli_affected_rows($connection);
}
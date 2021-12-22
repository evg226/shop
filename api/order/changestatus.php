<?php
require "../user/checkAdmin.php";
require_once "../db.php";

$order=(string)htmlspecialchars(strip_tags($_POST["orderDate"]));
$status=(string)htmlspecialchars(strip_tags($_POST["status"]));

$query="DELETE FROM orders WHERE start_date='$order'";

$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) {
    echo mysqli_error($connection);
} else{
    echo mysqli_affected_rows($connection);
}

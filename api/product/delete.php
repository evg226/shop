<?php
require "../user/checkAuth.php";
require "../db.php";
require_once ("../error.php");

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$query="DELETE FROM products WHERE id=$id";
mysqli_query($connection, $query);
echo mysqli_error($connection)?sendError(mysqli_error($connection)): mysqli_affected_rows($connection);

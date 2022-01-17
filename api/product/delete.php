<?php
require "../user/checkAuth.php";
require "../db.php";
require_once ("../error.php");

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));

$query="SELECT image FROM products WHERE id=$id";
$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
$image=mysqli_fetch_assoc($result)['path'];

$query="DELETE FROM products WHERE id=$id";
mysqli_query($connection, $query);
if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
if (isset($image)) unlink("../../static/$image");

echo mysqli_affected_rows($connection);

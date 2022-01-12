<?php
require "../user/checkAdmin.php";
require "../db.php";
require_once ("../error.php");

$id=htmlspecialchars(strip_tags($_POST['id']));
$productId=htmlspecialchars(strip_tags($_POST['productId']));


if(isset($id)) {
    $query = "DELETE FROM images WHERE id=$id";
    $queryPath="SELECT path FROM images WHERE id=$id";
} else {
    $query = "DELETE FROM images WHERE productId=$productId";
    $queryPath="SELECT path FROM images WHERE productid=$productId";
}

mysqli_query($connection, $queryPath);
$result=mysqli_query($connection, $queryPath);

mysqli_query($connection, $query);
if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
$row= mysqli_affected_rows($connection);

if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
while($imagePath = mysqli_fetch_assoc($result)['path']){
    unlink("../../static/$imagePath");
    }
echo $row;


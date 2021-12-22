<?php
require "../user/checkAdmin.php";
require "../db.php";

$id=(int)htmlspecialchars(strip_tags($_GET['id']));
$productId=(int)htmlspecialchars(strip_tags($_GET['productId']));


if(isset($id)) {
    $query = "DELETE FROM images WHERE id=$id";
    $queryPath="SELECT path FROM images WHERE id=$id";
} else {
    $query = "DELETE FROM images WHERE productId=$productId";
    $queryPath="SELECT path FROM images WHERE productid=$productId";
}
mysqli_query($connection, $query);
if (mysqli_errno()) {
    $result=mysqli_query($connection, $queryPath);
    while($imagePath = mysqli_fetch_assoc($result)['path']){
        unlink("../../static/$imagePath");
    }
}
echo mysqli_affected_rows($connection);

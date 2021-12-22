<?php
require "../user/checkAdmin.php";
require_once "../db.php";

$productId=(int)htmlspecialchars(strip_tags($_POST["productId"]));
if (!$productId) die("Enter productId");
$main=$_FILES['mainImage']['tmp_name'];
$fileName = date("Ymdhis");
$responce=[];

if (exif_imagetype($main)==2||exif_imagetype($main)==3) {
    $fileType=explode(".", $_FILES['mainImage']['name'])[1];
    $filePath = "../../static/$fileName.$fileType";
    if (move_uploaded_file($main, $filePath)) {
        $query = "UPDATE products SET image='$fileName.$fileType' WHERE id=$productId";
        mysqli_query($connection, $query);
        $catalogImageId = mysqli_insert_id($connection);
        $responce[$_FILES['mainImage']['name']]=mysqli_affected_rows($connection);

    }
}
foreach ($_FILES['galleryImages']['tmp_name'] as $key => $file) {

    if (exif_imagetype($file) == 2 || exif_imagetype($file) == 3) {
        $fileType = explode(".", $_FILES['galleryImages']['name'][$key])[1];
        $bigPath = "../../static/$key$fileName.$fileType";
        if (move_uploaded_file($file, $bigPath)) {
            $query = "INSERT INTO images (path,product_id) VALUES('$bigPath',$productId)";
            mysqli_query($connection, $query);
            $responce[$_FILES['galleryImages']['name'][$key]]=mysqli_affected_rows($connection);
        }
    }
}
echo json_encode($responce);

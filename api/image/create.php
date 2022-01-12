<?php
require "../user/checkAdmin.php";
require_once "../db.php";
require_once ("../error.php");

$productId=htmlspecialchars(strip_tags($_POST["productId"]));
if (!$productId) die(sendError("Enter productId"));
$main=$_FILES['galleryImage']['tmp_name'];

$fileName = date("Ymdhis");

if (isset($main)){
    if (exif_imagetype($main)==2||exif_imagetype($main)==3) {
        $fileType=explode(".", $_FILES['galleryImage']['name'])[1];
        $filePath = "../../static/$fileName.$fileType";
        if (move_uploaded_file($main, $filePath)){
            $query = "INSERT INTO images (path,product_id) VALUES('$fileName.$fileType',$productId)";
            mysqli_query($connection, $query);
            if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
            $response['path']="$fileName.$fileType";
            $response['product_id']=$productId;
            $response['id']=mysqli_insert_id($connection);
            echo json_encode($response);
        } else
            die (sendError("Error in image loading"))   ;
    } else {
        die (sendError("No filename or file"));
    }
}
//
//foreach ($_FILES['galleryImages']['tmp_name'] as $key => $file) {
//
//    if (exif_imagetype($file) == 2 || exif_imagetype($file) == 3) {
//        $fileType = explode(".", $_FILES['galleryImages']['name'][$key])[1];
//        $bigPath = "../../static/$key$fileName.$fileType";
//        if (move_uploaded_file($file, $bigPath)) {
//            $query = "INSERT INTO images (path,product_id) VALUES('$key$fileName.$fileType',$productId)";
//            mysqli_query($connection, $query);
//            if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
//            $response[$_FILES['galleryImages']['name'][$key]]=mysqli_affected_rows($connection);
//        } else {
//            die(sendError("Error loading file"));
//        }
//
//    }
//}
//echo json_encode($response);

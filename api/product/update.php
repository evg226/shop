<?php
require "../user/checkAuth.php";
require_once "../db.php";
require_once("../error.php");

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$description=(string)htmlspecialchars(strip_tags($_POST["description"]));
$price=(string)htmlspecialchars(strip_tags($_POST["price"]));
$categoryId=(string)htmlspecialchars(strip_tags($_POST["categoryId"]));
if(!$id||!$name||!$description||!$price||!$categoryId)  die (sendError("It needs all fields"));
$main=$_FILES['mainImage']['tmp_name'];
$fileName = (string)htmlspecialchars(strip_tags($_POST["image"]));;

$query="UPDATE products SET
            name='$name',
            description='$description',
            price=$price,
            category_id=$categoryId
         WHERE id=$id";
mysqli_query($connection, $query);

if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
$query="SELECT * FROM products WHERE id=$id";
$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
$product=mysqli_fetch_assoc($result);
if (isset($fileName)&&isset($main)){
    if (exif_imagetype($main)==2||exif_imagetype($main)==3) {
        $filePath = "../../static/$fileName";
        if (!move_uploaded_file($main, $filePath)) die (sendError("Error in image loading"));
    } else {
        die (sendError("No filename or file"));
    }
}
echo json_encode($product);














<?php
require "../user/checkAuth.php";
require_once "../db.php";
require_once "../error.php";

$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$description=(string)htmlspecialchars(strip_tags($_POST["description"]));
$price=(string)htmlspecialchars(strip_tags($_POST["price"]));
$categoryId=(string)htmlspecialchars(strip_tags($_POST["categoryId"]));
if(!$name||!$description||!$price||!$categoryId)  die (sendError("It needs all fields"));
$main=$_FILES['mainImage']['tmp_name'];

$query="INSERT INTO products (name,description,price,category_id) values ('$name','$description','$price',$categoryId)";

if (isset($main)){
    if (exif_imagetype($main)==2||exif_imagetype($main)==3) {
        $fileType=explode(".", $_FILES['mainImage']['name'])[1];
        $fileName = date("Ymdhis").$fileType;
        $filePath = "../../static/$fileName";
        if (move_uploaded_file($main, $filePath)){
            $query="INSERT INTO products (name,description,price,category_id,image) values ('$name','$description','$price',$categoryId,'$fileName')";
        } else
            die (sendError("Error in image loading"));
    } else {
        die (sendError("No filename or file"));
    }
}
mysqli_query($connection, $query);
if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
$id=mysqli_insert_id($connection);
$query="SELECT * FROM products WHERE id=$id";
$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
$product=mysqli_fetch_assoc($result);

echo json_encode($product);

<?php
require "../user/checkAuth.php";
require_once "../db.php";
$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$description=(string)htmlspecialchars(strip_tags($_POST["description"]));
$price=(string)htmlspecialchars(strip_tags($_POST["price"]));
$categoryId=(string)htmlspecialchars(strip_tags($_POST["categoryId"]));

$query="INSERT INTO products (name,description,price,category_id) values ('$name','$description','$price',$categoryId)";
if(!$name||!$description||!$price||!$categoryId) die ("It needs all fields");
mysqli_query($connection, $query);
if (mysqli_error($connection)) {
    echo mysqli_error($connection);
} else {
    $id = mysqli_insert_id($connection);
    echo json_encode($id);
}
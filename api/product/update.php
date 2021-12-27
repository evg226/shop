<?php
require "../user/checkAuth.php";
require_once "../db.php";

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$name=(string)htmlspecialchars(strip_tags($_POST["name"]));
$description=(string)htmlspecialchars(strip_tags($_POST["description"]));
$price=(string)htmlspecialchars(strip_tags($_POST["price"]));
$categoryId=(string)htmlspecialchars(strip_tags($_POST["categoryId"]));
if(!$name||!$description||!$price||!$categoryId) die ("It needs all fields");

$query="UPDATE products SET
            name='$name',
            description='$description',
            price=$price,
            category_id=$categoryId
         WHERE id=$id";
mysqli_query($connection, $query);

echo mysqli_error($connection)?sendError(mysqli_error($connection)): mysqli_affected_rows($connection);





<?php
require_once "../db.php";
require_once ("../error.php");

$productId=(int)htmlspecialchars(strip_tags($_GET['productId']));

$query="SELECT * FROM images WHERE product_id=$productId";
$result = mysqli_query($connection, $query);
if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
 $images=[];
    while($data = mysqli_fetch_assoc($result)){
        array_push($images,$data);
    }
    echo str_replace("\\","", json_encode($images));


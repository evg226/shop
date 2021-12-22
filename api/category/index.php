<?php
require_once "../db.php";

$query="SELECT * FROM categories";
$result = mysqli_query($connection, $query);
$products=[];
while($data = mysqli_fetch_assoc($result)){
    array_push($products,$data);
}
echo json_encode($products);


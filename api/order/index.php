<?php
require "../user/checkAuth.php";
require_once "../db.php";

$query="SELECT start_date,product_id,products.name,products.price,address,status,quantity,color,size   
            FROM orders INNER JOIN products
                ON orders.product_id=products.id";
$query.=$user['role']=="ADMIN"?"":" WHERE user_id=$userId";
$orders=[];
$result=mysqli_query($connection, $query);
if (mysqli_error($connection)) {
    echo mysqli_error($connection);
} else{
    while ($data=mysqli_fetch_assoc($result)){
        array_push($orders,$data);
    }
    echo json_encode($orders);
}

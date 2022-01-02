<?php
require "../user/checkAuth.php";
require_once "../db.php";
require_once("../error.php");

$orders=[];
$queryDates="SELECT start_date FROM orders WHERE user_id=$userId";
$resultDates=mysqli_query($connection, $queryDates);
while ($dataDates=mysqli_fetch_assoc($resultDates)){
    $dateCurrent=$dataDates['start_date'];
    $queryInner="SELECT product_id,products.name,products.price,address,status,quantity,color,size
            FROM orders INNER JOIN products
                ON orders.product_id=products.id
            WHERE user_id=$userId and start_date='$dateCurrent'";
    $result=mysqli_query($connection,$queryInner);
    $order=[];
    while ($data=mysqli_fetch_assoc($result)){
        array_push($order,$data);
    };
    $orders[$dateCurrent]=$order;
}

//$query.=$user['role']=="ADMIN"?"":" WHERE user_id=$userId";

if (mysqli_error($connection)) {
    die (sendError(mysqli_error($connection)));
} else{
    echo json_encode($orders);
}

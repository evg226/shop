<?php
require "../user/checkAuth.php";
require_once "../db.php";
require_once("../error.php");

$orders=[];
    $queryDates = "SELECT start_date FROM orders". ($role=="ADMIN"?"":" WHERE user_id=$userId");
    $resultDates = mysqli_query($connection, $queryDates);
    while ($dataDates = mysqli_fetch_assoc($resultDates)) {
        $dateCurrent = $dataDates['start_date'];
        $queryInner = "SELECT orders.id as id,product_id,products.name,products.price,address,status,quantity,color,size,
                        products.price*quantity as total
            FROM orders INNER JOIN products
                ON orders.product_id=products.id
            WHERE start_date='$dateCurrent'". ($role=="ADMIN"?"":" AND user_id=$userId");
        $result = mysqli_query($connection, $queryInner);
        $order = [];
        while ($data = mysqli_fetch_assoc($result)) {
            array_push($order, $data);
        };
        $orders[$dateCurrent] = $order;
    }

if (mysqli_error($connection)) {
    die (sendError(mysqli_error($connection)));
} else{
    echo json_encode($orders);
}

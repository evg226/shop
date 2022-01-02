<?php
require "../user/checkAuth.php";
require_once "../db.php";
require_once("../error.php");

$address=(string)htmlspecialchars(strip_tags($_POST["address"]));
$status="created";
mysqli_query($connection,'BEGIN');
$queryInsertOrder="
    INSERT INTO orders (start_date,product_id,user_id,price,address,status,quantity,color,size)   
        SELECT NOW(),productId,userId,price,'$address','$status',quantity,color,size 
            FROM cart INNER JOIN products
                ON cart.productId=products.id
        WHERE userId=$userId;
    ";
$queryDeleteCart="
    DELETE FROM cart 
        WHERE userId=$userId;
    ";

mysqli_query($connection, $queryInsertOrder);
if (mysqli_error($connection)) {
    die (sendError(mysqli_error($connection)));
} else{
    mysqli_query($connection, $queryDeleteCart);
    if (mysqli_error($connection)) {
        mysqli_query($connection,'ROLLBACK');
        die (sendError(mysqli_error($connection)));
    } else {
        $rows=mysqli_affected_rows($connection);
        mysqli_query($connection,'COMMIT');
        echo $rows;
    }

}

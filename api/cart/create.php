<?php
require "../user/checkAuth.php";
require_once "../db.php";

$productId=(int)htmlspecialchars(strip_tags($_POST["productId"]));
$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$quantity=(int)htmlspecialchars(strip_tags($_POST["quantity"]));
$color=(string)htmlspecialchars(strip_tags($_POST["color"]));
$size=(string)htmlspecialchars(strip_tags($_POST["size"]));

$queryFind="SELECT id,quantity from cart 
                WHERE productId=$productId
                  AND userId=$userId
                  AND color='$color'
                  AND size='$size'
                  ";
$cartResult=mysqli_query($connection, $queryFind);
$data=mysqli_fetch_assoc($cartResult);

if($data['id']) {
    $cartId=$data['id'];
    $cartQuantity=$data['quantity']+1;
    $query = "UPDATE cart SET
                quantity=$cartQuantity";
    if ($color) $query .= ", color='$color'";
    if ($size) $query .= ", size='$size'";
    $query .= " WHERE id=$cartId";
    if (mysqli_query($connection, $query)) {
        echo mysqli_affected_rows($connection);
    } else {
        require_once("../error.php");
        die (sendError(mysqli_error($connection)));

    }
} else {
    if (!$quantity) $quantity = 1;
    $query = "INSERT INTO cart (quantity,color,size,productId,userId) VALUES ($quantity,'$color','$size',$productId,$userId)";
    if (mysqli_query($connection, $query)) {
        echo mysqli_insert_id($connection);
    } else {
        require_once("../error.php");
        die (sendError(mysqli_error($connection)));

    }
}

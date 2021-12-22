<?php
require "../user/checkAuth.php";
require_once "../db.php";

$query="SELECT cart.*,products.name as productName,products.price as price,products.price*cart.quantity as total
            FROM cart
            INNER JOIN products
                ON products.id=cart.productId
        WHERE userId=$userId
";

$result = mysqli_query($connection, $query);
if (mysqli_error($connection)) die (mysqli_error($connection));
$cartRows=[];
$cartQuantity=0;
$cartTotal=0;
while($data = mysqli_fetch_assoc($result)){
    array_push($cartRows,$data);
    $cartQuantity+=$data["quantity"];
    $cartTotal+=$data["total"];
}
$cart=[
    "quantity"=>$cartQuantity,
    "total"=>$cartTotal,
    "rows"=>$cartRows
];
echo json_encode($cart);

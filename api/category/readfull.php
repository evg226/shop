<?php
require_once "../db.php";


$query="select * from collections";
$result = mysqli_query($connection, $query);
$collections=[];
while($data = mysqli_fetch_assoc($result)){
    $queryIn="select * from categories where collection_id=".$data['id'];
    $resultIn = mysqli_query($connection, $queryIn);
    $categories=[];
    while($dataIn = mysqli_fetch_assoc($resultIn)){
        array_push($categories,$dataIn);
    }
    $data["categories"]=$categories;
    array_push($collections,$data);
}
echo (json_encode($collections));
//
//
//$query="select co.id,co.name, json_arrayagg(json_object('id',c.id,'name',c.name)) as category
//            from collections co left join categories c
//                on co.id=c.collection_id
//            group by co.id,co.name";
//$result = mysqli_query($connection, $query);
//$products=[];
//while($data = mysqli_fetch_assoc($result)){
//    array_push($products,$data);
//}
//
//$result = json_encode($products);
//echo $result;
//
//
//


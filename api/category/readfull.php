<?php
require_once "../db.php";


$query="select co.id,co.name, json_arrayagg(json_object('id',c.id,'name',c.name)) as category
            from collections co left join categories c
                on co.id=c.collection_id
            group by co.id,co.name";
$result = mysqli_query($connection, $query);
$products=[];
while($data = mysqli_fetch_assoc($result)){
    array_push($products,$data);
    print_r($data);
}
$result = json_encode($products);
echo str_replace('\\','',$result);





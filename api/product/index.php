<?php
require_once "../db.php";
if( isset($_GET['id'])){
//    echo "Запрос по id";
    $id=(int)htmlspecialchars(strip_tags($_GET['id']));
    $query="SELECT
                products.id,
                products.name as product_name,
                description,
                price,
                category_id,
                categories.name as category_name,      
                collection_id,
                collections.name as collection_name
                FROM products
                INNER JOIN categories
                    ON categories.id=products.category_id
                INNER JOIN collections
                    ON collections.id=categories.collection_id
        WHERE products.id=$id";
    $result = mysqli_query($connection, $query);
    $product=mysqli_fetch_assoc($result);
    $images=[];
    $queryImgs="SELECT * FROM images WHERE product_id=$id";
    $resultImgs = mysqli_query($connection, $queryImgs);
    while($data=mysqli_fetch_assoc($resultImgs)){
        array_push($images,$data);
    }
    $product['images']=$images;
     echo json_encode($product);
} else {
//    echo "Запрос всех продуктов";
    $page=isset($_GET['page'])?(int)htmlspecialchars(strip_tags($_GET['page'])):1;
    $limit=isset($_GET['limit'])?(int)htmlspecialchars(strip_tags($_GET['limit'])):4;
    $startRecord=($page-1)*$limit;
    $query="SELECT * FROM products LIMIT $startRecord,$limit";
    $result = mysqli_query($connection, $query);
    $err1=mysqli_error($connection);
    $products=[];
    while($data = mysqli_fetch_assoc($result)){
        array_push($products,$data);
    }

    $query="SELECT count(*) as count FROM products ";

    $result = mysqli_query($connection, $query);
    $err2=mysqli_error($connection);
    $data = mysqli_fetch_assoc($result);
    if ($err1||$err2 ) {
        echo $err1."; ".$err2;
    } else {
        $responce=[
            "count"=>$data["count"],
            "page"=>$page,
            "limit"=>$limit,
            "products"=>$products
        ];
        echo json_encode($responce);
    }


}

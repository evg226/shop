<?php
require_once "../db.php";
require_once "../error.php";

if( isset($_GET['categoryId'])&&$_GET['cat']==1) {
    $categoryId = (int)htmlspecialchars(strip_tags($_GET['categoryId']));
    $query = "SELECT * FROM products WHERE category_id=$categoryId";
    $result = mysqli_query($connection, $query);
    if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
    $products = [];
    while ($data = mysqli_fetch_assoc($result)) {
        array_push($products, $data);
    }
    echo json_encode($products);
} else if( isset($_GET['id'])){
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
}else {
//    echo "Запрос всех продуктов";
    $page=(int)htmlspecialchars(strip_tags($_GET['page']));
    $categoryId = (int)htmlspecialchars(strip_tags($_GET['categoryId']));
    $collectionId = (int)htmlspecialchars(strip_tags($_GET['collectionId']));
    $limit = isset($_GET['limit']) ? (int)htmlspecialchars(strip_tags($_GET['limit'])) : 9;
    if ($page) {
        $startRecord = ($page - 1) * $limit;
        $query = "SELECT products.*,categories.collection_id FROM products
        INNER JOIN categories
            ON products.category_id=categories.id";
        $queryEnd = "";
        if ($collectionId != 0) {
            $queryEnd .= " WHERE collection_id=$collectionId";
        } else if ($categoryId != 0) {
            $queryEnd .= " WHERE category_id=$categoryId";
        }
        $result = mysqli_query($connection, $query . $queryEnd . " LIMIT $startRecord,$limit");
        if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
        $products = [];
        while ($data = mysqli_fetch_assoc($result)) {
            array_push($products, $data);
        }

        $query = "SELECT count(products.id) as count FROM products
        INNER JOIN categories ON products.category_id=categories.id" . $queryEnd;
        $result = mysqli_query($connection, $query);
        if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
        $data = mysqli_fetch_assoc($result);
        $response = [
            "count" => (int)$data["count"],
            "page" => $page,
            "limit" => $limit,
            "products" => $products
        ];
        if ($collectionId != 0) {
            $response["collectionId"] = $collectionId;
        } else if ($categoryId != 0) {
            $response["categoryId"] = $categoryId;
        }
        echo json_encode($response);

    } else {
        $last=(string)htmlspecialchars(strip_tags($_GET['last']));

        $fieldSort=(string)htmlspecialchars(strip_tags($_GET['fieldSort']));

        $query = "SELECT products.id,
                         products.name as 'products.name',
                         price,
                         collection_id,   
                         category_id,   
                         categories.name as 'categories.name',   
                        categories.collection_id FROM products
                    INNER JOIN categories
                        ON products.category_id=categories.id ";
        if ($fieldSort&&$last) {
            $query.= "WHERE ".$fieldSort." > '$last'";
        } else {
            $query .= "WHERE products.id > " . ($last ? $last : "1");
        }

        if ($collectionId != 0) {
            $queryFilter = " AND collection_id=$collectionId";
        } else if ($categoryId != 0) {
            $queryFilter = " AND category_id=$categoryId";
        };
        if($fieldSort) $querySort=" ORDER BY $fieldSort";
        $query.=$queryFilter.$querySort." LIMIT $limit";
//        die($query);
        $result = mysqli_query($connection, $query);
        if (mysqli_error($connection)) die (sendError(mysqli_error($connection)));
        $products=mysqli_fetch_all($result,MYSQLI_ASSOC);

        echo  json_encode( [
            "fieldSort"=> $fieldSort,
            "last" => $products[$limit-1][$fieldSort],
            "limit" => $limit,
            "products" => $products
        ]);
    }
}

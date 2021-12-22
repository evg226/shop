<?php
require "../user/checkAuth.php";
require_once "../db.php";

//$productId=(int)htmlspecialchars(strip_tags($_POST["productId"]));
$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$quantity=(int)htmlspecialchars(strip_tags($_POST["quantity"]));
$color=(string)htmlspecialchars(strip_tags($_POST["color"]));
$size=(string)htmlspecialchars(strip_tags($_POST["size"]));

    if ($quantity<=0) {
        $query = "DELETE FROM cart WHERE id=$id and userId=$userId";
        if(mysqli_query($connection, $query)) {
            echo mysqli_affected_rows($connection);
        } else {
            echo mysqli_error($connection);
        }
    } else {
        $query = "UPDATE cart SET
                quantity=$quantity";
        if ($color) $query .= ", color='$color'";
        if ($size) $query .= ", size='$size'";
        $query .= " WHERE id=$id";
        if (mysqli_query($connection, $query)) {
            echo mysqli_affected_rows($connection);
        } else {
            $message = mysqli_error($query);
        }
    }


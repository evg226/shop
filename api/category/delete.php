<?php
require "../user/checkAdmin.php";
require "../db.php";

$id=(int)htmlspecialchars(strip_tags($_POST["id"]));
$query="DELETE FROM categories WHERE id=$id";
mysqli_query($connection, $query);
if (mysqli_error($connection)){
    echo mysqli_error($connection);
} else {
    echo mysqli_affected_rows($connection);
}

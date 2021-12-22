<?php
$method=$_SERVER['REQUEST_METHOD'];
$action=$_GET['action'];
echo $action;
print_r($_GET);
if ($method=="POST") {
    print_r($_POST);
}

require_once "db.php";



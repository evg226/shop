<?php
session_start();
$user = $_SESSION["user"];
$userId=$user["id"];
if (!isset($user)) die("You need to sign in");
if ($user['role']!="ADMIN") die("You can't have permission");


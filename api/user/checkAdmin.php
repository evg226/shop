<?php
session_start();
require_once ("../error.php");

$user = $_SESSION["user"];
$userId=$user["id"];
if (!isset($user)) die (sendError("You need to sign in"));
if ($user['role']!="ADMIN") die (sendError("You can't have permission"));



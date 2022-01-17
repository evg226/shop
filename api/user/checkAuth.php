<?php
session_start();
require_once ("../error.php");
$user = $_SESSION["user"];
$userId=$user["id"];
$role=$user["role"];
if (!isset($user)) die (sendError("You need to sign in"));

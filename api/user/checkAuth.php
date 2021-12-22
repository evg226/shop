<?php
session_start();
$user = $_SESSION["user"];
$userId=$user["id"];
if (!isset($user)) die("You need to sign in");

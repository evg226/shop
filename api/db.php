<?php
$serverName = "localhost";
$database = "shop";
$userName = "shop";
$passwd = "Pass12@@";

$connection = mysqli_connect($serverName, $userName, $passwd, $database);
if (!$connection) die ("Соединение не установлено : " . mysqli_connect_error());
//echo "Соединение успешно";
//mysqli_close($connection);

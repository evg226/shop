<?php
session_start();
unset($_SESSION['user']);
echo session_destroy();

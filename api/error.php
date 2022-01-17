<?php

function sendError($message){
    header('HTTP/1.0 403 Forbidden');
//    header("Access-Control-Allow-Origin: *");
    return($message);
}

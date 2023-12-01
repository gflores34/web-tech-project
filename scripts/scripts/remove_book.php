<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db_host="127.0.0.1:3306";        //Change this
$db_user="root";        //Change this
$db_pass="1123";        //Change this
$db_name="bookstore";     //Do not change

$db_conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if (mysqli_connect_errno())
{
    echo 'Connection to database failed:'.mysqli_connect_error();
    exit();
}


$data = json_decode(file_get_contents("php://input"));
$currisbn = $data->isbn;

$query="DELETE FROM images WHERE ISBN = \"$currisbn\"";
$result = $db_conn->query($query);

$query="DELETE FROM books WHERE ISBN = \"$currisbn\"";
$result = $db_conn->query($query);

echo "finished removing book and image with isbn $currisbn";

$db_conn->close();
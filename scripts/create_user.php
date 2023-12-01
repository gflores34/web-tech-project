<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db_host="localhost";        //Change this
$db_user="testuser";        //Change this
$db_pass="Test123test!";        //Change this
$db_name="Bookstore";     //Do not change

$db_conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if (mysqli_connect_errno())
{
    echo 'Connection to database failed:'.mysqli_connect_error();
    exit();
}


$data = json_decode(file_get_contents("php://input"));
$firstname = $data->firstname;
$lastname = $data->lastname;
$password = $data->password;
$email = $data->email;
$usergroup = $data->usergroup;

$query="INSERT INTO Users (first_name, last_name, password, email, usergroup) VALUES (\"$firstname\", \"$lastname\", \"$password\", \"$email\", \"$usergroup\")";

$result = $db_conn->query($query);

echo "finished";

$db_conn->close();
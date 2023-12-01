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
$firstname = $data->firstname;
$lastname = $data->lastname;
$pass = $data->password;
$email = $data->email;
$usergroup = $data->usergroup;
$userid = $data->user_id;

$query="UPDATE Users SET first_name = \"$firstname\", last_name = \"$lastname\", password = \"$pass\", email = \"$email\", usergroup = \"$usergroup\" WHERE user_id = \"$userid\"";
$result = $db_conn->query($query);

echo "finished updating user";

$db_conn->close();
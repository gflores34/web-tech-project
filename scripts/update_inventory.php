<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db_host = "127.0.0.1:3306";  // Change this
$db_user = "root";           // Change this
$db_pass = "1123";           // Change this
$db_name = "bookstore";      // Do not change

$db_conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_errno()) {
    echo 'connection failed' . mysqli_connect_error();
    exit();
}

// Use array_map to sanitize input values
$isbnArray = array_map($db_conn->real_escape_string, $_GET['isbn']);
$quantityArray = array_map($db_conn->real_escape_string, $_GET['quantity']);

for ($i = 0; $i < count($isbnArray); $i++) {
    $isbn = $isbnArray[$i];
    $quantity = $quantityArray[$i];

    $query = "UPDATE books SET QuantityOnHand = QuantityOnHand - $quantity WHERE ISBN = '$isbn'";

    if ($db_conn->query($query) !== TRUE) {
        echo 'could not update db ' . $db_conn->error;
        exit();
    }
}

echo 'success got it';

$db_conn->close();
?>
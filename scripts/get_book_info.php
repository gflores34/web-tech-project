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

$book_title = $_GET['title']; 

$query = "SELECT Books.ISBN, Books.Title, Books.BookSubject, Books.Pages, Books.SellingPrice, Authors.Name, Publishers.CompanyName 
FROM Books 
INNER JOIN Authors ON Books.AuthorId = Authors.AuthorId 
INNER JOIN Publishers ON Books.PublisherId = Publishers.PublisherId 
WHERE Books.ISBN = \"$book_isbn\"";


$result = $db_conn->query($query);

$response = array();
while ($row = $result->fetch_assoc()) $response[] = $row;   

$jsondata = json_encode($response);

echo $jsondata;

$result->free();


$db_conn->close();

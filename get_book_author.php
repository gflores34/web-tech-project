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

$query="SELECT Books.Title, Books.SellingPrice, Authors.Name, Images.ImagePath FROM Books INNER JOIN Images ON Books.ISBN = Images.ISBN INNER JOIN Authors ON Books.AuthorId
= Authors.AuthorId WHERE Books.Title=\"$book_title\"";
;

$result = $db_conn->query($query);


if ($result = $db_conn->query($query)) {

    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
        $field1name = $row["Title"];
        $field2name = $row["SellingPrice"];
        $field3name = $row["Name"];
        $field4name = $row["ImagePath"];
    }
    

    echo "$field3name";

    /* free result set */
    $result->free();
}

$db_conn->close();
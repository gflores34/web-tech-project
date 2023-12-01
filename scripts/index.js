import { getLoggedUser } from "./user.js";

if (getLoggedUser() !== null) {
    document.getElementById("loginButton").style.visibility="hidden";
} else {
    document.getElementById("logoutButton").style.visibility="hidden";
}

// get the full list of users
export async function getBookList(callback) {
    return new Promise(function (resolve, reject) {
        const xhttp = new XMLHttpRequest();
    
        xhttp.onload = function() {
            if (xhttp.status >= 200 && xhttp.status < 300) {
            var data = this.response;
            var dataParse = JSON.parse(data);
            // console.log(dataParse);
            if (dataParse === undefined || dataParse === null) {
                callback(null);
            } else {
                if (callback) callback(dataParse);
            }
        }
        }
        xhttp.open("GET", "../scripts/get_books.php");
        xhttp.send();
    })

};


function set_image(title, book_id){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	document.getElementById(book_id).src = dataParse[0].ImagePath;
    }
    xhttp.open("GET", "./scripts/get_book.php?title=" + title, true);
    xhttp.send();
}

function set_price(title, book_id){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	document.getElementById(book_id).innerHTML ="$" +  dataParse[0].SellingPrice;
    }
    xhttp.open("GET", "./scripts/get_book.php?title=" + title, true);
    xhttp.send();
}

function set_author(title, book_id){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	document.getElementById(book_id).innerHTML = dataParse[0].Name;
    }
    xhttp.open("GET", "./scripts/get_book.php?title=" + title, true);
    xhttp.send();
}

function set_featured_books(books){

    // now ignoring passed books, just displaying books with id 1,2,3,4

    var node = document.getElementById("featured-books");
        for (let i = 0; i < books.length; i += 4) {
            console.log(books[i]);
            var newBook = document.createElement("div");
            newBook.classList.add("book");

            var image = document.createElement("img");
            image.classList.add("cover-image");
            console.log(books[i].ImagePath);
            image.src = books[i].ImagePath;
            newBook.appendChild(image);

            var br = document.createElement("br");
            newBook.appendChild(br);

            var p1 = document.createElement("a");
            p1.classList.add("book-title");
            p1.href = "./book.html?" + books[i].ISBN;
            var titleText = document.createTextNode(books[i].Title);
            p1.appendChild(titleText);
            newBook.appendChild(p1);

            var p2 = document.createElement("p");
            p2.classList.add("book-author");
            var authorText = document.createTextNode(books[i].Name);
            p2.appendChild(authorText);
            newBook.appendChild(p2);

            var p3 = document.createElement("p");
            p3.classList.add("price");
            var priceText = document.createTextNode("$" + books[i].SellingPrice);
            p3.appendChild( priceText);
            newBook.appendChild(p3);

            node.appendChild(newBook);

        }

}

function set_book_isbn(title, element){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
        
	    element.href = "./book.html?" + dataParse[0].ISBN;
        
    }
    xhttp.open("GET", "./scripts/get_book.php?title=" + title, true);
    xhttp.send();
}


function get_all_books(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	
        generate_books(dataParse);
        set_featured_books(dataParse);

        //document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./scripts/get_all_books.php", true);
    xhttp.send();
}

function generate_books(dataArray){

    var node = document.getElementById("all-books");
    
    for(let i = 0; i < dataArray.length; i++){

        var newBook = document.createElement("div");
        newBook.classList.add("book");

        var image = document.createElement("img");
        image.classList.add("cover-image");
        image.src = dataArray[i].ImagePath;
        newBook.appendChild(image);

	    var br = document.createElement("br");
	    newBook.appendChild(br);

        var p1 = document.createElement("a");
        p1.classList.add("book-title");
	    p1.href = "./book.html?" + dataArray[i].ISBN;
        var titleText = document.createTextNode(dataArray[i].Title);
        p1.appendChild(titleText);
        newBook.appendChild(p1);

        var p2 = document.createElement("p");
        p2.classList.add("book-author");
        var authorText = document.createTextNode(dataArray[i].Name);
        p2.appendChild(authorText);
        newBook.appendChild(p2);

        var p3 = document.createElement("p");
        p3.classList.add("price");
        var priceText = document.createTextNode("$" + dataArray[i].SellingPrice);
        p3.appendChild( priceText);
        newBook.appendChild(p3);

        node.appendChild(newBook);

    }

}

function get_all_genre_books(genre){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);

        document.getElementById("genre-title").innerHTML = genre;
        generate_books(dataParse);

        //document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./scripts/get_all_genre_books.php?genre=" + genre, true);
    xhttp.send();
}

function genreHandler(){

    let url = document.URL;
    let genre = url.split('?').pop()
    genre = genre.replace(/_/g," ");
    get_all_genre_books(genre);

}


//genreHandler();
get_all_books();

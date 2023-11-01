function set_book_image(title, bookId){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById(bookId).src = this.responseText;
    }
    xhttp.open("GET", "./get_book_image.php?title=" + title, true);
    xhttp.send();
}

function set_book_price(title, bookId){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./get_book_price.php?title=" + title, true);
    xhttp.send();
}

function set_book_author(title, bookId){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./get_book_author.php?title=" + title, true);
    xhttp.send();
}

function set_featured_images(){
    for(let bookNum = 1; bookNum < 5; bookNum++){
        let bookIdString = "book"+ bookNum +"-title"
        let book_title = document.getElementById(bookIdString).innerHTML;
        set_book_image(book_title, "book"+ bookNum + "-image");
    }
}

function set_featured_prices(){
    for(let bookNum = 1; bookNum < 5; bookNum++){
        let bookIdString = "book"+ bookNum +"-title"
        let book_title = document.getElementById(bookIdString).innerHTML;
        set_book_price(book_title, "book"+ bookNum + "-price");
    }
}

function set_featured_authors(){
    for(let bookNum = 1; bookNum < 5; bookNum++){
        let bookIdString = "book"+ bookNum +"-title"
        let book_title = document.getElementById(bookIdString).innerHTML;
        set_book_author(book_title, "book"+ bookNum + "-author");
    }
}

function get_all_books(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
        console.log(dataParse);

        generate_books(dataParse);

        //document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./get_all_books.php", true);
    xhttp.send();
}

function generate_books(dataArray){

    var node = document.getElementById("all-books");
    
    for(let i = 0; i < dataArray.length; i++){

        let count = 0;

        if( i % 4 || i == 0){
            var newRow = document.createElement("div");
            newRow.classList.add("bookRow");
            count = 0;
        }

        var newBook = document.createElement("div");
        newBook.classList.add("book");

        var image = document.createElement("img");
        image.classList.add("cover-image");
        image.src = dataArray[i].ImagePath;
        newBook.appendChild(image);

        var p1 = document.createElement("p");
        p1.classList.add("book-title");
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
        var priceText = document.createTextNode(dataArray[i].SellingPrice);
        p3.appendChild(priceText);
        newBook.appendChild(p3);

        newRow.appendChild(newBook);

        count += 1;

        if(count == 4){
            node.appendChild(newRow);
        }

    }

}

set_featured_images();
set_featured_prices();
set_featured_authors();
get_all_books();

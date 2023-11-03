function set_image(title, book_id){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	document.getElementById(book_id).src = dataParse[0].ImagePath;
    }
    xhttp.open("GET", "./get_book.php?title=" + title, true);
    xhttp.send();
}

function set_price(title, book_id){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	document.getElementById(book_id).innerHTML = dataParse[0].SellingPrice;
    }
    xhttp.open("GET", "./get_book.php?title=" + title, true);
    xhttp.send();
}

function set_author(title, book_id){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	document.getElementById(book_id).innerHTML = dataParse[0].Name;
    }
    xhttp.open("GET", "./get_book.php?title=" + title, true);
    xhttp.send();
}

function set_featured_books(book1, book2, book3, book4){

	set_author(book1, "featured1-author");
	set_image(book1, "featured1-image");
	set_price(book1, "featured1-price");

	set_author(book2, "featured2-author");
	set_image(book2, "featured2-image");
	set_price(book2, "featured2-price");


	set_author(book1, "featured3-author");
	set_image(book1, "featured3-image");
	set_price(book1, "featured3-price");


	set_author(book1, "featured4-author");
	set_image(book1, "featured4-image");
	set_price(book1, "featured4-price");
}


function get_all_books(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);

        generate_books(dataParse);

        //document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./get_all_books.php", true);
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

        node.appendChild(newBook);

    }

}

get_all_books();


set_author("Harry Potter and the Sorcerer's Stone", "book1-author");

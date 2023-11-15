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

function set_featured_books(book1, book2, book3, book4){

	set_author(book1, "featured1-author");
	set_image(book1, "featured1-image");
	set_price(book1, "featured1-price");
    title_link = document.getElementById("featured1-title");
	title_link.innerHTML = book1;
    set_book_isbn(title_link);

	set_author(book2, "featured2-author");
	set_image(book2, "featured2-image");
	set_price(book2, "featured2-price");
	title_link2 = document.getElementById("featured2-title");
	title_link2.innerHTML = book2;
    set_book_isbn(title_link2);

	set_author(book3, "featured3-author");
	set_image(book3, "featured3-image");
	set_price(book3, "featured3-price");
	title_link3 = document.getElementById("featured3-title");
	title_link3.innerHTML = book3;
    set_book_isbn(title_link3);

	set_author(book4, "featured4-author");
	set_image(book4, "featured4-image");
	set_price(book4, "featured4-price");
	title_link4 = document.getElementById("featured4-title");
	title_link4.innerHTML = book4;
    set_book_isbn(title_link4);
}

function set_book_isbn(title){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
		console.log(dataParse[0].ISBN);
	    title.href = "./book.html?" + dataParse[0].ISBN;
        
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
set_featured_books("Harry Potter and the Sorcerer's Stone", "Dune", "The Road", "A Song of Ice and Fire");

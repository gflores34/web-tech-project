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


function emptyStringError(){
    document.getElementById("responseString").innerHTML = "One or two of the above text boxes are empty. Please fill them both in";
}

function getDataFromForm(){
    let title = document.getElementById("book1-title").value;
    let lname = document.getElementById("lname").value;

    console.log("fname: " + fname);

    if (fname == "" || lname == ""){
        emptyStringError();
    } else {
        runAjax(fname, lname);
    }

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

set_featured_images();
set_featured_prices();
set_featured_authors();
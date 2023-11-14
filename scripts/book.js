function set_book_page(isbn){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	
        

        //document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./scripts/get_book_info.php?isbn=" + isbn, true);
    xhttp.send();
}


set_book_page("9781338878929");
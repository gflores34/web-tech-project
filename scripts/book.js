function set_book_info(isbn){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
		
	document.getElementById("book-title").innerHTML = "<img id=\"book-cover\" class=\"book-cover\" src=\"" + dataParse[0].ImagePath + "\" width=\"300\"></img>" + dataParse[0].Title;
       	document.getElementById("book-author").innerHTML = "by: <b> " + dataParse[0].Name + "<b>";
	
        
    }
    xhttp.open("GET", "./scripts/get_book_info.php?isbn=" + isbn, true);
    xhttp.send();
}


set_book_info("9781338878929");
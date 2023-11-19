function get_search_books(search){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);

        document.getElementById("search-query").innerHTML = search;
        generate_books(dataParse);

        //document.getElementById(bookId).innerHTML = this.responseText;
    }
    xhttp.open("GET", "./scripts/search_books.php?search=" + search, true);
    xhttp.send();
}

function generate_books(dataArray){

    var node = document.getElementById("search-books");
    
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

function searchHandler(){

    let url = document.URL;
    let search = url.split('=').pop()
    search = search.replace(/_/g," ");
    get_search_books(search);

}


searchHandler();
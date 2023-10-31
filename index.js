function set_book_image(title, bookIdImage){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById(bookIdImage).src = this.responseText;
    }
    xhttp.open("GET", "./get_book_image.php?title=" + title, true);
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

set_featured_images();
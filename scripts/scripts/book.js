import { addItem } from "./cart.js";
import { getLoggedUser, getUserList } from "./user.js";

let url = document.URL;
let bookisbn = url.split('?').pop();
bookisbn = bookisbn.replace(/_/g," ");
let idElement = document.getElementById("book_id");
idElement.value = bookisbn;

function set_book_info(isbn){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
		
	    document.getElementById("book-title").innerHTML = "<img id=\"book-cover\" class=\"book-cover\" src=\"" + dataParse[0].ImagePath + "\" width=\"300\"></img>" + dataParse[0].Title;
       	document.getElementById("book-author").innerHTML = "by: <b> " + dataParse[0].Name + "</b>";
        document.getElementById("book-isbn").innerHTML = "<b>ISBN:</b> " + dataParse[0].ISBN;
        document.getElementById("book-publisher").innerHTML = "<b>Publisher:</b> " + dataParse[0].CompanyName;
        document.getElementById("book-pages").innerHTML = "<b>Pages:</b> " + dataParse[0].Pages;
        
    }
    xhttp.open("GET", "./scripts/get_book_info.php?isbn=" + isbn, true);
    xhttp.send();
}


function page_set(){

    let url = document.URL;
    let book_isbn = url.split('?').pop()
    book_isbn = book_isbn.replace(/_/g," ");
    set_book_info(book_isbn);


}

// create a new user
export function removeItem(currisbn) {

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.status === 200) {
        console.log("response: " + this.responseText);
        }
        }
    request.open("POST", "../scripts/remove_book.php", true);
    var postData = {isbn: currisbn };
    // console.log(JSON.stringify(postData));
    request.send(JSON.stringify(postData));

};

cartForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let quantity = document.getElementById('quantity').value;
    let bookisbn = document.getElementById('book_id').value;

    // console.log("Adding: " + bookisbn + " with quantity: " + quantity);
    addItem(bookisbn, quantity);

});

removeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let bookisbn = document.getElementById('book_id').value;

    console.log("removing: " + bookisbn);
    removeItem(bookisbn);
    // window.location.href = "../index.html";

});


if (getLoggedUser() !== null) {
    document.getElementById("loginButton").style.visibility="hidden";

    getUserList(function(userlist) {

        for(let i = 0; i < userlist.length; i++) {
            // console.log(userlist[i].user_id + " : " + userlist[i].usergroup);
            if (Number(userlist[i].user_id) === Number(getLoggedUser()) && Number(userlist[i].usergroup) === 1) {
                console.log("User is admin");
                document.getElementById("remove-button").style.visibility="visible";
            }
        };
    });

} else {
    document.getElementById("logoutButton").style.visibility="hidden";
}

page_set();
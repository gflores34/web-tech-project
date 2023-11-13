/*
    user = {
        usergroup: int,
        email: string,
        password: string,
        user_id: int,
        first_name: string,
        last_name: string
    };
*/

// sets current user, stores in cookies
export function setUser(user) {
    localStorage.setItem("loggedUser", user);
};

// get currently logged in user
export function getLoggedUser() {
    let user = localStorage.getItem("loggedUser");

    if (user) {
        return user;
    } else {
        return null;
    }

};

// log the user out, goes back to home page
export function logoutUser() {
    localStorage.removeItem("loggedUser");
    window.location.href = "../index.html";
};


// get a user with an email/password
export function getUser(email, password) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	    console.log(dataParse[0].first_name);

        if (dataParse[0] != undefined) {
            return dataParse[0];
        } else {
            return null;
        }
        
    }
    xhttp.open("GET", "../scripts/get_user.php?user_email=" + email + "&user_password=" + password, true);
    xhttp.send();

};

// get the full list of users
export function getUserlist() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	    console.log(dataParse);
        return dataParse;
    }
    xhttp.open("GET", "../scripts/get_users.php?", true);
    xhttp.send();

};

// create a new user
export function createUser(fname, lname, pass, useremail, usergrp) {

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.status === 200) {
        console.log("response: " + this.responseText);
        }
        }
    request.open("POST", "../scripts/create_user.php", true);
    var postData = {firstname: fname, lastname: lname, password: pass, email: useremail, usergroup: usergrp };
    console.log(JSON.stringify(postData));
    request.send(JSON.stringify(postData));

};

// update a user using their user_id
export function updateUser(userid, fname, lname, pass, useremail, usergrp) {

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.status === 200) {
        console.log("response: " + this.responseText);
        }
        }
    request.open("POST", "../scripts/update_user.php", true);
    var postData = {user_id: userid, firstname: fname, lastname: lname, password: pass, email: useremail, usergroup: usergrp };
    console.log(JSON.stringify(postData));
    request.send(JSON.stringify(postData));

};


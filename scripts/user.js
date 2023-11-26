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

// sets current user, stores in localsession
export function setUser(user) {
    localStorage.setItem("persistUser", JSON.stringify(user));
};

// get currently logged in user, returns null if user not logged in
export function getLoggedUser() {
    let user = localStorage.getItem("persistUser");
    // console.log(user);
    if (user !== undefined) {
        return JSON.parse(user);
    } else {
        return null;
    }

};

// log the user out, goes back to home page
export function logoutUser() {
    localStorage.removeItem("persistUser");
};


// get a user with an email/password
export function getUser(email, password) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = this.response;
        var dataParse = JSON.parse(data);
	    console.log(dataParse[0].first_name);
        if (!dataParse[0].user_id) {
            return null;
        } else {
            let user = {
                usergroup: dataParse[0].usergroup,
                email: dataParse[0].email,
                user_id: dataParse[0].user_id,
                first_name: dataParse[0].first_name,
                last_name: dataParse[0].last_name
            }
            console.log(user);
            logoutUser();
            setUser(user);
            return user;
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


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

// note: should use an proper authentication token for a site handling real customer data (i just mimick this with multiplying and dividing by a random number when setting/getting the user)

// sets current user_id, stores in localsession
export function setUser(user) {
    // localStorage.setItem("persistUser", JSON.stringify(user.user_id));
    const d = new Date();
    // expire after 1 week
    d.setTime(d.getTime() + 7*24*60*60*1000);
    document.cookie = "userAuth=" + (user.user_id * 138) + "; expires=" + d.toUTCString + ";path=/"  
};

// get currently logged in user_id, returns null if user not logged in
export function getLoggedUser() {
    // let userid = localStorage.getItem("persistUser");
    let cookie = document.cookie.split(';');
    let name = "userAuth=";

    for(var i=0;i < cookie.length;i++) {
        var c = cookie[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(name) == 0) {
            let id = Number(c.substring(name.length,c.length));
            if (id === 0) {
                return 0;
            } else {
                return id / 138
            }
        };
    }
    return null;

};

// log the user out, goes back to home page
export function logoutUser() {
    // localStorage.removeItem("persistUser");
    document.cookie = "userAuth=;path=/";
};


// get a user with an email/password
export async function getUser(email, password, callback) {
    return new Promise(function (resolve, reject) {
        const xhttp = new XMLHttpRequest();
    
        xhttp.onload = function() {
            if (xhttp.status >= 200 && xhttp.status < 300) {
            var data = this.response;
            var dataParse = JSON.parse(data);
            // console.log(dataParse);
            if (dataParse[0] === undefined || dataParse[0] === null || Object.keys(dataParse[0]).length === 0) {
                callback(null);
            } else {
                let user = {
                    usergroup: dataParse[0].usergroup,
                    email: dataParse[0].email,
                    user_id: dataParse[0].user_id,
                    first_name: dataParse[0].first_name,
                    last_name: dataParse[0].last_name
                }
                // console.log(user);
                logoutUser();
                setUser(user);
                if (callback) callback(user);
            }
        }
        }
        xhttp.open("GET", "../scripts/get_user.php?user_email=" + email + "&user_password=" + password);
        xhttp.send();
    })

};

// get the full list of users
export async function getUserList(callback) {
    return new Promise(function (resolve, reject) {
        const xhttp = new XMLHttpRequest();
    
        xhttp.onload = function() {
            if (xhttp.status >= 200 && xhttp.status < 300) {
            var data = this.response;
            var dataParse = JSON.parse(data);
            // console.log(dataParse);
            if (dataParse === undefined || dataParse === null) {
                callback(null);
            } else {
                if (callback) callback(dataParse);
            }
        }
        }
        xhttp.open("GET", "../scripts/get_users.php");
        xhttp.send();
    })

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
    // console.log(JSON.stringify(postData));
    request.send(JSON.stringify(postData));

};

// update a user using their user_id
export function updateUser(userid, fname, lname, pass, useremail, usergrp) {

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.status === 200 && request.readyState === 4) {
        console.log("response: " + this.responseText);
        }
        }
    request.open("POST", "../scripts/update_user.php", true);
    var postData = {user_id: userid, firstname: fname, lastname: lname, password: pass, email: useremail, usergroup: usergrp };
    console.log(JSON.stringify(postData));
    request.send(JSON.stringify(postData));

};
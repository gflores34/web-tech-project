let registerForm = document.getElementById("registerForm");
let signinForm = document.getElementById("signinForm");
import { createUser, getUser, setUser } from "./user.js";

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let useremail = document.getElementById('register-email');
    let userpassword = document.getElementById('register-password');
    let userfirstname = document.getElementById('register-first_name');
    let userlastname = document.getElementById('register-last_name');
    
    createUser(userfirstname.value, userlastname.value, userpassword.value, useremail.value, 0);

});

signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let useremail = document.getElementById('signin-email');
    let userpassword = document.getElementById('signin-password');
    console.log(useremail.value + " " + userpassword.value);

    let currUser = getUser(useremail.value, userpassword.value);
    console.log(currUser);

    if (currUser != null) {
        setUser(currUser);
    } else {
        // throw error
    }

});

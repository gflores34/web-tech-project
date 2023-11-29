let registerForm = document.getElementById("registerForm");
let signinForm = document.getElementById("signinForm");
let resetPassword = document.getElementById("resetPassword");
import { createUser, getLoggedUser, getUser, setUser, logoutUser } from "./user.js";

logoutUser();

// handle register
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let useremail = document.getElementById('register-email');
    let userpassword = document.getElementById('register-password');
    let userfirstname = document.getElementById('register-first_name');
    let userlastname = document.getElementById('register-last_name');

    createUser(userfirstname.value, userlastname.value, userpassword.value, useremail.value, 0);

    await getUser(useremail.value, userpassword.value, function(user) { 
        if (user === null) {
            // display error
            return;
        } else {
            setUser(user);
            // console.log(user);
            window.location.href = "../index.html";
        }
    })
});

// handle sign in
signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let useremail = document.getElementById('signin-email');
    let userpassword = document.getElementById('signin-password');
    console.log(useremail.value + " " + userpassword.value);

    await getUser(useremail.value, userpassword.value, function(user) { 
        if (user === null) {
            // display error
            document.getElementById("passwordError").style = "color: red; visibility: visible;";
            return;
        } else {
            setUser(user);
            // console.log(user);
            window.location.href = "../index.html";
        }
    })
});

// handle reset password
resetPassword.addEventListener("submit", (e) => {
    e.preventDefault();

    window.location.href = "./resetpassword.html";
});

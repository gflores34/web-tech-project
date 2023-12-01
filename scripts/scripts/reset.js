let resetForm = document.getElementById("resetForm");
import { getUserList, updateUser } from "./user.js";

// handle reset password
resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = document.getElementById('reset-email');
    let lastname = document.getElementById('reset-name');
    let password = document.getElementById('reset-password');
    if (email.value === "" || password.value === "" || lastname.value === "") {
        document.getElementById("formError").style = "color: red; visibility: visible;";
        return;
    }


    await getUserList(function(users) {
        
        if (users === null) {
            // display error
            console.log("error");
            document.getElementById("userError").style = "color: red; visibility: visible;";
            return;
        } else {
            // console.log(users);
            let user = -1;

            for (let i = 0; i < users.length; i++) {
                // console.log(users[i].email, users[i].last_name, email.value, lastname.value);
                if (String(users[i].email) === String(email.value) && String(users[i].last_name) === String(lastname.value)) {
                    user = users[i];
                }
            }

            console.log(user);

            if (user !== -1) {
                // console.log(user.user_id, user.first_name, user.last_name, password.value, user.email, user.usergroup);
                updateUser(user.user_id, user.first_name, user.last_name, password.value, user.email, user.usergroup);
                window.location.href = "../index.html";
            } else {
                // user does not exist
                console.log("user does not exist");
                document.getElementById("userError").style = "color: red; visibility: visible;";
            }

            
        }
    })


});
import { getLoggedUser } from "./user.js";
// returns an array of items
export function getItems() {

    let cartdata = localStorage.getItem("cart");
    return JSON.parse(cartdata);

};

let userid = getLoggedUser();
console.log(userid);
let items = getItems();
console.log(items);
if (userid !== null) {
    // user is logged in
} else {
    // user is not logged in
}


import { getLoggedUser } from "./user.js";

let userid = getLoggedUser();
let items = getItems();
if (userid !== null) {
    // user is logged in
} else {
    // user is not logged in
}

// handle cart logic, display items, route to checkout







// appends an item/quantity
export function addItem(bookisbn, bookquantity) {

    let currcart = localStorage.getItem("cart");
    console.log(currcart);
    
    let item = {
        isbn: bookisbn,
        quantity: bookquantity
    }

    if (currcart === null) {
        currcart = [];
    } else {
        currcart = JSON.parse(currcart);
    }
    currcart.push(item);
    // console.log(getItems());
    localStorage.setItem("cart", JSON.stringify(currcart));

};

// returns an array of items
export function getItems() {

    let cartdata = localStorage.getItem("cart");
    return JSON.parse(cartdata);

};

// removes all items from the cart
export function emptyCart() {

    localStorage.removeItem("cart");

};
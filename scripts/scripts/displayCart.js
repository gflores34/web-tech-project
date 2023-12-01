import { getLoggedUser } from "./user.js";
import { displayItems, getItems, emptyCart } from "./cart.js";
let emptyCartButton = document.getElementById("emptyCartButton");

let items = getItems();

emptyCartButton.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("emptying");
    emptyCart();
    window.location.href = "./cart.html";
});


displayItems(items);

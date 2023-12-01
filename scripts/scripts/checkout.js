import { getItems, displayItems, emptyCart } from "./cart.js";
import { getLoggedUser } from "./user.js";

function displayCartItems() {
    let userid = getLoggedUser();
    let items = getItems();
    let total = 0;

    if (userid !== null) {
        if (items) {
            displayItems(items);

            items.forEach(item => {
                total += (item.SellingPrice || 0) * (item.quantity || 0);
            });
            document.getElementById("cart-total").innerHTML = total.toFixed(2);
        } else {
            console.log("user cart is empty");
        }
    } else {
        console.log("null user");
    }
}

document.getElementById("place-order-btn").addEventListener("click", function (event) {
    event.preventDefault();

    let items = getItems();
    if (items && items.length > 0) {
        updateDatabase(items);
    } else {
        console.log("user cart is empty");
    }
});

function updateDatabase(items) {
    const xhttp = new XMLHttpRequest();
    const url = "../scripts/update_inventory.php";
    
    const queryString = items.map(item => `isbn[]=${item.isbn}&quantity[]=${item.quantity}`).join('&');
    
    xhttp.open("GET", `${url}?${queryString}`, true);

    xhttp.onload = function () {
        console.log(this.responseText);
        if (this.status === 200) {
            // clear user cart on success
            emptyCart();
            // go back to cart or change this if needed
            window.location.href = '/index.html';
        } else {
            console.error('failed to update DB on Place Order:', this.responseText);
        }
    };

    xhttp.send();
}

displayCartItems();
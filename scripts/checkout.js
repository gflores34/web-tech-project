import { getItems, displayItems, emptyCart } from "./cart.js";
import { getLoggedUser } from "./user.js";

let orderForm = document.getElementById("place-order-btn");

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

orderForm.addEventListener("click", function (event) {
    event.preventDefault();

    let items = getItems();
    if (items && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            updateDatabase(items[i]);
            emptyCart();
            window.location.href = "../index.html";
        }
        
    } else {
        console.log("user cart is empty");
    }
});


// update a user using their user_id
export function updateDatabase(item) {

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.status === 200 && request.readyState === 4) {
        console.log("response: " + this.responseText);
        }
        }
    request.open("POST", "../scripts/update_inventory.php", true);
    // console.log(item);
    var postData = {currisbn: item.isbn, quantity: item.quantity };
    console.log(JSON.stringify(postData));
    request.send(JSON.stringify(postData));

};

displayCartItems();
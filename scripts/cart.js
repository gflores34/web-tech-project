
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

export function getItems() {

    let cartdata = localStorage.getItem("cart");
    return JSON.parse(cartdata);

};
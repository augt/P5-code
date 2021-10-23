// retrieve local storage into an array

let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

let arrayQuantities = [];
let arrayItemsPrices =[];
let reducer = (previousValue, currentValue) => previousValue + currentValue;

for (item of arrayProductsInCart){

    let itemTotalPrice = item.price*item.quantity;

    // display of cart products
    const cartContent = `<article class="cart__item" data-id="${item.id}">
        <div class="cart__item__img">
        <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
        <h2>${item.name}</h2>
        <p>${item.color}</p>
        <p>${itemTotalPrice} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;
    document
        .getElementById('cart__items')
        .insertAdjacentHTML('beforeend', cartContent);
 
    //constitue arrays to calculate quantity of items and total price of cart

    arrayQuantities.push(item.quantity);

    arrayItemsPrices.push(itemTotalPrice)

}

//calculate total quantity of items and total price of cart


function displayCartBalance() {
    if (arrayQuantities.length !== 0) {    

        let totalQuantityInCart = arrayQuantities.reduce(reducer);

        document.querySelector("#totalQuantity").innerHTML = totalQuantityInCart;

        let totalPriceOfCart = arrayItemsPrices.reduce(reducer);

        document.querySelector("#totalPrice").innerHTML = totalPriceOfCart;

    } else {
        document.querySelector("#totalQuantity").innerHTML = 0;

        document.querySelector("#totalPrice").innerHTML = 0;
    };
};
displayCartBalance();



// implementing delete button function

let deleteButtonsList = document.querySelectorAll('.deleteItem');

for (let deleteButton of deleteButtonsList) {

    deleteButton.addEventListener('click', function(){

        let parentArticleTag = deleteButton.closest("article");
        let dataID = parentArticleTag.getAttribute("data-id");

        let colorTagParent = deleteButton.closest("article > div");
        let colorTag = colorTagParent.getElementsByTagName("p")[0];

        let productIndex = arrayProductsInCart.findIndex(
            (product) =>
              product.id === dataID && product.color === colorTag.innerHTML
        );

        arrayProductsInCart.pop(productIndex);

        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

        parentArticleTag.remove();

        arrayQuantities.pop(productIndex);
        arrayItemsPrices.pop(productIndex);

        displayCartBalance();
    })
};

// implementing quantity setting button

let quantityButtonsList = document.querySelectorAll('.itemQuantity');


for (let quantityButton of quantityButtonsList){

    quantityButton.addEventListener('change', function(){

        let parentArticleTag = quantityButton.closest("article");
        let dataID = parentArticleTag.getAttribute("data-id");

        let colorTagParent = quantityButton.closest("article > div");
        let colorTag = colorTagParent.getElementsByTagName("p")[0];

        let productIndex = arrayProductsInCart.findIndex(
            (product) =>
              product.id === dataID && product.color === colorTag.innerHTML
        );

        arrayProductsInCart[productIndex].quantity = parseInt(quantityButton.value);

        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

        arrayQuantities[productIndex] = parseInt(quantityButton.value);
        arrayItemsPrices[productIndex] = parseInt(quantityButton.value)*arrayProductsInCart[productIndex].price;

        let priceTag = colorTagParent.getElementsByTagName("p")[1];

        priceTag.innerHTML =  `${arrayItemsPrices[productIndex]} €`;

        if (arrayQuantities.length !== 0) {    

            let totalQuantityInCart = arrayQuantities.reduce(reducer);
    
            document.querySelector("#totalQuantity").innerHTML = totalQuantityInCart;
    
            let totalPriceOfCart = arrayItemsPrices.reduce(reducer);
    
            document.querySelector("#totalPrice").innerHTML = totalPriceOfCart;
    
        } else {
            document.querySelector("#totalQuantity").innerHTML = 0;
    
            document.querySelector("#totalPrice").innerHTML = 0;
        };

    })
};




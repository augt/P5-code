// retrieve local storage into an array

let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

let arrayQuantities = [];
let arrayItemsPrices =[];

for (item of arrayProductsInCart){

    let itemTotalPrice = item.price*item.quantity

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
 
    //calculate total quantity of items and total price of cart

    arrayQuantities.push(item.quantity);

    arrayItemsPrices.push(itemTotalPrice)

}


console.log(arrayQuantities);

const reducer = (previousValue, currentValue) => previousValue + currentValue;

let totalQuantityInCart = arrayQuantities.reduce(reducer);

document.querySelector("#totalQuantity").innerHTML = totalQuantityInCart;

let totalPriceOfCart = arrayItemsPrices.reduce(reducer);

document.querySelector("#totalPrice").innerHTML = totalPriceOfCart;

console.log(totalPriceOfCart)







// retrieve local storage into an array

let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

// retrieve data from API for each item of the array

let protocol ="http";
let domain = "localhost:3000";

for (item of arrayProductsInCart){

    let itemID = item.id;
    let itemQuantity = item.quantity;
    let itemColor = item.color;

    fetch( protocol + "://" + domain + "/api/products/" + itemID)
        .catch ((error) => {
            let container = document.querySelector(".cart");
            container.innerHTML = "<p class= error_message> <div> Nous n'avons pas réussi à afficher les articles.<br> <br>Avez-vous bien lancé le serveur local (Port 3000) ? <br><br>Si le problème persiste, contactez-nous. </div></p> <style> .error_message {display : flex; justify-content : center; }</style>";
        })
        .then(function (response) {
        return response.json();
        })
        .then(function(apiResults) {
            let sofa = apiResults;
            
            let altTxt = sofa.altTxt;
            let imageUrl = sofa.imageUrl;
            let name = sofa.name;
            let price = sofa.price;
            let itemTotalPrice = price*itemQuantity;

                    // display of cart products
            const cartContent = `<article class="cart__item" data-id="${itemID}">
                <div class="cart__item__img">
                    <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                <h2>${name}</h2>
                <p>${itemColor}</p>
                <p>${itemTotalPrice} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemQuantity}">
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
            
            
            
        })
}

//calculate total quantity of items
let arrayQuantities = [];

for (let item of arrayProductsInCart){
    let itemQuantity = item.quantity;


    arrayQuantities.push(itemQuantity);
    
        
}
console.log(arrayQuantities);

const reducer = (previousValue, currentValue) => previousValue + currentValue;

let totalQuantityInCart = arrayQuantities.reduce(reducer);

document.querySelector("#totalQuantity").innerHTML = totalQuantityInCart;


//calculate total price of cart

const arrayItemsPrices =[];

for (let item of arrayProductsInCart){
    let itemQuantity = item.quantity;
    let itemID = item.id;

    fetch( protocol + "://" + domain + "/api/products/" + itemID)
        .then(function (response) {
        return response.json();
        })
        .then(function(apiResults) {
            let sofa = apiResults;
            
            let altTxt = sofa.altTxt;
            let imageUrl = sofa.imageUrl;
            let name = sofa.name;
            let price = sofa.price;
            let itemTotalPrice = price*itemQuantity;
            arrayItemsPrices.push(itemTotalPrice);
             
        })
    
}
console.log(arrayItemsPrices);

let totalPriceOfCart = arrayItemsPrices.reduce(reducer);

document.querySelector("#totalPrice").innerHTML = totalPriceOfCart;
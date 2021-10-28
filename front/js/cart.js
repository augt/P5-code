document.title = "Panier";

// retrieve local storage into an array

let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

// declare arrays to calculate total quantity of items and price of cart

let arrayQuantities = [];
let arrayItemsPrices =[];

// display each product in cart
displayCartElements();

function displayCartElements(){

    if (arrayProductsInCart !== null){

        for (let item of arrayProductsInCart){

            let itemTotalPrice = item.price*item.quantity;

            const cartContent = 
                `<article class="cart__item" data-id="${item.id}">
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
        
            // fill in arrays to calculate quantity of items and total price of cart

            arrayQuantities.push(item.quantity);

            arrayItemsPrices.push(itemTotalPrice);

        };
    };
};

//calculate total quantity of items and total price of cart

let reducer = (previousValue, currentValue) => previousValue + currentValue;

displayCartBalance();

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

// implement delete button function

deleteProduct();

function deleteProduct(){

    let deleteButtonsList = document.querySelectorAll('.deleteItem');

    for (let deleteButton of deleteButtonsList) {

        deleteButton.addEventListener('click', function(){

            //target necessary DOM elements

            let parentArticleTag = deleteButton.closest("article");
            let dataID = parentArticleTag.getAttribute("data-id");

            let colorParagraphTagParent = deleteButton.closest("article > div");
            let colorParagraphTag = colorParagraphTagParent.getElementsByTagName("p")[0];

            // remove deleted item from arrays and update local storage

            let productIndex = arrayProductsInCart.findIndex(
                (product) =>
                product.id === dataID && product.color === colorParagraphTag.innerHTML
            );

            arrayProductsInCart.splice(productIndex,1);

            localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

            arrayQuantities.splice(productIndex,1);
            arrayItemsPrices.splice(productIndex,1);

            // update HTML code consequently

            parentArticleTag.remove();

            displayCartBalance();
        })
    };
};

// implement quantity setting button

modifyQuantity();

function modifyQuantity(){

    let quantityButtonsList = document.querySelectorAll('.itemQuantity');


    for (let quantityButton of quantityButtonsList){

        quantityButton.addEventListener('change', function(){

            //target necessary DOM elements

            let parentArticleTag = quantityButton.closest("article");
            let dataID = parentArticleTag.getAttribute("data-id");

            let colorParagraphTagParent = quantityButton.closest("article > div");
            let colorParagraphTag = colorParagraphTagParent.getElementsByTagName("p")[0];

            // modify arrays to update quantities and price

            let productIndex = arrayProductsInCart.findIndex(
                (product) =>
                product.id === dataID && product.color === colorParagraphTag.innerHTML
            );

            arrayProductsInCart[productIndex].quantity = parseInt(quantityButton.value);

            localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

            arrayQuantities[productIndex] = parseInt(quantityButton.value);
            arrayItemsPrices[productIndex] = parseInt(quantityButton.value)*arrayProductsInCart[productIndex].price;

            // update HTML code consequently

            let priceTag = colorParagraphTagParent.getElementsByTagName("p")[1];

            priceTag.innerHTML =  `${arrayItemsPrices[productIndex]} €`;   

            let totalQuantityInCart = arrayQuantities.reduce(reducer);
        
            document.querySelector("#totalQuantity").innerHTML = totalQuantityInCart;
        
            let totalPriceOfCart = arrayItemsPrices.reduce(reducer);
        
            document.querySelector("#totalPrice").innerHTML = totalPriceOfCart;

        })
    };
};

// creating validation functions for each form element

let firstNameInput = document.getElementById("firstName");
let firstNameError = document.getElementById("firstNameErrorMsg");
let lastNameInput = document.getElementById("lastName");
let lastNameError = document.getElementById("lastNameErrorMsg");
let cityInput= document.getElementById("city");
let cityError= document.getElementById("cityErrorMsg");

function verifyInputs(){

    testName(firstNameInput, firstNameError);
    testName(lastNameInput, lastNameError);
    testName(cityInput, cityError);
    testEmail();
    testAdress();
};

// function regarding first name, last name and city inputs
function testName(node, errorNode) {

    if (/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(node.value)) {

        errorNode.innerText = "";

        return true;

    } else {

        errorNode.innerText = "L'élément renseigné n'est pas conforme.";   
    }
};

// regarding email input

let emailInput = document.getElementById("email");
let emailError = document.getElementById("emailErrorMsg")

function testEmail(){
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value)){

        emailError.innerText = "";

        return true;

    } else {

        emailError.innerText = "L'adresse email renseignée est erronée.";

    }
};

// regarding adress input

let addressInput = document.getElementById("address");
let addressError = document.getElementById("addressErrorMsg")

function testAdress(){
    if (/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(addressInput.value)){

        addressError.innerText = "";

        return true;

    } else {

        addressError.innerText = "L'adresse renseignée est erronée.";

    }
};


// sending order

sendOrder();

function sendOrder(){

    let orderButton = document.getElementById("order");

    orderButton.addEventListener("click", function (event){

        event.preventDefault();

        // excecuting each regex verification individually to display error messages if needed

        verifyInputs;

        // verrifying every input and creating data to send order
        if (testName(firstNameInput, firstNameError) && testName(lastNameInput, lastNameError) && testName(cityInput, cityError) && testEmail() && testAdress()) {
            
            let products = [];

            for (let item of JSON.parse(localStorage.getItem("products"))){

                products.push(item.id);

            };

            let orderToSend = {
                contact: {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                address: addressInput.value,
                city: cityInput.value,
                email: emailInput.value,
                },
                products,
            };

            // function to send order to the API

            function send() {
                fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderToSend),
                })
                .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
                })
                .then(function(value) {
                    localStorage.clear();
                    window.location.href = "confirmation.html?id=" + value.orderId;
                });
            };

            send();

        } else{

            console.log("erreur");

        };
    });
};







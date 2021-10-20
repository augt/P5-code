let params = new URL(document.location).searchParams;
let id = params.get("id");

let protocol ="http";
let domain = "localhost:3000";

const productName = document.querySelector("#title");
const price = document.querySelector("#price");
const colorsMenu = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");
const addToCartButton = document.querySelector("#addToCart")

// retrieve product informations and display it on the page

fetch( protocol + "://" + domain + "/api/products/" + id)
  .catch ((error) => {
    let container = document.querySelector(".item");
    container.innerHTML = "<article>Nous n'avons pas réussi à afficher les articles.<br> <br>Avez-vous bien lancé le serveur local (Port 3000) ? <br><br>Si le problème persiste, contactez-nous.</article>";
    })
  .then(function (response) {
    return response.json();
  })
  .then(function(apiResults) {
    const sofa = apiResults;

    document.title = sofa.name;

    let productPicture = document.createElement("img");
    document.querySelector(".item__img").appendChild(productPicture);
    productPicture.setAttribute("src", sofa.imageUrl);

    productName.innerText = sofa.name;

    price.innerText = sofa.price;

    let productDescription = document.querySelector("#description");
    productDescription.innerText = sofa.description;

    let colors= sofa.colors;
    for (let color of colors){

          
      let colorOption = document.createElement("option");
      colorsMenu.appendChild(colorOption);
      colorOption.setAttribute("value", color);
      colorOption.innerText = color;
    };
});


// adding items to local storage




addToCartButton.addEventListener('click', function(){

  if (quantity.value > 0 && colorsMenu.value !== "") {

    let arrayProductsInCart = [];

    let productAdded = {
        id: id,
        quantity: quantity.value,
        color: colorsMenu.value,

    }
    

    if (localStorage.getItem("products") == null){

      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

    } else {
      
      arrayProductsInCart = JSON.parse(localStorage.getItem("products")); 
      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
    };
    
    
    console.log(arrayProductsInCart);
    console.log(localStorage);

  }

  

})











    
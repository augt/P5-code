let params = new URL(document.location).searchParams;
let id = params.get("id");

let protocol ="http";
let domain = "localhost:3000";

const productName = document.querySelector("#title");
const price = document.querySelector("#price");
const colorsMenu = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");
const addToCartButton = document.querySelector("#addToCart")
const productPicture = document.createElement("img");



fetchData();

function fetchData(){

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

      // layout product infos in the DOM

      displayProductInfos();

      function displayProductInfos(){

        document.title = sofa.name;

        
        document.querySelector(".item__img").appendChild(productPicture);
        productPicture.setAttribute("src", sofa.imageUrl);
        productPicture.setAttribute("alt", sofa.altTxt);

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
      };

      // adding items to local storage

      addToCart();

      function addToCart(){

        addToCartButton.addEventListener('click', function(){

          if (quantity.value > 0 && colorsMenu.value !== "") {

            let arrayProductsInCart = [];

            let productAdded = {
              id: id,
              quantity: parseInt(quantity.value),
              color: colorsMenu.value,
              price: sofa.price,
              imageUrl: sofa.imageUrl,
              altTxt: sofa.altTxt,
              name: sofa.name

            };
            
              // if local storage is empty, we set the array in it

            if (localStorage.getItem("products") == null){

              arrayProductsInCart.push(productAdded);
              localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

            } else {

              // if there is already items in the local storage, then we extract the local storage in the array

              arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

              for (let item of arrayProductsInCart){
                item.quantity = parseInt(item.quantity);
              };

              const productIndex = arrayProductsInCart.findIndex(
                (product) =>
                  product.id === productAdded.id && product.color === productAdded.color
              );

              if (productIndex === -1) { // if an identical item isn't already present, then we add the new item to the array
        
                arrayProductsInCart.push(productAdded);
                localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

              } else { // if an identical item is already present in the local storage, then we increment the quantity of said item
                arrayProductsInCart[productIndex].quantity = arrayProductsInCart[productIndex].quantity + productAdded.quantity;
                localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

              };
            };
          }; 
        });
      };
    })
  ;
};














    
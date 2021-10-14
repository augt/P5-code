let params = new URL(document.location).searchParams;
let id = params.get("id");

let protocol ="http";
let domain = "localhost:3000";

fetch( protocol + "://" + domain + "/api/products/" + id)
    .then(function (response) {
      return response.json();
    })
    .then(function(apiResults) {
        const sofa = apiResults;

        document.title = sofa.name;

        let productPicture = document.createElement("img");
        document.querySelector(".item__img").appendChild(productPicture);
        productPicture.setAttribute("src", sofa.imageUrl);

        let productName = document.querySelector("#title");
        productName.innerText = sofa.name;

        let price = document.querySelector("#price");
        price.innerText = sofa.price;

        let productDescription = document.querySelector("#description");
        productDescription.innerText = sofa.description;

        let colors= sofa.colors;
        for (let color of colors){

          let colorsMenu = document.querySelector("#colors");
          let colorOption = document.createElement("option");
          colorsMenu.appendChild(colorOption);
          colorOption.setAttribute("value", color);
          colorOption.innerText = color;

        };



      });

    
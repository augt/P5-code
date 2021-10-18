let protocol ="http";
let domain = "localhost:3000"


fetch( protocol + "://" + domain + "/api/products/")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(apiResults) {
      const sofas = apiResults;
      for (let sofa of sofas) {
        let productCard = document.createElement("a");
        document.querySelector("#items").appendChild(productCard);
        productCard.setAttribute("href", "product.html?id=" + sofa._id);

        let productArticle = document.createElement("article");
        productCard.appendChild(productArticle);

        let productPicture = document.createElement("img");
        productArticle.appendChild(productPicture);
        productPicture.setAttribute("src", sofa.imageUrl);
        productPicture.setAttribute("alt", sofa.altTxt);

        let productTitle = document.createElement("h3");
        productArticle.appendChild(productTitle);
        productTitle.classList.add("productName");
        productTitle.innerText = sofa.name;

        let productDescription= document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerText = sofa.description ;

      }
    })
    .catch(function(err) {
        document
        .getElementById("items")
        .innerText = "Nous n'avons pas réussi à afficher les articles. Avez-vous bien lancé le serveur local (Port 3000) ?";
    });
    

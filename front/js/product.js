let params = new URL(document.location).searchParams;
let id = params.get("id");

fetch("http://localhost:3000/api/products/" + id)
    .then(function (response) {
      return response.json();
    })
    .then(function(apiResults) {
        const sofa = apiResults;
        console.log(sofa);

        document.getElementsByTagName("title").innerText = sofa.name;

        
        let productPicture = document.createElement("img");
        document.querySelector(".items_img").appendChild(productPicture);
        productPicture.setAttribute("src", sofa.imageUrl);
      });

    
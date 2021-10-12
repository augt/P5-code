
fetch("http://localhost:3000/api/products")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      document
          .getElementById("items")
          .innerText = value;
    console.log(value);
    })
    .catch(function(err) {
        document
        .getElementById("items")
        .innerText = "Une erreur est survenue han, revenez plus tard han 🤷";
    });
    

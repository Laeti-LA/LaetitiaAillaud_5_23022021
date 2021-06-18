main() // Main function, dès le chargement de la page 
async function main() {
    const productId = getProductId(); //Etape 1 : récupérer id du produit grâce à son url
    const productData = await getProductData(productId); //Etape 2 : récupérer les données du produit grâce à son id
    displayProductInfo(productData); //Etape 3 : afficher les infos du produit 
    displayProductOptions(productData); //Etape 4 : afficher les options de personnalisation du produit

}

// _______________________ AFFICHAGE DE LA PAGE PRODUIT _______________________

// Fonction pour récupérer l'id du produit dans l'url 
function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}
// Fonction pour récupérer les données des produits 
function getProductData(productId) {
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(productData){
        return productData
    })
    .catch(function(error) {
        alert("Oups... Something went wrong")
    })  
}

// Fonction pour afficher les infos du produit sur la page et dans un objet
function displayProductInfo(productData) {
    //Titre de la page (Modèle + Nom du produit)
    document.getElementById("product__title").textContent = "Modèle " + productData.name;
    //Référence du produit
    document.getElementById("product__id").textContent = "Réf. : " + productData._id;
    //Adresse de l'image du produit
    document.getElementById("product__img").src = productData.imageUrl;
    //Nom du produit
    document.getElementById("product__name").textContent = productData.name; 
    //Prix du produit 
    document.getElementById("product__price").textContent = productData.price/100 + ".00€";
    //Description du produit
    document.getElementById("product__description").textContent = productData.description;

    //_________________________ AJOUT PRODUITS AU PANIER __________________________ 
    // Event listener du bouton "Ajouter au panier"
    const btnAddToCart = document.getElementById("btn_addToCart"); 
    btnAddToCart.addEventListener("click", (event) => {
        event.preventDefault(); // Ne pas actualiser la page lors du clic 

        // Création d'un objet contenant les infos du produit ajouté au panier
        let productToAdd = {
            product_name: productData.name,
            product_id: productData._id,
            product_price: productData.price / 100,
            /* TO DO!!! Ajouter une paire pour la quantité 
            (avant : créer une variable pour récupérer la valeur de la quantité choisie par l'utilisateur) */
        }
        
        let cartProduct = JSON.parse(localStorage.getItem("cart"));
        // Si des produits sont déjà présents dans le panier 
        if(cartProduct) {
            cartProduct.push(productToAdd);
            localStorage.setItem("cart", JSON.stringify(cartProduct));
            console.log(productToAdd); 
            /* TO DO!!! Ajouter un if/else selon que l'article déjà présent a la même id ou pas pour juste changer la quantité */

        // Si le panier est vide 
        } else {
            // Création d'un tableau (vide)
            cartProduct = [];
            cartProduct.push(productToAdd);
            localStorage.setItem("cart", JSON.stringify(cartProduct));
        }

        

})

}

// Fonction pour récupérer et afficher les options de personnalisation 
function displayProductOptions(productData) {
    productData.lenses.forEach(lens => {
        let productOption = document.createElement("option");
        document.getElementById("product__option--selector").appendChild(productOption).innerHTML = lens;
    });
}











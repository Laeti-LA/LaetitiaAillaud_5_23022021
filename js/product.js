main() // Main function, dès le chargement de la page 
async function main() {
    const productId = getProductId()
    const productData = await getProductData(productId)
    displayProductInfo(productData);
}

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
        alert(error)
    })  
}

// Fonction pour afficher les infos du produit 
function displayProductInfo(productData) {
    //Titre de la page (Modèle + Nom du produit)
    document.getElementById("product__title").textContent = "Modèle " + productData.name 
    //Référence du produit
    document.getElementById("product__id").textContent = "Réf. : " + productData._id 
    //Adresse de l'image du produit
    document.getElementById("product__img").src = productData.imageUrl 
    //Nom du produit
    document.getElementById("product__name").textContent = productData.name 
    //Prix du produit (à transformer en nombre/devise!!!)
    document.getElementById("product__price").textContent = productData.price/100 + ".00€" 
    //Description du produit
    document.getElementById("product__description").textContent = productData.description 
    //Options de personnalisation
    document.getElementById("product__option--one").textContent = productData.lenses[0]
    document.getElementById("product__option--two").textContent = productData.lenses[1]
    document.getElementById("product__option--three").textContent = productData.lenses[2]
    
}


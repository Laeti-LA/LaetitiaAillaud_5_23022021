// Récupérer ID produit dans l'URL 
let params = (new URL(document.location)).searchParams;
let productId = params.get('id'); 


// Fonction pour récupérer les données des produits : 
function getProductInfo() {
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json();
        })
        .then((productInfo) => productInfo)
}

function displayProductInfo() {
    document.getElementById("product__id") = productId //Id du produit
    document.getElementById("product__img").src = product.imageUrl //Image du produit
    document.getElementById("product__name").textContent = product.name //Nom du produit 
    document.getElementById("product__price").textContent = product.price/100 + ".00€" //Prix du produit
}
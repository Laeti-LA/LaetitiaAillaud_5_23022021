main() // Main function, dès le chargement de la page 
async function main() {
    const products = await getProducts() //Récupération des produits 

    for (product of products) { //Boucle pour afficher autant de produits qu'il y en a dans l'API
        displayProduct(product) //Affichage des produits 
    }
}

// Fonction pour récupérer les produits : 
function getProducts() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products){
            return products
        })
        .catch(function(error) {
            alert(error)
        })      
}

// Fonction pour afficher les infos des produits : 
function displayProduct(product) {
    const templateElt = document.getElementById("templateProduct")
    const cloneElt = document.importNode(templateElt.content, true) 

    //URL de la fiche produit correspondante (doit contenir l'id après un "?" pour récupérer et afficher les infos dans la page produit)
    cloneElt.getElementById("card__link").href = `pages/products.html?id=${product._id}` 
    //Adresse de l'image du produit
    cloneElt.getElementById("card__img").src = product.imageUrl 
    //Nom du produit
    cloneElt.getElementById("card__name").textContent = product.name 
    //Prix du produit 
    cloneElt.getElementById("card__price").textContent = product.price/100 + ".00€" //Prix du produit

    document.getElementById("productList").appendChild(cloneElt)
}
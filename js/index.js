main() // Main function, dès le chargement de la page 
async function main() {
    closePopupAbout();
    const products = await getProducts(); //Etape 1 : récupérer les données des produits 

    for (product of products) { //Etape 2 : afficher autant de produits qu'il y en a dans l'API (avec une boucle)
        displayProduct(product); 
    }
}

// Fonction pour masquer la popup A propos du footer
function closePopupAbout(){
    document.getElementById("popupAbout").style.display="none";
}


// Fonction pour récupérer les produits
function getProducts() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products){
            return products
        })
        .catch(function(error) {
            alert("Oups... Something went wrong")
        })      
}

// Fonction pour afficher les infos des produits 
function displayProduct(product) {
    // Structure HTML
    let productLink = document.createElement("a")
    let productCard = document.createElement("figure")
    let productCardTop = document.createElement("div")
    let productImg = document.createElement("img")
    let productCardLegend = document.createElement("figcaption")
    let productName = document.createElement("h3")
    let productPrice = document.createElement("p")

    // Attributs des éléments HTML
    productLink.setAttribute("class", "card__link")
    productLink.setAttribute("href", "pages/products.html?id=" + product._id)
    productCard.setAttribute("class", "product-card")
    productCardTop.setAttribute("class", "card__top")
    productImg.setAttribute("class", "card__img")
    productImg.setAttribute("src", product.imageUrl)
    productImg.setAttribute("alt", "photo de " + product.name)
    productCardLegend.setAttribute("class", "card__legend")
    productName.setAttribute("class", "card__name")
    productPrice.setAttribute("class", "card__price")

    // Hierarchie des éléments HTML
    document.getElementById("productList").appendChild(productLink)
    productLink.appendChild(productCard)
    productCard.appendChild(productCardTop)
    productCardTop.appendChild(productImg)
    productCard.appendChild(productCardLegend)
    productCardLegend.appendChild(productName)
    productCardLegend.appendChild(productPrice)

    // Ajout de contenu texte selon données récupérées 
    productName.textContent = product.name
    productPrice.textContent = product.price/100 + ".00€" 

}

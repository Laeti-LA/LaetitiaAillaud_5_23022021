// Variable avec les clés/valeurs du localStorage
let cartProduct = JSON.parse(localStorage.getItem("cart"));

// Si le panier est vide, affichage d'un message 
if(cartProduct === null) {
    const emptyCart = document.createElement("h1");
    emptyCart.textContent = "Votre panier est vide.";
    emptyCart.className = "cart__title";
    document.getElementById("cart__mainContainer").appendChild(emptyCart);

    const linkBtn = document.createElement("a");
    linkBtn.href = "../index.html";
    document.getElementById("cart__mainContainer").appendChild(linkBtn); 

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Continuer mon shopping";
    addToCartBtn.className = "addToCart__btn";
    linkBtn.appendChild(addToCartBtn); 
}else{
    // Si le panier n'est pas vide, affichage des es nom, qté et prix pour chaque article du localStorage
    for (productAdded of cartProduct){
        displayCartProduct(productAdded);
    }

    // Fonction pour créer les élements HTML et afficher les nom, qté et prix pour chaque article du localStorage
    function displayCartProduct(productAdded) {
        let productToPurchase = document.createElement("li");
        productToPurchase.className = "product__toPurchase";
        document.getElementById("cart__list").appendChild(productToPurchase);
        console.log(productAdded); 

        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-times";
        productToPurchase.appendChild(deleteIcon);

        let productToPurchaseName = document.createElement("p");
        productToPurchaseName.className = "product__name"
        productToPurchaseName.textContent = productAdded.product_name;
        productToPurchase.appendChild(productToPurchaseName);

        let productToPurchasePrice = document.createElement("p");
        productToPurchasePrice.className = "product__price"
        productToPurchasePrice.textContent = productAdded.product_price + ".00€";
        productToPurchase.appendChild(productToPurchasePrice);

        let productToPurchaseQty = document.createElement("p");
        productToPurchaseQty.className = "product__newPrice"
        productToPurchaseQty.textContent = productAdded.product_qty;
        productToPurchase.appendChild(productToPurchaseQty);

        let productToPurchaseNewPrice = document.createElement("p");
        productToPurchaseNewPrice.className = "product__newPrice"
        productToPurchaseNewPrice.textContent = productAdded.product_newPrice + ".00€";
        productToPurchase.appendChild(productToPurchaseNewPrice);
    } 
   
}
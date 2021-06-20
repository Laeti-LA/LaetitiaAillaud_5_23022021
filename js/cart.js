// Variable avec les clés/valeurs du localStorage
let cartProduct = JSON.parse(localStorage.getItem("cart"));

// Fonction pour afficher un message "panier vide" quand le localStorage est vide
function displayEmptyCartMsg(){
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
}

// Si le panier est vide, affichage d'un message 
if(cartProduct === null || cartProduct == 0) {
    displayEmptyCartMsg();
}else{
    // Si le panier n'est pas vide, affichage des es nom, qté et prix pour chaque article du localStorage
    for (let i = 0; i<cartProduct.length; i++) {

        // Pour chaque produit présent dans le localStorage : 
        // Création d'une ligne  
        let productToPurchase = document.createElement("li");
        productToPurchase.className = "product__toPurchase";
        document.getElementById("cart__list").appendChild(productToPurchase);

        // Création d'un bouton supprimer
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete__btn";
        productToPurchase.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", (event) => {
            event.preventDefault();
            // Retrait de l'article et mise à jour du localStorage
            cartProduct.splice([i], 1);
            localStorage.setItem("cart", JSON.stringify(cartProduct));
            // Annulation de l'affichage de l'article supprimé par l'utilsateur sans avoir besoin de raffraichir la page
            productToPurchase.style.display='none';
        });
        
        // Création d'une icone croix dans le bouton supprimer
        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-times";
        deleteBtn.appendChild(deleteIcon);

        // Ajout de l'image du produit
        let productToPurchaseImg = document.createElement("img");
        productToPurchaseImg.className = "cartProduct__img";
        productToPurchaseImg.src = cartProduct[i].product_img;
        productToPurchase.appendChild(productToPurchaseImg);

        // Affichage du nom du produit
        let productToPurchaseName = document.createElement("p");
        productToPurchaseName.className = "cartProduct__name"
        productToPurchaseName.textContent = cartProduct[i].product_name;
        productToPurchase.appendChild(productToPurchaseName);

        // Affichage du prix du produit
        let productToPurchasePrice = document.createElement("p");
        productToPurchasePrice.className = "cartProduct__price"
        productToPurchasePrice.textContent = cartProduct[i].product_price + ".00€";
        productToPurchase.appendChild(productToPurchasePrice);

        // Création d'un bouton "-" pour réduire la quantité
        let qtyMinus = document.createElement("button");
        qtyMinus.className = "qty__minus"
        qtyMinus.textContent = "-";
        productToPurchase.appendChild(qtyMinus);
        qtyMinus.addEventListener('click', event => {
            event.preventDefault();
            // Si quantité actuelle = 1, supprimer la ligne/retirer le produit du panier et le localStorage
            if(parseInt(cartProduct[i].product_qty) === 1){
                cartProduct.splice([i], 1);
                localStorage.setItem("cart", JSON.stringify(cartProduct));
            // Annulation de l'affichage de l'article supprimé par l'utilsateur
                productToPurchase.style.display='none';
                cartTotalPrice.style.display='none';
                displayEmptyCartMsg();
                
            // Si quantité actuelle > 1, mettre à jour la quantité dans le panier et le localStorage
            }else{
                cartProduct[i].product_qty--;
                localStorage.setItem('cart', JSON.stringify(cartProduct));
                window.location.reload();
            }
        })

        // Affichage de la quantité 
        let productToPurchaseQty = document.createElement("p");
        productToPurchaseQty.className = "cartProduct__qty";
        productToPurchaseQty.textContent = parseInt(cartProduct[i].product_qty);
        productToPurchase.appendChild(productToPurchaseQty);

        // Création d'un bouton "+" pour augmenter la quantité
        let qtyPlus = document.createElement("button");
        qtyPlus.className = "qty__plus"
        qtyPlus.textContent = "+";
        productToPurchase.appendChild(qtyPlus);
        qtyPlus.addEventListener('click', event => {
            event.preventDefault();
            cartProduct[i].product_qty++;
            localStorage.setItem('cart', JSON.stringify(cartProduct));
            window.location.reload();
        })

        // Calcul du prix 
        let productToPurchaseNewPrice = document.createElement("p");
        productToPurchaseNewPrice.className = "cartProduct__newPrice"
        productToPurchaseNewPrice.textContent = (parseInt(cartProduct[i].product_qty) * (cartProduct[i].product_price)) + ".00€";
        productToPurchase.appendChild(productToPurchaseNewPrice);
    }

    // Calcul du prix total de la commande 
    let cartTotalPrice = document.createElement("p");
        cartTotalPrice.className = "cart__total"
        cartTotalPrice.textContent = "Total : "+".00€"; // Ajouter montant total commande !!!!!!!!!!!!!!!!
        document.getElementById("cart__totalPrice").appendChild(cartTotalPrice);

   
}

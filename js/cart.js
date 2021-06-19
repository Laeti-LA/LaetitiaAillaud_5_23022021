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

    let cartTotalPrice = document.createElement("p");
        cartTotalPrice.className = "cart__total"
        cartTotalPrice.textContent = "Total : .00€"; // Ajouter montant total commande !!!!!!!!!!!!!!!!
        document.getElementById("cart__totalPrice").appendChild(cartTotalPrice);


    // Fonction pour créer les élements HTML et afficher les nom, qté et prix pour chaque article du localStorage
    function displayCartProduct(productAdded) {
        let productToPurchase = document.createElement("li");
        productToPurchase.className = "product__toPurchase";
        document.getElementById("cart__list").appendChild(productToPurchase);

        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-times";
        productToPurchase.appendChild(deleteIcon);

        let productToPurchaseImg = document.createElement("img");
        productToPurchaseImg.className = "cartProduct__img";
        productToPurchaseImg.src = productAdded.product_img;
        productToPurchase.appendChild(productToPurchaseImg);

        let productToPurchaseName = document.createElement("p");
        productToPurchaseName.className = "cartProduct__name"
        productToPurchaseName.textContent = productAdded.product_name;
        productToPurchase.appendChild(productToPurchaseName);

        let productToPurchasePrice = document.createElement("p");
        productToPurchasePrice.className = "cartProduct__price"
        productToPurchasePrice.textContent = productAdded.product_price + ".00€";
        productToPurchase.appendChild(productToPurchasePrice);

        let qtyMinus = document.createElement("button");
        qtyMinus.className = "qty__minus"
        qtyMinus.textContent = "-";
        productToPurchase.appendChild(qtyMinus);
        qtyMinus.addEventListener('click', event => {
            event.preventDefault();
            // Si quantité actuelle = 1, supprimer la ligne/retirer le produit du panier et le localStorage
            if(parseInt(productAdded.product_qty) === 1){
                productToPurchase.style.display='none';
            // Si quantité actuelle > 1, mettre à jour la quantité dans le panier et le localStorage
            }else{
                let newQty = parseInt(productAdded.product_qty-=1);
                productToPurchaseQty.textContent = newQty;
            }
        })

        let productToPurchaseQty = document.createElement("p");
        productToPurchaseQty.className = "cartProduct__qty";
        productToPurchaseQty.textContent = parseInt(productAdded.product_qty);
        productToPurchase.appendChild(productToPurchaseQty);

        let qtyPlus = document.createElement("button");
        qtyPlus.className = "qty__plus"
        qtyPlus.textContent = "+";
        productToPurchase.appendChild(qtyPlus);
        qtyPlus.addEventListener('click', event => {
            event.preventDefault();
            newQty = parseInt(productAdded.product_qty+=1);
            productToPurchaseQty.textContent = newQty;
        })

        let productToPurchaseNewPrice = document.createElement("p");
        productToPurchaseNewPrice.className = "cartProduct__newPrice"
        productToPurchaseNewPrice.textContent = productAdded.product_newPrice + ".00€";
        productToPurchase.appendChild(productToPurchaseNewPrice);
    } 
   
}
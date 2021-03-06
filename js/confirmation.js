main() // Main function, dès le chargement de la page 
async function main() {
    closePopupAbout();
    // Etape 1 : récupérer les données de la commande  
    const contactOrder = JSON.parse(localStorage.getItem("orderContact"));
    const idOrder = getOrderId();
    // Pour connaitre les quantités pour chaque produit (et calculer/afficher le prix total)
    let orderProducts = JSON.parse(localStorage.getItem("previousCart"));
    // Etape 2 : afficher les infos de la commande 
    displayOrderContact(contactOrder);
    displayOrderId(idOrder);
    calculateOrderPrice(orderProducts);
    displayOrderProducts(orderProducts);
    displayDeliveryDetails(contactOrder);
    terminateOrder();
} 

// Fonction pour masquer la popup A propos du footer
function closePopupAbout(){
    document.getElementById("popupAbout").style.display="none";
}

// Fonction pour récupérer l'id de la commande dans l'url de la page
function getOrderId() {
    return new URL(window.location.href).searchParams.get('orderId');
}

// Fonction pour afficher les nom et prénom de l'auteur de la commande dans le message de remerciement 
function displayOrderContact(contactOrder) {
    document.getElementById("fistNameContent").textContent = contactOrder.firstName;
    document.getElementById("lastNameContent").textContent = " " + contactOrder.lastName;
}

// Fonction pour afficher l'id de la commande dans le message de remerciement 
function displayOrderId(idOrder) {
    document.getElementById("orderIdContent").textContent = idOrder;
}

// Fonction pour afficher les produits commandés dans le récapitulatif de la commande 
function displayOrderProducts(orderProducts) {
    // Affichage des produits achetés 
    for (let i = 0; i<orderProducts.length; i++) {

        // Pour chaque produit acheté (source = loaclStorage car seulement les id ont été envoyées au serveur, pas les quantité) : 
        // Création d'une ligne  
        let purchasedProduct = document.createElement("li");
        purchasedProduct.className = "product__purchased";
        document.getElementById("orderDetails__info").appendChild(purchasedProduct);

        // Ajout de l'image du produit
        let purchasedProductImg = document.createElement("img");
        purchasedProductImg.className = "purchasedProduct__img";
        purchasedProductImg.src = orderProducts[i].product_img;
        purchasedProduct.appendChild(purchasedProductImg);

        // Affichage du nom du produit
        let PurchasedProductName = document.createElement("p");
        PurchasedProductName.className = "purchasedProduct__name"
        PurchasedProductName.textContent = orderProducts[i].product_name;
        purchasedProduct.appendChild(PurchasedProductName);

        // Affichage de la quantité 
        let PurchasedProductQty = document.createElement("p");
        PurchasedProductQty.className = "purchasedProduct__qty";
        PurchasedProductQty.textContent = "Qté: " + parseInt(orderProducts[i].product_qty);
        purchasedProduct.appendChild(PurchasedProductQty);

        // Calcul du prix total par référence
        let PurchasedProductTotalPrice = document.createElement("p");
        PurchasedProductTotalPrice.className = "purchasedProduct__newPrice"
        PurchasedProductTotalPrice.textContent = (parseInt(orderProducts[i].product_qty) * (orderProducts[i].product_price)) + ".00€";
        purchasedProduct.appendChild(PurchasedProductTotalPrice);
    }
}

// Fonction pour calculer et afficher le montant total de la commande 
function calculateOrderPrice(orderProducts){
    // Calcul et affichage du prix total de la commande 
    let orderTotalPrice = 0;
    for (let m in orderProducts) {
        orderTotalPrice += (parseInt(orderProducts[m].product_qty) * (orderProducts[m].product_price));
    }

    let orderTotal = document.getElementById("orderDetails__totalPrice");
    orderTotal.textContent = "Total : "+ orderTotalPrice + ".00€"; 

    let orderTotal2 = document.getElementById("orderPriceContent");
    orderTotal2.textContent = orderTotalPrice + ".00€"; 
}

// Fonction pour afficher l'adresse de livraison dans le récapitulatif de la commande 
function displayDeliveryDetails(contactOrder) {
    // Affichage de l'adresse de livraison 
    document.getElementById("contact__firstName").textContent = contactOrder.firstName + " ";
    document.getElementById("contact__lastName").textContent = contactOrder.lastName;
    document.getElementById("contact__address").textContent = contactOrder.address;
    document.getElementById("contact__city").textContent = contactOrder.city;
}

// Fonction pour vider le localStorage lorsque l'utilisateur quitte la page de confirmation de commande 
function clearLocalStorage(){
    localStorage.clear();
}

function terminateOrder(){
    let endOfOrderCta = document.getElementById("endOfOrder__btn");
    endOfOrderCta.addEventListener('click', () =>{
        clearLocalStorage();
    })

    let returnHomeCta = document.getElementById("returnHome");
    returnHomeCta.addEventListener('click', () =>{
        clearLocalStorage();
    })

    let returnCart = document.getElementById("returnCart");
    returnCart.addEventListener('click', () =>{
        clearLocalStorage();
    })
}


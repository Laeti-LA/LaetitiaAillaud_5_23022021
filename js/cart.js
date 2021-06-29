main() // Main function, dès le chargement de la page 
async function main() {
    // Etape 1 : récupérer avec les données du localStorage
    let cartProduct = JSON.parse(localStorage.getItem("cart"));
    // Etape 2 : afficher les éléments sur la page
    displayCartElements(cartProduct);
    closePopupAbout();
} 


// _______________________ AFFICHAGE DE LA PAGE PANIER _______________________

// Fonction pour masquer la popup A propos du footer
function closePopupAbout(){
    document.getElementById("popupAbout").style.display="none";
}

function displayCartElements(cartProduct){
    // Si le panier est vide, affichage d'un message 
if(cartProduct === null || cartProduct == 0) {
    // Message panier vide 
    const emptyCart = document.createElement("h2");
    emptyCart.textContent = "Votre panier est vide.";
    emptyCart.className = "cart__title";
    document.getElementById("cartContent").appendChild(emptyCart);

    // Bouton retour accueil
    const linkBtn = document.createElement("a");
    linkBtn.href = "../index.html";
    document.getElementById("cart__mainContainer").appendChild(linkBtn); 

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Continuer mon shopping";
    addToCartBtn.className = "cta__btn";
    linkBtn.appendChild(addToCartBtn); 
}else{
    // Si le panier n'est pas vide, affichage image, nom, qté et prix pour chaque article du localStorage
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
        deleteIcon.className = "fas fa-times delete_icon";
        deleteBtn.appendChild(deleteIcon);

        // Ajout de l'image du produit
        let productToPurchaseImg = document.createElement("img");
        productToPurchaseImg.className = "cartProduct__img";
        productToPurchaseImg.src = cartProduct[i].product_img;
        productToPurchase.appendChild(productToPurchaseImg);
        productToPurchaseImg.addEventListener('click', () =>{
            window.location = '../pages/products.html?id=' + cartProduct[i].product_id;
        })

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
    let orderPrice = 0;
    for (let j in cartProduct) {
        orderPrice += (parseInt(cartProduct[j].product_qty) * (cartProduct[j].product_price));
    }

    // Affichage du montant total de la commande 
    let cartTotalPrice = document.createElement("p");
    cartTotalPrice.className = "cart__total bold"
    cartTotalPrice.textContent = "Total : "+ orderPrice + ".00€"; 
    document.getElementById("cart__totalPrice").appendChild(cartTotalPrice);

    // Calcul du nombre d'articles dans le panier 
    let orderQty = 0;
    for (let k in cartProduct) {
        orderQty += cartProduct[k].product_qty;
    }

    let orderQtyDisplay = document.getElementById("cartProductsQty");
    orderQtyDisplay.textContent = "Votre panier contient " + orderQty + " article(s)"; 

    let orderQtyDisplayIcon = document.getElementById("product__nb");
    orderQtyDisplayIcon.textContent = "(" + orderQty + ")"; 

    // Bouton pour valider la panier et afficher le formulaire 
    let cartCtaBtn = document.createElement("button");
    cartCtaBtn.className = "cartBtn";
    cartCtaBtn.textContent = "Valider le panier";
    document.getElementById("cart__ctaBtn").appendChild(cartCtaBtn);
    cartCtaBtn.addEventListener('click', event => {
        event.preventDefault();
        // Créer/Afficher section 2 formulaire 
        cartCtaBtn.style.display = "none";
        let formTitle = document.createElement("h2");
        formTitle.className = "formContent__title";
        formTitle.textContent = "Vos coordonnées"; 
        document.getElementById("formContent").appendChild(formTitle);

        // ------------------------------ Formulaire contact ------------------------------
        let orderForm = document.createElement("form");
        orderForm.className = "order__form";
        orderForm.innerHTML = `
            <form class="order__form" id="order__form">
                <div class="orderForm orderForm--firstName">
                    <label class="formLabel formLabel--firstName">Prénom</label>
                    <input class="formInput formInput--firstName" type="text" id="firstName" name="firstName" required>
                </div>
                <div class="orderForm orderForm--lastName">
                    <label class="formLabel formLabel--lastName">Nom</label>
                    <input class="formInput formInput--lastName" type="text" id="lastName" name="lastName" required>
                </div>
                <div class="orderForm orderForm--address">
                    <label class="formLabel formLabel--address">Adresse</label>
                    <input class="formInput formInput--address" type="text" id="address" name="address" required>
                </div>
                <div class="orderForm  orderForm--zipCode">
                    <label class="formLabel formLabel--zipCode">Code postal</label>
                    <input class="formInput formInput--zipCode" type="number" id="zipCode" name="zipCode">
                </div>
                <div class="orderForm orderForm--city">
                    <label class="formLabel formLabel--city">Ville</label>
                    <input class="formInput formInput--city" type="text" id="city" name="city" required>
                </div>
                <div class="orderForm orderForm--email">
                    <label class="formLabel formLabel--email">Email</label>
                    <input class="formInput formInput--email" type="email" id="email" name="email" required>
                </div>
            </form>
        `;
        document.getElementById("formContent").appendChild(orderForm);

        // --------------------- VERIFICATION DES DONNEES DU FORMULAIRE --------------------- 

        // Vérification du champ prénom/firstName une fois qu'il est rempli
        document.getElementById("firstName").addEventListener("change", event => {
            checkFirstName();
        })

        // Vérification du champ nom/lastName une fois qu'il est rempli
        document.getElementById("lastName").addEventListener("change", event => {
            checkLastName();
        })

        // Vérification du champ ville/city une fois qu'il est rempli
        document.getElementById("city").addEventListener("change", event => {
            checkCity();
        })

        // Vérification du champ email une fois qu'il est rempli
        document.getElementById("email").addEventListener("change", event => {
            checkEmail();
        })

        // Vérification du champ adresse une fois qu'il est rempli
        document.getElementById("address").addEventListener("change", event => {
            checkAddress();
        })

        // Vérification du champ adresse une fois qu'il est rempli
        document.getElementById("zipCode").addEventListener("change", event => {
            checkZipCode();
        })

        // ----- Fonctions RegEx ---------------------------------
        // Fonction regEx prénom/nom
        function regExName(value){
            return /^[A-ZZa-z]{2,20}$/.test(value);
        };

        // Fonction regEx email
        function regExEmail(value){
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        };

        // Fonction regEx adresse
        function regExAddress(value){
            return /^[A-Za-z0-9\s'-]{4,40}$/.test(value);
        };

        // Fonction regEx code postal
        function regExZipCode(value){
            return /^[0-9]{5}$/.test(value);
        };

        // Fonction regEx ville
        function regExCity(value){
            return /^[A-Za-z\s'-]{3,20}$/.test(value);
        };

        // ----- Fonctions pour vérifier les champs -------------- 
        // Fonction pour vérifier le champ prénom/firstName 
        function checkFirstName(){
            const firstNameCheck = document.getElementById("firstName").value;
            if(regExName(firstNameCheck)){
                document.getElementById("firstName").style.border='1px solid green';
                return true;
            }else{  
                document.getElementById("firstName").style.border='2px solid red';
                return false;
            }
        }

        // Fonction pour vérifier le champ nom/lastName 
        function checkLastName(){
            const LastNameCheck = document.getElementById("lastName").value;
            if(regExName(LastNameCheck)){
                document.getElementById("lastName").style.border='1px solid green';
                return true;
            }else{  
                document.getElementById("lastName").style.border='2px solid red';
                return false;
            }
        }
      
        // Fonction pour vérifier le champ email
        function checkEmail(){
            const emailCheck = document.getElementById("email").value;
            if(regExEmail(emailCheck)){
                document.getElementById("email").style.border='1px solid green';
                return true;
            }else{  
                document.getElementById("email").style.border='2px solid red';
                return false;
            }
        }

        // Fonction pour vérifier le champ adresse postale/address 
        function checkAddress(){
            const addressCheck = document.getElementById("address").value;
            if(regExAddress(addressCheck)){
                document.getElementById("address").style.border='1px solid green';
                return true;
            }else{  
                document.getElementById("address").style.border='2px solid red';
                return false;
            }
        }

        // Fonction pour vérifier le champ ville/city 
        function checkCity(){
            const cityCheck = document.getElementById("city").value;
            if(regExCity(cityCheck)){
                document.getElementById("city").style.border='1px solid green';
                return true;
            }else{  
                document.getElementById("city").style.border='2px solid red';
                return false;
            }
        }

        // Fonction pour vérifier le champ code postal/zip code
        function checkZipCode(){
            const zipCodeCheck = document.getElementById("zipCode").value;
            if(regExZipCode(zipCodeCheck)){
                document.getElementById("zipCode").style.border='1px solid green';
                return true;
            }else{  
                document.getElementById("zipCode").style.border='2px solid red';
                return false;
            }
        }
        

        // ------------------- Fin vérification des données du formulaire ------------------- 


        // -----------------------------BOUTON VALIDER COMMANDE ---------------------------- 
        let validateOrderBtn = document.createElement("input");
        validateOrderBtn.type = "submit";
        validateOrderBtn.className = "cta__btn validateOrder__btn";
        validateOrderBtn.id = "validateOrder__btn";
        validateOrderBtn.value = "Valider la commande"; 
        document.getElementById("formContent").appendChild(validateOrderBtn);
        // Ajout d'un addEventListener au clic sur le bouton de validation de la commande 
        validateOrderBtn.addEventListener('click', (event) =>{
            event.preventDefault();
            // Si champs du formulaire correctement remplis : 
            if(checkFirstName() && checkLastName() && checkCity() && checkAddress() && checkEmail()){
                // Création d'un objet contact avec les infos de l'utilisateur nécessaires pour passer la commande 
                const contact = {
                    firstName : document.getElementById("firstName").value,
                    lastName : document.getElementById("lastName").value,
                    email: document.getElementById("email").value,
                    address : document.getElementById("address").value,
                    city : document.getElementById("city").value
                };
    
                // Ajout objet contact au localStorage 
                localStorage.setItem("contact", JSON.stringify(contact));
    
                // Création d'un tableau avec les id des produits du panier 
                let products = [];
                for (let l = 0; l < cartProduct.length; l++) {
                    let product = cartProduct[l];
                    let id = product.product_id;
                    products.push(id);
                }
    
                // Création d'un objet contenant l'objet contact + le tableau de produits 
                const order = {
                    contact,
                    products,
                };
    
                // Envoi des données de la commande (objet orderData) vers le serveur 
                  fetch(`http://localhost:3000/api/cameras/order`, {
                    method: 'POST',
                    body: JSON.stringify(order),
                    headers: { 'Content-Type': 'application/json' }
                  })
                    .then((response) => response.json())
                    .then((json) => {
                        window.location.href = `confirmation.html?orderId=${json.orderId}`;
                    })
                    .catch(() => {
                      alert("Oups... something went wrong")
                    })
            // Si champs du formulaire mal remplis : 
            }else{
                document.getElementById("formPopupContainer").style.display='flex';
                let closePopup = document.getElementById("closeFormPopup_icone");
                closePopup.addEventListener('click', (event) => {
                    event.preventDefault();
                    document.getElementById("formPopupContainer").style.display='none';
                })
            }

        }) // --------------- Fin AddEventListener du bouton valider commande -------------
    })

}
}





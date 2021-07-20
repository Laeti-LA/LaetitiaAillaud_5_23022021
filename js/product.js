main() // Main function, dès le chargement de la page 
async function main() {
    closePopupContainer();
    //Etape 1 : récupérer id du produit grâce à son url
    const productId = getProductId(); 
    //Etape 2 : récupérer les données du produit grâce à son id
    const productData = await getProductData(productId); 
}

// ______________ FERMETURE DE LA POPUP "produit ajouté au panier" ______________

// Fonction pour masquer la popup produit ajouté au panier
function closePopupContainer() {
    document.getElementById("popupContainer").style.display = "none";
}

// ______________ RECUPERATION DE L'ID ET DES DONNEES DU PRODUIT _______________

// Fonction pour récupérer l'id du produit dans l'url 
function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}

// Fonction pour récupérer les données des produits 
function getProductData(productId) {
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then(function(httpBodyResponse) {
        if(httpBodyResponse.ok){
            return httpBodyResponse.json()
            .then(function(productData){
                return productData
            })
            .then((productData) => {
                displayProductInfo(productData);
                displayProductOptions(productData);
              })
        }else{
            throw new Error('Something went wrong');
        }
    })
    
    .catch(function(error) {
        alert("Oups... Something went wrong");
    })  
}

//_________________________ AFFICHAGE DE LA PAGE __________________________ 




// Fonction pour afficher les infos du produit sur la page et dans un objet
function displayProductInfo(productData) {
    document.getElementById("main-product").style.display='flex';
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

    // ____________________ Affichage quantité, options et prix ____________________ 
    
    // Choix quantité : création d'une liste déroulante de quantité à partir d'un tableau  
    let selectQty = document.createElement("select");
    selectQty.className = "product__quantity--selector";
    selectQty.id = "product__quantity--selector";
    document.getElementById("product__quantity").appendChild(selectQty);
    let optionsQty = ["1", "2", "3", "4", "5", "6"];

    for(let i = 0; i < optionsQty.length; i++) {
        let qty = optionsQty[i];
        let optionElement = document.createElement("option");
        optionElement.textContent = qty;
        optionElement.value = qty;
        selectQty.appendChild(optionElement);
    }
    
    // Calcul et affichage du nouveau prix en fonction de la quantité sélectionnée 
    let newPrice = document.createElement("p");
    newPrice.className = "qty__price";
    newPrice.className = "bold";
    newPrice.textContent = "Total : " + productData.price  / 100 + ".00€";
    document.getElementById("new__price").appendChild(newPrice);
    selectQty.addEventListener('change', updateNewPrice);

    // Fonction pour mettre à jour le prix affiché lorsque l'utilisateur modifie la quantité
    function updateNewPrice() {
        let qtyPrice = (parseInt(selectQty.value) * productData.price) / 100;
        newPrice.textContent = "Total : " + qtyPrice + ".00€"; 
    }

    // _______________________ AJOUT PRODUITS AU PANIER  _______________________ 

    // Event listener du bouton "Ajouter au panier"
    const btnAddToCart = document.getElementById("btn_addToCart"); 
    btnAddToCart.addEventListener("click", (event) => {
        event.preventDefault(); // Ne pas actualiser la page lors du clic 

        // Création d'un objet contenant les infos du produit ajouté au panier
        let productToAdd = {
            product_img: productData.imageUrl,
            product_name: productData.name,
            product_id: productData._id,
            product_qty: parseInt(selectQty.value),
            product_price: productData.price / 100,
            product_newPrice: (parseInt(selectQty.value) * productData.price) / 100,
        }
        
        let cartProduct = JSON.parse(localStorage.getItem("cart"));
        // Fonction pour ajouter (push) un productToAdd au localStorage (ajouter un produit au panier)
        const addToLocalStorage = () => {
            cartProduct.push(productToAdd);
            localStorage.setItem("cart", JSON.stringify(cartProduct));
        }

        // Fonction pour afficher la popup "produit ajouté au panier" lorsque l'utilisateur a cliqué sur le bouton d'ajout au panier et que l'ajout a réussi 
        const popUpProductAddedToCart = () => {
            document.getElementById("popupContainer").style.display = "flex";
            document.getElementById("closePopup_icone").addEventListener('click', () => {
                closePopupContainer();
            })
        }
        // Si panier vide  
        if(cartProduct === null) {
            // Création d'un tableau (vide) et ajout (push) d'un nouvel objet productToAdd
            cartProduct = [];
            addToLocalStorage();
            // Affichage d'une popup "produit ajouté au panier"
            popUpProductAddedToCart();
        } else {
            let cartProduct2 = JSON.parse(localStorage.getItem("cart"));
            for (let p in cartProduct2) {
                if(cartProduct2[p].product_id === productData._id){
                    console.log("déjà présent");
                    // Calcul new qty 
                    console.log(cartProduct2[p].product_qty);
                    // Ajouter nouveau produit avec quantité totale 
                    let productToAdd2 = {
                        product_img: productData.imageUrl,
                        product_name: productData.name,
                        product_id: productData._id,
                        product_qty: cartProduct2[p].product_qty + parseInt(selectQty.value),
                        product_price: productData.price / 100,
                        product_newPrice: ((cartProduct2[p].product_qty + parseInt(selectQty.value)) * productData.price) / 100,
                    }
                    console.log(productToAdd2);
                    // Remove ancien produit du localStorage (celui qui était déjà présent dans le panier)
                    cartProduct.splice([p], 1, productToAdd2);
                    localStorage.setItem("cart", JSON.stringify(cartProduct));
                    productToPush = false;
                    popUpProductAddedToCart();

                }else{
                    productToPush = true;
                }
            }
            if(productToPush){
                addToLocalStorage();
                // Affichage d'une popup "produit ajouté au panier"
                popUpProductAddedToCart();
            }
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












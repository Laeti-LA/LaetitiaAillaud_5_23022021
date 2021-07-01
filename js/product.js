main() // Main function, dès le chargement de la page 
async function main() {
    closePopupContainer();
    const productId = getProductId(); //Etape 1 : récupérer id du produit grâce à son url
    const productData = await getProductData(productId); //Etape 2 : récupérer les données du produit grâce à son id
    displayProductInfo(productData); //Etape 3 : afficher les infos du produit 
    displayProductOptions(productData); //Etape 4 : afficher les options de personnalisation du produit
}

// _______________________ AFFICHAGE DE LA PAGE PRODUIT _______________________

// Fonction pour masquer la popup produit ajouté au panier
function closePopupContainer() {
    document.getElementById("popupContainer").style.display = "none";
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
        alert("Oups... Something went wrong")
    })  
}

// Fonction pour afficher les infos du produit sur la page et dans un objet
function displayProductInfo(productData) {
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

    //_________________________ AJOUT PRODUITS AU PANIER __________________________ 
    
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
    function updateNewPrice() {
        let qtyPrice = (parseInt(selectQty.value) * productData.price) / 100;
        newPrice.textContent = "Total : " + qtyPrice + ".00€"; 
    }

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
        // Si des produits sont déjà présents dans le panier, tableau déjà créé et donc juste ajout (push) d'un nouvel objet productToAdd
        const addToLocalStorage = () => {
            cartProduct.push(productToAdd);
            localStorage.setItem("cart", JSON.stringify(cartProduct));
        }

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












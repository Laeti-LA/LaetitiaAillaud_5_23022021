main() // Main function, dès le chargement de la page 
async function main() {
    let cartProduct = JSON.parse(localStorage.getItem("cart"));
    displayCartProductsNb(cartProduct);
}

// Affichage du nombre d'articles dans le panier
function displayCartProductsNb(){
    let orderQty = 0;
    if(cartProduct === null || cartProduct == 0){
        orderQty = 0;
    }else{
        for (let k in cartProduct) {
            orderQty += cartProduct[k].product_qty;
        }if (document.getElementById('welcomeReturn')) {
            document.getElementById('product__nb').textContent = "(" + orderQty + ")";
        } else {
            document.getElementById('product__nb').textContent = "(" + orderQty + ")";
        }
    }
}



    

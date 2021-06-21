// Affichage du nombre d'articles dans le panier
function displayCartProductsNb(){
    let cartProductsNb;
    if (JSON.parse(localStorage.getItem('cart')) === null) {
        cartProductsNb = 0;
    } else {
        productsAdded = JSON.parse(localStorage.getItem('cart')).length;
        if (document.getElementById("return")) {
            document.getElementById("product_nb").innerHTML = "( " + cartProductsNb + " )";
        } else {
            document.getElementById("product_nb").innerHTML = "( " + cartProductsNb + " )";
        }
    }
}
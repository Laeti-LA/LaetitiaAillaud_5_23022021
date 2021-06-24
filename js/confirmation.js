main() // Main function, dès le chargement de la page 
async function main() {
    // Etape 1 : récupérer les données de la commande  
    const contactOrder = JSON.parse(localStorage.getItem("contact"));
    const idOrder = getOrderId();
    // Etape 2 : afficher les infos de la commande 
    displayOrderContact(contactOrder);
    displayOrderId(idOrder);
} 

function getOrderId() {
    return new URL(window.location.href).searchParams.get('orderId');
}

function displayOrderContact(contactOrder) {
    document.getElementById("fistNameContent").textContent = contactOrder.firstName;
    document.getElementById("lastNameContent").textContent = " " + contactOrder.lastName;
}

function displayOrderId(idOrder) {
    document.getElementById("orderIdContent").textContent = idOrder;
    
}

// Pour connaitre les quantités pour chaque produit (et calculer/afficher le prix total)
let cartProduct = JSON.parse(localStorage.getItem("cart"));
console.log(cartProduct);


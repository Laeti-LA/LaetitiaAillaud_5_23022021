main() // Main function, dès le chargement de la page 
async function main() {
    closePopupAbout()
    displayPopupAbout();
} 

// Fonction pour masquer la popup A propos du footer
function closePopupAbout(){
    document.getElementById("popupAbout").style.display="none";
}

// Fonction pour faire apparaitre la popup lorsqu'on clique sur le lien "A propos" dans le footer 
function displayPopupAbout(){
    let footerPopup = document.getElementById("footerAbout");
    footerPopup.addEventListener('click', event =>{
        event.preventDefault();
        document.getElementById("popupAbout").style.display="flex";
    })
    let aboutCloseIcon = document.getElementById("aboutCloseIcon");
    aboutCloseIcon.addEventListener('click', event =>{
        event.preventDefault();
        closePopupAbout();
    })
}




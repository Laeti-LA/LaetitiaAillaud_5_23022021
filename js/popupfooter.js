main() // Main function, dès le chargement de la page 
async function main() {
    displayPopupFooter();
} 

function displayPopupFooter(){
    let footerPopup = document.getElementById("footerAbout");
    footerPopup.addEventListener('click', event =>{
        event.preventDefault();
        document.getElementById("popupAbout").style.display="flex";
    })
    let aboutCloseIcon = document.getElementById("aboutCloseIcon");
    aboutCloseIcon.addEventListener('click', event =>{
        event.preventDefault();
        document.getElementById("popupAbout").style.display="none";
    })
}




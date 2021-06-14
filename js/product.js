// Récupérer ID produit dans l'URL 
let params = (new URL(document.location)).searchParams;
let productId = params.get('id');
// Après la connexion réussie et le retour à la page d'accueil (index.html), active le mode édition si connecté
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('authToken') !== null;// Vérifie si l'utilisateur est connecté
  
    if (isLoggedIn) {
      const header = document.querySelector('header');
    // Créer le bandeau "Mode édition"
      const editionMenu = document.createElement('div');
      editionMenu.classList.add('edition-menu');
      editionMenu.innerHTML= '<i class="fa-regular fa-pen-to-square"></i>Mode édition';
     
      
    // Ajouter le bandeau au header
      header.insertBefore(editionMenu, header.firstChild);
      
    // Ajouter le bouton "Modifier" à droite de "Mes Projets"
      const modifierButton = document.createElement('button');
      modifierButton.classList.add('modifier-button');
      modifierButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
  
      const mesProjetsHeader = document.querySelector('#portfolio h2');
      mesProjetsHeader.appendChild(modifierButton);
    }
  });
  
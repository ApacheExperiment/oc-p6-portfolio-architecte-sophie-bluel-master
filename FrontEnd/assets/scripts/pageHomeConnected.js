// Modification de la page d'accueil après connexion

document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('authToken') !== null;

  if (isLoggedIn) {
    //Ajout de la bannière du mode édition
    const editionMenu = document.createElement('div');
    editionMenu.classList.add('edition-menu');
    editionMenu.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>Mode édition';

    // Ajoute le bandeau au-dessus de tout 
    const htmlElement = document.documentElement;
  if (htmlElement) {
    htmlElement.insertBefore(editionMenu, htmlElement.firstChild);

     // Affiche le bouton de modification si la connexion est établis
     const modifierButton = document.querySelector('.modifier-button');
  if (modifierButton) {
    modifierButton.style.display = 'block';
  }
      const mesProjetsHeader = document.querySelector('#portfolio h2');
          mesProjetsHeader.appendChild(modifierButton);
      
      const filterMenu = document.querySelector('#filterMenu'); // Dissimule le bouton de filtrage
  if (filterMenu) {
    filterMenu.style.display = 'none';
  }

  }
  }
    
});

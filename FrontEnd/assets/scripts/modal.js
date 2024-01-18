// modal-api.js
function fetchWorks() {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(works => displayWorks(works))
      .catch(error => console.error('Error fetching works:', error));
  }
  
  function displayWorks(works) {
    const modalBody = document.querySelector('.modal.open .modal-body .gallery-modal');
  
    // Efface le contenu existant
    modalBody.innerHTML = '';
  
    // Créer des éléments pour chaque travaux et les ajoute au container de la modal
    works.forEach(work => {
        // Créer une div pour chaque oeuvre 
        const workContainer = document.createElement('div');
        workContainer.classList.add('work-item');
        
        // Créer un container "carré" pour la corbeille
        const squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container');

        // Intégration de l'icone corbeille
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');
        deleteIcon.addEventListener('click', () => deleteWork(work.id)); // Assuming you have a deleteWork function
        
        // Ajoute l'icone corbeille au "carré"
        squareContainer.appendChild(deleteIcon);

        // Créer et implémente les images de la galerie dans la modal
        const imageElement = document.createElement('img');
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title; // Ajoute à "alt" le titre de chaque travaux pour l'accessibiltié
                
        // Ajouts des éléments précédents au container 
        workContainer.appendChild(imageElement);
        workContainer.appendChild(squareContainer);

        // Le container est ajouté à au corps de la modal
        modalBody.appendChild(workContainer);
    });
  }
 // La modal est ouverte par l'id et la fonction fetchWorks
function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  
    // La fonction fetch et son contenu est affiché lors de l'ouverture de la modal
    fetchWorks();
  }
  
  // Fonction pour fermer la modal
  function closeModal() {
    const openModal = document.querySelector('.modal.open');
    if (openModal) {
      openModal.classList.remove('open');
      document.body.classList.remove('modal-open');
    }
  }
  
    // Fonction de suppression 
    function deleteWork(workId) {
      // Suppression dans la modal
      const workContainer = document.querySelector(`.work-item[data-work-id="${workId}"]`);
      if (workContainer) {
        workContainer.remove();
      }
      // Suppression dans la galerie
      const galleryFigure = document.querySelector(`.gallery figure[data-work-id="${workId}"]`);
      if (galleryFigure) {
        galleryFigure.remove();
      }
      // Appel à l'API pour supprimer le travail côté serveur
      fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            console.error('Erreur lors de la suppression du travail côté serveur.');
          }
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du travail côté serveur:', error);
        });
    }

  window.addEventListener('load', function() {
    // Action de fermeture au clic hors de la modal
    document.addEventListener('click', event => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    });
  });

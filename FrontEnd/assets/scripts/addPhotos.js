let previousModalContent; // Variable pour stocker le contenu de la modal précédente

// Fonction pour afficher le formulaire d'ajout et cacher le bouton
  function showAddForm() {
    window.addFormContainer = document.getElementById('addFormContainer');
    const modalBody = document.querySelector('.modal.open .modal-body');
    previousModalContent = modalBody.innerHTML; // Sauvegarde le contenu de la modal précédente

    modalBody.innerHTML = ''; // Efface le contenu existant

    // Créer le formulaire
    const addForm = document.createElement('form');
    addForm.id = 'addForm';
    addForm.innerHTML = `
        <div class="modal-body-addPhotos">
        <i onclick="goBackToGallery()" class="fa-solid fa-arrow-left"></i>
        <i onclick="closeModal()" class="fa-solid fa-xmark"></i>
        <h1 class="title-gallery">Ajout photo</h1>
        <div class=dlPhotos>
        <img src="./assets/icons/addPhotos.png" id="selectImage" alt="icone d'ajout de photos" />
        <label for="uploadPhotoInput" class="dlPhotos_button" >+ Ajouter photo</label>
        <input type="file" id="uploadPhotoInput" style="display: none;" accept="image/jpg, image/png">
        <p class="formats">jpg, png : 4mo max </p>
        </div>
        <div class="photoTitle">
        <label for="title">Titre</label>
        <input type="text" id="title" name="title" required>
        </div>
        <div class="photoCategorie">
        <label for="categorie">Catégorie</label>
        <select id="categorie" name="categorie" required>
        </div>
        <option value="" disabled selected></option>
        
        </select>
        </div>
        <div class="marge-top">
        <button type="button" class="buttonValider" onclick="addNewProject() ">Valider</button>
        
        </div>
    `;
    
    modalBody.appendChild(addForm);
   

    let selectImage = document.getElementById("selectImage");
    let uploadPhotoInput = document.getElementById("uploadPhotoInput");

    uploadPhotoInput.onchange = function () {
      const selectedImage = uploadPhotoInput.files[0];
  
      if (selectedImage) {
          // Mettre à jour l'image affichée
          selectImage.src = URL.createObjectURL(selectedImage);
  
          // Supprimer les éléments liés à l'ajout de photos
          const dlPhotosContainer = document.querySelector('.dlPhotos');
          dlPhotosContainer.innerHTML = '';
  
          // Ajouter l'image dans la div
          dlPhotosContainer.appendChild(selectImage);
  
          /// Ajuster la taille de l'image conformément aux styles CSS
          selectImage.style.width = '129px';
          selectImage.style.height = '169px';

          // Supprimer la marge supérieure
          selectImage.style.marginTop = '0';
      }
  };
  
}
/*
// Fonction pour revenir à la galerie depuis le formulaire d'ajout
function goBackToGallery() {
  const modalBody = document.querySelector('.modal.open .modal-body');
  modalBody.innerHTML = previousModalContent; // Restaure le contenu de la modal précédente
}
  // Fonction pour ajouter un nouveau projet
  function addNewProject() {
    const title = document.getElementById('title').value;
    const categorie = document.getElementById('categorie').value;

    // Vérifier si les champs sont remplis
    if (!title || !categorie) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const uploadPhotoInput = document.getElementById('uploadPhotoInput');
    uploadPhotoInput.addEventListener('change', handleFileSelection);
    
    
  }

    // Envoyer une requête POST à l'API
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        categorie: categorie,
        // Ajoutez d'autres champs si nécessaire
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Afficher un message de succès ou mettre à jour la galerie
        alert('Projet ajouté avec succès!');
        fetchWorks(); // Met à jour la galerie
        closeModal(); // Ferme la modal après l'ajout
      })
      .catch(error => {
        // Gérer les erreurs
        console.error('Erreur lors de l\'ajout du projet:', error);
        alert('Erreur lors de l\'ajout du projet. Veuillez réessayer.');
      });*/

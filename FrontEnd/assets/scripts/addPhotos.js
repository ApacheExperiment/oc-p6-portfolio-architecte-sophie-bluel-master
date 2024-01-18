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
        <div class="modal-body">
        <i onclick="goBackToGallery()" class="fa-solid fa-arrow-left"></i>
        <i onclick="closeModal()" class="fa-solid fa-xmark"></i>
        <h1 class="title-gallery">Ajout photo</h1>
        <div class=dlPhotos>
        <img src="./assets/icons/addPhotos.png" alt="icone d'ajout de photos" />
        <input type="file" id="uploadPhotoInput" style="display: none;" accept="image/*">
        <label for="uploadPhotoInput" class="dlPhotos_button" >+ Ajouter photo</label>
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
        <option value="Objets">Objets</option>
        <option value="Appartements">Appartements</option>
        <option value="Hôtels & restaurants">Hôtels & restaurants</option>
        </select>
        </div>
        <div class="marge-top">
        <button type="button" class="buttonValider" onclick="addNewProject() style="background-color: #1D6154;">Valider</button>
        
        </div>
    `;
    
    modalBody.appendChild(addForm);

    }
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
    
    function handleFileSelection() {
      const dlPhotosDiv = document.querySelector('.dlPhotos');
      const selectedFile = uploadPhotoInput.files[0];
    
      if (selectedFile) {
        // Créer un élément image pour afficher la photo sélectionnée
        const selectedImage = document.createElement('img');
        selectedImage.src = URL.createObjectURL(selectedFile);
        selectedImage.alt = 'Image sélectionnée';
    
        // Remplacer le contenu actuel de dlPhotosDiv par la nouvelle image
        dlPhotosDiv.innerHTML = '';
        dlPhotosDiv.appendChild(selectedImage);
      }
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
      });
  }
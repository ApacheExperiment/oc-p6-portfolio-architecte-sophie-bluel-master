let previousModalContent; // Variable pour stocker le contenu de la modal précédente
let uploadPhotoInput; //


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
              <input type="file" id="uploadPhotoInput" name="image" style="display: none;" accept="image/jpg, image/png">
                <p class="formats">jpg, png : 4mo max </p>
        </div>
        <div class="photoTitle">
          <label for="title">Titre</label>
          <input type="text" id="title" name="title" required>
        </div>
        <div class="photoCategorie">
          <label for="category">Catégorie</label>
            <select id="category" name="category" required>
            <option value="" disabled selected></option>
            </select>
        </div>
          <div class="marge-top">
            <input type="submit" class="buttonValider" value="Valider" onclick="handleFormSubmission(event) "/>
          </div>
        </div>
    `;
   
    modalBody.appendChild(addForm);
   
    let selectImage = document.getElementById("selectImage");
    uploadPhotoInput = document.getElementById("uploadPhotoInput");

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

  
          /// Ajuste la taille de l'image au cadre dlPhotos
          selectImage.style.width = '129px';
          selectImage.style.height = '169px';

          // Supprimer la marge supérieure
          selectImage.style.marginTop = '0';
      }
  };
 

// Récupère le token depuis le local storage
const authToken = localStorage.getItem('authToken');
 // Vérifie si le token est présent
 if (!authToken) {
   console.error('Token d\'authentification manquant.');
   // Gère l'absence de token, redirige vers la page de connexion
   return;
 }
  fetch('http://localhost:5678/api/categories', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
    .then(categories => {
      const selectElement = addForm.querySelector('#category');

      // Ajouter la nouvelle catégorie manuellement
      const newCategory = {
        id: 4,
        name: "Bar & Restaurant"
      };
      categories.push(newCategory);

      // Ajouter les options au menu déroulant
      categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.text = category.name;
        selectElement.add(optionElement);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des catégories depuis l\'API:', error);
    });
  
}

// Fonction pour revenir à la galerie depuis le formulaire d'ajout
function goBackToGallery() {
  const modalBody = document.querySelector('.modal.open .modal-body');
  modalBody.innerHTML = previousModalContent; // Restaure le contenu de la modal précédente
}

async function addNewProject(formData) {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Token d\'authentification manquant.');
    // Gére l'absence de token, rediriger vers la page de connexion
    return;
  }

  try {
  const response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
    body: formData,
  });
  
    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du projet.');
    }
  /*
  const newProject = await response.json();

    // Mettre à jour la galerie avec le nouveau projet
    updateGalleryWithNewProject(newProject);
    // Mettre à jour la modal avec le nouveau projet
    updateModalWithNewProject(newProject);
    // Afficher l'image dans la galerie et la modal sans rechargement de la page
    const imageUrl = newProject.image; // Renvoi de l'URL de la photo
    displayImageInGallery(imageUrl);
    displayImageInModal(imageUrl);*/


  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet:', error);
    // Gérer les erreurs
  }
}
/*function updateGalleryWithNewProject(newProject) {
  // Recherche la galerie pour l'ajout
  const gallery = document.querySelector('.gallery');

  if (!gallery) {
    console.error('L\'élément de galerie n\'a pas été trouvé dans le document.');
    return;
  }

  // Créez un nouvel élément image
  const newImage = document.createElement('img');
  newImage.src = newProject.image; // Récupère l'URL de l'image
  newImage.alt = newProject.title; // Récupère le titre de l'image

  // Ajoutez la nouvelle image à la galerie
  gallery.appendChild(newImage);
}


function updateModalWithNewProject(newProject) {
  // Sélectionne l'élément de modal
  const modal = document.querySelector('.modal');

  if (!modal) {
    console.error('L\'élément de modal n\'a pas été trouvé dans le document.');
    return;
  }

  // Efface le contenu actuel de la modal
  modal.innerHTML = '';

  // Créez un nouvel élément image
  const newImage = document.createElement('img');
  newImage.src = newProject.image; // Récupère l'URL de l'image
  newImage.alt = newProject.title; // Récupère le titre de l'image

  // Ajoutez la nouvelle image à la modal
  modal.appendChild(newImage);
}*/
// Fonction pour valider le titre
function validateTitle(title) {
  const titleRegex = /^[a-zA-Z0-9_&\s-]+$/;
  return titleRegex.test(title);
}

// Fonction pour valider la catégorie
function validateCategory(category) {
  return category !== '';
}

// Fonction pour valider l'image
function validateImage(image) {
   // Vérifie si le type de fichier commence par 'image/' (vérifie si c'est une image)
   const isImage = image.type.startsWith('image/');
  
   // Vérifie si la taille de l'image est inférieure ou égale à 4 Mo (4 * 1024 * 1024 octets)
   const isSizeValid = image.size <= 4 * 1024 * 1024; // 4 Mo en octets
   
   // Retourne vrai si c'est une image et si sa taille est valide, sinon faux
   return isImage && isSizeValid;
}

// Fonction pour soumettre le formulaire
function handleFormSubmission(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const imageFile = uploadPhotoInput.files[0];

  // Validation des données
  if (!validateTitle(title)) {
    console.error('Le titre doit être non vide et ne contenir que des caractères alphanumériques et des espaces.');
    return;
  }

  if (!validateCategory(category)) {
    console.error('Veuillez sélectionner une catégorie.');
    return;
  }

  if (!validateImage(imageFile)) {
    console.error('L\'image doit être d\'un type valide (image/jpg ou image/png) et ne doit pas dépasser 4 Mo.');
    return;
  }

  // Confirmation avant l'envoi
  const confirmation = prompt('Confirmez-vous le nouveau projet ?');
  if (confirmation === 'oui') {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    addNewProject(formData);
  }
  // Fermer la modale
closeModal();
}


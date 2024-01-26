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
          <label for="categorie">Catégorie</label>
            <select id="category" name="category" required>
            <option value="" disabled selected></option>
            </select>
        </div>
          <div class="marge-top">
            <input type="submit" class="buttonValider" value="Valider" onclick="addNewProject() "/>
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
  const answer = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
      
    },
    body: formData,
  });
  
    if (!answer.ok) {
      throw new Error('Erreur lors de l\'ajout du projet.');
    }
  
  const newProject = await response.json();

    // Mettre à jour la galerie avec le nouveau projet
    updateGalleryWithNewProject(newProject);
    // Mettre à jour la modal avec le nouveau projet
    updateModalWithNewProject(newProject);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet:', error);
    if (error.response && error.response.status === 400) {
      // Les données du formulaire sont invalides
      console.error('Les données du formulaire sont invalides.');
    } else if (error.response && error.response.status === 500) {
      // Le serveur API est indisponible ou ne répond pas
      console.error('Le serveur API est indisponible ou ne répond pas.');
    } else {
      // Un autre problème est survenu
      console.error('Un autre problème est survenu.');
    }
  }
}
// Fonction pour valider le titre
function validateTitle(title) {
  const titleRegex = /^[a-zA-Z0-9\s-]+$/;
  return titleRegex.test(title);
}

// Fonction pour valider la catégorie
function validateCategory(category) {
  return category !== '';
}

// Fonction pour valider l'image
function validateImage(image) {
  return image !== null && image.type === 'image/jpg' || image.type === 'image/png' && image.size <= 4194304;
}

// Fonction pour soumettre le formulaire
function handleFormSubmission(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const imageFile = document.getElementById('uploadPhotoInput').files[0];

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
  const confirmation = prompt('Confirmez-vous l\'envoi des données ?');
  if (confirmation === 'oui') {
    // Ajout d'une explication
    const message = `Les données que vous allez envoyer seront utilisées pour ajouter une nouvelle photo à la galerie.`;
    alert(message);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    addNewProject(formData);
  }
}

// Fonction pour soumettre le formulaire
function handleFormSubmission(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const imageFile = document.getElementById('uploadPhotoInput').files[0];

  // Validation des données
  if (!validateTitle(title)) {
    return;
  }

  if (!validateCategory(category)) {
    return;
  }

  if (!validateImage(imageFile)) {
    return;
  }

  // Confirmation avant l'envoi
  const confirmation = prompt('Confirmez-vous l\'envoi des données ?');
  if (confirmation === 'oui') {
    // Ajout d'une explication
    const message = `Les données que vous allez envoyer seront utilisées pour ajouter une nouvelle photo à la galerie.`;
    alert(message);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    addNewProject(formData);
  }
}


let previousModalContent; // Variable pour stocker le contenu de la modal précédente
let uploadPhotoInput; // Variable de l'input permettant de télécharger un document photo


// Fonction pour afficher le formulaire d'ajout
  function showAddForm() {
   /* window.addFormContainer = document.getElementById('addFormContainer');*/
    const modalBody = document.querySelector('.modal.open .modal-body'); //Sélectionne les propriétés de la modal
    previousModalContent = modalBody.innerHTML; // Sauvegarde le contenu de la modal précédente

   modalBody.innerHTML = ''; // Efface le contenu de la Galerie Photo présente dans la précédente modal 

    // Création du formulaire
    const addForm = document.createElement('form');
    addForm.id = 'addForm';
    addForm.innerHTML = `
        
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
          <div class="addPhotos-container">
            <input type="submit" class="buttonValider" value="Valider" onclick="handleFormSubmission(event) "/>
          </div>
        
    `;
   
    modalBody.appendChild(addForm); //Ajoute le formulaire à la modale
   
    let selectImage = document.getElementById("selectImage");
    uploadPhotoInput = document.getElementById("uploadPhotoInput");

    uploadPhotoInput.onchange = function () {
      const selectedImage = uploadPhotoInput.files[0];
  
      if (selectedImage) {
          // Mettre à jour l'image affichée
          selectImage.src = URL.createObjectURL(selectedImage);
  
          // Supprime les éléments liés à l'ajout de photos
          const dlPhotosContainer = document.querySelector('.dlPhotos');
          dlPhotosContainer.innerHTML = '';
  
          // Ajoute l'image dans la div
          dlPhotosContainer.appendChild(selectImage);

  
          /// Ajuste la taille de l'image au cadre dlPhotos
          selectImage.style.width = '129px';
          selectImage.style.height = '169px';

          // Supprime la marge supérieure
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

      // Ajoute la nouvelle catégorie manuellement
      const newCategory = {
        id: 4,
        name: "Bar & Restaurant"
      };
      categories.push(newCategory);

      // Ajoute les options au menu déroulant
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

// Fonction pour revenir à la galerie depuis le formulaire d'Ajout Photo
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

  // Récupére les détails du nouveau travail ajouté depuis la réponse
  const newWork = await response.json();

  // Déclenche un événement personnalisé pour informer que de nouveaux travaux ont été ajoutés
  const event = new CustomEvent('newWorkAdded', { detail: { newWorks: [newWork] } });
  document.dispatchEvent(event);

  console.log('Nouveau projet ajouté avec succès !');
} catch (error) {
  console.error('Erreur lors de l\'ajout du projet:', error);
  // Gére les erreurs
}

}


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
    alert('Le titre doit être non vide et ne contenir que des caractères alphanumériques et des espaces.');
    return;
  }

  if (!validateCategory(category)) {
    console.error('Veuillez sélectionner une catégorie.');
    alert('Veuillez sélectionner une catégorie.');
    return;
  }

  if (!validateImage(imageFile)) {
    console.error('L\'image doit être d\'un type valide (image/jpg ou image/png) et ne doit pas dépasser 4 Mo.');
    alert('L\'image doit être d\'un type valide (image/jpg ou image/png) et ne doit pas dépasser 4 Mo.');
    return;
  }

  // Confirmation avant l'envoi
  const confirmation = prompt('Pour ajouter le projet veuilliez répondre "oui"');
  if (confirmation === 'oui') {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    addNewProject(formData);
  }
  // Ferme la modale après l'ajout d'une photo
closeModal();

}


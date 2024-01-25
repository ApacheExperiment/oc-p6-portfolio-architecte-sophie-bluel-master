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
              <input type="file" id="uploadPhotoInput" style="display: none;" accept="image/jpg, image/png">
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

function formIsValid() {
  const titleInput = document.getElementById("title");
  const title = titleInput.value;

  if (title === "") {
    alert("Veuillez saisir un titre.");
    return false;
  }

  return true;
}
async function addNewProject() {
  // Vérifier si le formulaire est valide
  if (!formIsValid()) {
    return;
  }

  // Récupère les informations du formulaire
  const title = document.getElementById("title").value;
  const categoryId = document.getElementById("category").value;

  // Créer l'objet JSON à envoyer à l'API
  const formData = new FormData();
  formData.append("photo", uploadPhotoInput.files[0]);
  formData.append("title", title);
  formData.append("categoryId", categoryId);

  // Envoi de la requête POST à l'API
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  // Traiter la réponse de l'API
  if (response.status === 200) {
    // Le projet a été créé avec succès
    alert("Le projet a été créé avec succès.");
  } else {
    // Une erreur s'est produite
    alert("Une erreur s'est produite lors de la création du projet.");
  }
}
/*
// Fonction pour ajouter un nouveau projet
function addNewProject() {
  const title = document.getElementById('title').value;
  const categorie = document.getElementById('categorie').value;
  const uploadPhotoInput = document.getElementById('uploadPhotoInput');

  // Vérifier si les champs sont remplis
  if (!title || !categorie || !uploadPhotoInput.files[0]) {
    alert('Veuillez remplir tous les champs et sélectionner une photo.');
    return;
  }
  // Utiliser FormData pour rassembler les données du formulaire
  const formData = new FormData();
  formData.append('title', title);
  formData.append('categorie', categorie);
  formData.append('image', uploadPhotoInput.files[0]);
  // Sélectionne tous les éléments <figure> dans la galerie
  const allFigures = Array.from(document.querySelectorAll('.gallery figure'));

  // Vérifie si un élément avec le même workId existe déjà
  const existingFigure = allFigures.find((figure) => figure.dataset.workId == workId);

  // Si aucun élément n'a été trouvé, ajoute un nouvel élément
  if (!existingFigure) {
    // Crée un nouvel élément <figure>
    const newFigure = document.createElement('figure');
    newFigure.dataset.workId = workId; // Attribut un workId au nouvel élément

    // Crée un élément <img> pour l'image
    const newImage = document.createElement('img');
    newImage.src = newImage; // Défini la source de l'image
    newImage.alt = 'Nouvelle image'; // Défini l'attribut alt de l'image

    // Ajoute l'élément <img> à l'élément <figure>
    newFigure.appendChild(newImage);

    // Ajoute l'élément <figure> à la galerie
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.appendChild(newFigure);
  }
  // Envoyer une requête POST à l'API
fetch('http://localhost:5678/api/works', {
  method: 'POST',
  body: formData,
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du projet.');
    }
    return response.json();
  })
  .then(data => {
    // Afficher un message de succès
    alert('Projet ajouté avec succès!');
    
    // Actualiser la galerie
    fetchWorks();

    updateModalImageList(data.imageUrl); // Met à jour la galerie modale

    // Fermer la modal après l'ajout
    closeModal();
  })
  .catch(error => {
    // Gérer les erreurs
    console.error('Erreur lors de l\'ajout du projet:', error);
    alert('Erreur lors de l\'ajout du projet. Veuillez réessayer.');
  });
}
function updateGalleryWithNewImage(newImageURL) {
// Code pour mettre à jour la galerie principale (gallery) avec la nouvelle image
const galleryContainer = document.querySelector('.gallery');

// Créer un nouvel élément d'image pour la galerie principale
const newImageGalleryElement = document.createElement('img');
newImageGalleryElement.src = newImageURL;
newImageGalleryElement.alt = 'Nouvelle image';

// Ajouter le nouvel élément d'image à la galerie principale
galleryContainer.appendChild(newImageGalleryElement);

// Appeler également la fonction pour mettre à jour la galerie modale
updateModalImageList(newImageURL);
}
function updateModalImageList(newImageURL) {
const modalImageList = document.querySelector('.gallery-modal');

// Créer un nouvel élément d'image
const newImageElement = document.createElement('img');
newImageElement.src = newImageURL;
newImageElement.alt = 'Nouvelle image';


// Ajouter le nouvel élément d'image à la liste des images dans la modale
modalImageList.appendChild(newImageElement);
}*/
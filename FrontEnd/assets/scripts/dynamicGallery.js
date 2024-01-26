import { fetchWorks } from './api.js';


// Fonction pour traiter les données des travaux
function handleData(data) {
  const galerie = document.querySelector('.gallery'); // Sélectionne la galerie

  // Parcourt chaque objet pour ensuite modifier la galerie initiale dans le HTML
  data.forEach((project) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    image.src = project.imageUrl;
    image.alt = project.title;
    figcaption.textContent = project.title;

    // Ajout de l'attribut workId à la figure
    figure.dataset.categoryId = project.categoryId;
    figure.dataset.workId = project.id; // Ajout de l'attribut workId

    figure.appendChild(image);
    figure.appendChild(figcaption);
    galerie.appendChild(figure); // Ajoute la figure à la galerie
  });
}

fetchWorks()
  .then((data) => {
    // Traitement des travaux ici
    handleData(data);
  })
  .catch((error) => {
    console.error('Erreur de récupération des travaux:', error);
  });

  
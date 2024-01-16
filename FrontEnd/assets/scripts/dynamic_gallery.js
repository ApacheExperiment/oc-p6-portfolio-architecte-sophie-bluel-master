import { fetchWorks } from './api.js';

// Fonction pour traiter les données des travaux
function handleData(data) {
  const galerie = document.querySelector('.gallery'); // Sélectionne la galerie

  // Parcourt chaque objet pour ensuite modifier la galerie initiale dans le HTML
  data.forEach(mesProjets => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    image.src = mesProjets.imageUrl;
    image.alt = mesProjets.title;
    figcaption.textContent = mesProjets.title;

    figure.dataset.categoryId = mesProjets.categoryId;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    galerie.appendChild(figure); // Ajoute la figure à la galerie
  });
}

fetchWorks()
  .then(data => {
    // Traitement des travaux ici
    handleData(data);
  })
  .catch(error => {
    console.error('Erreur de récupération des travaux:', error);
  });
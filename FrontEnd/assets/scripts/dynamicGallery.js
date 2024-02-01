//Gallerie dynamique
import { fetchWorks } from './api.js';

// Fonction pour traiter les données des travaux
function handleData(data) {
  const galerie = document.querySelector('.gallery'); // Sélectionne la galerie

  // Parcourt chaque objet pour ensuite modifier la galerie initiale dans le HTML
  data.forEach((project) => {
    const figure = document.createElement('figure'); // Créer l'élément figure
    const image = document.createElement('img'); // Créer l'élément img
    const figcaption = document.createElement('figcaption');// Créer l'élément figcaption

    image.src = project.imageUrl; // Affecte l'URL de l'image du projet à la source de l'élément img
    image.alt = project.title; // Définit le texte alternatif de l'image avec le titre du projet
    figcaption.textContent = project.title; // Définit le texte de figcaption avec le titre du projet

    // Ajoute l'identifiant de catégorie (workId) du projet aux données personnalisées de la figure
    figure.dataset.categoryId = project.categoryId;
    figure.dataset.workId = project.id; // Ajout de l'attribut workId aux données personnalisées de la figure


    figure.appendChild(image); // Ajoute l'image à l'élément figure
    figure.appendChild(figcaption); // Ajoute l'élément figcaption à la figure
    galerie.appendChild(figure); // Ajoute l'élément figure à la galerie
  });
}

fetchWorks() // Réutilisation de la fonction qui récupére les travaux depuis l'API
  .then((data) => { // Traitement des travaux ici
    handleData(data);
  })
  .catch((error) => { // En cas d'erreur
    console.error('Erreur de récupération des travaux:', error);
  });

// Fonction pour mettre à jour la galerie avec de nouveaux travaux
function updateGalleryWithNewWorks(newWorks) {
  const galerie = document.querySelector('.gallery'); // Sélectionne la galerie

  // Boucle qui parcourt chaque nouvel objet pour ensuite ajouter à la galerie
  newWorks.forEach((project) => {
    const figure = document.createElement('figure'); // Créer l'élément figure
    const image = document.createElement('img'); // Créer l'élément img
    const figcaption = document.createElement('figcaption'); // Créer l'élément figcaption

    image.src = project.imageUrl;
    image.alt = project.title;
    figcaption.textContent = project.title;

    // Ajout de l'attribut workId à la figure
    figure.dataset.categoryId = project.categoryId;
    figure.dataset.workId = project.id; // Ajout de l'attribut workId

    figure.appendChild(image); // Ajoute l'élément image galerie
    figure.appendChild(figcaption); // Ajoute l'élément figacaption à la galerie
    galerie.appendChild(figure); // Ajoute l'élément figure à la galerie
  });

}

// Écoute de l'événement "newWorkAdded" pour mettre à jour la galerie
document.addEventListener('newWorkAdded', (event) => {
  const newWorks = event.detail.newWorks;
  updateGalleryWithNewWorks(newWorks);
});

// Filtres des catégories
import { fetchCategories } from './api.js';

// Fonction pour afficher tous les travaux
function displayAllWorks() {
  const galerie = document.querySelector('.gallery'); // Sélectionne la class .gallery
  const allWorks = galerie.querySelectorAll('figure'); // Sélectionne tous les éléments figure (travaux)

  allWorks.forEach(work => {
    work.style.display = 'block'; // Affiche tous les travaux 
  });
}

// Fonction pour filtrer les travaux par catégorie
function filterWorksByCategory(categoryId) {
  
  const galerie = document.querySelector('.gallery'); // Sélectionne la class .gallery
  const allWorks = galerie.querySelectorAll('figure'); // Sélectionne tous les travaux

  allWorks.forEach(work => {
    const workCategoryId = parseInt(work.dataset.categoryId); // Récupère l'ID de la catégorie pour chaque travaux
    //'work.dataset.categoryId' renvoie une valeur de type chaîne qui représente l'ID pour s'assurer que ce soit un nombre 'parseInt()' convertit la valeur en entier 

    console.log('workCategoryId:', workCategoryId); // Vérifier la valeur de workCategoryId
    console.log('categoryId:', categoryId); // Vérifier la valeur de categoryId

    if (workCategoryId === categoryId) {
      work.style.display = 'block'; // Affiche le travail si la catégorie correspond à "Tous" ou à la catégorie sélectionnée
    } else {
      work.style.display = 'none'; // Cache le travail s'il ne correspond pas à la catégorie sélectionnée
    }
  });
  
}

// Récupère les catégories depuis l'API
fetchCategories()
.then(categories => {
  // Sélectionne l'ID contenant le menu de filtrage par catégorie
  const filterMenu = document.getElementById("filterMenu");

  // Ajoute un bouton "Tous" pour afficher tous les travaux
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("buttonFilters"); // Ajoute la classe "buttonFilters" au bouton
  allButton.addEventListener("click", () => {
    console.log(`Bouton "Tous" cliqué.`);
    displayAllWorks(); // Appelle la fonction pour afficher tous les travaux
  });
  filterMenu.appendChild(allButton); // Ajoute le bouton "Tous" au menu de filtrage

  // Crée des boutons pour chaque catégorie récupérée
  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("buttonFilters"); // Ajoute la classe "buttonFilters" au bouton
    button.addEventListener("click", () => {
      console.log(`Bouton "${category.name}" cliqué.`); //Affiche dynamiquement le nom de la catégorie associée au bouton dans la console
      filterWorksByCategory(category.id); // Appelle la fonction de filtrage avec l'ID de la catégorie
    });
    filterMenu.appendChild(button); //Ajoute le bouton créer au menu de filtrage
  });
  })
  .catch(error => {
    console.error('Erreur de récupération des catégories:', error);
  });
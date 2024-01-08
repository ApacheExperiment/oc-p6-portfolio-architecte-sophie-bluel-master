// Fonction pour récupérer les travaux depuis l'API
function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur de récupération des travaux');
      }
      return response.json();
    });
}
// Fonction pour récupérer les catégories depuis l'API
function fetchCategories() {
  return fetch("http://localhost:5678/api/categories")
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur de récupération des catégories');
      }
      return response.json();
    });
}

export { fetchWorks, fetchCategories };
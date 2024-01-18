export function deleteWork(workId) {
    // Suppression dans la modal
    const workContainer = document.querySelector(`.work-item[data-work-id="${workId}"]`);
    if (workContainer) {
      workContainer.remove();
    }
    
    // Suppression dans la galerie
    const galleryFigure = document.querySelector(`.gallery figure[data-work-id="${workId}"]`);
    if (galleryFigure) {
      galleryFigure.remove();
    }
  
    // Appel à l'API pour supprimer le travail côté serveur
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          console.error('Erreur lors de la suppression du travail côté serveur.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du travail côté serveur:', error);
      });
  }
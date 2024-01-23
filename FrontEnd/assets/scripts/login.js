document.addEventListener('DOMContentLoaded', function() {
  // Sélectionne le formulaire
  const loginForm = document.querySelector('#login form');

// Écoute l'événement de soumission du formulaire
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire

    // Récupère les valeurs des champs email et password
    const email = document.getElementById('email').value;
    // Sélectionne la zone de login pour afficher l'erreur
    const password = document.getElementById('password').value;

    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Enregistre le token dans le local storage
        localStorage.setItem('authToken', data.token);
        // Vérifie si le token est présent
        if (!data.token) {
          console.error('Token d\'authentification manquant.');
          // Afficher un message d'erreur à l'utilisateur
          alert('Erreur d\'authentification. Veuillez vérifier vos informations de connexion.');
          return;
        }
        // Redirige vers la page d'accueil ou une autre page sécurisée
        window.location.href = '../../index.html';

      } else {
        // Sélectionne la zone de login pour afficher l'erreur
        const loginDiv = document.getElementById('login');
        // Supprime un message d'erreur précédent s'il existe déjà
        const previousErrorMessage = document.getElementById('errorMessage');
        if (previousErrorMessage) {
          loginDiv.removeChild(previousErrorMessage);
        } //Création d'un encadré indiquant une erreur d'identification
        const errorDiv = document.createElement('div');
        errorDiv.id = 'errorMessage';
        errorDiv.textContent = 'Erreur dans l\'identifiant ou le mot de passe';
        errorDiv.style.border = '1px solid red';
        errorDiv.style.padding = '10px';
        errorDiv.style.color = 'red';
        const loginTitle = document.querySelector('#login h2');// Place le message d'erreur en dessous de 'Log in'
        loginTitle.insertAdjacentElement('afterend', errorDiv);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête :', error);
      // Gère l'erreur ici
    });
  });
  
});
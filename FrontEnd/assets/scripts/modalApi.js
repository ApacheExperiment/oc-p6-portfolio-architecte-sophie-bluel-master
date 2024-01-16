// modal-api.js
function fetchWorks() {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(works => displayWorks(works))
      .catch(error => console.error('Error fetching works:', error));
  }
  
  function displayWorks(works) {
    const modalBody = document.querySelector('.modal.open .modal-body .gallery-modal');
  
    // Clear existing content
    modalBody.innerHTML = '';
  
    // Create elements for each work and append to modal body
    works.forEach(work => {
        // Create a container div for each work
        const workContainer = document.createElement('div');
        workContainer.classList.add('work-item');
        
        // Create a square container for the delete icon
        const squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container');

        // Create delete icon element
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');
        deleteIcon.addEventListener('click', () => deleteWork(work.id)); // Assuming you have a deleteWork function
        
        // Append delete icon to square container
        squareContainer.appendChild(deleteIcon);

        // Create image element
        const imageElement = document.createElement('img');
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title; // Use work title as alt text for accessibility
                
        // Append elements to the container
        workContainer.appendChild(imageElement);
        workContainer.appendChild(squareContainer);

        // Append container to modal body
        modalBody.appendChild(workContainer);
    });
  }
 // Open modal by id and fetch works
function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  
    // Fetch and display works when the modal is opened
    fetchWorks();
  }
  
  // close currently open modal
  function closeModal() {
    const openModal = document.querySelector('.modal.open');
    if (openModal) {
      openModal.classList.remove('open');
      document.body.classList.remove('modal-open');
    }
  }
  
    // Function to handle work deletion (adjust as needed)
    function deleteWork(workId) {
        // Implement the logic to delete the work with the given ID
        console.log('Deleting work with ID:', workId);
    }

  window.addEventListener('load', function() {
    // close modals on background click
    document.addEventListener('click', event => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    });
  });
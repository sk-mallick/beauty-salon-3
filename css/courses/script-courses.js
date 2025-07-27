  const modal = document.getElementById('popupModal');
  const modalTitle = document.getElementById('modalTitle');
  const popupText = document.getElementById('popupText');
  const buttons = document.querySelectorAll('.card__button');
  const closeBtn = document.querySelector('.close-button');

  // Open Modal
  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      const content = btn.getAttribute('data-content');
      modalTitle.textContent = title;
      popupText.innerHTML = content;

      modal.style.display = 'flex'; // Show modal centered
      document.body.classList.add('modal-open'); // Disable scroll
    });
  });

  // Close Modal via X button
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  // Close Modal by clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });

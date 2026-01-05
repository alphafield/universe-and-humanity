const indicator = document.querySelector('.scroll-indicator');
if (indicator) {
  indicator.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
}


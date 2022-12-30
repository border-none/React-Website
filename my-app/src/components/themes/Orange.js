function Orange() {
  const root = document.querySelector(':root');

  window.localStorage.setItem('theme', 'orange');
  root.style.setProperty('--accent', 'orange');
  root.style.setProperty('--accent-shadow', '#5a3b00');
}

export default Orange;

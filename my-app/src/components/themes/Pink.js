function Pink() {
  const root = document.querySelector(':root');

  window.localStorage.setItem('theme', 'PINK');
  root.style.setProperty('--accent', '#fd68ee');
  root.style.setProperty('--accent-shadow', '#62007d');
}

export default Pink;

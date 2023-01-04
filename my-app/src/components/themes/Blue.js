function Blue() {
  const root = document.querySelector(':root');

  window.localStorage.setItem('theme', 'OCEAN');
  root.style.setProperty('--accent', '#00ccff');
  root.style.setProperty('--accent-shadow', '#00637f');
}

export default Blue;

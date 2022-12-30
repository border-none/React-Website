function Maroon() {
  const root = document.querySelector(':root');

  window.localStorage.setItem('theme', 'maroon');
  root.style.setProperty('--accent', '#b00000');
  root.style.setProperty('--accent-shadow', '#540000');
}

export default Maroon;

function Maroon() {
  const root = document.querySelector(':root');

  window.localStorage.setItem('theme', 'MAROON');
  root.style.setProperty('--accent', 'red');
  root.style.setProperty('--accent-shadow', '#7b0000');
}

export default Maroon;

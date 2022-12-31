import Blue from './Blue';
import Maroon from './Maroon';
import Orange from './Orange';
import Pink from './Pink';

function Theme() {
  if (window.localStorage.getItem('theme') === 'orange') {
    Orange();
  } else if (window.localStorage.getItem('theme') === 'maroon') {
    Maroon();
  } else if (window.localStorage.getItem('theme') === 'blue') {
    Blue();
  }

  return (
    <>
      <div className="theme">
        CHOOSE YOUR THEME
        <div className="themes">
          <button id="blue" onClick={() => Blue()}>
            OCEAN
          </button>
          <button id="orange" onClick={() => Orange()}>
            SUN
          </button>
          <button id="maroon" onClick={() => Maroon()}>
            MAROON
          </button>
          <button id="pink" onClick={() => Pink()}>
            PINK
          </button>
        </div>
      </div>
    </>
  );
}

export default Theme;

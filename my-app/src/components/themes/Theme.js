import { useEffect, useState } from 'react';
import Blue from './Blue';
import Maroon from './Maroon';
import Orange from './Orange';
import Pink from './Pink';

function Theme() {
  const [curTheme, setCurTheme] = useState(null);

  if (window.localStorage.getItem('theme') === 'orange') {
    Orange();
  } else if (window.localStorage.getItem('theme') === 'maroon') {
    Maroon();
  } else if (window.localStorage.getItem('theme') === 'blue') {
    Blue();
  }

  const getButtons = document.querySelectorAll('button');
  const btnArr = Array.from(getButtons);

  function setTheme(e) {
    setCurTheme(e.target.textContent);
  }

  useEffect(() => {
    if (curTheme) {
      btnArr.map((el, i) => {
        if (curTheme === el.innerText) {
          el.classList.add('active-btn');
        } else {
          el.classList.remove('active-btn');
        }
      });
    }
  }, [curTheme]);

  return (
    <>
      <div className="theme">
        CHOOSE YOUR THEME
        <div className="themes">
          <button
            id="blue"
            onClick={(e) => {
              Blue();
              setTheme(e);
            }}
          >
            OCEAN
          </button>
          <button
            id="orange"
            onClick={(e) => {
              Orange();
              setTheme(e);
            }}
          >
            SUN
          </button>
          <button
            id="maroon"
            onClick={(e) => {
              Maroon();
              setTheme(e);
            }}
          >
            MAROON
          </button>
          <button
            id="pink"
            onClick={(e) => {
              Pink();
              setTheme(e);
            }}
          >
            PINK
          </button>
        </div>
      </div>
    </>
  );
}

export default Theme;

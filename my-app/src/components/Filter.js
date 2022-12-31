import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHeartOutline } from 'react-icons/io5';

function Filter() {
  const [data, setData] = useState(null);
  const [type, setType] = useState();

  const buttonNodeList = document.querySelectorAll('.btn-container button');
  const buttonArr = Array.from(buttonNodeList);

  function all() {
    setType('ALL');
  }

  function water() {
    setType('water');
  }

  function fire() {
    setType('fire');
  }

  function grass() {
    setType('grass');
  }

  function ground() {
    setType('ground');
  }

  function normal() {
    setType('normal');
  }

  function fairy() {
    setType('fairy');
  }

  function onClick(e) {
    localStorage.setItem(
      'clickedPokemon',
      e.target.firstChild.data.toLowerCase()
    );
  }

  useEffect(() => {
    if (type) {
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => response.json())
        .then((json) => setData(json));
    }
  }, [type]);

  let pokemonType;

  if (data) {
    {
      buttonArr.map((el, i) => {
        el.innerText === type.toUpperCase()
          ? el.classList.add('active-btn')
          : el.classList.remove('active-btn');
      });
    }
    pokemonType = data.pokemon.map((el, i) => {
      return (
        <Link to="pokemon" onClick={onClick}>
          <li key={i} className="card">
            {el.pokemon.name.toUpperCase()}
            {<IoHeartOutline />}
          </li>
        </Link>
      );
    });
  }
  return (
    <div className="container type">
      <div className="btn-container">
        <button id="all" onClick={all}>
          ALL
        </button>
        <button onClick={water}>WATER</button>
        <button onClick={fire}>FIRE</button>
        <button onClick={grass}>GRASS</button>
        <button onClick={ground}>GROUND</button>
        <button onClick={normal}>NORMAL</button>
        <button onClick={fairy}>FAIRY</button>
      </div>
      {type !== 'ALL' && (
        <div>
          {pokemonType && <ul className="home">{pokemonType}</ul>}
          {pokemonType && <h3>ALL POKEMON</h3>}
        </div>
      )}
    </div>
  );
}

export default Filter;

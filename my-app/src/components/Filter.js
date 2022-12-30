import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Filter() {
  const [data, setData] = useState(null);
  const [type, setType] = useState();

  const buttonNodeList = document.querySelectorAll('.btn-container button');
  const buttonArr = Array.from(buttonNodeList);

  function all(e) {
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
        <li key={i} className="card">
          <Link to="pokemon" onClick={onClick}>
            {el.pokemon.name.toUpperCase()}
          </Link>
        </li>
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
          <ul className="home">{pokemonType}</ul>
          <h3>{pokemonType && 'ALL POKEMON'}</h3>
        </div>
      )}
    </div>
  );
}

export default Filter;

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Filter() {
  const [data, setData] = useState(null);
  const [type, setType] = useState('ALL');
  const [active, setActive] = useState({
    active: null,
    buttons: [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ],
  });

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
    console.log('use effect filter');
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((response) => response.json())
      .then((json) => setData(json));
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
        <button onClick={all}>ALL</button>
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

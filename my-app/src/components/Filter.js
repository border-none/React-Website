import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHeartOutline } from 'react-icons/io5';

function Filter() {
  const [data, setData] = useState(null);
  const [type, setType] = useState();
  const [img, setImg] = useState([]);

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

  // useLayoutEffect(() => {
  //   if (data) {
  //     setImg([]);
  //     for (let i = 0; i < 100; i++) {
  //       fetch(`${data.pokemon[i].pokemon.url}`)
  //         .then((response) => response.json())
  //         .then((json) =>
  //           setImg((items) => [...items, json.sprites.front_shiny])
  //         );
  //     }
  //   }
  // }, [data]);

  if (data) {
    // console.log(data.pokemon[0].pokemon.url);
  }

  if (img) {
    // const mappedImg=img.map((el,i)=> {
    //   return (<li key={i}>
    //     <img src="el" alt="" />
    //   </li>)
    // })
  }

  let pokemonType;

  if (data && img) {
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
      {img.map((el, i) => {
        <li key={i}>
          <img src={el} alt="" />
        </li>;
      })}

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

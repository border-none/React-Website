import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import {
  IoShieldOutline,
  IoStarOutline,
  IoAdd,
  IoFlashOutline,
} from 'react-icons/io5';
import { MdSlideshow } from 'react-icons/md';

function Pokemon() {
  const icons = [
    <IoAdd />,
    <IoFlashOutline />,
    <IoShieldOutline />,
    <IoStarOutline />,
  ];

  const clickedPokemon = localStorage.getItem('clickedPokemon');

  const [threeD, setThreeD] = useState(null);
  const [data, setData] = useState({ name: '' });
  const [stat, setStat] = useState(null);

  const imgNodeList = document.querySelectorAll('.pokemon-image');
  const imgArr = Array.from(imgNodeList);

  const prevSlide = () => {
    imgArr.map((el, i) => {
      if (el.classList[1] === 'off') {
        setThreeD(true);
        el.classList.remove('off');
        el.classList.add('on');
      } else {
        setThreeD(false);
        el.classList.remove('on');
        el.classList.add('off');
      }
    });
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    fetch(`data.stats[0].stat.url`).then((json) => setStat(json));
  }, []);

  // console.log(data, 'from Pokemon');

  if (data.name !== '') {
    const pokemonList = data.stats.map((pokemon, i) => {
      return (
        <li key={i}>
          {pokemon.stat.name.toUpperCase()}: {data.stats[i].base_stat}
        </li>
      );
    });
    return (
      <div className="pokemon__container">
        <div className="img-container">
          <img
            src={data.sprites.other['official-artwork'].front_default}
            className="pokemon-image"
            alt="img"
          />
          <img
            src={data.sprites.other.home.front_shiny}
            className="pokemon-image off"
            alt="img"
          />
        </div>
        <h1>{data.name.toUpperCase()}</h1>

        <div className="stat">
          <ul>{pokemonList}</ul>
        </div>
        <div className="types">
          <p>#{[data.types[0]?.type.name]}</p>
          {data.types[1]?.type.name && <p>#{[data.types[1]?.type.name]}</p>}
          <h2 className="threeD" onClick={prevSlide}>
            {threeD ? '3D ON' : '3D OFF'}
          </h2>
        </div>
      </div>
    );
  } else {
    return <h1 className="loading">Loading...</h1>;
  }
}

export default Pokemon;

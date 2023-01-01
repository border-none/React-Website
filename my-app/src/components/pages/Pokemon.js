import { useEffect, useState } from 'react';
import {
  IoShieldOutline,
  IoAdd,
  IoFlashOutline,
  IoTimeSharp,
} from 'react-icons/io5';
import { GiBroadsword, GiHealingShield, GiPointySword } from 'react-icons/gi';
import PokemonImage2D from '../PokemonImage2D';
import PokemonImage3D from '../PokemonImage3D';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import RingLoader from 'react-spinners/ClipLoader';

function Pokemon() {
  const icons = [
    <IoAdd />,
    <GiBroadsword />,
    <IoShieldOutline />,
    <GiPointySword />,
    <GiHealingShield />,
    <IoFlashOutline />,
  ];

  const clickedPokemon = localStorage.getItem('clickedPokemon');

  const [threeD, setThreeD] = useState(null);
  const [data, setData] = useState({ name: '' });
  const [stat, setStat] = useState(null);
  const [liked, setLiked] = useState(null);

  const imgNodeList = document.querySelectorAll('.pokemon-image');
  const imgArr = Array.from(imgNodeList);

  const threeDToggle = () => {
    threeD ? setThreeD(false) : setThreeD(true);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    fetch(`data.stats[0].stat.url`).then((json) => setStat(json));
  }, []);

  function like() {
    const pokeName = document.querySelector('h1').innerText.toLowerCase();
    if (window.localStorage.getItem('favorites')) {
      setLiked(true);
      const current = JSON.parse(window.localStorage.getItem('favorites'));
      const liked = [...current, pokeName];

      window.localStorage.setItem('favorites', JSON.stringify(liked));
    } else {
      setLiked(true);
      window.localStorage.setItem('favorites', JSON.stringify([pokeName]));
    }
  }

  function dislike() {
    setLiked(false);
    const pokeName = document.querySelector('h1').innerText.toLowerCase();
    window.localStorage.removeItem('favorites', pokeName);
  }

  if (data.name !== '') {
    const pokemonList = data.stats.map((pokemon, i) => {
      return (
        <li key={i}>
          {pokemon.stat.name.toUpperCase()}: {data.stats[i].base_stat}
        </li>
      );
    });
    const pokemonListWithIcons = pokemonList.map((el, i) => {
      return (
        <div className="stat-icons--container" key={i}>
          {icons[i]} {el}
        </div>
      );
    });

    return (
      <>
        <div className="pokemon__container">
          {liked ? (
            <IoHeartSharp onClick={dislike} className="like-btn red" />
          ) : (
            <IoHeartOutline onClick={like} className="like-btn" />
          )}
          <div className="img-container on" onClick={threeDToggle}>
            {threeD ? (
              <PokemonImage2D data={data} />
            ) : (
              <PokemonImage3D data={data} />
            )}
          </div>
          <h1>{data.name.toUpperCase()}</h1>
          <div className="stat">
            <ul>{pokemonListWithIcons}</ul>
          </div>
          <div className="types">
            <p>{[data.types[0]?.type.name]}</p>
            {data.types[1]?.type.name && <p>{[data.types[1]?.type.name]}</p>}
          </div>
        </div>
        <h2 className="threeD" onClick={threeDToggle}>
          {threeD ? '3D OFF' : '3D ON'}
        </h2>
      </>
    );
  } else {
    return (
      <h1 className="loading">
        <RingLoader />
      </h1>
    );
  }
}

export default Pokemon;

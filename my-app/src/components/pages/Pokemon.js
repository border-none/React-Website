import { useEffect, useState } from 'react';
import { IoShieldOutline, IoAdd, IoFlashOutline } from 'react-icons/io5';
import { GiBroadsword, GiHealingShield, GiPointySword } from 'react-icons/gi';
import PokemonImage2D from '../PokemonImage2D';
import PokemonImage3D from '../PokemonImage3D';

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
      <div className="pokemon__container">
        <div className="img-container on">
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
          <h2 className="threeD" onClick={threeDToggle}>
            {threeD ? '3D OFF' : '3D ON'}
          </h2>
        </div>
      </div>
    );
  } else {
    return <h1 className="loading">Loading...</h1>;
  }
}

export default Pokemon;

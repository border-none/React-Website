import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

function Pokemon({ id }) {
  const [pokemon, setPokemon] = useContext(UserContext);
  const clickedPokemon = localStorage.getItem('clickedPokemon');
  console.log(
    `https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`,
    'from Pokemon 🎈'
  );
  const [data, setData] = useState({
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    type: '',
  });
  const [stat, setStat] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    fetch(`data.stats[0].stat.url`).then((json) => setStat(json));
  }, []);

  console.log(data);

  if (data.name !== '') {
    // const statsList = data.stats.map((el, i) => <p>{el.stats[i].stat.name}</p>);
    // console.log(statsList);
    // const arr = data.stats;
    // const mapped = arr.map((obj, i) => {
    //   return obj[1];
    // });
    // console.log(arr);
    // console.log(mapped);
    // console.log(data.stats);
    return (
      <div className="pokemon__container">
        <img
          src={data.sprites.other['official-artwork'].front_default}
          className="pokemon-image"
          alt="img"
        />
        <h1>{data.name.toUpperCase()}</h1>
        <div className="stat">
          <p>
            {data.stats[0].stat.name.toUpperCase()}: {data.stats[0].base_stat}
          </p>
          <p>
            {data.stats[1].stat.name.toUpperCase()}: {data.stats[1].base_stat}
          </p>
          <p>
            {data.stats[2].stat.name.toUpperCase()}: {data.stats[2].base_stat}
          </p>
          <p>
            {data.stats[3].stat.name.toUpperCase()}: {data.stats[3].base_stat}
          </p>
        </div>
        <div className="types">
          <p>#{[data.types[0]?.type.name]}</p>
          {data.types[1]?.type.name && <p>#{[data.types[1]?.type.name]}</p>}
        </div>
      </div>
    );
  } else {
    return <h1 className="loading">Loading...</h1>;
  }
}

export default Pokemon;

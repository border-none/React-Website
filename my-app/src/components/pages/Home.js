import { useEffect, useState } from 'react';
import Search from '../Search';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Home(props) {
  const [data, setData] = useState(null);
  const [pokemon, setPokemon] = useContext(UserContext);

  useEffect(
    () =>
      async function fetchData() {
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
          .then((response) => response.json())
          .then((json) => setData(json.results));
      },
    []
  );

  console.log(pokemon);

  function onClick(e) {
    localStorage.setItem('clickedPokemon', e.target.firstChild.data);
    setPokemon(e.target.firstChild.data);
    console.log(pokemon);
  }

  if (data) {
    // console.log(data[0].url);

    const pokemon = data.map((pokemon, i) => (
      <li className="card" key={i}>
        <a href="pokemon" onClick={onClick}>
          {pokemon.name}
        </a>
      </li>
    ));

    return (
      <>
        <div className="container">
          <Search placeholder="search pokemon..." data={data} />
          <ul className="home">{pokemon}</ul>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className="loading">Loading...</h1>
      </>
    );
  }
}

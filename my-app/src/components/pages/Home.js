import { useEffect, useState } from 'react';
import Search from '../Search';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

export default function Home(props) {
  const [data, setData] = useState(null);

  useEffect(
    () =>
      async function fetchData() {
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
          .then((response) => response.json())
          .then((json) => setData(json.results));
      },
    []
  );

  function onClick(e) {
    localStorage.setItem('clickedPokemon', e.target.firstChild.data);
  }

  if (data) {
    // console.log(data[0].url);

    const pokemon = data.map((pokemon, i) => (
      <li className="card" key={i}>
        <Link to="pokemon" onClick={onClick}>
          {pokemon.name}
        </Link>
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

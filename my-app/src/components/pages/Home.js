import { useEffect, useLayoutEffect, useState } from 'react';
import Search from '../Search';
import { Link } from 'react-router-dom';
import Filter from '../Filter';
import { IoHeartOutline } from 'react-icons/io5';

export default function Home(props) {
  const [data, setData] = useState(null);
  const [arr, setArr] = useState([]);

  useEffect(
    () =>
      async function fetchData() {
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
          .then((response) => response.json())
          .then((json) => setData(json.results));
      },
    []
  );

  // useEffect(() => {
  //   for (let i = 0; i < 100; i++) {
  //     fetch(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
  //       .then((response) => response.json())
  //       .then((json) => setArr(arr + json.url));
  //   }
  // }, []);

  // console.log(arr);

  function onClick(e) {
    localStorage.setItem('clickedPokemon', e.target.firstChild.data);
  }

  if (data) {
    const pokemon = data.map((pokemon, i) => (
      <li className="card" key={i}>
        <Link to="pokemon" onClick={onClick}>
          {pokemon.name}
        </Link>
        {<IoHeartOutline />}
      </li>
    ));

    return (
      <>
        <div className="container">
          <Search placeholder="search pokemon..." data={data} />
          <Filter />
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

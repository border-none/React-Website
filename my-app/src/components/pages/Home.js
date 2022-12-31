import { useEffect, useLayoutEffect, useState } from 'react';
import Search from '../Search';
import { Link } from 'react-router-dom';
import Filter from '../Filter';
import { IoHeartOutline } from 'react-icons/io5';
import Pagination from '../Pagination';

export default function Home(props) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [arr, setArr] = useState([]);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(
    () =>
      async function fetchData() {
        await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`
        )
          .then((response) => response.json())
          .then((json) => setData(json.results));
      },
    [page]
  );

  useLayoutEffect(() => {
    if (data) {
      for (let i = 0; i < 100; i++) {
        fetch(`${data[i].url}`)
          .then((response) => response.json())
          .then((json) => setArr((items) => [...items, json]));
      }
    }
  }, [data]);

  ///
  // if (arr) {
  //   const pokemonImg = arr.map((el, i) => {
  //     console.log(el.sprites.front_default);
  //   });
  // }

  function onClick(e) {
    localStorage.setItem('clickedPokemon', e.target.firstChild?.data);
    console.log(e.target);
  }

  if (data && arr) {
    const pokemonImg = arr.map((el, i) => {
      return <img src={el.sprites.front_shiny} />;
    });

    const pokemon = data.map((pokemon, i) => (
      <Link to="pokemon" key={i}>
        <li className="card" onClick={onClick}>
          <div className="poke-name">{pokemon.name}</div>
          <div>{pokemonImg[i]}</div>
          {<IoHeartOutline />}
        </li>
      </Link>
    ));

    return (
      <>
        <div className="container">
          <Search placeholder="search pokemon..." data={data} />
          <Filter />
          <ul className="home">{pokemon}</ul>
          <Pagination
            offset={offset}
            setOffset={setOffset}
            page={page}
            setPage={setPage}
          />
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

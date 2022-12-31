import { useEffect, useLayoutEffect, useState } from 'react';
import Search from '../Search';
import { Link } from 'react-router-dom';
import Filter from '../Filter';
import { IoHeartOutline } from 'react-icons/io5';
import Pagination from '../Pagination';
import RingLoader from 'react-spinners/ClipLoader';

export default function Home(props) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);

  const offset = String(page - 1).padEnd(3, '0');

  useEffect(
    () =>
      async function fetchData() {
        setArr([]);
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

  function onClick(e) {
    if (e.target.firstChild.data) {
      localStorage.setItem('clickedPokemon', e.target.firstChild?.data);
    }

    // forms[0.name]
  }

  function onClickImage(e) {
    const name =
      e.nativeEvent.path[1].parentNode.firstChild.innerText.toLowerCase();

    localStorage.setItem('clickedPokemon', name);
  }

  if (data && arr) {
    const pokemonImg = arr.map((el) => {
      return (
        <img className="pokemon-img-on-card" src={el.sprites.front_shiny} />
      );
    });

    const pokemon = data.map((pokemon, i) => (
      <Link to="pokemon" key={i}>
        <li className="card">
          <div onClick={onClick} className="poke-name">
            {pokemon.name}
          </div>
          <div onClick={onClickImage}>
            {pokemonImg[i] ? pokemonImg[i] : <RingLoader />}
          </div>
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
          <Pagination page={page} setPage={setPage} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className="loading">
          <RingLoader />
        </h1>
      </>
    );
  }
}

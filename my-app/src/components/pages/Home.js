import { useEffect, useLayoutEffect, useState } from 'react';
import Search from '../Search';
import { Link } from 'react-router-dom';
import Filter from '../Filter';
import { IoHeartOutline } from 'react-icons/io5';
import Pagination from '../Pagination';
import RingLoader from 'react-spinners/ClipLoader';
import LikeButton from '../LikeButton';

export default function Home(props) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);

  const offset = String(page - 1).padEnd(3, '0');

  useEffect(() => {
    setTimeout(() => {
      setArr([]);
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
        .then((response) => response.json())
        .then((json) => setData(json.results));
    }, 500);
  }, [page]);

  useLayoutEffect(() => {
    let sub;
    if (!sub) {
      if (data) {
        setTimeout(() => {
          for (let i = 0; i < 100; i++) {
            fetch(`${data[i]?.url}`)
              .then((response) => response.json())
              .then((json) => setArr((items) => [...items, json]));
          }
        }, 500);
      }
    }
    return () => {
      sub = false;
    };
  }, [data]);

  function onClick(e) {
    if (e.target.firstChild.data) {
      localStorage.setItem('clickedPokemon', e.target.firstChild?.data);
    }
  }

  function onClickImage(e) {
    const name =
      e.nativeEvent.path[1].parentNode.firstChild.innerText.toLowerCase();

    localStorage.setItem('clickedPokemon', name);
  }

  if (data && arr) {
    const pokemonImg = arr.map((el) => {
      return (
        <>
          <img className="pokemon-img-on-card" src={el.sprites.front_shiny} />
          <img className="pokemon-img-on-card" src={el.sprites.front_shiny} />
        </>
      );
    });

    const pokemon = data.map((pokemon, i) => (
      <Link to="pokemon" key={i}>
        <li className="card">
          <div onClick={onClick} className="poke-name">
            {pokemon.name}
          </div>
          <div onClick={onClickImage}>
            {pokemonImg[i] ? (
              pokemonImg[i]
            ) : (
              <RingLoader className="ringloader" />
            )}
          </div>
        </li>
      </Link>
    ));

    return (
      <>
        <div className="container">
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
          <RingLoader className="ringloader" />
        </h1>
      </>
    );
  }
}

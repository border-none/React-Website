import { useEffect, useLayoutEffect, useState } from 'react';
import Search from '../Search';
import { Link } from 'react-router-dom';
import Filter from '../Filter';
import { IoHeartOutline } from 'react-icons/io5';
import Pagination from '../Pagination';
import RingLoader from 'react-spinners/ClipLoader';

export default function Home(props) {
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(false);
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

  // function like(e) {
  //   const likedPokemon =
  //     e.target.parentNode.nextElementSibling.childNodes[0].innerHTML;

  //   const favArr = JSON.parse(window.localStorage.getItem('favorites'));
  //   console.log(favArr);

  //   if (favArr === null) {
  //     setLiked(true);
  //     window.localStorage.setItem('favorites', JSON.stringify([likedPokemon]));
  //   } else {
  //     setLiked(true);
  //     window.localStorage.setItem(
  //       'favorites',
  //       JSON.stringify([likedPokemon, ...favArr])
  //     );
  //   }
  // }

  // function dislike(e) {
  //   const likedPokemon =
  //     e.target.parentNode.nextElementSibling.childNodes[0].innerHTML;

  //   const favArr = JSON.parse(window.localStorage.getItem('favorites'));

  //   const i = favArr.indexOf(likedPokemon);
  //   console.log(i);
  //   setLiked(false);
  //   favArr.splice(i, 1);
  //   window.localStorage.setItem('favorites', JSON.stringify([...favArr]));
  // }

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
      <div className="card-container">
        <li className="card">
          {/* <div className="card__like-btn">
            {liked ? (
              <IoHeartOutline className="like-btn red" onClick={dislike} />
            ) : (
              <IoHeartOutline className="like-btn" onClick={like} />
            )}
          </div> */}
          <Link to="pokemon" key={i}>
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
          </Link>
        </li>
      </div>
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

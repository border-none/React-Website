import { useEffect, useLayoutEffect, useState } from 'react';
import Search from '../Search';
import { Link } from 'react-router-dom';
import Filter from '../Filter';
import { IoHeartOutline } from 'react-icons/io5';
import Pagination from '../Pagination';

export default function Home(props) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [arr, setArr] = useState({
    0: '',
  });
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  console.log(offset);

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

  // useEffect(() => {
  //   if (data) {
  //     for (let i = 0; i < 100; i++) {
  //       fetch(`${data[i].url}`)
  //         .then((response) => response.json())
  //         .then((json) => setArr({ i: json }));
  //     }
  //   }
  // }, []);

  // if (arr) {
  //   console.log(arr, ':D');
  // }

  function onClick(e) {
    localStorage.setItem('clickedPokemon', e.target.firstChild.data);
  }

  function like() {
    //
  }

  if (data) {
    const pokemon = data.map((pokemon, i) => (
      <Link to="pokemon" onClick={onClick} key={i}>
        <li className="card">
          {pokemon.name}
          {<IoHeartOutline onClick={like} />}
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

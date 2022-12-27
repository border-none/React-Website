import { useEffect, useState } from 'react';

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

  if (data) {
    // console.log(data[0].url);

    const pokemon = data.map((pokemon, i) => (
      <li className="card" key={i}>
        {pokemon.name}
      </li>
    ));

    return (
      <>
        <div className="container">
          <ul className="home">{pokemon}</ul>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
}

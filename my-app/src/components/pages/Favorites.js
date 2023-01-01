import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [data, setData] = useState([]);

  const favArr =
    window.localStorage.getItem('favorites') &&
    JSON.parse(window.localStorage.getItem('favorites'));

  useEffect(() => {
    if (favArr) {
      for (let i = 0; i < favArr?.length; i++) {
        console.log(favArr[i]);
        fetch(`https://pokeapi.co/api/v2/pokemon/${favArr[i]}`)
          .then((response) => response.json())
          .then((json) =>
            setData(() => {
              if (favArr.length !== 1) {
                return [...data, json];
              }
              return [json];
            })
          );
      }
    }
  }, []);
  console.log(favArr, 'data from local storage');
  console.log(data, 'fetched data');

  function clearLikes() {
    window.localStorage.removeItem('favorites');
    setData(false);
  }

  return (
    <>
      <div className="fav">
        <h1>
          {IoHeartOutline()} Favorite pokemons of{' '}
          {window.localStorage.getItem('user') &&
            window.localStorage.getItem('user')}
        </h1>
        <h2>
          {favArr?.map((el) => (
            <li className="card">{el}</li>
          ))}
        </h2>
        <div>
          <ul className="home">
            {data &&
              data.map((el, i) => {
                return (
                  <li className="card" key={i}>
                    <div className="poke-name">{el.name}</div>
                    <img src={el.sprites.front_shiny} alt="" />
                  </li>
                );
              })}
          </ul>
        </div>
        {favArr && <button onClick={clearLikes}>DELETE ALL LIKES</button>}
      </div>
    </>
  );
}

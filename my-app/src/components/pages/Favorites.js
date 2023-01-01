import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [data, setData] = useState(false);
  // const [favPokemons,setFavPokemons]=useState(null)

  const favArr = JSON.parse(window.localStorage.getItem('favorites'));
  console.log(favArr, 'fav');
  useEffect(() => {
    if (data.length >= favArr?.length) {
      return;
    }
    if (favArr) {
      for (let i = 0; i < favArr?.length; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${favArr[i]}`)
          .then((response) => response.json())
          .then((json) =>
            setData((items) => {
              console.log(items, 'items');
              if (favArr.length === 1) {
                return [...items, json];
              }
              return [json];
            })
          );
      }
    }
  }, []);

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
        {data && <button onClick={clearLikes}>DELETE ALL LIKES</button>}
      </div>
    </>
  );
}

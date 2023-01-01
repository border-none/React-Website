import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import LikeButton from '../LikeButton';
import { Link } from 'react-router-dom';

export default function Favorites() {
  console.log('START \n START \n GO');
  const [data, setData] = useState(null);

  const favArr =
    window.localStorage.getItem('favorites') &&
    JSON.parse(window.localStorage.getItem('favorites'));

  let container = [];
  function push(json) {
    console.log(json.name, '🍕\n lol lol !!!!!! this is incoming json');
    if (data) {
      return setData([...data, json.name]);
    }
    return setData([json.name]);
  }

  useEffect(() => {
    if (favArr) {
      for (const [i, pokemon] of favArr.entries()) {
        console.log('fetching', pokemon);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then((response) => response.json())
          .then((json) => push(json));
      }
    }
  }, []);

  console.log(data, '! \n THIS IS DATA');
  setTimeout(() => {
    console.log(data, '! \n THIS IS DATA');
  }, 1000);

  function clearLikes() {
    window.localStorage.removeItem('favorites');
    setData(false);
  }

  function onClick(e) {
    localStorage.setItem(
      'clickedPokemon',
      e.target.firstChild.data.toLowerCase()
    );
  }

  return (
    <>
      {favArr ? (
        <div className="fav">
          <h1>
            {IoHeartOutline()} Favorite pokemons of{' '}
            {window.localStorage.getItem('user') &&
              window.localStorage.getItem('user')}
          </h1>
          <div>
            <h2 className="likes-container">
              {favArr?.map((el, i) => (
                <Link to="../pokemon" onClick={onClick} key={i}>
                  <li className="card" key={i}>
                    {el}
                  </li>
                </Link>
              ))}
            </h2>
            <div>
              <ul className="">
                {/* {data &&
                  data.map((el, i) => {
                    return (
                      <li className="card" key={i}>
                        <div className="poke-name">{el}</div>
                        <img src={el.sprites.front_shiny} alt="" />
                      </li>
                    );
                  })} */}
              </ul>
            </div>
          </div>
          <button onClick={clearLikes}>DELETE ALL LIKES</button>
        </div>
      ) : (
        <div className="fav">
          <h2>YOUR LIKED POKEMONS WILL BE DISPLAYED HERE</h2>
          <h1>GO LIKE SOME!</h1>
        </div>
      )}
    </>
  );
}

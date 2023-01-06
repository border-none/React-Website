import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [modal, setModal] = useState(null);

  const favArr =
    window.localStorage.getItem('favorites') &&
    JSON.parse(window.localStorage.getItem('favorites'));

  let pokemonName = [];
  let pokemonImg = [];

  function push(json) {
    if (
      favArr.length === pokemonName.length ||
      pokemonName.includes(json.name)
    ) {
      return;
    }
    setImg([]);
    setData([]);

    pokemonName = [...pokemonName, json.name];

    pokemonImg = [...pokemonImg, json.sprites.front_shiny];

    setData(pokemonName);
    setImg(pokemonImg);
  }

  useEffect(() => {
    if (favArr) {
      setData([]);
      setImg([]);
      for (const pokemon of favArr) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then((response) => response.json())
          .then((json) => push(json));
      }
    }
  }, []);

  function clearLikes() {
    window.localStorage.removeItem('favorites');
    setData(false);
  }

  function onClick(e) {
    localStorage.setItem(
      'clickedPokemon',
      e.target.parentNode.firstChild.innerText.toLowerCase()
    );
  }

  function onClickImage(e) {
    const name =
      e.nativeEvent.path[1].parentNode.firstChild.innerText.toLowerCase();

    localStorage.setItem('clickedPokemon', name);
  }

  return (
    <>
      {favArr ? (
        <div className="fav">
          <h1>
            {<IoHeartOutline />} {favArr.length} Favorite pokemon
            {favArr.length === 1 ? '' : 's'} of{' '}
            {window.localStorage.getItem('user') &&
              window.localStorage.getItem('user')}
          </h1>
          <div className="fav-container">
            <div>
              <ul className="home">
                {data &&
                  data.map((el, i) => {
                    return (
                      <Link to="../pokemon" onClick={onClick} key={i}>
                        <li className="card" key={i}>
                          <div className="poke-name">{el}</div>
                          {img ? (
                            <>
                              <img src={img[i]} onClick={onClickImage} alt="" />
                              <img src={img[i]} onClick={onClickImage} alt="" />
                            </>
                          ) : (
                            'Loading'
                          )}
                        </li>
                      </Link>
                    );
                  })}
              </ul>
            </div>
          </div>
          <button onClick={clearLikes}>DELETE ALL LIKES</button>
        </div>
      ) : (
        <div className="fav gap">
          <h2>YOUR LIKED POKEMONS WILL BE DISPLAYED HERE</h2>
          <h1>GO LIKE SOME!</h1>
          <Link to="/">
            <h1 className="active">
              <IoHomeOutline /> HOME
            </h1>
          </Link>
        </div>
      )}
    </>
  );
}

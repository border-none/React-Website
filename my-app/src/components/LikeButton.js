import { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

function LikeButton(props) {
  const [liked, setLiked] = useState(null);
  const [includes, setIncludes] = useState(null);

  const favorites = window.localStorage.getItem('favorites');

  const favoritesArr = JSON.parse(window.localStorage.getItem('favorites'));

  let currentPokemonName;
  currentPokemonName = document.querySelector('h1').innerText.toLowerCase();

  useEffect(() => {
    currentPokemonName = document.querySelector('h1').innerText.toLowerCase();
    setIncludes(favorites?.includes(currentPokemonName));
    if (includes || favorites?.includes(currentPokemonName)) {
      setLiked(true);
    }
  }, []);

  function like() {
    if (favorites) {
      const likedPokemonsArray = JSON.parse(favorites);

      setLiked(true);
      const result = [currentPokemonName, ...likedPokemonsArray];
      window.localStorage.setItem('favorites', JSON.stringify(result));
    } else {
      setLiked(true);
      window.localStorage.setItem(
        'favorites',
        JSON.stringify([currentPokemonName])
      );
    }
  }

  function dislike() {
    setLiked(false);
    const currentPokemonName = document
      .querySelector('h1')
      .innerText.toLowerCase();
    window.localStorage.removeItem('favorites', currentPokemonName);

    for (let i = 0; i < favoritesArr.length; i++) {
      console.log('loop started', favoritesArr, favoritesArr.length);
      if (favoritesArr[i] === currentPokemonName) {
        console.log(favoritesArr[i], 'looping through this name');

        setLiked(false);
        favoritesArr.splice(i, 1);
        window.localStorage.setItem('favorites', JSON.stringify(favoritesArr));
      }
    }
  }

  console.log('---------------------------');
  console.log(currentPokemonName, 'cur name');
  console.log(favoritesArr, 'array of liked pokemon');
  console.log(favorites?.includes(currentPokemonName), 'includes?');
  console.log('---------------------------');
  // includes || favorites?.includes(currentPokemonName)
  return (
    <>
      {liked ? (
        <IoHeartSharp onClick={dislike} className="like-btn red" />
      ) : (
        <IoHeartOutline onClick={like} className="like-btn" />
      )}{' '}
    </>
  );
}

export default LikeButton;

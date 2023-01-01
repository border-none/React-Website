import { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

function LikeButton(props) {
  const [liked, setLiked] = useState(null);

  // if (
  //   window.localStorage
  //     .getItem('favorites')
  //     .includes(document.querySelector('h1').innerText.toLowerCase())
  // ) {
  //   setLiked(liked);
  // }

  function like() {
    const likedPokemonName = document
      .querySelector('h1')
      .innerText.toLowerCase();
    if (window.localStorage.getItem('favorites')) {
      const likedPokemonsArray = JSON.parse(
        window.localStorage.getItem('favorites')
      );
      if (likedPokemonsArray.includes(likedPokemonName)) {
        dislike();
        return;
      }
      setLiked(true);
      const result = [...likedPokemonsArray, likedPokemonName];
      window.localStorage.setItem('favorites', JSON.stringify(result));
    } else {
      setLiked(true);
      window.localStorage.setItem(
        'favorites',
        JSON.stringify([likedPokemonName])
      );
    }
  }

  function dislike() {
    setLiked(false);
    const likedPokemonName = document
      .querySelector('h1')
      .innerText.toLowerCase();
    window.localStorage.removeItem('favorites', likedPokemonName);
  }

  return (
    <>
      {window.localStorage
        .getItem('favorites')
        ?.includes(document.querySelector('h1').innerText.toLowerCase()) ? (
        <IoHeartSharp onClick={dislike} className="like-btn red" />
      ) : (
        <IoHeartOutline onClick={like} className="like-btn" />
      )}
    </>
  );
}

export default LikeButton;

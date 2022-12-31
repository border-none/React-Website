import { useEffect, useLayoutEffect } from 'react';

function PokemonImages(props) {
  useEffect(() => {
    console.log('effect (images) from separate component');
    if (props.data) {
      for (let i = 0; i < 100; i++) {
        fetch(`${props.data[i].url}`)
          .then((response) => response.json())
          .then((json) => props.setArr((items) => [...items, json]));
      }
    }
  }, []);

  return (
    <>
      {props.arr.map((el, i) => {
        <img src={el.sprites.front_shiny} />;
      })}
    </>
  );
}

export default PokemonImages;

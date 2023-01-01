import RingLoader from 'react-spinners/ClipLoader';

function PokemonImage2D({ data }) {
  return (
    <>
      {data.sprites.other['official-artwork'].front_default ? (
        <img
          src={data.sprites.other['official-artwork'].front_default}
          className="pokemon-image"
          alt="img"
        />
      ) : (
        <RingLoader />
      )}
    </>
  );
}

export default PokemonImage2D;

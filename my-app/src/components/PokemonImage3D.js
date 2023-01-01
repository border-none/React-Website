import RingLoader from 'react-spinners/ClipLoader';

function PokemonImage3D({ data }) {
  return (
    <>
      {data.sprites.other.home.front_shiny ? (
        <img
          src={data.sprites.other.home.front_shiny}
          className="pokemon-image"
          alt="img"
        />
      ) : (
        <RingLoader />
      )}
    </>
  );
}

export default PokemonImage3D;

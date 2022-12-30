function PokemonImage3D({ data }) {
  return (
    <>
      <img
        src={data.sprites.other.home.front_shiny}
        className="pokemon-image"
        alt="img"
      />
    </>
  );
}

export default PokemonImage3D;

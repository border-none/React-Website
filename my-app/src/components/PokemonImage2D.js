function PokemonImage2D({ data }) {
  return (
    <>
      <img
        src={data.sprites.other['official-artwork'].front_default}
        className="pokemon-image"
        alt="img"
      />
    </>
  );
}

export default PokemonImage2D;

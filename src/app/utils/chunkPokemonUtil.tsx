type Pokemon = {
  name: string;
  abilities: [];
  stats: [];
  moveSet: [];
  isShiny: boolean;
  defaultImage: string;
  shinyImage: string;
  id: number;
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  complete: boolean;
};

export const chunkPokemon = (
  pokemon: Pokemon[],
  chunksize: number
): Pokemon[][] => {
  if (!pokemon.length) return [];
  const head = pokemon.slice(0, chunksize);
  const tail = pokemon.slice(chunksize);
  return [head, ...chunkPokemon(tail, chunksize)];
};

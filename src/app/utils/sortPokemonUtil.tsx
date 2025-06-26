export const sortPokemon = (
  unsortedPokemon: {
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
  }[],
  sortType: string
) => {
  const sortedPokemon = [...unsortedPokemon];
  switch (sortType) {
    case 'Pokedex Number':
      sortedPokemon.sort((aa, bb) => aa?.id - bb?.id);
      return sortedPokemon;
    case 'Name':
      sortedPokemon.sort((aa, bb) => {
        const aaName = aa.name.toLowerCase();
        const bbName = bb.name.toLowerCase();
        return aaName < bbName ? -1 : aaName > bbName ? 1 : 0;
      });
      return sortedPokemon;
    case 'Type':
      sortedPokemon.sort((aa, bb) => {
        const aaType1 = aa?.types[0].type.name;
        const bbType1 = bb?.types[0].type.name;
        const aaType2 = aa?.types[1] ? aa?.types[1].type.name : '';
        const bbType2 = bb?.types[1] ? bb?.types[1].type.name : '';
        return aaType1 < bbType1
          ? -1
          : aaType1 > bbType1
          ? 1
          : aaType2 < bbType2
          ? -1
          : aaType2 > bbType2
          ? 1
          : 0; //I'm so sorry for this abomination
      });
      return sortedPokemon;
    case 'Weight':
      sortedPokemon.sort((aa, bb) => aa?.weight - bb?.weight);
      return sortedPokemon;
    case 'Height':
      sortedPokemon.sort((aa, bb) => aa?.height - bb?.height);
      return sortedPokemon;
    default:
      console.log('brokey');
      return sortedPokemon;
  }
};

export const getPillColor = (type: string) => {
  switch (type) {
    case 'normal':
      return '#A1A1A1';
    case 'fire':
      return '#D43A30';
    case 'fighting':
      return '#F08833';
    case 'water':
      return '#4C79BC';
    case 'flying':
      return '#8FB8E4';
    case 'grass':
      return '#5D9D3C';
    case 'poison':
      return '#734D9A';
    case 'electric':
      return '#F2C341';
    case 'ground':
      return '#895229';
    case 'psychic':
      return '#DC4D79';
    case 'rock':
      return '#ADA984';
    case 'ice':
      return '#78CCF0';
    case 'bug':
      return '#95A135';
    case 'dragon':
      return '#4C60A9';
    case 'ghost':
      return '#6B426E';
    case 'dark':
      return '#4E403F';
    case 'steel':
      return '#74A2B9';
    case 'fairy':
      return '#BA7FB5';
    default:
      return '#000000';
  }
};
export const getBackground = (type: string) => {
  return '/resources/' + type + '.jpg';
};
const whiteFontTypes = ['dark', 'psychic'];
export const getColor = (type: string) =>
  whiteFontTypes.includes(type) ? 'white' : 'black';

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

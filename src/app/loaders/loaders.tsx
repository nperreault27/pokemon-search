/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { chunkPokemon } from '../utils/chunkPokemonUtil';

export const api = async (url: string) => {
  const response = await fetch(url)
    .then((result) => result.json())
    .catch((error) => console.log(error));
  return response;
};
const filterFlavorText = (flavorTextEntries: any[]) => {
  return flavorTextEntries?.filter(
    (flavor_text: { language: { name: string } }) =>
      flavor_text.language.name === 'en'
  )[0].flavor_text;
};

const moveMap = new Map();
export const getMoveSet = async (moves: string | any[]) => {
  const moveSet = new Array<{
    name: string;
    flavorText: string;
    type: string;
  }>();
  if (moves[1] === undefined) {
    return [];
  }
  while (moveSet.length < 4 && moveSet.length < moves.length) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    const newMove =
      moveMap.get(moves[randomIndex]?.move.name) ??
      (await api(moves[randomIndex]?.move.url)
        .then((data) => {
          const { name, flavor_text_entries, type } = data;
          const flavorText = filterFlavorText(flavor_text_entries);
          return { name, flavorText, type: type.name };
        })
        .catch((error) => error));
    if (moveMap.get(newMove.name) === undefined) {
      moveMap.set(newMove.name, newMove);
    }
    if (
      newMove !== undefined &&
      !moveSet.some((move) => newMove.name === move.name)
    ) {
      moveSet.push(newMove);
    }
  }
  return [...moveSet];
};
const abilityMap = new Map();
export const getAbilities = async (abilities: any[]) => {
  const abil = await Promise.all(
    abilities.map(
      async (ability: { ability: { name: string; url: string } }) => {
        const abil =
          abilityMap.get(ability.ability.name) ??
          (await api(ability.ability.url));
        if (abilityMap.get(abil.name) === undefined) {
          abilityMap.set(abil.name, abil);
        }
        return {
          name: abil.name,
          flavorText: filterFlavorText(abil.flavor_text_entries),
        };
      }
    )
  ).catch((error) => {
    console.log(error);
    return [];
  });

  return abil;
};
export const completePokemon = async (pokemon: any) => {
  const pokemon2 = [...pokemon];
  return await Promise.all(
    pokemon2.map(async (poke) => {
      poke.abilities = await getAbilities(poke.abilities);
      poke.moveSet = await getMoveSet(poke.moveSet[0]);
      poke.complete = true;
      return poke;
    })
  );
};

export const getPokemon = async (url: string) => {
  const data = await api(url).catch((error) => {
    console.log(error);
    return null;
  });
  if (!data) return null;
  return {
    name: data.name,
    abilities: data.abilities,
    stats: data.stats,
    moveSet: [data.moves],
    isShiny: Math.random() > 0.9,
    defaultImage: data.sprites.front_default,
    shinyImage: data.sprites.front_shiny,
    id: data.id,
    types: data.types,
    height: data.height,
    weight: data.weight,
    complete: false,
  };
};

export const batchUpdatePokemon = async (poke: any[], setPokemon: Function) => {
  const chunkedPokemon = chunkPokemon(poke, 326);
  setPokemon(
    await completePokemon(chunkedPokemon[0])
      .then(async (result) =>
        result.concat(await completePokemon(chunkedPokemon[1]))
      )
      .then(async (result) =>
        result.concat(await completePokemon(chunkedPokemon[2]))
      )
      .then(async (result) =>
        result.concat(await completePokemon(chunkedPokemon[3]))
      )
  );
};

export const getAllPokemon = async (
  offset: number,
  limit: number,
  setPokemon: Function
) => {
  const pokemonList = await api(
    'https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset
  ).then((result) => result.results);
  const poke = await Promise.all(
    pokemonList.map((pokemon: { url: string }) => {
      return getPokemon(pokemon.url);
    })
  );
  batchUpdatePokemon(poke, setPokemon);
  return poke;
};

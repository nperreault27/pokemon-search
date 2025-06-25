'use client';
import {useContext, useEffect, useState} from 'react';
import { getAllPokemon } from './loaders';
import PokemonCard from './pokemonCard';
import { Flex, Pagination, ScrollArea, Stack } from '@mantine/core';
import { chunkPokemon, sortPokemon } from './utils';
import {FiltersContext} from "@context/FiltersProvider";

export const PokemonSearchResults = (props: {
  sort: string;
  toWrap: boolean;
}) => {
  const { sort, toWrap } = props;
  const { filters } = useContext(FiltersContext)
  const intersection = (
    pokemon: {
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
    },
    filter: string[]
  ) => {
    const arrayOveralap = pokemon.types.filter((type) =>
      filter.includes(type.type.name)
    );
    return arrayOveralap.length > 0;
  };
  const [pokemon, setPokemon] = useState(
    Array<{
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
    }>
  );
  const [paginatedPokemon, setPaginatedPokemon] = useState(
    Array<
      Array<{
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
      }>
    >
  );
  const [activePage, setActivePage] = useState(1);
  const [renderPagnation, setRenderPagnation] = useState(false);
  useEffect(() => {
    const { fuzzyFilter, origionalFilter, typeFilter, chunkSize } = filters;
    setActivePage(1);
    const lowerCaseTypeFilter = typeFilter.map((type) => type.toLowerCase());
    const filterPokemon = (
      pokemon: Array<{
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
      }>
    ) => {
      const fuzzyFilteredPokemon =
        fuzzyFilter !== ''
          ? pokemon.filter((pokemon) => {
              return pokemon.name.toLowerCase().includes(fuzzyFilter);
            })
          : pokemon;
      const origionalFilteredPokemon = origionalFilter
        ? fuzzyFilteredPokemon.filter((pokemon) => pokemon.id <= 151)
        : fuzzyFilteredPokemon;
      const typeFilteredPokemon =
        typeFilter[0] !== undefined
          ? origionalFilteredPokemon.filter((pokemon) =>
              intersection(pokemon, lowerCaseTypeFilter)
            )
          : origionalFilteredPokemon;
      return typeFilteredPokemon;
    };
    const sortedPokemon = sortPokemon(filterPokemon(pokemon), sort);
    if (chunkSize === 0 || !chunkSize) {
      setPaginatedPokemon([sortedPokemon]);
      setRenderPagnation(false);
      return;
    }
    setRenderPagnation(true);
    setPaginatedPokemon(chunkPokemon(sortedPokemon, chunkSize));
  }, [filters, pokemon, sort]);
  useEffect(() => {
    getAllPokemon(0, 1302, setPokemon)
      .then((result) => setPokemon(result))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const data = paginatedPokemon[activePage - 1] ?? [];

  const cards = data.map((poke) => {
    return <PokemonCard key={poke.id} pokemon={poke} />;
  });
  return (
    <ScrollArea.Autosize mah='calc(100vh - 120px)'>
      <Stack h={'100%'} align='center'>
        {toWrap ? (
          <Flex justify='space-around' wrap='wrap' gap='md'>
            {cards}
          </Flex>
        ) : (
          <>{cards}</>
        )}
        {renderPagnation && (
          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={paginatedPokemon.length}
          />
        )}
      </Stack>
      <br style={{ padding: '5px' }} />
    </ScrollArea.Autosize>
  );
};

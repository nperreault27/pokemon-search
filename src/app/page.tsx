'use client';
import { Center, createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { PokemonSearchResults } from './PokemonSearchResults';
import { useState } from 'react';
import { SearchInterface } from './searchInterface';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export default function Home() {
  const [sort, setSort] = useState('Pokedex Number');
  const [toWrap, setToWrap] = useState(true);
  const [filters, setFilters] = useState({
    fuzzyFilter: '',
    origionalFilter: false,
    typeFilter: [],
    chunkSize: 25,
  });
  console.log(filters, 2);
  return (
    <MantineProvider theme={theme}>
      <>
        <Center fw='700' fz='h1' bg='cyan' c='white'>
          Nick P&apos;s Pokemon Search Interface
        </Center>
        <hr />
        <SearchInterface
          setFilters={setFilters}
          setSort={setSort}
          toggleWrap={setToWrap}
        />
        <hr style={{ padding: '5px' }} />
        <PokemonSearchResults filters={filters} sort={sort} toWrap={toWrap} />
      </>
    </MantineProvider>
  );
}

'use client';

import { Center, createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useState } from 'react';
import { FiltersProvider } from '@context/FiltersProvider';
import SearchInterface from '@/components/SearchInterface';
import { PokemonSearchResults } from '@/components/PokemonSearchResults';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export default function Home() {
  const [sort, setSort] = useState('Pokedex Number');
  const [toWrap, setToWrap] = useState(true);

  return (
    <MantineProvider theme={theme}>
      <FiltersProvider>
        <Center fw='700' fz='h1' bg='cyan' c='white'>
          Nick P&apos;s Pokemon Search Interface
        </Center>
        <hr />
        <SearchInterface setSort={setSort} toggleWrap={setToWrap} />
        <hr style={{ padding: '5px' }} />
        <PokemonSearchResults sort={sort} toWrap={toWrap} />
      </FiltersProvider>
    </MantineProvider>
  );
}

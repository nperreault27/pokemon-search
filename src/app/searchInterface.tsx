/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Burger,
  Button,
  Drawer,
  Group,
  MultiSelect,
  NumberInput,
  SegmentedControl,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import {useContext, useState} from 'react';
import { useDisclosure } from '@mantine/hooks';
import {FiltersContext} from "@context/FiltersProvider";

export const SearchInterface = (props: {
  setSort: any;
  toggleWrap: any;
}) => {
  const { setSort, toggleWrap } = props;
  const {setFilters} = useContext(FiltersContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [fuzzyFilter, setFuzzyFilter] = useState('');
  const [origionalFilter, setOrigionalFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState(Array<string>(0));
  const [chunkSize, setChunkSize] = useState<string | number>(25);
  const handleSubmit = () => {
    close();
    setFilters({ fuzzyFilter, origionalFilter, typeFilter, chunkSize });
  };
  console.log('1');

  const allTypes = [
    'Bug',
    'Dark',
    'Dragon',
    'Electric',
    'Fairy',
    'Fighting',
    'Fire',
    'Flying',
    'Ghost',
    'Grass',
    'Ground',
    'Ice',
    'Normal',
    'Poison',
    'Psychic',
    'Rock',
    'Steel',
    'Water',
  ];
  return (
    <>
      <Drawer
        position='right'
        opened={opened}
        title='Filter Results'
        onClose={close}
      >
        <Stack align='left' gap='sm'>
          <TextInput
            type='text'
            placeholder="Enter a Pokemon's Name: ex. Pikachu"
            value={fuzzyFilter}
            onChange={(event) => setFuzzyFilter(event.currentTarget.value)}
          />
          <MultiSelect
            label='Types'
            placeholder='Select Pokemon types'
            data={allTypes}
            clearable
            searchable
            hidePickedOptions
            comboboxProps={{ position: 'top' }}
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <NumberInput
            label='Number of Pokemon Per Page'
            description='For infinite scroll use 0'
            value={chunkSize}
            onChange={setChunkSize}
          />

          <Switch
            label='Only include Origional Pokemon'
            id='onlyOG'
            type='checkbox'
            name='onlyOG'
            withThumbIndicator={false}
            checked={origionalFilter}
            onChange={(event) =>
              setOrigionalFilter(event.currentTarget.checked)
            }
          />
          <Button onClick={handleSubmit}>Search</Button>
        </Stack>
      </Drawer>
      <Group justify='space-between' align='center'>
        <Burger size='lg' opened={opened} onClick={opened ? close : open} />
        <Group>
          <Switch
            defaultChecked
            size='lg'
            onLabel='Wrap'
            offLabel='No'
            onChange={(event) => toggleWrap(event.currentTarget.checked)}
          />
          <SegmentedControl
            onChange={setSort}
            data={['Pokedex Number', 'Name', 'Type', 'Weight', 'Height']}
          />
        </Group>
      </Group>
    </>
  );
};
export default SearchInterface;

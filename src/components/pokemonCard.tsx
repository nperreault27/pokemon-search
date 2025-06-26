/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  BackgroundImage,
  Badge,
  Box,
  Group,
  Image,
  rgba,
  Stack,
  Text,
} from '@mantine/core';

import { Stats } from './stats';

import AbilitiesDisplay from '@/components/abilities';
import Moves from '@/components/moves';
import { getBackground } from '@/app/utils/getBackgroundUtil';
import { getPillColor } from '@/app/utils/getPillColorUtil';
import { getColor } from '@/app/utils/getColorUtil';

const formatName = (name: string) => {
  const formattedName = name.replace(/-/g, ' ');

  return formattedName;
};
const PokemonCard = (props: { pokemon: any }) => {
  const { pokemon } = props;
  const {
    name,
    abilities,
    stats,
    moveSet,
    isShiny,
    defaultImage,
    shinyImage,
    types,
    height,
    weight,
    complete,
  } = pokemon;

  const image = isShiny ? shinyImage : defaultImage;
  const backgroundImage = getBackground(types[0].type.name);
  return (
    <BackgroundImage
      h={'auto'}
      w='17rem'
      src={backgroundImage}
      radius='lg'
      bd='8px solid black'
      style={{
        backgroundImage: '/resources/foil.png',
        backgroundPosition: 'right',
      }}
    >
      <BackgroundImage src={isShiny ? '/resources/holo.png' : ''}>
        <Stack p='4px' align='center' gap='2px'>
          <Stack w='15rem' align='center' gap='2px'>
            <Text
              fw={700}
              style={{ textShadow: '16px, white' }}
              truncate='end'
              size='auto'
              tt='capitalize'
              c={getColor(types[0].type.name)}
            >
              {formatName(name)}
            </Text>
            <Group>
              {types.map((type: any) => {
                return (
                  <Badge
                    variant='filled'
                    bd='1px solid black'
                    key={type.type.name + name}
                    color={getPillColor(type.type.name)}
                    tt='capitalize'
                  >
                    {type.type.name}
                  </Badge>
                );
              })}
            </Group>
          </Stack>
          <Box
            bg={rgba('black', 0.4)}
            bd='4px solid black'
            h={'10rem'}
            w={'10rem'}
          >
            <Image src={image ?? '/resources/default.png'} alt=' ' />
          </Box>
          {complete && (
            <>
              <div style={{ padding: '4px' }}>
                <AbilitiesDisplay abilities={abilities} />
              </div>
              <div style={{ padding: '4px' }}>
                <Stats stats={stats} />
              </div>
              <div style={{ padding: '4px' }}>
                <Moves moveSet={moveSet} />
              </div>
            </>
          )}
          <Text size='xs' c={getColor(types[0].type.name)}>
            {' '}
            Weight: {weight / 10} kg | Height: {height / 10} m{' '}
          </Text>
        </Stack>
      </BackgroundImage>
    </BackgroundImage>
  );
};
export default PokemonCard;

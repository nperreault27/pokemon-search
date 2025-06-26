/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Grid, GridCol } from '@mantine/core';

export const Stats = (props: { stats: any }) => {
  const { stats } = props;
  return (
    <Grid w={'14rem'} align='center' gutter={'xs'}>
      <GridCol span={6}>
        <Badge color={'gray'} w={'7rem'}>
          {' '}
          {stats[0].stat.name}: {stats[0].base_stat}
        </Badge>
        <Badge color={'gray'} w={'7rem'}>
          {stats[2].stat.name}: {stats[2].base_stat}
        </Badge>
        <Badge color={'gray'} w={'7rem'}>
          Sp. Def: {stats[4].base_stat}
        </Badge>
      </GridCol>
      <GridCol span={6}>
        <Badge color={'gray'} w={'7rem'}>
          {stats[1].stat.name}: {stats[1].base_stat}
        </Badge>
        <Badge color={'gray'} w={'7rem'}>
          Sp. Atk: {stats[3].base_stat}
        </Badge>
        <Badge color={'gray'} w={'7rem'}>
          {stats[5].stat.name}: {stats[5].base_stat}
        </Badge>
      </GridCol>
    </Grid>
  );
};
export default Stats;

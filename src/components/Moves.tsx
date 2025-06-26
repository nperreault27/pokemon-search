/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPillColor } from '@/app/utils/getPillColorUtil';
import { Pill, Tooltip, Stack } from '@mantine/core';

const MoveCell = (props: any) => {
  const { move } = props;
  return (
    // should be a transition
    <Tooltip label={move.flavorText} multiline w='12rem' withArrow>
      <Pill
        radius='sm'
        size='md'
        style={{ border: '2px solid black' }}
        ta='center'
        tt='capitalize'
        bg={getPillColor(move.type)}
        c='white'
      >
        {move?.name.split('-').join(' ')}
      </Pill>
    </Tooltip>
  );
};

export const Moves = (props: any) => {
  const { moveSet } = props;

  return (
    <Stack w='12rem' align='center-stretch' justify='center' gap='6px'>
      {moveSet.map((move: any) => (
        <MoveCell key={move.name} move={move} />
      ))}
    </Stack>
  );
};
export default Moves;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Flex, Tooltip } from '@mantine/core';

export const AbilitiesDisplay = (props: any) => {
  const { abilities } = props;
  return (
    <Flex align='center' justify={'center'} gap={'2px'} wrap={'wrap'}>
      {abilities.map((ability: any, index: any) => {
        return (
          <div key={ability.name + index}>
            <Tooltip label={ability.flavorText} multiline withArrow>
              <Badge>{ability.name}</Badge>
            </Tooltip>
          </div>
        );
      })}
    </Flex>
  );
};
export default AbilitiesDisplay;

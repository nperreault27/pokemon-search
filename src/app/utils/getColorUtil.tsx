const whiteFontTypes = ['dark', 'psychic'];
export const getColor = (type: string) =>
  whiteFontTypes.includes(type) ? 'white' : 'black';

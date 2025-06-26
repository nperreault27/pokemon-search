export const getPillColor = (type: string) => {
  switch (type) {
    case 'normal':
      return '#A1A1A1';
    case 'fire':
      return '#D43A30';
    case 'fighting':
      return '#F08833';
    case 'water':
      return '#4C79BC';
    case 'flying':
      return '#8FB8E4';
    case 'grass':
      return '#5D9D3C';
    case 'poison':
      return '#734D9A';
    case 'electric':
      return '#F2C341';
    case 'ground':
      return '#895229';
    case 'psychic':
      return '#DC4D79';
    case 'rock':
      return '#ADA984';
    case 'ice':
      return '#78CCF0';
    case 'bug':
      return '#95A135';
    case 'dragon':
      return '#4C60A9';
    case 'ghost':
      return '#6B426E';
    case 'dark':
      return '#4E403F';
    case 'steel':
      return '#74A2B9';
    case 'fairy':
      return '#BA7FB5';
    default:
      return '#000000';
  }
};

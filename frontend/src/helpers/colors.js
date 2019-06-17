const Colors = Object.freeze({
  BASE: '#221778',
  // Analog
  BLUE: '#14268F',
  OFF_BLUE: '#134285',
  VIOLET: '#44148F',
  PURPLE: '#5E1385',
  // Basic
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  // Tones
  DARKEST_BLUE: '#100B38',
  BLEU: '#3825C4',
  // Complementary
  COMP_YELLOW: '#C4A900',
  COMP_BROWN: '#786A17',
  COMP_BLUE: '#2713C4',
  COMP_PURPLE: '#4939C4',
  // More
  LOGO_GREEN: 'rgb(7, 188, 239)',
  FAFAFA: '#FAFAFA',
  GREY: '#E3E3E3',
  TRANSPARENT: 'transparent',
})

const ChartColors = Object.freeze({
  Pressure: Colors.LOGO_GREEN,
  Temp: Colors.DARKEST_BLUE,
  Humidity: Colors.COMP_YELLOW,
  Light: Colors.LOGO_GREEN,
  x: Colors.LOGO_GREEN,
  y: Colors.DARKEST_BLUE,
  z: Colors.COMP_YELLOW,
})

/*
 * Exports
 */

export { ChartColors }
export default Colors

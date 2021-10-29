export function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min;
}

export function removePx(str) {
  return str.substr(0, str.length - 2)
}

export function isInRange(int, rangeMin, rangeMax) {
  return int >= rangeMin && int <= rangeMax
}
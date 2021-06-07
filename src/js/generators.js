/* eslint-disable no-plusplus */
/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level !!
 * @returns Character type children (ex. Magician, Bowman, etc)  !!!
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  const char = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  console.log(char);
  yield char.name;
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const arrTeam = [];
  for (let i = 0; i < characterCount; i++) {
    const characterInTeam = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    arrTeam.push(characterInTeam.name);
  }
  return arrTeam;
}

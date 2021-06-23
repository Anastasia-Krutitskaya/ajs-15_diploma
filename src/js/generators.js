/* eslint-disable no-plusplus */
/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level !!
 * @returns Character type children (ex. Magician, Bowman, etc)  !!!
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  const Character = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const newCharacter = new Character(maxLevel);
  yield newCharacter;
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const arrTeam = [];
  for (let i = 0; i < characterCount; i++) {
    const CharacterInTeam = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    const newCharacterInTeam = new CharacterInTeam(maxLevel);
    arrTeam.push(newCharacterInTeam);
  }
  return arrTeam;
}

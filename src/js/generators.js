/* eslint-disable no-plusplus */
/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level !!
 * @returns Character type children (ex. Magician, Bowman, etc)  !!!
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  const arrayMaxLevel = [];
  for (const type in allowedTypes) {
    if (type.level <= maxLevel) {
      arrayMaxLevel.push(type);
    }
  }
  yield arrayMaxLevel[Math.floor(Math.random() * arrayMaxLevel.length)];
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const arrayMaxLevel = [];
  for (const type in allowedTypes) {
    if (type.level <= maxLevel) {
      arrayMaxLevel.push(type);
    }
  }
  const arrTeam = [];
  for (let i = 0; i < characterCount; i++) {
    const characterInTeam = arrayMaxLevel[Math.floor(Math.random() * arrayMaxLevel.length)];
    arrTeam.push(characterInTeam);
  }
  return arrTeam;
}

import GamePlay from "./GamePlay";
import themes from './themes';
import {characterGenerator, generateTeam} from './generators';
import { Bowman, Swordsman } from "./Character";
import PositionedCharacter from "./PositionedCharacter";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    const charGen = characterGenerator([Bowman, Swordsman], 1);
    const firstChar = charGen.next();
    console.log(firstChar.value);
    const team = generateTeam([Bowman, Swordsman], 1, 2);
    console.log(team);
    // const bowmanOnDesk = new PositionedCharacter(bowman, 1);
    // const swordsmanOnDesk = new PositionedCharacter(swordsman, 3);
    // this.gamePlay.redrawPositions([bowmanOnDesk, swordsmanOnDesk]);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}

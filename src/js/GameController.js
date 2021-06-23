import GamePlay from "./GamePlay";
import themes from './themes';
import { characterGenerator, generateTeam } from './generators';
// eslint-disable-next-line object-curly-newline
import { Bowman, Swordsman, Magician, Daemon, Undead, Vampire } from './Character';
import PositionedCharacter from './PositionedCharacter';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.teamOnDesk = [];
    this.playerTeam = ['bowman', 'swordsman', 'magician'];
  }

  init() {
    const gamerSide = [];
    const computerSide = [];
    for (let i = 0; i < this.gamePlay.boardSize; i++) {
      const newPosition = this.gamePlay.boardSize * i;
      gamerSide.push(newPosition);
      gamerSide.push(newPosition + 1);
      computerSide.push(newPosition - 1);
      computerSide.push(newPosition - 2);
    }
    computerSide.splice(computerSide.indexOf(-1), 1);
    computerSide.splice(computerSide.indexOf(-2), 1);
    computerSide.push(this.gamePlay.boardSize ** 2 - 1, this.gamePlay.boardSize ** 2 - 2);
    // const charGen = characterGenerator([Bowman, Swordsman], 1);
    // const firstChar = charGen.next();
    // console.log('characterGenerator result ', firstChar.value);

    this.gamePlay.drawUi(themes.prairie);
    const gamerTeam = generateTeam([Bowman, Swordsman], 1, 2);
    const computerTeam = generateTeam([Daemon, Undead, Vampire], 1, 2);

    for (const char of gamerTeam) {
      const pos = gamerSide[Math.floor(Math.random() * gamerSide.length)];
      const characterOnDesk = new PositionedCharacter(char, pos);
      this.teamOnDesk.push(characterOnDesk);
    }
    for (const char of computerTeam) {
      const pos = computerSide[Math.floor(Math.random() * gamerSide.length)];
      const characterOnDesk = new PositionedCharacter(char, pos);
      this.teamOnDesk.push(characterOnDesk);
    }
    this.gamePlay.redrawPositions(this.teamOnDesk);
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    for (const char of this.teamOnDesk) {
      if (char.position === index && this.playerTeam.includes(char.character.type)) {
        this.gamePlay.selectCell(char.position);
      } 
      // else {
      //   this.gamePlay.showError('no');
      // }
    }
  }

  onCellEnter(index) {
    for (const char of this.teamOnDesk) {
      if (char.position === index) {
        console.log(char);
        this.gamePlay.showCellTooltip(`\u{1F396}${char.character.level} \u{2694}${char.character.attack} \u{1F6E1}${char.character.defence} \u{2764}${char.character.health}`, char.position);
      }
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }
}

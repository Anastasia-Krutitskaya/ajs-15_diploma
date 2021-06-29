import GamePlay from "./GamePlay";
import themes from './themes';
import { characterGenerator, generateTeam } from './generators';
// eslint-disable-next-line object-curly-newline
import { Bowman, Swordsman, Magician, Daemon, Undead, Vampire } from './Character';
import PositionedCharacter from './PositionedCharacter';
import cursors from "./cursors";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.teamOnDesk = [];
    this.playerTeam = ['bowman', 'swordsman', 'magician'];
    this.computerTeam = ['undead', 'vampire', 'daemon'];
    this.leftEdge = [];
    this.rightEdge = [];
    this.topEdge = [];
    this.bottomEdge =[];
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

    for (let i = 0; i < this.gamePlay.boardSize; i++) {
      const rightSideEl = this.gamePlay.boardSize * i;
      this.leftEdge.push(rightSideEl);
      this.rightEdge.push(rightSideEl - 1);
      
      this.topEdge.push(i);
      this.bottomEdge.push(this.gamePlay.boardSize * (this.gamePlay.boardSize - 1) + i);
    }
    this.rightEdge.splice(this.rightEdge.indexOf(-1), 1);
    this.rightEdge.push(this.gamePlay.boardSize ** 2 - 1);

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
      if (index === char.position && this.playerTeam.includes(char.character.type)) {
        if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-yellow')) !== -1) {
          this.gamePlay.deselectCell(this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-yellow')));
        }
        this.gamePlay.selectCell(char.position);
      } else if (index === char.position && !(this.playerTeam.includes(char.character.type))) {
        GamePlay.showError('Данный персонаж является противником, выберите своего игрока.');
      }
    }
  }

  onCellEnter(index) {
   // console.log(this.gamePlay.cells[index].firstChild);
    for (const char of this.teamOnDesk) {
      if (index === char.position) {
        this.gamePlay.showCellTooltip(`\u{1F396}${char.character.level} \u{2694}${char.character.attack} \u{1F6E1}${char.character.defence} \u{2764}${char.character.health}`, char.position);
        if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-yellow')) !== -1) {
          const positionOfSelectedCharcter = this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-yellow'));
          const selectedCharacter = this.teamOnDesk.find((item) => item.position === positionOfSelectedCharcter);
          this.gamePlay.setCursor(cursors.pointer);
          if (this.computerTeam.includes(char.character.type)) {
            const positionOfTarget = char.position;
            // console.log(selectedCharacter.position, selectedCharacter.character.attackRange);
            // console.log(positionOfTarget);

            
            // const find = this.leftEdge.find((item) => Math.abs(item - selectedCharacter.position) <= selectedCharacter.character.attackRange);
            // console.log(find);
            const range = [];
            for (let i = 1; i <= selectedCharacter.character.attackRange; i++) {
              const newPosition1 = selectedCharacter.position - this.gamePlay.boardSize * i - selectedCharacter.character.attackRange;
              const newPosition2 = selectedCharacter.position + this.gamePlay.boardSize * i - selectedCharacter.character.attackRange;
              range.push(newPosition1);
              range.push(newPosition2);
            }
            range.push(selectedCharacter.position - selectedCharacter.character.attackRange);
            range.forEach((item) => {
              for (let i = 1; i < selectedCharacter.character.attackRange * 2 + 1; i++) {
                range.push(item + i);
              }
            });
            console.log(range);

            if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-red')) !== -1) {
              this.gamePlay.deselectCell(this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-red')));
            }
            if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-green')) !== -1) {
              this.gamePlay.deselectCell(this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-green')));
            }
            if (range.find((item) => item === index)) {
              this.gamePlay.selectCell(index, 'red');
              this.gamePlay.setCursor(cursors.crosshair);
            } else {
              this.gamePlay.setCursor(cursors.notallowed);
            }
           
          } else if (this.playerTeam.includes(char.character.type)) {
            if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-red')) !== -1) {
              this.gamePlay.deselectCell(this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-red')));
            }
            if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-green')) !== -1) {
              this.gamePlay.deselectCell(this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-green')));
            }
          } 
        }
      }
    }
    if (!this.gamePlay.cells[index].firstChild) {
      if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-yellow')) !== -1) {
        const positionOfSelectedCharcter = this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-yellow'));
        const selectedCharacter = this.teamOnDesk.find((item) => item.position === positionOfSelectedCharcter);
        //console.log(selectedCharacter.position, selectedCharacter.character.attackRange);
        // console.log('hi');
        this.gamePlay.setCursor(cursors.pointer);
        if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-red')) !== -1) {
          this.gamePlay.deselectCell(this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-red')));
        }
        if (this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-green')) !== -1) {
          this.gamePlay.deselectCell(this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-green')));
        }
        this.gamePlay.selectCell(index, 'green');
       
        // const find = this.leftEdge.find((item) => Math.abs(item - selectedCharacter.position) <= selectedCharacter.character.attackRange);
        // console.log(find);
        if (!((!((selectedCharacter.position - index) % this.gamePlay.boardSize) && Math.abs(selectedCharacter.position - index) <= this.gamePlay.boardSize * selectedCharacter.character.attackRange)
        || (!((selectedCharacter.position - index) % (this.gamePlay.boardSize - 1)) && Math.abs(selectedCharacter.position - index) <= (this.gamePlay.boardSize - 1) * selectedCharacter.character.attackRange)
        || (!((selectedCharacter.position - index) % (this.gamePlay.boardSize + 1)) && Math.abs(selectedCharacter.position - index) <= (this.gamePlay.boardSize + 1) * selectedCharacter.character.attackRange)
        || Math.abs(selectedCharacter.position - index) <= selectedCharacter.character.attackRange)) {
          this.gamePlay.setCursor(cursors.notallowed);
          this.gamePlay.deselectCell(index);
        }
      }
    }
  }

  onCellLeave(index) {
    this.gamePlay.setCursor(cursors.auto);
    this.gamePlay.hideCellTooltip(index);
  }
}

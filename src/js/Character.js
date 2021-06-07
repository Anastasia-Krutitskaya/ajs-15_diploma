/* eslint-disable max-classes-per-file */
export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    if (new.target && new.target.name === 'Character') {
      throw new Error('Нельзя создать объект этого класса');
    }
  }

  levelUp() {
    if (this.health <= 0) {
      throw new Error('Персонаж мертв');
    } else if (this.health > 20) {
      this.health = 100;
    } else {
      this.level += 1;
      this.attack = (this.attack * 0.2) + this.attack;
      this.defence = (this.defence * 0.2) + this.defence;
      this.health += 80;
    }
  }
}

export class Bowman extends Character {
  constructor(level) {
    super(level, 'bowman');
    this.attack = 25;
    this.defence = 25;
  }
}

export class Swordsman extends Character {
  constructor(level) {
    super(level, 'swordsman');
    this.attack = 40;
    this.defence = 10;
  }
}

export class Magician extends Character {
  constructor(level) {
    super(level, 'magician');
    this.attack = 10;
    this.defence = 40;
  }
}

export class Daemon extends Character {
  constructor(level) {
    super(level, 'daemon');
    this.attack = 10;
    this.defence = 40;
  }
}

export class Undead extends Character {
  constructor(level) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;
  }
}

export class Vampire extends Character {
  constructor(level) {
    super(level, 'vampire');
    this.attack = 25;
    this.defence = 25;
  }
}

// export const bowman = new Bowman(1, 'Bowman');
// console.log(bowman);
// export const swordsman = new Swordsman(1, 'Swordsman');
// console.log(swordsman);
// const magician = new Magician(1, 'Magician');
// console.log(magician);
// const daemon = new Daemon(1, 'Daemon');
// console.log(daemon);
// const undead = new Undead(1, 'Undead');
// console.log(undead);
// const vampire = new Vampire(1, 'Vampire');
// console.log(vampire);
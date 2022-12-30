import { OBJECT_TYPE, DIRECTIONS } from "./setup";

class Pacman {
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  shouldMove() {
    if (!this.dir) {
      return;
    }
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objExists) {
    let nextMovePos = this.pos + this.dir.movement;

    if (
      objExists(nextMovePos, OBJECT_TYPE.WALL) ||
      objExists(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePos = this.pos;
    }

    return { nextMovePos, direction: this.dir };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd };
  }

  setNewPosition(nextMovePos) {
    this.pos = nextMovePos;
  }

  handleKeyInput(event, objExists) {
    let dir;

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      dir = DIRECTIONS[event.key];
    } else {
      return;
    }

    const nextMovePos = this.pos + dir.movement;
    if (
      objExists(nextMovePos, OBJECT_TYPE.WALL) ||
      objExists(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      return;
    }
    this.dir = dir;
  }
}

export default Pacman;

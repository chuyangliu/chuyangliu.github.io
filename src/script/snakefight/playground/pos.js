import Direction from './direction';

class Pos {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  get row() {
    return this.row;
  }

  set row(val) {
    this.row = val;
  }

  get col() {
    return this.col;
  }

  set col(val) {
    this.col = val;
  }

  clone() {
    return new Pos(this.row, this.col);
  }

  equals(other) {
    return this.row === other.row && this.col === other.col;
  }

  adj(direc) {
    switch (direc) {
      case Direction.LEFT:
        return new Pos(this.row, this.col - 1);
      case Direction.RIGHT:
        return new Pos(this.row, this.col + 1);
      case Direction.UP:
        return new Pos(this.row - 1, this.col);
      case Direction.DOWN:
        return new Pos(this.row + 1, this.col);
      default:
        return new Pos(this.row, this.col);
    }
  }

  direc(other) {
    if (this.row === other.row) {
      switch (this.col - other.col) {
        case 1:
          return Direction.LEFT;
        case -1:
          return Direction.RIGHT;
        default:
          break;
      }
    } else if (this.col === other.col) {
      switch (this.row - other.row) {
        case 1:
          return Direction.UP;
        case -1:
          return Direction.DOWN;
        default:
          break;
      }
    }
    return Direction.NONE;
  }
}

export default Pos;

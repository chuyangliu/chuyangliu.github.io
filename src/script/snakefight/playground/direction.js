class Direction {
  static isOpposite(d1, d2) {
    switch (d1) {
      case Direction.LEFT:
        return d2 === Direction.RIGHT;
      case Direction.RIGHT:
        return d2 === Direction.LEFT;
      case Direction.UP:
        return d2 === Direction.DOWN;
      case Direction.DOWN:
        return d2 === Direction.UP;
      default:
        return d2 === Direction.NONE;
    }
  }
}

Direction.NONE = 0;
Direction.LEFT = 1;
Direction.RIGHT = 2;
Direction.UP = 3;
Direction.DOWN = 4;

export default Direction;

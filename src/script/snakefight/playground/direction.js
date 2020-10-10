class Direction {
  static get NONE() {
    return 0;
  }

  static get LEFT() {
    return 1;
  }

  static get RIGHT() {
    return 2;
  }

  static get UP() {
    return 3;
  }

  static get DOWN() {
    return 4;
  }

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

export default Direction;

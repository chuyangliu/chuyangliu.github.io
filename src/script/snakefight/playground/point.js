class Point {
  constructor(type) {
    this.type = type;
  }
}

Point.TYPE = {
  EMPTY: 0,
  WALL: 1,
  FOOD: 2,
  BODY_SELF: 3,
  BODY_OPPONENT: 5,
  HEAD_SELF: 4,
  HEAD_OPPONENT: 6,
};

export default Point;

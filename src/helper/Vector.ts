export default class Vector {
  x: number;
  y: number;

  constructor(
    x: number = 0,
    y: number = 0,
  ) {
    this.x = x;
    this.y = y;
  }

  public static random( max: number = 1 ) {
    return new Vector(
      Math.random() * max,
      Math.random() * max,
    );
  }
}
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
    let signX = 1;
    if ( Math.random() <= 0.5 ) {
      signX = -1;
    }

    let signY = 1;
    if ( Math.random() <= 0.5 ) {
      signY = -1;
    }

    return new Vector(
      signX * Math.random() * max,
      signY * Math.random() * max,
    );
  }

  public normalize() {
    return this.mul( 1 / this.length() );
  }

  public length() {
    return Math.abs( Math.sqrt( this.x * this.x + this.y * this.y ) );
  }

  public add( vec: Vector ) {
    return new Vector(
      this.x + vec.x,
      this.y + vec.y,
    );
  }

  public sub( vec: Vector ) {
    return new Vector(
      this.x - vec.x,
      this.y - vec.y,
    );
  }

  public mul( scalar: number ) {
    return new Vector(
      this.x * scalar,
      this.y * scalar,
    );
  }

}
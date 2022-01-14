import Vector from '../helper/Vector';
import SceneObject from './SceneObject';
// @ts-ignore
import { v4 as uuid } from 'uuid';


const SCALE_FACTOR = 0.2;

export default class MovingSceneObject {
  position: Vector;
  direction: Vector;
  speed: number;
  private readonly objType: string;

  objId: string;

  // TODO: move to own missile class
  target: Vector | undefined;
  steeringForce: number = 1;

  constructor( position: Vector,
               direction: Vector,
               objType: string,
               speed: number = 1,
  ) {
    this.position = position;
    this.direction = direction.normalize();
    this.objType = objType;
    this.speed = speed;

    this.objId = uuid();
  }

  public draw( ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, sceneObj: SceneObject | boolean ) {
    if ( sceneObj instanceof SceneObject ) {

      const { width, height } = sceneObj.image;
      this.direction = this.direction.normalize();

      ctx.save();
      let rad = Math.atan( this.direction.y / this.direction.x );
      if ( this.direction.x < 0 ) {
        rad += Math.PI;
      }
      ctx.translate( this.position.x, this.position.y );
      ctx.rotate( rad + ( Math.PI * 0.5 ) );
      ctx.scale( SCALE_FACTOR, SCALE_FACTOR );
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'red';

      ctx.drawImage( sceneObj.image, -width * 0.5, -height * 0.5 );
      ctx.restore();
    }
  }

  public calculateNewPosition() {
    this.position = this.position.add(
      this.direction.mul( this.speed ),
    );

    if ( this.target === this.position ) {
      this.target = undefined;
    }

    this.direction = this.steerWithForce( this.position, this.direction, this.target, this.steeringForce);

    // console.log( 'Test: ', this.steerWithForce(
    //   new Vector(0,0),
    //   new Vector(1,1),
    //   new Vector(1,0),
    //   1,
    //   5
    // ) );
  }

  private steerWithForce(
    position: Vector = this.position,
    direction: Vector = this.direction,
    target: Vector | undefined = this.target,
    steeringForce: number = this.steeringForce
  ) {
    if ( !target ) {
      return direction;
    }
    const targetVec = target.sub( position );
    const newDirection = targetVec.sub( direction );

    return direction
      .add( newDirection
        .normalize()
        .mul( steeringForce / 1000 ),
      )
      .normalize();
  }

  public getType() {
    return this.objType;
  }


}
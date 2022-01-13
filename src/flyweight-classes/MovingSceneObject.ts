import Vector from '../helper/Vector';
import SceneObject from './SceneObject';


const SCALE_FACTOR = 0.2;

export default class MovingSceneObject {
  position: Vector;
  direction: Vector;
  objType: string;
  speed: number;

  constructor( position: Vector,
               direction: Vector,
               objType: string,
               speed: number = 1,
  ) {
    this.position = position;
    this.direction = direction.normalize();
    this.objType = objType;
    this.speed = speed;
  }

  public changeParticleData( { position, direction, speed }: any ) {
    this.position = position ?? this.position;
    this.direction = direction ?? this.direction;
    this.speed = speed ?? this.speed;
  }

  public draw( ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, sceneObj: SceneObject | boolean ) {
    if ( sceneObj instanceof SceneObject ) {

      const { width, height } = sceneObj.image;

      ctx.save();
      const rad = Math.PI * 0.5 + Math.atan( this.direction.y / this.direction.x );

      ctx.translate( this.position.x, this.position.y );
      ctx.rotate( rad );
      ctx.scale( SCALE_FACTOR, SCALE_FACTOR );
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'red';

      ctx.drawImage( sceneObj.image, -width * 0.5, -height * 0.5 );
      ctx.restore();
    }
  }

  public calculationNewPosition() {
    this.position = this.position.add(
      this.direction.mul( this.speed ),
    );
  }

  public getType() {
    return this.objType;
  }


}
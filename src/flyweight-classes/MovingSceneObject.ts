import Vector from '../helper/Vector';
import SceneObject from './SceneObject';


export default class MovingSceneObject {
  position: Vector;
  direction: Vector;
  objType: string;
  speed: number;

  constructor( position: Vector,
               direction: Vector,
               objType: string,
               speed: number = 20,
  ) {
    this.position = position;
    this.direction = direction;
    this.objType = objType;
    this.speed = speed;

  }

  public changeParticleData( { position, direction, speed }: any ) {
    this.position = position ?? this.position;
    this.direction = direction ?? this.direction;
    this.speed = speed ?? this.speed;
  }

  public draw( ctx: CanvasRenderingContext2D, sceneObj: SceneObject | boolean ) {
    if ( sceneObj instanceof SceneObject ) {
      ctx.drawImage( sceneObj.image, this.position.x, this.position.y );
    }
    console.log("Drawing...");
  }

  public getType() {
    return this.objType;
  }


}
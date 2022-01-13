import SceneObject from './SceneObject';
import MovingSceneObject from './MovingSceneObject';
import Vector from '../helper/Vector';
import Missile from '../components/Missile';


export default class Game {

  private objects = [] as SceneObject[];
  private movingObjects = [] as MovingSceneObject[];
  private currentAnimation: number | undefined = 0;
  private readonly images = {} as any;

  private canvas = {} as HTMLCanvasElement;
  private ctx = {} as CanvasRenderingContext2D;


  private fps: number;
  private animationId: NodeJS.Timer | undefined;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    availableImages: {},
    sceneObjects: MovingSceneObject[] = [],
    fps: number = 30,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.images = availableImages;
    this.fps = fps;

    for ( const obj of sceneObjects ) {
      this.addObjectToScene( obj );
    }
  }

  public addObjectToScene( obj: MovingSceneObject ) {
    const objType = obj.getType();
    if ( this.isObjectCached( objType ) ) {
      this.movingObjects.push( obj );
      return;
    }

    const img = this.getImageByType( objType );
    if ( !img ) {
      return;
    }

    this.objects.push( new SceneObject( objType, img ) );
    this.movingObjects.push( obj );
  }

  public isObjectCached( objType: string ): boolean {
    return !!this.getSceneObjectByType( objType );
  }

  private getSceneObjectByType( type: string ): SceneObject | boolean {
    for ( const sceneObj of this.objects as SceneObject[] ) {
      if ( type === sceneObj.getType() ) {
        return sceneObj;
      }
    }
    return false;
  }

  private doForAllMovingObjects(
    doWithMovingObjectFn: ( movObj: MovingSceneObject, ...args: any ) => MovingSceneObject[] | void,
    ...args: any
  ) {
    let results = [];
    for ( const movingObject of this.movingObjects ) {
      results.push( doWithMovingObjectFn( movingObject, ...args ) );
    }
    return results;
  }

  private getImageByType( type: string ): HTMLImageElement | undefined {
    return this.images[ type ] as HTMLImageElement;
  }

  private draw() {
    this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
    for ( const movingObject of this.movingObjects ) {
      movingObject.draw( this.ctx, this.canvas.width, this.canvas.height, this.getSceneObjectByType( movingObject.getType() ) );
    }
  }

  private letMissilesFly() {
    if ( this.animationId ) {
      return;
    }

    this.animationId = setInterval( () => {
      this.doForAllMovingObjects(
        movingObj => {
          if ( movingObj.objType.startsWith( Missile.type ) ) {
            movingObj.calculationNewPosition();
          }
        },
      );
    }, 4 );
  }

  private animateAddingRandomObjects( addingObjectsCount: number ) {
    // console.group("animateAddingRandomObjects")
    // console.log(`${this.movingObjects.length} Object(s) already in Scene`);
    // console.log(`Adding ${addingObjectsCount} Object(s) to the scene...`);

    for ( let i = 0; i < addingObjectsCount; i++ ) {
      const newObj = new MovingSceneObject(
        Vector.random( this.canvas.width ),
        Vector.random( this.canvas.width ),
        this.objects[ Math.floor( Math.random() * this.objects.length ) ]?.getType(),
      );
      this.addObjectToScene( newObj );
    }
    // console.log(`After Adding: ${this.movingObjects.length} Object(s) in Scene`);
    // console.groupEnd("animateAddingRandomObjects")
  }

  public start() {
    // @ts-ignore
    const step = ( timestamp ) => {
      setTimeout( () => {
        if ( this.currentAnimation ) {
          this.draw();
          // this.animateAddingRandomObjects( 1 );
          this.currentAnimation = window.requestAnimationFrame( step );
        }
      }, 1000 / this.fps );

      this.letMissilesFly();
    };

    if ( !this.currentAnimation ) {
      this.currentAnimation = window.requestAnimationFrame( step );
    }
  }

  public stop() {
    if ( typeof this.currentAnimation === 'number' ) {
      this.currentAnimation = undefined;
    }

    if ( this.animationId ) {
      clearInterval( this.animationId );
      this.animationId = undefined;
    }
  }

  public changeGameSettings( key: string, value: any ) {
    // @ts-ignore
    this[ `${ key }` ] = value;
  }

  public changeObjectsProperties( key: string, value: any ) {
    console.log( key, value );
    this.doForAllMovingObjects( ( movObj, key: string, value ) => {
        // @ts-ignore
        if ( movObj[ `${ key }` ] ) {
          // @ts-ignore
          movObj[ `${ key }` ] = value;
        }
      },
      key, value,
    );
    console.log( this.movingObjects[ 0 ] );
  }

}
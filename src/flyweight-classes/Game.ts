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
      movingObject.draw(
        this.ctx,
        this.canvas.width,
        this.canvas.height,
        this.getSceneObjectByType( movingObject.getType() ),
      );
    }
  }

  private animation( fnc: Function[] ) {
    if ( this.animationId ) {
      return;
    }

    this.animationId = setInterval( () => {
      for ( const fn of fnc ) {
        fn();
      }

      this.doForAllMovingObjects(
        movingObj => {
          if ( movingObj.getType().startsWith( Missile.type ) ) {
            movingObj.calculateNewPosition();
          }
        },
      );
    }, 4 );
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

      this.animation( [] );
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

  public changeObjectsProperty( key: string, value: any ) {
    console.log( key, value );
    this.doForAllMovingObjects( ( movObj, key: string, value ) => {
        // @ts-ignore
        if ( movObj.hasOwnProperty( key ) ) {
          // @ts-ignore
          movObj[ `${ key }` ] = value;
        } else {
          console.error( `MovingSceneObject-ID: ${ movObj.objId } \n MovingSceneObject-Type: ${ movObj.getType() } \n Key: ${ key } \n Value: ${ value } ` );
        }
      },
      key, value,
    );
    console.log( this.movingObjects[ 0 ] );
  }

  public changeMovingObjectPropertyById( movObjId: string, key: string, value: any ) {
    this.doForAllMovingObjects( ( movObj, key: string, value ) => {
        if ( movObj.objId === movObjId ) {
          // @ts-ignore
          if ( movObj.hasOwnProperty( key ) ) {
            // @ts-ignore
            movObj[ `${ key }` ] = value;
          }
        }
      },
      movObjId, key, value,
    );
  }

}
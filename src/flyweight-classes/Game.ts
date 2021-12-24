import SceneObject from './SceneObject';
import MovingSceneObject from './MovingSceneObject';
import Vector from '../helper/Vector';


const SCALE_FACTOR = 0.2;

export default class Game {

  private objects = [] as SceneObject[];
  private movingObjects = [] as MovingSceneObject[];
  private currentAnimation: number | undefined = 0;
  private readonly images = {} as any;

  private canvas = {} as HTMLCanvasElement;
  private ctx = {} as CanvasRenderingContext2D;


  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    availableImages: {},
    sceneObjects: MovingSceneObject[] = [],
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.images = availableImages;

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

  private getImageByType( type: string ): HTMLImageElement | undefined {
    return this.images[ type ] as HTMLImageElement;
  }

  private draw() {
    this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
    this.ctx.save();
    this.ctx.scale( SCALE_FACTOR, SCALE_FACTOR );
    for ( const movingObject of this.movingObjects ) {
      movingObject.draw( this.ctx, this.getSceneObjectByType( movingObject.getType() ) );
    }
    this.ctx.restore();
  }

  private animateAddingRandomObjects( addingObjectsCount: number ) {
    // console.group("animateAddingRandomObjects")
    // console.log(`${this.movingObjects.length} Object(s) already in Scene`);
    // console.log(`Adding ${addingObjectsCount} Object(s) to the scene...`);

    for ( let i = 0; i < addingObjectsCount; i++ ) {
      const newObj = new MovingSceneObject(
        Vector.random( this.canvas.width / SCALE_FACTOR ),
        Vector.random( this.canvas.width / SCALE_FACTOR ),
        this.objects[ Math.floor( Math.random() * this.objects.length ) ]?.getType(),
      );
      this.addObjectToScene( newObj );
    }
    // console.log(`After Adding: ${this.movingObjects.length} Object(s) in Scene`);
    // console.groupEnd("animateAddingRandomObjects")
  }

  public start() {
    const start = Date.now();

    // @ts-ignore
    const step = ( timestamp ) => {
      let progress = timestamp - start;

      if ( progress < 2000 ) {
        this.draw();
        this.animateAddingRandomObjects( 1 );
        this.currentAnimation = window.requestAnimationFrame( step );
      }
    };
    step( Date.now() );
  }

  public stop() {
    if ( typeof this.currentAnimation === 'number' ) {
      window.cancelAnimationFrame( this.currentAnimation );
      this.currentAnimation = undefined;
    }

  }

}
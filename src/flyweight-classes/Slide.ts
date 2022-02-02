export default class Slide {
  private content: any;
  private type: string;
  public slideNumber: number;

  constructor( content: any, type: string, slideNumber: number = 0 ) {
    this.content = content;
    this.type = type;
    this.slideNumber = slideNumber;
  }

  draw( canvas: HTMLCanvasElement, lastSlide: Slide, overlay: boolean = false ) {
    console.log(lastSlide);
    if ( lastSlide.getType() === '2d' ) {
      const gameState = lastSlide.getContentByKey( 'gameState' );
      console.log('gameState: ', gameState);
      gameState?.stop();
    }

    const ctx = canvas.getContext( '2d' ) as CanvasRenderingContext2D;
    if ( !overlay ) {
      ctx?.clearRect( 0, 0, canvas.width, canvas.height );
    }

    switch ( this.type ) {
      case 'image': {
        const img = this.content as CanvasImageSource;
        ctx.drawImage(
          img,
          0, 0, img.width as number, img.height as number,
          0, 0, canvas.width, canvas.height,
        );
        break;
      }

      case '2d': {
        const { gameState } = this.content;
        gameState.start();
      }
    }
  }

  public getContentByKey( key: string ) {
    if ( this.content.hasOwnProperty( key ) ) {
      // @ts-ignore
      return this.content[ `${ key }` ];
    }
    return;
  }

  public getType() {
    return this.type;
  }
}
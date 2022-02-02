import Game from './Game';
import MovingSceneObject from './MovingSceneObject';
import Slide from './Slide';


export default class Presentation {
  private slides: Slide[];
  public currentSlideIndex: number = 0;
  private lastSlideIndex: number = 0;

  private readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;


  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    slides: Slide[],
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.slides = slides;
  }

  prevSlide() {
    if ( this.currentSlideIndex === 0 ) {
      this.currentSlideIndex = 0;
      return;
    }
    this.currentSlideIndex--;
  }

  nextSlide() {
    this.lastSlideIndex = this.currentSlideIndex;

    if ( this.currentSlideIndex === this.slides.length - 1 ) {
      this.currentSlideIndex = this.slides.length - 1;
      return;
    }
    this.currentSlideIndex++;
  }

  public draw() {
    this.slides[ this.currentSlideIndex ].draw( this.canvas, this.slides[ this.lastSlideIndex ] );
  }

  public addSlides( slides: any, index?: number ) {
    if ( index ) {
      const insert = ( arr: Slide[], index: number, newItems: [] ) => [
        // part of the array before the specified index
        ...arr.slice( 0, index ),
        // inserted item
        ...newItems,
        // part of the array after the specified index
        ...arr.slice( index ),
      ];
      insert( this.slides, index, slides );
      return;
    }
    this.slides.push( slides );
  }

  public sortSlides() {
    this.slides.sort( ( a, b ) => {
      if ( a.slideNumber === b.slideNumber ) {
        return 0;
      }

      if ( a.slideNumber < b.slideNumber ) {
        return -1;
      }
      return 1;
    } );
  }
}
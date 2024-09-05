<template>
  <div id="app">
    <canvas id="game-scene" ref="gameScene" :width="1024" :height="600" />
    <div class="hide-wrapper">
      <game-controls v-if="presentationAvailable" id="controls" canvas-id="game-scene" :presentation="presentation" />
    </div>

    <game-actions canvas-id="game-scene" :game-state="gameState" />

    <!--    <input type="number" v-model="speed">-->
    <!--    <p>Input: {{ speed }}</p>-->

    <!--    <input type="number" v-model="fps">-->
    <!--    <p>Input: {{ fps }}</p>-->
    <!--    <vue-slider v-model="y" />-->
  </div>
</template>


<script lang="ts">

import Game from './flyweight-classes/Game';
import MovingSceneObject from './flyweight-classes/MovingSceneObject';
import Vector from './helper/Vector';
import GameControls from './game-components/PresentationControls.vue';

import { defineComponent } from 'vue';
import missile1Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_1_Flying_000.png';
import missile2Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_2_Flying_000.png';
import missile3Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_3_Flying_000.png';

import titleSlide from './assets/slides/Flyweight_1.png';
import Agenda from './assets/slides/Flyweight_2.png';
import Problem_1 from './assets/slides/Flyweight_3.png';
import Problem_2 from './assets/slides/Flyweight_4.png';
import Flyweight_1 from './assets/slides/Flyweight_5.png';
import Flyweight_2 from './assets/slides/Flyweight_6.png';
import Flyweight_3 from './assets/slides/Flyweight_7.png';
import ProsCons_1 from './assets/slides/Flyweight_8.png';
import ProsCons_2 from './assets/slides/Flyweight_9.png';
import SingletonVsFlyweight_1 from './assets/slides/Flyweight_10.png';
import SingletonVsFlyweight_2 from './assets/slides/Flyweight_11.png';
import Sources from './assets/slides/Flyweight_12.png';

import Presentation from './flyweight-classes/Presentation';
import Slide from './flyweight-classes/Slide';
import GameActions from './game-components/GameActions.vue';


export default defineComponent( {

  components: {
    GameActions,
    'GameControls': GameControls,
  },

  data() {
    return {
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,

      gameSprites: {} as any,
      slideImages: {} as any,

      gameState: {} as any,
      presentation: {} as any,

      speed: 0.00001,
      fps: 30,

      testMissile: {} as MovingSceneObject,
    };
  },

  watch: {
    speed( value, oldValue ) {
      if ( !( value === oldValue ) && value !== '' ) {
        this.gameState.changeObjectsProperty( 'speed', value );
      }
    },

    fps( value, oldValue ) {
      if ( !( value === oldValue ) ) {
        this.gameState.changeGameSettings( 'fps', value );
      }
    },
  },

  methods: {
    async loadImages( urls: string[] ) {
      const images = {} as any;
      for ( const url of urls ) {
        images[ `${ this.getFileName( url ) }` ] = await this.loadImage( url );
      }
      return images;
    },

    loadImage( url: string ) {
      return new Promise( ( resolve, reject ) => {
        let img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = ( () => {
          resolve( img );
        } );
        img.onerror = ( () => reject( img ) );

      } );
    },

    getFileName( url: string ) {
      const match = url.match( '\([a-zA-Z0-9\\s_\\\\.\\-\\(\\):])\+(.png|.jpeg|.pdf)$' );
      const ext = match?.[ match[ 'length' ] - 1 ].toString();
      if ( ext ) {
        return match?.[ 0 ].replace( ext, '' );
      }
      return;
    },

    onResize( event?: Event ) {
      event?.preventDefault();
      event?.stopPropagation();

      this.canvas.width = window.outerWidth;
      this.canvas.height = window.innerHeight;

      // TODO: redraw scene
    },

    addEventListeners() {
      window.addEventListener( 'resize', this.onResize );
    },

    removeEventListeners() {
      window.removeEventListener( 'resize', this.onResize );
    },

  },

  computed: {
    testFn() {
      if ( !this.gameState.changeObjectsProperty ) {
        return;
      }

      // this.gameState.changeObjectsProperties('direction', Vector.fromDegree(this.degrees))
      // console.log("test....");
      // @ts-ignore
      return this.degrees;
    },

    presentationAvailable(): boolean{
      // console.log( this.gameState instanceof Presentation );
      return this.presentation instanceof Presentation;
    },
  },

  async mounted() {
    this.canvas = this.$refs.gameScene as HTMLCanvasElement;
    this.ctx = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D;

    this.onResize();
    this.addEventListeners();

    try {
      // const slideUrls = [
      //   missile1Url,
      //   missile2Url,
      //   missile3Url,
      // ];

      const slideUrls = [
        //presentation slides
        titleSlide,
        Agenda,
        Problem_1,
        Problem_2,
        Flyweight_1,
        Flyweight_2,
        Flyweight_3,
        ProsCons_1,
        ProsCons_2,
        SingletonVsFlyweight_1,
        SingletonVsFlyweight_2,
        Sources,

      ];


      const gameSpriteUrls = [
        // game sprites
        missile1Url,
        missile2Url,
        missile3Url,
      ];

      // TODO: promise.all
      this.slideImages = await this.loadImages( slideUrls );
      this.gameSprites = await this.loadImages( gameSpriteUrls );

    } catch ( err: any ) {
      console.error( `Not loading assets!\n ${ err.src }` );
    }


    let slides = [] as Slide[];
    let count = 1;

    this.gameState = new Game( this.canvas, this.ctx, this.gameSprites );


    for ( const img in this.gameSprites ) {
      const missile = new MovingSceneObject(
        Vector.random( this.canvas.width ),
        Vector.random(),
        img,
        1,
      );

      this.gameState.addObjectToScene( missile as MovingSceneObject );
    }

    const newSlide = new Slide( { gameState: this.gameState }, '2d', 4 );
    slides.push( newSlide );

    for ( const img of Object.keys( this.slideImages ) ) {
      const currentSlideNumber = parseInt( img.slice( img.indexOf( '_' ) + 1 ) );

      let actualSlideNumber = currentSlideNumber;
      if ( currentSlideNumber > 3 ) {
        actualSlideNumber += 1;
      }

      slides.push( new Slide( this.slideImages[ img ], 'image', actualSlideNumber ) );
    }

    this.presentation = new Presentation( this.canvas, this.ctx, slides );
    this.presentation.sortSlides();
    this.presentation.draw();
    // this.gameState.start()

  },

  destroyed() {
    this.removeEventListeners();
  },
} );

</script>

<style lang="sass">
html, body
  margin: 0
  height: 100%
  overflow: hidden


#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50


//#game-scene
//  border: 3px solid $primary

#controls
  padding-top: 1px
  display: none

#controls
  background: transparentize(black, 0.8)

.hide-wrapper
  position: fixed
  bottom: 0
  width: 100%
  height: 70px

  &:hover #controls
    display: block


</style>

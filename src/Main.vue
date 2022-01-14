<template>
  <div id="app">
    <canvas id="game-scene" ref="gameScene" :width="1024" :height="600" />
    <div class="q-pa-md q-gutter-sm">
      <q-btn class="start" push color="primary" @click="gameState.start()">
        <q-icon left size="1em" name="fas fa-play" />
        Start Animation
      </q-btn>
      <q-btn class="stop" push color="secondary" @click="gameState.stop()">
        <q-icon left size="1em" name="fas fa-pause" />
        Stop Animation
      </q-btn>
    </div>

    <div class="q-pa-md">
      <q-badge color="secondary">
        Rotation: {{ force }}
      </q-badge>

      <q-slider
        v-model="force"
        :min="1"
        :max="100"
        :step="1"
        label
        :label-value="force + '°'"
        label-always
        color="primary"
      />
    </div>

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

import { defineComponent } from 'vue';
import missile1Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_1_Flying_000.png';
import missile2Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_2_Flying_000.png';
import missile3Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_3_Flying_000.png';


export default defineComponent( {
  data() {
    return {
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
      images: {} as any,
      gameState: {} as Game,

      speed: 0.00001,
      fps: 30,
      force: 1,

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

    clickAction( event: MouseEvent ) {
      event.preventDefault();
      event.stopPropagation();

      const { offsetX, offsetY } = event;
      console.log( 'Target: ', offsetX, offsetY, this.force );
      this.testMissile.target = new Vector( offsetX, offsetY );
      this.testMissile.steeringForce = this.force;

      this.gameState.changeObjectsProperty( 'target', new Vector( offsetX, offsetY ) );
      this.gameState.changeObjectsProperty( 'steeringForce', this.force );
    },

    addEventListeners() {
      this.canvas.addEventListener( 'mousedown', this.clickAction );
    },

    removeEventListeners() {
      this.canvas.removeEventListener('mousedown', this.clickAction );
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
  },

  async mounted() {
    this.canvas = this.$refs.gameScene as HTMLCanvasElement;
    this.ctx = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D;

    this.addEventListeners();

    try {
      const urls = [
        missile1Url,
        missile2Url,
        missile3Url,
        // './assets/space_shooter/PNG/Sprites/Missile/Missile_1_Flying_000.png',
        // './assets/space_shooter/PNG/Sprites/Missile/Missile_2_Flying_000.png',
        // './assets/space_shooter/PNG/Sprites/Missile/Missile_3_Flying_000.png',
      ];
      this.images = await this.loadImages( urls );

    } catch ( err: any ) {
      console.error( `Not loading assets!\n ${ err.src }` );
    }

    console.log( this.images );
    this.gameState = new Game( this.canvas, this.ctx, this.images );

    const types = [
      'Missile_1_Flying_000',
      'Missile_2_Flying_000',
      'Missile_3_Flying_000',
    ];

    for ( const imgType in this.images ) {
      console.log( imgType );
      for ( let i = 0; i < 10; i++ ) {
        this.testMissile = new MovingSceneObject(
          Vector.random(this.canvas.width * 2),
          Vector.random(),
          imgType,
          1,
        );

        this.gameState.addObjectToScene( this.testMissile );
      }
    }

    // this.gameState.start()

  },

  destroyed() {
    this.removeEventListeners();
  }
} );
// export default class Main {
//   canvas = {} as HTMLCanvasElement;
//   ctx = {} as CanvasRenderingContext2D;
//   images = {} as any;
//   gameState = {} as Game;
//
//   async loadImages( urls: string[] ) {
//     const images = {} as any;
//     for ( const url of urls ) {
//       console.log( this.getFileName( url ) );
//       images[ `${ this.getFileName( url ) }` ] = await this.loadImage( url );
//     }
//     return images;
//   }
//
//   loadImage( url: string ) {
//     return new Promise( ( resolve, reject ) => {
//       let img = new Image();
//       img.crossOrigin = 'Anonymous';
//       img.src = require( `${ url }` );
//       img.onload = ( () => {
//         resolve( img );
//       } );
//       img.onerror = ( () => reject( img ) );
//
//     } );
//   }
//
//   getFileName( url: string ) {
//     const match = url.match( '\([a-zA-Z0-9\\s_\\\\.\\-\\(\\):])\+(.png|.jpeg|.pdf)$' );
//     const ext = match?.[ match[ 'length' ] - 1 ].toString();
//     return match?.[ 0 ].replace( ext, '' );
//   }
//
//   async mounted() {
//     console.log(this);
//     this.canvas = this.$refs.gameScene as HTMLCanvasElement;
//     this.ctx = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D;
//
//     try {
//       const urls = [
//         './assets/space_shooter/PNG/Sprites/Missile/Missile_1_Flying_000.png',
//         './assets/space_shooter/PNG/Sprites/Missile/Missile_2_Flying_000.png',
//         './assets/space_shooter/PNG/Sprites/Missile/Missile_3_Flying_000.png',
//       ];
//       this.images = await this.loadImages( urls );
//
//     } catch ( err ) {
//       console.error( `Not loading assets!\n ${ err.src }` );
//     }
//
//     console.log( this.images );
//     this.gameState = new Game( this.canvas, this.ctx, this.images );
//
//     const types = [
//       'Missile_1_Flying_000',
//       'Missile_2_Flying_000',
//       'Missile_3_Flying_000',
//     ];
//
//     for ( const type of types ) {
//       this.gameState.addObjectToScene(
//         new MovingSceneObject(
//           Vector.random( this.canvas.width ),
//           Vector.random( this.canvas.width ),
//           type,
//         ),
//       );
//     }
//
//     // this.gameState.start()
//
//   }
// }
</script>

<style lang="sass">
#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px


#game-scene
    border: 3px solid $primary
</style>

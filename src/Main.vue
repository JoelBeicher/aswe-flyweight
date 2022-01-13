<template>
  <div id="app">
    <canvas id="game-scene" ref="gameScene" :width="1024" :height="600" />
    <button class="start" @click="gameState.start()">
      Start Adding Objects
    </button>
    <button class="start" @click="gameState.stop()">
      Stop Animation
    </button>
    <b-field label="Simple">
      <b-slider v-model="value"></b-slider>
    </b-field>
<!--    <input type="number" v-model="speed">-->
<!--    <p>Input: {{ speed }}</p>-->

<!--    <input type="number" v-model="fps">-->
<!--    <p>Input: {{ fps }}</p>-->
<!--    <vue-slider v-model="y" />-->
  </div>
</template>


<script lang="ts">
import BSlider from 'buefy';
import BField from 'buefy';

import Game from './flyweight-classes/Game';
import MovingSceneObject from './flyweight-classes/MovingSceneObject';
import Vector from './helper/Vector';

import { defineComponent } from 'vue';
import missile1Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_1_Flying_000.png';
import missile2Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_2_Flying_000.png';
import missile3Url from './assets/space_shooter/PNG/Sprites/Missile/Missile_3_Flying_000.png';


export default defineComponent( {
  components: {
    // BSlider,
    // BField
  },
  data() {
    return {
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
      images: {} as any,
      gameState: {} as Game,

      speed: 0.00001,
      fps: 30,
      value: 0,
      y: 0
    };
  },

  watch: {
    speed( value, oldValue ) {
      if ( !( value === oldValue ) && value !== "") {
        this.gameState.changeObjectsProperties( 'speed', value );
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
  },
  
  testFn() {
    this.ctx.save();
    const rad1 =  Math.atan( this.y / this.x );
    this.ctx.translate( 300, 300 );
    this.ctx.rotate( rad1 );
    this.ctx.fillStyle = 'red';
    this.ctx.strokeStyle = 'red';

    this.ctx.fillRect( -150 * 0.5, -50 * 0.5, 150, 50 );
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(150 * 0.5 , -50 * 0.25, 20, 20)
    this.ctx.restore();

  },

  async mounted() {
    this.canvas = this.$refs.gameScene as HTMLCanvasElement;
    this.ctx = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D;

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
      for ( let i = 0; i < 100; i++ ) {
        this.gameState.addObjectToScene(
          new MovingSceneObject(
            Vector.random(this.canvas.width),
            Vector.random(),
            imgType,
            1,
          ),
        );
      }
    }

    // this.gameState.start()

  },
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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#game-scene {
    border: 3px solid darkred;
}
</style>

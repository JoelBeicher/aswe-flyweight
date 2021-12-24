<script lang="ts">

import Game from './flyweight-classes/Game';
import MovingSceneObject from './flyweight-classes/MovingSceneObject';
import Vector from './helper/Vector';

import { defineComponent } from 'vue'

export default defineComponent({
    data() {
      return {
        canvas: {} as HTMLCanvasElement,
        ctx: {} as CanvasRenderingContext2D,
        images: {} as any,
        gameState: {} as Game
      }
    },


    methods: {
      async loadImages( urls: string[] ) {
        const images = {} as any;
        for ( const url of urls ) {
          console.log( this.getFileName( url ) );
          images[ `${ this.getFileName( url ) }` ] = await this.loadImage( url );
        }
        return images;
      },

      loadImage( url: string ) {
        return new Promise( ( resolve, reject ) => {
          let img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = new URL(url, import.meta.env.BASE_URL).href;
          img.onload = ( () => {
            resolve( img );
          } );
          img.onerror = ( () => reject( img ) );

        } );
      },

      getFileName( url: string ) {
        const match = url.match( '\([a-zA-Z0-9\\s_\\\\.\\-\\(\\):])\+(.png|.jpeg|.pdf)$' );
        const ext = match?.[ match[ 'length' ] - 1 ].toString();
        if (ext) {
          return match?.[ 0 ].replace( ext, '' );
        }
        return;
      },
    },

    async mounted() {
      this.canvas = this.$refs.gameScene as HTMLCanvasElement;
      this.ctx = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D;

      try {
        const urls = [
          './assets/space_shooter/PNG/Sprites/Missile/Missile_1_Flying_000.png',
          './assets/space_shooter/PNG/Sprites/Missile/Missile_2_Flying_000.png',
          './assets/space_shooter/PNG/Sprites/Missile/Missile_3_Flying_000.png',
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

      for ( const type of types ) {
        this.gameState.addObjectToScene(
          new MovingSceneObject(
            Vector.random( this.canvas.width ),
            Vector.random( this.canvas.width ),
            type,
          ),
        );
      }

      // this.gameState.start()

    }
});
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

<template>
  <div id="app">
    <canvas id="game-scene" ref="gameScene" :width="1024" :height="600" />
    <button class="start" @click="gameState.start()">
      Start Adding Objects
    </button>
    <button class="start" @click="gameState.stop()">
      Stop Animation
    </button>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

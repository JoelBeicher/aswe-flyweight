<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vector from '../helper/Vector';
import Game from '../flyweight-classes/Game';


export default defineComponent({
  name: 'GameActions',

  props: {
    canvasId: {
      required: true,
      type: String,
    },
    gameState: {
      required: true,
      type: Object as () => Game,
    },
  },

  data() {
    return {
      force: 10,
    };
  },

  methods: {
    clickAction( event: MouseEvent ) {
      event.preventDefault();
      event.stopPropagation();

      const { offsetX, offsetY } = event;

      this.gameState.changeObjectsProperty( 'target', new Vector( offsetX, offsetY ) );
      this.gameState.changeObjectsProperty( 'steeringForce', this.force );
    },

    addEventListeners() {
      document.getElementById( this.canvasId )?.addEventListener( 'mousedown', this.clickAction );
    },

    removeEventListeners() {
      document.getElementById( this.canvasId )?.removeEventListener( 'mousedown', this.clickAction );
    },

  },

  mounted() {
    this.addEventListeners();
  },

  destroyed() {
    this.removeEventListeners();
  },
})
</script>

<style lang="sass" scoped>

</style>

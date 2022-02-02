<template>
  <div class="game-controls">

    <!--    <div class="q-pa-md q-gutter-sm">-->
    <!--      <q-btn class="start" push color="primary" @click="gameState.start()">-->
    <!--        <q-icon left size="1em" name="fas fa-play" />-->
    <!--        Start Animation-->
    <!--      </q-btn>-->
    <!--      <q-btn class="stop" push color="secondary" @click="gameState.stop()">-->
    <!--        <q-icon left size="1em" name="fas fa-pause" />-->
    <!--        Stop Animation-->
    <!--      </q-btn>-->
    <!--    </div>-->

    <!--    <div class="q-pa-md">-->
    <!--      <q-badge color="secondary">-->
    <!--        Steering Force: {{ force }}-->
    <!--      </q-badge>-->

    <!--      <q-slider-->
    <!--        v-model="force"-->
    <!--        :min="1"-->
    <!--        :max="100"-->
    <!--        :step="1"-->
    <!--        label-->
    <!--        :label-value="force + '°'"-->
    <!--        label-always-->
    <!--        color="primary"-->
    <!--      />-->
    <!--    </div>-->

    <div id="slide-controls" class="q-pa-md q-gutter-sm">
      <q-btn class="prev-slide"
             push color="primary"
             @click="presentation.prevSlide(); presentation.draw();"
      >
        <q-icon left size="1em" name="fas fa-solid fa-arrow-left" />
        Previous Slide
      </q-btn>

<!--      <q-btn class="next-slide"-->
<!--             push color="secondary"-->
<!--             @click="presentation.nextSlide(); presentation.draw();"-->
<!--      >-->
<!--        Start Game-->
<!--        <q-icon size="1em" right name="fas fa-solid fa-arrow-right" />-->
<!--      </q-btn>-->

      <q-btn class="next-slide"
             push color="secondary"
             @click="presentation.nextSlide(); presentation.draw();"
      >
        Next Slide
        <q-icon size="1em" right name="fas fa-solid fa-arrow-right" />
      </q-btn>
    </div>

  </div>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Presentation from '../flyweight-classes/Presentation';

export default defineComponent( {
  name: 'GameControls',

  props: {
    canvasId: {
      required: true,
      type: String,
    },
    presentation: {
      required: true,
      type: Object as () => Presentation,
    },
  },

  mounted() {
    // this.addEventListeners();
    this.presentation.draw();
  },

  destroyed() {
    // this.removeEventListeners();
  },
} );
</script>

<style lang="sass" scoped>

#slide-controls
  display: flex
  justify-content: space-between
//space-evenly

</style>

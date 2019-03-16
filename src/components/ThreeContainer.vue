<template>
  <div id="threeContainer" ref="threeRootElement"></div>
</template>

<script>
import threeEntryPoint from "../threejs/threeEntryPoint.js";
export default {
  name: "ThreeContainer",
  props: {},
  data() {
    return {
      threeEntryPoint: null
    };
  },
  mounted() {
    this.$data.threeEntrypoint = threeEntryPoint(this.$refs.threeRootElement);
  }
};
</script>

<style lang="scss">
#threeContainer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;

  canvas {
    display: block;
  }
}
</style>

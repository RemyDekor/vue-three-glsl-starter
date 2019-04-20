<template>
    <ThreeWrapper class="threeWrapper">
        <!-- <Box
            v-for="(obj, index) of chartValues"
            :key="index"
            :x1="((index / chartValues.length) * 100)"
            :x2="((index / chartValues.length) * 100) + (100 / chartValues.length)"
            :y1="100"
            :y2="100 - obj.val"
            :color="obj.color"
            :value="obj.val"
        ></Box>-->
        <Box :pos="boxPos"/>
    </ThreeWrapper>
</template>

<script>
import * as THREE from "three";
import ThreeWrapper from "./ThreeWrapper.vue";
import Box from "./Box.vue";

export default {
    name: "ThreeContainer",
    components: {
        ThreeWrapper,
        Box
        // ThreeBox
    },
    props: {},
    data: () => ({
        boxPos: THREE.Vector3(0, 2, 0)
    }),
    mounted() {}
};
</script>

<style lang="scss" scoped>
.threeWrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 35vw;
    height: 35vh;
    z-index: -1;
}
</style>

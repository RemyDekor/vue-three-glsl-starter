<template>
    <div>
        <ThreeWrapper class="threeWrapper">
            <Box :pos="boxPositions[0]" :color="0xFFFFFF"/>
        </ThreeWrapper>
        <button @click="emitEvent">BUTTTOOOON</button>
    </div>
</template>

<script>
import { bus } from "../EventBus.js";
import ThreeWrapper from "./ThreeWrapper.vue";
import Box from "./Box.js";

export default {
    name: "ThreeContainer",
    components: {
        ThreeWrapper,
        Box
        // ThreeBox
    },
    props: {},
    data: () => ({
        boxPositions: [
            { x: -1, y: 0.5, z: 0 },
            { x: 0, y: 0, z: -2 },
            { x: 1, y: 0.5, z: 0 }
        ]
    }),
    mounted() {},
    methods: {
        emitEvent() {
            bus.$emit("emit-event");
        }
    }
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

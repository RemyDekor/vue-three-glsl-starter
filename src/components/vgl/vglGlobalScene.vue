<template>
    <div class="globalScene">
        <vgl-renderer antialias style="height: 100vh;">
            <vgl-perspective-camera orbit-position="10 1 1"></vgl-perspective-camera>
            <vgl-scene>
                <!-- this Box is not rendered -->
                <Box :pos="{x:0, y: 0, z: 0}" :color="0xFFFFFF"/>
                <vgl-sphere-geometry name="sphere"></vgl-sphere-geometry>
                <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
                <vgl-mesh geometry="sphere" material="std" position="1 2 0"></vgl-mesh>
                <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
                <vgl-directional-light position="0 1 1"></vgl-directional-light>
            </vgl-scene>
        </vgl-renderer>
    </div>
</template>

<script>
import Box from "../Box";
export default {
    name: "vglGlobalScene",
    components: {
        Box
    }
};
</script>

<style>
html,
body {
    margin: 0;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<template>
    <div class="threeContainer" ref="containerEl">
        <canvas class="threeCanvas" ref="canvasEl"/>
    </div>
</template>
    
<script>
/* eslint-disable no-console */
import * as THREE from "three";
export default {
    name: "ThreeMasterScene",
    props: {},
    data: () => ({
        renderer: null,
        camera: null,
        scene: null
    }),
    mounted() {
        this.$data.renderer = this.buildRenderer(this.$refs.canvasEl);
        this.$data.camera = this.buildCamera(this.$refs.canvasEl);
        this.$data.scene = this.buildScene();

        this.bindEventListeners();

        this.update();
    },
    beforeDestroy() {},
    methods: {
        bindEventListeners() {
            console.log("binding stuff");
            window.onresize = this.resizeCanvas;
            this.resizeCanvas();
        },
        buildRenderer(canvas) {
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            renderer.setClearColor(0xff55ff, 0.5);
            const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
            renderer.setPixelRatio(DPR);
            renderer.setSize(width, height);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            return renderer;
        },
        buildCamera(canvas) {
            const aspectRatio = canvas.offsetWidth / canvas.offsetHeight;
            const fieldOfView = 40;
            const nearPlane = 0.0001;
            const farPlane = 1000;
            const camera = new THREE.PerspectiveCamera(
                fieldOfView,
                aspectRatio,
                nearPlane,
                farPlane
            );
            camera.position.z = 5;
            return camera;
        },
        buildScene() {
            const scene = new THREE.Scene();
            return scene;
        },
        resizeCanvas() {
            const container = this.$refs.containerEl;
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            const camera = this.$data.camera;
            const renderer = this.$data.renderer;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        },
        update() {
            this.$data.renderer.render(this.$data.scene, this.$data.camera);
        }
    }
};
</script>

<style lang="scss" scoped>
.threeContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 35vw;
    height: 35vh;
    z-index: 1000;
    .threeCanvas {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>

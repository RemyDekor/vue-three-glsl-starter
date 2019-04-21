<template>
    <div ref="containerEl">
        <canvas class="threeCanvas" ref="canvasEl"></canvas>
        <slot></slot>
    </div>
</template>

<script>
import * as THREE from "three";
export default {
    name: "ThreeWrapper",
    data: () => ({
        renderer: null,
        camera: null,
        globalScene: null,
        time: 0
    }),
    provide() {
        // NOTE: This is a small boilerplate code to keep the stuff provided REACTIVE
        const globalSceneState = {};
        // Object.defineProperty(globalSceneState, "globalScene", {
        //     enumerable: true,
        //     get: () => this.globalScene
        // });
        Object.defineProperty(globalSceneState, "time", {
            enumerable: true,
            get: () => this.time
        });

        return { globalSceneState };
    },
    mounted() {
        this.renderer = this.buildRenderer(this.$refs.canvasEl);
        this.camera = this.buildCamera(this.$refs.canvasEl);
        this.globalScene = this.buildScene();

        this.bindEventListeners();

        this.update();
    },
    beforeDestroy() {
        this.update = () => {}; // clean up loop function
    },
    methods: {
        bindEventListeners() {
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
            const childrenObject3DArr = this.$slots.default.map(
                slotChildVNode => slotChildVNode.componentInstance.build()
            );
            scene.add(...childrenObject3DArr);
            return scene;
        },
        resizeCanvas() {
            const container = this.$refs.containerEl;
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            const camera = this.camera;
            const renderer = this.renderer;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        },
        update() {
            requestAnimationFrame(this.update);
            this.time++;

            this.$slots.default.map(slotChildVNode => {
                if (slotChildVNode.componentInstance.update) {
                    slotChildVNode.componentInstance.update();
                }
            });

            this.renderer.render(this.globalScene, this.camera);
        }
    }
};
</script>

<style lang="scss" scoped>
.threeCanvas {
    width: 100%;
    height: 100%;
    display: block;
}
</style>

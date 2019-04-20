<script>
/* eslint-disable no-console */
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/require-render-return */

import { bus } from "../EventBus.js";
import * as THREE from "three";

export default {
    // Gets us the provider property from the parent <my-canvas> component.
    inject: ["provider"],

    props: {
        pos: {
            type: Object,
            default: () => new THREE.Vector3(0, 0, 0)
        },
        scale: {
            type: Number,
            default: 1
        },
        color: {
            type: Number,
            default: 0xff00ff
        }
    },

    data: () => ({
        mesh: null
        // // We cache the dimensions of the previous
        // // render so that we can clear the area later.
        // oldBox: {
        //     x: null,
        //     y: null,
        //     w: null,
        //     h: null
        // }
    }),

    // computed: {
    //     calculatedBox() {
    //         const ctx = this.provider.context;

    //         // Turn start / end percentages into x, y, width, height in pixels.
    //         const calculated = {
    //             x: percentWidthToPix(this.x1, ctx),
    //             y: percentHeightToPix(this.y1, ctx),
    //             w: percentWidthToPix(this.x2 - this.x1, ctx),
    //             h: percentHeightToPix(this.y2 - this.y1, ctx)
    //         };

    //         // Yes yes, side-effects. This lets us cache the box dimensions of the previous render.
    //         // before we re-calculate calculatedBox the next render.
    //         this.oldBox = calculated;
    //         return calculated;
    //     }
    // },

    created() {
        // maybe instead of using a bus we would want to expose the function in the parent (so the parent can trigger it)
        bus.$on("emit-event", this.scaleDown);
    },

    methods: {
        build() {
            // if (!this.provider.globalScene) return null;
            // const scene = this.provider.globalScene;

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({
                color: this.$props.color
            });
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.copy(this.$props.pos);
            this.mesh.scale.set(
                this.$props.scale,
                this.$props.scale,
                this.$props.scale
            );
            return this.mesh;
            // scene.add(this.mesh);
        },
        scaleDown() {
            console.log("scaling down");
            this.mesh.scale.multiplyScalar(0.9);
        },
        update() {
            if (this.mesh) {
                this.mesh.rotation.x += 0.001;
                this.mesh.rotation.y += 0.005;
                this.mesh.rotation.z += 0.002;
            }
        }
    },

    render() {}
};
</script>
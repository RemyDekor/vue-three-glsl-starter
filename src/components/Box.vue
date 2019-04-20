<script>
/* eslint-disable no-console */
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/require-render-return */

import * as THREE from "three";

export default {
    // Gets us the provider property from the parent <my-canvas> component.
    inject: ["provider"],

    props: {
        pos: {
            type: Object,
            default: () => new THREE.Vector3(1, 0, 0)
        },
        scale: {
            type: Number,
            default: 0
        },
        color: {
            type: Number,
            default: 0x0000ff
        }
    },

    data: () => ({
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

    mounted() {
        setTimeout(() => {
            console.log(this.provider.globalScene);
            if (!this.provider.globalScene) return null;
            const scene = this.provider.globalScene;

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.copy(this.$props.pos);
            scene.add(cube);
        }, 200);
    },

    render() {
        // // Since the parent canvas has to mount first, it's *possible* that the context may not be
        // // injected by the time this render function runs the first time.
        // if (!this.provider.context) return null;
        // const ctx = this.provider.context;
        // // Keep a reference to the box used in the previous render call.
        // const oldBox = this.oldBox;
        // // Calculate the new box. (Computed properties update on-demand.)
        // const newBox = this.calculatedBox;
        // ctx.beginPath();
        // // Clear the old area from the previous render.
        // ctx.clearRect(oldBox.x, oldBox.y, oldBox.w, oldBox.h);
        // // Clear the area for the text.
        // ctx.clearRect(newBox.x, newBox.y - 42, newBox.w, 100);
        // // Draw the new rectangle.
        // ctx.rect(newBox.x, newBox.y, newBox.w, newBox.h);
        // ctx.fillStyle = this.color;
        // ctx.fill();
        // // Draw the text
        // ctx.fillStyle = "#000";
        // ctx.font = "28px sans-serif";
        // ctx.textAlign = "center";
        // ctx.fillText(
        //     Math.floor(this.value),
        //     newBox.x + newBox.w / 2,
        //     newBox.y - 14
        // );
    }
};
</script>
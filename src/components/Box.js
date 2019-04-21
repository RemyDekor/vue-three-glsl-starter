/* eslint-disable no-console */
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/require-render-return */

import { bus } from "../EventBus.js"
import * as THREE from "three"

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["globalSceneState"],

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
    // // We cache the dimensions of the previous
    // // render so that we can clear the area later.
    // oldBox: {
    //     x: null,
    //     y: null,
    //     ...
    // }
  }),

  computed: {
    mesh: () => new THREE.Mesh()
  },

  created() {
    // maybe instead of using a bus we would want to expose the function in the parent (so the parent can trigger it)
    bus.$on("emit-event", this.scaleDown)
  },

  methods: {
    build() {
      this.mesh.geometry = new THREE.BoxGeometry(1, 1, 1)
      this.mesh.material = new THREE.MeshBasicMaterial({
        color: this.$props.color
      })
      this.mesh.position.copy(this.$props.pos)
      this.mesh.scale.set(
        this.$props.scale,
        this.$props.scale,
        this.$props.scale
      )
      return this.mesh
    },
    scaleDown() {
      console.log("scaling down")
      this.mesh.scale.multiplyScalar(0.9)
    },
    update() {
      if (this.mesh) {
        this.mesh.rotation.x = 0.01 * this.globalSceneState.time
        this.mesh.rotation.y = 0.013 * this.globalSceneState.time
        this.mesh.rotation.z = 0.017 * this.globalSceneState.time
      }
    }
  },

  render() {}
}

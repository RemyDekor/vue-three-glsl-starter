/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Luminosity
 * http://en.wikipedia.org/wiki/Luminosity
 */

export default class LuminosityShader {
  constructor() {
    this.uniforms = {
      tDiffuse: { value: null }
    };

    this.vertexShader = [
      "varying vec2 vUv;",

      "void main() {",

      "vUv = uv;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

      "}"
    ].join("\n");

    this.fragmentShader = [
      "#include <common>",

      "uniform sampler2D tDiffuse;",

      "varying vec2 vUv;",

      "void main() {",

      "vec4 texel = texture2D( tDiffuse, vUv );",

      "float l = linearToRelativeLuminance( texel.rgb );",

      "gl_FragColor = vec4( l, l, l, texel.w );",

      "}"
    ].join("\n");
  }
}

import * as THREE from "three";
import EffectComposer, {
  RenderPass,
  ShaderPass,
  CopyShader
} from "three-effectcomposer-es6";

import vertexShader from "raw-loader!glslify-loader!./shaders/vertexShader.vert";
import fragmentShader from "raw-loader!glslify-loader!./shaders/fragmentShader.frag";

export default container => {
  const canvas = createCanvas(document, container);

  const canvasDimensions = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  };

  const renderer = buildRenderer(canvasDimensions);
  const camera = buildCamera(canvasDimensions);
  const mesh = buildMesh();
  const scene = buildScene();
  scene.add(mesh);

  // var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  // scene.add(ambientLight);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  renderPass.clearColor = new THREE.Color(0, 0, 0.6);
  renderPass.clearAlpha = 0;
  composer.renderTarget1;
  composer.addPass(renderPass);
  composer.copyPass.renderToScreen = true;

  // const someShaderPass = new ShaderPass(fragmentShader);
  // composer.addPass(someShaderPass);
  const copyPass = new ShaderPass(CopyShader);
  copyPass.renderToScreen = true;
  composer.addPass(copyPass);
  console.log(composer);

  composer.renderTarget1.format = THREE.RGBAFormat;
  composer.renderTarget2.format = THREE.RGBAFormat;

  let DELTA_TIME = 0;
  let LAST_TIME = Date.now();
  let mstime = 0;
  let time = 0;

  bindEventListeners();
  update();

  function createCanvas(document, container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    return canvas;
  }

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }

  function buildRenderer({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0x000000, 0.5);
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
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
  }

  function buildScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  function buildMesh() {
    // const mat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const mat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 }
      },
      vertexShader,
      fragmentShader
    });
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), mat);
    return mesh;
  }

  function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const { width, height } = canvas;
    canvasDimensions.width = width;
    canvasDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function updateTime() {
    DELTA_TIME = Date.now() - LAST_TIME;
    LAST_TIME = Date.now();
    mstime += DELTA_TIME;
    time = mstime * 0.001; // convert from millis to seconds
  }

  function update() {
    requestAnimationFrame(update);
    updateTime();

    mesh.rotation.x = time * 0.33;
    mesh.rotation.y = time * 0.23;

    mesh.material.uniforms.time.value = time;

    composer.render();
    // renderer.render(scene, camera);
  }

  return {
    // expose functions to Vue here
  };
};

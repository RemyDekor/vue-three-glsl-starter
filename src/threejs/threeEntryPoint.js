import * as THREE from "three";

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

  let DELTA_TIME = 0;
  let LAST_TIME = Date.now();
  let mstime = 0;
  let time = 0;

  bindEventListeners();
  scene.add(mesh);
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
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.ShaderMaterial({
        uniforms: {
          time: { type: "f", value: 0 }
        },
        vertexShader,
        fragmentShader
      })
    );
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

    // mesh.rotation.x = time * 0.0005;
    // mesh.rotation.y = time * 0.0005;

    mesh.material.uniforms.time.value = time;

    renderer.render(scene, camera);
  }

  return {
    // expose functions to Vue here
  };
};

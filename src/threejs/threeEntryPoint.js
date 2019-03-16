import * as THREE from "three";

export default container => {
  const canvas = createCanvas(document, container);

  const canvasDimensions = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  };

  const renderer = buildRenderer(canvasDimensions);
  const camera = buildCamera(canvasDimensions);
  const cubeMsh = buildCubeMesh();
  const scene = buildScene();

  bindEventListeners();
  scene.add(cubeMsh);
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
    const nearPlane = 4;
    const farPlane = 100;
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

  function buildCubeMesh() {
    const cubeMsh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    );
    return cubeMsh;
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

  function update() {
    requestAnimationFrame(update);
    const time = Date.now();

    cubeMsh.rotation.x = time * 0.0005;
    cubeMsh.rotation.y = time * 0.0005;

    renderer.render(scene, camera);
  }

  return {
    // expose functions to Vue here
  };
};

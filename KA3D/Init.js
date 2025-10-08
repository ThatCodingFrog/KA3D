import { Scene } from "../src/three/src/scenes/Scene.js";
import { WebGLRenderer } from "../src/three/src/renderers/WebGLRenderer.js";
import { PerspectiveCamera } from "../src/three/src/cameras/PerspectiveCamera.js";
import { MeshNormalMaterial } from "../src/three/src/materials/MeshNormalMaterial.js";

import { EventTarget, World } from "../src/physics/cannon-es.js";

let scene, camera, renderer, world, material;

function Init() {
  if(window.parent !== undefined) cancelAnimationFrame(window.parent.raf);

  document.body.style.setProperty("overflow", "hidden");
  
  scene = new Scene();
  camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);

  scene.add(camera);
  
  renderer = new WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  
  document.body.appendChild( renderer.domElement );

  var canvas = document.getElementsByTagName("canvas")[0];
  canvas.style.position = "absolute";
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  
  material = new MeshNormalMaterial();
  world = new World();
}

export { Init, scene, camera, renderer, world, material }

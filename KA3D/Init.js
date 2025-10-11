import { Scene } from "../src/three/src/scenes/Scene.js";
import { WebGLRenderer } from "../src/three/src/renderers/WebGLRenderer.js";
import { PerspectiveCamera } from "../src/three/src/cameras/PerspectiveCamera.js";
import { Vector3 } from "../src/three/src/math/Vector3.js";

import { World, Vec3 } from "../src/physics/cannon-es.js";

let scene, camera, renderer, world;

function Init() {
  if(window.parent !== undefined) cancelAnimationFrame(window.parent.raf);

  document.body.style.setProperty("overflow", "hidden");
  
  scene = new Scene();
  camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
  camera.position.z = 500;
  camera.lookAt(new Vector3(0,0,0));
  
  
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

  world = new World();
}

function EnablePhysics(gravityVector = new Vec3(0, -9.81, 0)) {
    world.gravity = gravityVector;
}

export { Init, scene, camera, renderer, world, material, EnablePhysics }

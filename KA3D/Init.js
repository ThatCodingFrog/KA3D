import { Scene } from "../src/three/src/scenes/Scene.js";
import { WebGLRenderer } from "../src/three/src/renderers/WebGLRenderer.js";
import { EventTarget, World } from "../src/physics/cannon-es.js";

let scene, camera, renderer, world;

function Init() {
  if(window.parent !== undefined) cancelAnimationFrame(window.parent.raf);
  scene = new Scene();
  renderer = new WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true
  });

  world = new World();
}

export { Init, scene, camera, renderer, world }

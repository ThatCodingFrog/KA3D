import { Scene } from "../src/three/src/scenes/Scene.js";

let scene, camera, renderer, world;

function Init() {
  if(window.parent !== undefined) cancelAnimationFrame(window.parent.raf);
  scene = new Scene();
}

export { Init, scene, camera, renderer, world }

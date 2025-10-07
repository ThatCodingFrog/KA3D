import { scene, camera, renderer, world } from "./Init.js";

let physMeshes = [], threeMeshes = [];

function Render() {
  if(window.parent !== undefined) window.parent.raf = requestAnimationFrame(Render);
  else requestAnimationFrame(Render);

  world.step( 1 / 60 );

  renderer.render(scene, camera);
  
  for(var i = 0; i < threeMeshes.length; i++) {
    threeMeshes[i].position.copy(physMeshes[i].position);
    threeMeshes[i].quaternion.copy(physMeshes[i].quaternion);
  }
}

export { Render, physMeshes, threeMeshes }

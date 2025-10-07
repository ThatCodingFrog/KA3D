import { BoxGeometry } from "../src/three/src/geometries/BoxGeometry.js";
import { Mesh } from "../src/three/src/objects/Mesh.js";
import { Box, Body, Vec3 } from "../src/physics/cannon-es.js";
import { scene, world, material } from "./Init.js";
import { physMeshes } from "./Render.js";

class Box {
  constructor(w = 100, h = 100, d = 100, mass = 1) {
    this.shape = new Mesh(new BoxGeometry(w, h, d), material);
    scene.add(this.shape);

    this._physShape = new Box(new Vec3(w/2, h/2, d/2))
    this.physShape = new Body({mass: mass, shape: this._physShape});
    world.addBody(this.physShape);
  }

  add(mesh, pos, rot) {
    this.shape.add(mesh.shape);
    this.physShape.addShape(mesh._physShape);
    return this;
  }
}

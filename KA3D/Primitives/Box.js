import { BoxGeometry } from "../../src/three/src/geometries/BoxGeometry.js";
import { Mesh } from "../../src/three/src/objects/Mesh.js";
import { PhysBox, Body, Vec3 } from "../../src/physics/cannon-es.js";
import { scene, world } from "../Init.js";
import { material } from "../SetMaterial.js";
import { physMeshes, threeMeshes } from "../Render.js";

import { Euler } from "../../src/three/src/math/Euler.js";
import { Quaternion } from "../../src/three/src/math/Quaternion.js";

class Box {
  constructor(w = 100, h = 100, d = 100, mass = 1) {
    this.shape = new Mesh(new BoxGeometry(w, h, d), material);
    scene.add(this.shape);

    threeMeshes.push(this.shape);
    
    this._physShape = new PhysBox(new Vec3(w/2, h/2, d/2))
      this.physShape = new Body({ mass: mass });

      this.physShape.addShape(this._physShape);
    world.addBody(this.physShape);

    physMeshes.push(this.physShape);
  }


    add(mesh) {
        const pos = mesh.physShape.position;
        const rot = mesh.physShape.quaternion;

        world.removeBody(mesh.physShape);
    this.shape.add(mesh.shape);
    this.physShape.addShape(mesh._physShape, pos, rot);
    return this;
    }

    setPosition(x = 0, y = 0, z = 0) {
        this.physShape.position.set(x, y, z);
        return this;
    }

    setRotation(x = 0, y = 0, z = 0) {
        var euler = new Euler(x, y, z, "YXZ");
        var quat = new Quaternion().setFromEuler(euler);
        this.physShape.quaternion.copy(quat);
        return this;
    }
}

export { Box }

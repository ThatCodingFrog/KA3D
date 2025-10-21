import { CylinderGeometry } from "../../src/three/src/geometries/CylinderGeometry.js";
import { PhysCylinder, Body } from "../../src/physics/cannon-es.js";
import { Mesh } from "../../src/three/src/objects/Mesh.js";
import { scene, world } from "../Init.js";
import { material } from "../SetMaterial.js";
import { physMeshes, threeMeshes } from "../Render.js";

import { Euler } from "../../src/three/src/math/Euler.js";
import { Quaternion } from "../../src/three/src/math/Quaternion.js";

class Cylinder {
    constructor(radiusTop = 1, radiusBottom = 1, height = 2, segments = 8, mass = 1) {
        this.shape = new Mesh(new CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
        scene.add(this.shape);

        threeMeshes.push(this.shape);

        this._physShape = new PhysCylinder(radiusTop, radiusBottom, height, segments);
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

export { Cylinder };
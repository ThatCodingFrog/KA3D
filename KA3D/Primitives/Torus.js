import { TorusGeometry } from "../../src/three/src/geometries/TorusGeometry.js";
import { Trimesh, ConvexPolyhedron, Body, Vec3 } from "../../src/physics/cannon-es.js";
import { Mesh } from "../../src/three/src/objects/Mesh.js";
import { scene, world } from "../Init.js";
import { material } from "../SetMaterial.js";
import { physMeshes, threeMeshes } from "../Render.js";

import { Euler } from "../../src/three/src/math/Euler.js";
import { Quaternion } from "../../src/three/src/math/Quaternion.js";
import { Vector3 } from "../../src/three/src/math/Vector3.js";

//getFaces function written by Brave Search Assist
function getFaces(mesh) {
    const faces = [];
    const position = mesh.geometry.getAttribute('position');
    const index = mesh.geometry.getIndex();

    if (index !== null) {
        for (let i = 0; i < index.count; i += 3) {
            const face = [
                index.getX(i),
                index.getX(i+2),
                index.getX(i+1)
            ];
            faces.push(face);
        }
    } else {
        // For non-indexed geometries, faces are defined by consecutive vertices
        for (let i = 0; i < position.count; i += 3) {
            const face = [i, i+2, i+1];
            faces.push(face);
        }
    }
    return faces;
}   


class Torus {
    constructor(radius = 1, tubeThickness = 0.5, radialSegments = 8, tubularSegements = 6, mass = 1) {
        this.shape = new Mesh(new TorusGeometry(radius, tubeThickness, radialSegments, tubularSegements), material);
        scene.add(this.shape);

        threeMeshes.push(this.shape);

        var faces = getFaces(this.shape);
        var vertices = [];

        for (let i = 0; i < this.shape.geometry.attributes.position.count; i++) {
            vertices.push(
                new Vec3(
                    this.shape.geometry.attributes.position.getX(i),
                    this.shape.geometry.attributes.position.getY(i),
                    this.shape.geometry.attributes.position.getZ(i)
                )
            );
        }

        //console.log(vertices, faces, this.shape.geometry);

        this._physShape = new ConvexPolyhedron({vertices: vertices, faces: faces})
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

export { Torus };
import { scene } from "./Init.js";
import { AmbientLight } from "../src/three/src/lights/AmbientLight.js";
import { PointLight } from "../src/three/src/lights/PointLight.js";
//Note: Point Lights use accurate units, where 1 = 1 meter.  Updated from r155 on

const
    AMBIENT = 0,
    POINT = 1,
    SPOT = 2,
    DIRECTIONAL = 3;

function AddLight(type = AMBIENT, color = "white", brightness = 100) {
    var l;
    console.log(type, color, brightness);
    switch (type) {
        case AMBIENT:
            l = new AmbientLight(color, brightness)
            scene.add(l);
            break;
        case POINT:
            l = new PointLight(color, brightness);
            scene.add(l);
            break;
        default:
            console.error("KA3D: Light is not a valid type");
    }
    return l;
}

export { AddLight, AMBIENT, POINT, SPOT, DIRECTIONAL }
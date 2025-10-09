import { MeshBasicMaterial } from "../src/three/src/materials/MeshBasicMaterial.js";
import { MeshNormalMaterial } from "../src/three/src/materials/MeshNormalMaterial.js";
import { MeshPhongMaterial } from "../src/three/src/materials/MeshPhongMaterial.js";
import { MeshPhysicalMaterial } from "../src/three/src/materials/MeshPhysicalMaterial.js";
import { MeshToonMaterial } from "../src/three/src/materials/MeshToonMaterial.js";
import { error } from "../src/three/src/utils.js";

let material = new MeshNormalMaterial();

const 
  NORMAL = "Normal",
  BASIC = "Basic",
  PHONG = "Phong",
  PHYSICAL = "Physical",
  TOON = "Toon";

function setMaterial(materialType = "Normal", attributes = {}) {
  switch(materialType) {
    case NORMAL:
      material = new MeshNormalMaterial(attributes);
      break;
    case BASIC:
      material = new MeshBasicMaterial(attributes);
      break;
    case PHONG:
      material = new MeshPhongMaterial(attributes);
      break;
    case PHYSICAL:
      material = new MeshPhysicalMaterial(attributes);
      break;
    case TOON:
      material = new MeshToonMaterial(attributes);
      break;
    default:
      error(materialType, "is not a valid material type or currently supported in KA3D");
  }
}

export { setMaterial, material, NORMAL, BASIC, PHONG, PHYSICAL, TOON }

// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { NearestFilter, Texture, TorusBufferGeometry } from "three";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
import "./style.css";

/* parameters */
const parameters = {
  color: 0xff0000, //    arbitrary value... used in gui and material
  // rotate: () => {
  //   gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  // },
};

/* textures */
// const image = new Image(); // create new instance of image
// const doorTexture = new THREE.Texture(image); // changes format of the image

// image.onload = () => {
//   doorTexture.needsUpdate = true;
// };

// image.src = "/textures/door/albedo.jpg";

// how loading images work under the hood ^ better to do this v

// const load = () => {
//   console.log("load");
// }; // can send 3 functions after texture path
// const progress = () => {
//   console.log("progress");
// }; // if the texture doesn't work, add these callback functions to see what is happening and spot errors
// const error = () => {
//   console.log("error");
// };

// const loadingManager = new THREE.LoadingManager(); // useful for loading bars ~ can also use with other types of loaders

// loadingManager.onStart = () => {
//   // can add parameters to get more info about each state
//   console.log("on start");
// };
// loadingManager.onLoaded = () => {
//   console.log("on loaded");
// };
// loadingManager.onProgress = () => { // https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145
//   console.log("on progress");
// };
// loadingManager.onError = () => {
//   console.log("on error");
// };

/* loading textures */
const textureLoader = new THREE.TextureLoader(); // one texture loader to load all textures
// const CubeTextureLoader = new THREE.CubeTextureLoader();

// const doorAlbedo = textureLoader.load("/textures/door/albedo.jpg" /* , load, progress, error */);
// const doorAmbientOcclusion = textureLoader.load("/textures/door/ambientocclusion.jpg");
// const doorNormal = textureLoader.load("/textures/door/normal.jpg");
// const doorAlpha = textureLoader.load("/textures/door/alpha.jpg");
// const doorHeight = textureLoader.load("/textures/door/height.jpg");
// const doorMetalness = textureLoader.load("/textures/door/metalness.jpg");
// const doorRoughness = textureLoader.load("/textures/door/roughness.jpg");
const matcap = textureLoader.load("/textures/matcaps/7.png");
// const gradient = textureLoader.load("/textures/gradients/3.jpg");

// const environmentMapTexture = CubeTextureLoader.load([
//   // needs to be in order
//   "/textures/environmentMaps/4/px.png",
//   "/textures/environmentMaps/4/nx.png",
//   "/textures/environmentMaps/4/py.png",
//   "/textures/environmentMaps/4/ny.png",
//   "/textures/environmentMaps/4/pz.png",
//   "/textures/environmentMaps/4/nz.png",
// ]);
/* transforming textures */
// doorAlbedo.repeat.x = 2;
// doorAlbedo.repeat.y = 3;
// doorAlbedo.wrapS = THREE.RepeatWrapping;
// doorAlbedo.wrapT = THREE.RepeatWrapping;
// doorAlbedo.wrapS = THREE.MirroredRepeatWrapping;
// doorAlbedo.wrapT = THREE.MirroredRepeatWrapping;
// doorAlbedo.offset.x = 0.5;
// doorAlbedo.offset.y = 0.5;
// doorAlbedo.rotation = Math.PI / 1;
// doorAlbedo.center.x = 0.5;
// doorAlbedo.center.y = 0.5;

// doorAlbedo.generateMipmaps = false;
// doorAlbedo.minFilter = THREE.NearestFilter;
// doorAlbedo.magFilter = THREE.NearestFilter;

/** fonts */
const fontLoader = new FontLoader();
console.log(THREE);
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello three.js", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 1,
  });

  // two ways to center: (about the bounding box)
  // textGeometry.computeBoundingBox();
  // textGeometry.translate((textGeometry.boundingBox.max.x - 0.02) * -0.5, (textGeometry.boundingBox.max.y - 0.02) * -0.5, (textGeometry.boundingBox.max.z - 0.03) * -0.5);
  // console.log(textGeometry.boundingBox);

  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap });
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
  // textMaterial.wireframe = true;
  /** unoptimized */
  // console.time("donuts");

  // for (let i = 0; i < 1000; i++) {
  //   const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45); //generating 1k new goemetries and materials
  //   const donutMaterial = new THREE.MeshMatcapMaterial({ matcap }); // separate material
  //   const donut = new THREE.Mesh(donutGeometry, donutMaterial);

  //   donut.position.x = (Math.random() - 0.5) * 10;
  //   donut.position.y = (Math.random() - 0.5) * 10;
  //   donut.position.z = (Math.random() - 0.5) * 10;
  //   donut.rotation.x = Math.random() * Math.PI;
  //   donut.rotation.y = Math.random() * Math.PI;
  //   const donutScale = Math.random();
  //   donut.scale.set(donutScale, donutScale, donutScale);

  //   scene.add(donut);
  // }
  // console.timeEnd("donuts");

  /** optimized */
  console.time("donuts");
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
  for (let i = 0; i < 400; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const donutScale = Math.random();
    donut.scale.set(donutScale, donutScale, donutScale);

    scene.add(donut);
  }
  console.timeEnd("donuts");
});
/* cursor */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (ev) => {
  cursor.x = ev.clientX / sizes.width - 0.5;
  cursor.y = -(ev.clientY / sizes.height - 0.5);
  //   console.log(cursor.x, cursor.y);
});

/* canvas */
const canvas = document.querySelector("canvas.webgl");

/* scene */
const scene = new THREE.Scene();

/** axes helper */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/* object */

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 3, 4);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// const positionsArray = new Float32Array(9);

// positionsArray(0) = 0
// positionsArray(1) = 0
// positionsArray(2) = 0

// positionsArray(3) = 0
// positionsArray(4) = 1
// positionsArray(5) = 0

// positionsArray(6) = 1
// positionsArray(7) = 0
// positionsArray(8) = 0

// const positionsArray = new Float32Array([
//   0,
//   0,
//   0, //1st vertex
//   0,
//   1,
//   0, //2nd vertex
//   1,
//   0,
//   0, //3rd vertex
// ]);

// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);

// geometry.setAttribute("position", positionAttribute); //1st arg name of shader, 2nd is our attribute

// const geometry = new THREE.BufferGeometry();

// const count = 5;
// const positionsArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4;
// }

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionsAttribute);

/* object */
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ /*color: parameters.color,*/ map: doorAlbedo });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

/* material study*/
/** basic material */
// const material = new THREE.MeshBasicMaterial();
// material.map = doorAlbedo;
// material.color.set("green");
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 1;
// material.alphaMap = doorAlpha;
// material.side = THREE.DoubleSide;

/** normal material */
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

/** matcap material */
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matCap;

/** depth material */
// const material = new THREE.MeshDepthMaterial();

/** lambert material */
// const material = new THREE.MeshLambertMaterial();

/** phong material */
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 10;
// material.specular = new THREE.Color('red')

/** toon material */
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradient;
// gradient.minFilter = THREE.NearestFilter;
// gradient.magFilter = THREE.NearestFilter;
// gradient.generateMipmaps = false;

/** standard material */
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0;
// material.roughness = 1;
// material.map = doorAlbedo;
// material.aoMap = doorAmbientOcclusion;
// material.aoMapIntensity = 0.1;
// material.displacementMap = doorHeight;
// material.displacementScale = 0.037;
// material.metalnessMap = doorMetalness;
// material.roughnessMap = doorRoughness;
// material.normalMap = doorNormal;
// material.normalScale.set(0.5, 0.5);
// material.alphaMap = doorAlpha; // needs transparency to be true
// material.transparent = true;

/** environment map */
const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.7;
// material.roughness = 0.2;
// material.envMap = environmentMapTexture; // added reflection of the environment into mesh

/** objects */
// const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 16, 64, 64), material);
// sphere.position.x = -1.5;
// sphere.geometry.setAttribute("uv2", new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2));

// const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 100, 100), material);
// plane.position.x = 1.5;
// plane.geometry.setAttribute("uv2", new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));

// const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material);
// torus.geometry.setAttribute("uv2", new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2));

// scene.add(sphere, plane, torus);

//
//
//
//
//

/** objects */
// const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), material);
// scene.add(cube);

/* debug ui */
const gui = new dat.GUI({ width: 400 }); /** can add { closed: true, width: 400 } and other tweaks */

// gui.add(mesh.position, "x", -3, 3, 0.01).name("red cube y"); //range
// gui.add(mesh.position, "y", -3, 3, 0.01).name("red cube x"); //range
// gui.add(mesh.position, "z", -3, 3, 0.01).name("red cube z"); //range

// gui.add(mesh, "visible"); //boolean
// gui.add(material, "wireframe"); //boolean

// //first arg is an object, second is the prop to change
// gui.addColor(parameters, "color").onChange(() => {
//   material.color.set(parameters.color);
// });
// gui.add(parameters, "rotate");

// toggle debug ui with H key
window.addEventListener("keydown", (ev) => {
  if (ev.key === "h") {
    if (gui._hidden) gui.show();
    else gui.hide();
  }
});

/* debug ui */

// gui.add(material, "metalness", 0, 1, 1);
// gui.add(material, "roughness", 0, 1);
// gui.add(material, "aoMapIntensity", 0, 15, 0.00001);
// gui.add(material, "displacementScale", 0, 1);
// gui.add(material, "normalScale");

//

/* lights */
const ambient = new THREE.AmbientLight(0xffffff, 0.5); // (color, intesity)
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(ambient, pointLight);
//

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = sizes.width / sizes.height;

//window resize
window.addEventListener(
  "resize",
  () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  },
  false
);

/* fullscreen */
// window.addEventListener("dblclick", () => {
//   const fullscreen = document.fullscreenElement || document.webkitFullscreenElement;

//   if (!fullscreen) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFulscren) {
//       canvas.webkitFullscreen;
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitFullscreen) {
//       document.webkitExitFullscreen;
//     }
//   }
// });
/* */

/* camera */
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 2;
// camera.lookAt(mesh.position);
scene.add(camera);

/* controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

/* renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

let time = Date.now();
const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 });

/* animations */
const tick = () => {
  //   //time
  //   //   const currentTime = Date.now();
  //   //   const deltaTime = currentTime - time;
  //   //clock
  const elapsedTime = clock.getElapsedTime();
  //   //update objects
  //   mesh.rotation.y = elapsedTime;
  //   //   mesh.position.x = Math.cos(elapsedTime);
  //   //   camera.position.y = Math.sin(elapsedTime);
  //   //   camera.position.x = Math.cos(elapsedTime);
  //   //   camera.lookAt(mesh.position);
  // sphere.rotation.x = elapsedTime * 0.15;
  // sphere.rotation.y = elapsedTime * 0.1;
  // plane.rotation.x = elapsedTime * 0.15;
  // plane.rotation.y = elapsedTime * 0.1;
  // torus.rotation.x = elapsedTime * 0.15;
  // torus.rotation.y = elapsedTime * 0.1;

  //update camera
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 6;
  //   camera.lookAt(new THREE.Vector3());
  //update controls
  controls.update();
  //   //render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

gui.add(ambient, "intensity", 0, 1).name("ambient intensity");
gui.add(pointLight, "intensity", 0, 1).name("pointLight intensity");

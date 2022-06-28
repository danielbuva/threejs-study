import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
import "./style.css";

/* parameters */
const parameters = {
  color: 0xff0000, //    arbitrary value... used in gui and material
  rotate: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = sizes.width / sizes.height;

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
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* debug ui */
const gui = new dat.GUI({ width: 400 }); /** can add { closed: true, width: 400 } and other tweaks */

gui.add(mesh.position, "x", -3, 3, 0.01).name("red cube y"); //range
gui.add(mesh.position, "y", -3, 3, 0.01).name("red cube x"); //range
gui.add(mesh.position, "z", -3, 3, 0.01).name("red cube z"); //range

gui.add(mesh, "visible"); //boolean
gui.add(material, "wireframe"); //boolean

//first param is an object, second is the prop to change
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
gui.add(parameters, "rotate");

// toggle debug ui with H key
window.addEventListener("keydown", (ev) => {
  if (ev.key === "h") {
    if (gui._hidden) gui.show();
    else gui.hide();
  }
});

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
camera.lookAt(mesh.position);
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

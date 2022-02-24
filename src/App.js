import * as THREE from 'three'

const windowInnerWidth = 500
const windowInnerHeight = 500
const vshader = `
void main() {	
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position * 0.1, 1.0 );
}
`
const fshader = `
  uniform vec3 u_color;

  void main() {
    gl_FragColor = vec4(u_color, 1.0).bgra;
  }
`


const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(windowInnerWidth, windowInnerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 2);

const uniforms = {
  u_color: { value: new THREE.Color(0xFF0000) }
}
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader,
});












const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;

onWindowResize();
window.addEventListener('resize', onWindowResize, false);

animate();

function onWindowResize(event) {
  const aspectRatio = windowInnerWidth / windowInnerHeight;
  let width, height;
  if (aspectRatio >= 1) {
    width = 1;
    height = (windowInnerHeight / windowInnerWidth) * width;
  } else {
    width = aspectRatio;
    height = 1;
  }
  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;
  camera.updateProjectionMatrix();
  renderer.setSize(windowInnerWidth, windowInnerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function App() {
  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Cursor Event Listener
const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / window.innerWidth - 0.5
  cursor.y = -(e.clientY / window.innerHeight - 0.5)
})

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Scene
const scene = new THREE.Scene()

// Mesh
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),
})
renderer.setSize(sizes.width, sizes.height)

// Animation
function animate() {
  // Use sin and cos to control camera swivel
  camera.position.y = cursor.y * 3
  camera.position.x = Math.sin(Math.PI * 2 * cursor.x) * 3
  camera.position.z = Math.cos(Math.PI * 2 * cursor.x) * 3

  // Look at red cube after position changes.
  camera.lookAt(mesh.position)

  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

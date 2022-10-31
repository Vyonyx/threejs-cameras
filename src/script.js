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
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),
})
renderer.setSize(window.innerWidth, window.innerHeight)

// Animation
function animate() {
  // Update camera position based on cursor position.
  camera.position.x = cursor.x * 10
  camera.position.y = cursor.y * 10

  // Look at red cube after position changes.
  camera.lookAt(mesh.position)

  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()

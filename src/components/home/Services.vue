<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const container = ref(null)
const selectedService = ref(null)

const services = [
  {
    title: 'Landing Pages',
    description:
      'Sua ideia merece uma primeira impressão inesquecível. Crio páginas que combinam estética, clareza e uma navegação que convida a continuar.',
  },
  {
    title: 'Identidade Visual',
    description:
      'Muito além de um símbolo: uma linguagem visual que traduz a personalidade do projeto e cria reconhecimento',
  },
  {
    title: 'Redesign de Sites',
    description:
      'Seu site pode ir além. Renovo interfaces para torná-las mais intuitivas e agradáveis de usar, sem perder a essência da marca.',
  },
]

let scene
let camera
let renderer
let clock
let animationId
let raycaster
let pointer
let resizeObserver
let canvas
let world

let objects = []
let activeDrag = null
let hoveredIndex = -1
let pointerStart = { x: 0, y: 0 }
let previousPointer = { x: 0, y: 0 }
let hasDragged = false

const BASE_SPACING = 4.15

function makeMaterial(color, options = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.68,
    roughness: 0.23,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    ...options,
  })
}

function addMesh(group, geometry, material, position = [0, 0, 0]) {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(...position)
  group.add(mesh)
  return mesh
}

function addBox(group, size, material, position, rotation = 0) {
  const mesh = addMesh(
    group,
    new THREE.BoxGeometry(...size),
    material,
    position,
  )
  mesh.rotation.z = rotation
  return mesh
}

function createLandingPage() {
  const group = new THREE.Group()

  const frame = makeMaterial(0x243c61, {
    metalness: 0.85,
    roughness: 0.2,
  })

  const screen = makeMaterial(0xb6dcff, {
    emissive: 0x174b8b,
    emissiveIntensity: 0.18,
    metalness: 0.12,
    roughness: 0.3,
  })

  const blue = makeMaterial(0x347fff, {
    emissive: 0x1655ff,
    emissiveIntensity: 0.65,
  })

  const white = makeMaterial(0xf0f6ff, {
    metalness: 0.15,
    roughness: 0.32,
  })

  addBox(group, [1.8, 2.25, 0.16], frame, [0, 0, 0])
  addBox(group, [1.65, 2.08, 0.035], screen, [0, 0.015, 0.1])

  addBox(group, [1.65, 0.18, 0.045], frame, [0, 0.96, 0.13])

  ;[-0.65, -0.52, -0.39].forEach((x, i) => {
    addMesh(
      group,
      new THREE.SphereGeometry(0.027, 12, 12),
      [blue, white, blue][i],
      [x, 0.96, 0.17],
    )
  })

  addBox(group, [0.93, 0.11, 0.04], blue, [-0.13, 0.65, 0.15])
  addBox(group, [0.76, 0.045, 0.04], white, [-0.21, 0.44, 0.15])
  addBox(group, [0.62, 0.045, 0.04], white, [-0.28, 0.32, 0.15])

  addBox(group, [0.72, 0.48, 0.05], blue, [-0.3, -0.08, 0.16])
  addBox(group, [0.6, 0.13, 0.05], frame, [-0.3, -0.53, 0.16])
  addBox(group, [0.35, 0.045, 0.06], white, [-0.3, -0.53, 0.2])

  return group
}

function createIdentity() {
  const group = new THREE.Group()

  const frameMaterial = makeMaterial(0x101b35, {
    metalness: 0.65,
    roughness: 0.25
  })

  const headerMaterial = makeMaterial(0x1b2b4a, {
    metalness: 0.45,
    roughness: 0.3
  })

  const screenMaterial = makeMaterial(0xeaf2ff, {
    metalness: 0.08,
    roughness: 0.45
  })

  const sidebarMaterial = makeMaterial(0xd7e4f8, {
    metalness: 0.15,
    roughness: 0.4
  })

  const cyanMaterial = makeMaterial(0x42d9ff, {
    emissive: 0x0a526b,
    emissiveIntensity: 0.35
  })

  const purpleMaterial = makeMaterial(0x9b7bff)
  const pinkMaterial = makeMaterial(0xff78b7)
  const blueMaterial = makeMaterial(0x477bff)
  const whiteMaterial = makeMaterial(0xffffff, {
    metalness: 0.05,
    roughness: 0.5
  })

  addBox(
    group,
    [2.05, 1.58, 0.16],
    frameMaterial,
    [0, 0, 0]
  )

  addBox(
    group,
    [1.94, 1.46, 0.025],
    screenMaterial,
    [0, -0.025, 0.09]
  )

  addBox(
    group,
    [2.0, 0.22, 0.035],
    headerMaterial,
    [0, 0.65, 0.105]
  )

  const dotGeometry = new THREE.SphereGeometry(0.035, 16, 16)

  addMesh(group, dotGeometry, pinkMaterial, [-0.82, 0.65, 0.14])
  addMesh(group, dotGeometry, purpleMaterial, [-0.70, 0.65, 0.14])
  addMesh(group, dotGeometry, cyanMaterial, [-0.58, 0.65, 0.14])

  addBox(
    group,
    [0.34, 1.18, 0.025],
    sidebarMaterial,
    [-0.79, -0.075, 0.115]
  )

  addBox(
    group,
    [0.10, 0.10, 0.035],
    blueMaterial,
    [-0.79, 0.37, 0.14],
    Math.PI / 4
  )

  addMesh(
    group,
    new THREE.CircleGeometry(0.055, 24),
    purpleMaterial,
    [-0.79, 0.16, 0.145]
  )

  addMesh(
    group,
    new THREE.TorusGeometry(0.045, 0.014, 8, 24),
    blueMaterial,
    [-0.79, -0.055, 0.15]
  )

  addBox(
    group,
    [0.11, 0.07, 0.035],
    cyanMaterial,
    [-0.79, -0.27, 0.14]
  )

  const toolDotGeometry = new THREE.CircleGeometry(0.025, 16)

  addMesh(
    group,
    toolDotGeometry,
    pinkMaterial,
    [-0.86, -0.48, 0.15]
  )

  addMesh(
    group,
    toolDotGeometry,
    cyanMaterial,
    [-0.79, -0.48, 0.15]
  )

  addMesh(
    group,
    toolDotGeometry,
    purpleMaterial,
    [-0.72, -0.48, 0.15]
  )

  addBox(
    group,
    [1.18, 1.02, 0.035],
    whiteMaterial,
    [0.25, -0.055, 0.125]
  )

  addMesh(
    group,
    new THREE.CircleGeometry(0.24, 40),
    cyanMaterial,
    [0.03, 0.16, 0.155]
  )

  addBox(
    group,
    [0.43, 0.43, 0.055],
    purpleMaterial,
    [0.43, 0.05, 0.17],
    Math.PI / 4
  )

  addMesh(
    group,
    new THREE.CircleGeometry(0.15, 32),
    pinkMaterial,
    [0.53, 0.19, 0.205]
  )

  addBox(
    group,
    [0.62, 0.075, 0.035],
    blueMaterial,
    [0.23, -0.34, 0.16]
  )

  addBox(
    group,
    [0.40, 0.055, 0.035],
    cyanMaterial,
    [0.12, -0.46, 0.16]
  )

  addMesh(
    group,
    new THREE.CircleGeometry(0.045, 24),
    purpleMaterial,
    [0.67, -0.32, 0.16]
  )

  addMesh(
    group,
    new THREE.CircleGeometry(0.045, 24),
    pinkMaterial,
    [0.80, -0.32, 0.16]
  )

  const swatchGeometry = new THREE.CircleGeometry(0.055, 24)

  const swatches = [
    { x: -0.12, color: blueMaterial },
    { x: 0.03, color: purpleMaterial },
    { x: 0.18, color: pinkMaterial },
    { x: 0.33, color: cyanMaterial }
  ]

  swatches.forEach(({ x, color }) => {
    addMesh(
      group,
      swatchGeometry,
      color,
      [x, -0.65, 0.15]
    )
  })

  group.rotation.set(-0.08, -0.16, -0.035)
  group.scale.setScalar(1.03)

  return group
}

function createRedesign() {
  const group = new THREE.Group()

  const oldPage = makeMaterial(0x35445c, {
    metalness: 0.6,
    roughness: 0.32,
  })

  const newPage = makeMaterial(0xd3e9ff, {
    metalness: 0.15,
    roughness: 0.23,
  })

  const blue = makeMaterial(0x397dff, {
    emissive: 0x1858ff,
    emissiveIntensity: 0.65,
  })

  const white = makeMaterial(0xffffff, {
    metalness: 0.12,
    roughness: 0.3,
  })

  const old = addMesh(
    group,
    new THREE.BoxGeometry(1.45, 1.85, 0.08),
    oldPage,
    [0.28, 0.15, -0.3],
  )
  old.rotation.z = -0.17

  addBox(group, [0.95, 0.1, 0.04], oldPage, [0.27, 0.58, -0.24], -0.17)
  addBox(group, [0.72, 0.055, 0.04], oldPage, [0.2, 0.32, -0.24], -0.17)

  const fresh = addMesh(
    group,
    new THREE.BoxGeometry(1.38, 1.78, 0.1),
    newPage,
    [-0.18, -0.03, 0.1],
  )
  fresh.rotation.z = 0.08

  addBox(group, [1.37, 0.17, 0.045], blue, [-0.18, 0.78, 0.18], 0.08)
  addBox(group, [0.76, 0.095, 0.045], blue, [-0.25, 0.42, 0.18], 0.08)
  addBox(group, [0.8, 0.045, 0.045], white, [-0.21, 0.2, 0.18], 0.08)
  addBox(group, [0.63, 0.045, 0.045], white, [-0.25, 0.06, 0.18], 0.08)
  addBox(group, [0.55, 0.31, 0.045], blue, [-0.24, -0.36, 0.18], 0.08)

  const arrow = new THREE.Group()
  arrow.position.set(0.78, -0.72, 0.38)
  arrow.rotation.z = -0.2
  group.add(arrow)

  addBox(arrow, [0.42, 0.055, 0.055], blue, [0, 0, 0])
  const tip = addMesh(
    arrow,
    new THREE.ConeGeometry(0.12, 0.23, 4),
    blue,
    [0.22, 0, 0],
  )
  tip.rotation.z = -Math.PI / 2

  return group
}

function getServiceIndex(object) {
  let current = object

  while (current) {
    if (Number.isInteger(current.userData.serviceIndex)) {
      return current.userData.serviceIndex
    }
    current = current.parent
  }

  return -1
}

function pickObject() {
  raycaster.setFromCamera(pointer, camera)

  const hits = raycaster.intersectObjects(objects, true)
  const hit = hits.find((item) => getServiceIndex(item.object) !== -1)

  return hit ? getServiceIndex(hit.object) : -1
}

function updatePointer(event) {
  const rect = canvas.getBoundingClientRect()

  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

function onPointerDown(event) {
  if (event.button !== 0) return

  updatePointer(event)

  const index = pickObject()

  if (index === -1) {
    activeDrag = null
    return
  }

  activeDrag = index
  hasDragged = false

  pointerStart = { x: event.clientX, y: event.clientY }
  previousPointer = { x: event.clientX, y: event.clientY }

  canvas.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event) {
  updatePointer(event)

  if (activeDrag !== null) {
    const object = objects[activeDrag]
    const dx = event.clientX - previousPointer.x
    const dy = event.clientY - previousPointer.y

    if (
      Math.abs(event.clientX - pointerStart.x) > 4 ||
      Math.abs(event.clientY - pointerStart.y) > 4
    ) {
      hasDragged = true
    }

    object.rotation.y += dx * 0.009
    object.rotation.x += dy * 0.009

    previousPointer = { x: event.clientX, y: event.clientY }
    canvas.style.cursor = 'grabbing'
    return
  }

  hoveredIndex = pickObject()
  canvas.style.cursor = hoveredIndex !== -1 ? 'grab' : 'default'
}

function onPointerUp() {
  if (activeDrag === null) return

  const index = activeDrag
  activeDrag = null

  if (!hasDragged) {
    selectedService.value =
      selectedService.value === index ? null : index
  }

  canvas.style.cursor = hoveredIndex !== -1 ? 'grab' : 'default'
}

function onPointerLeave() {
  if (activeDrag === null) {
    hoveredIndex = -1
    canvas.style.cursor = 'default'
  }
}

function resize() {
  if (!container.value || !renderer || !camera) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  if (!width || !height) return

  const isMobile = width <= 480
  const isTablet = width <= 820

  const spacing = isMobile
    ? 3.2
    : isTablet
      ? 3.8
      : BASE_SPACING

  camera.aspect = width / height
  camera.position.z = isMobile
    ? 11.5
    : isTablet
      ? 10
      : 8.5

  camera.updateProjectionMatrix()

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 1.75),
  )
  renderer.setSize(width, height)

  objects.forEach((object, index) => {
    object.userData.baseX = (index - 1) * spacing
    object.position.x = object.userData.baseX
  })
}

function animate() {
  animationId = requestAnimationFrame(animate)

  const delta = Math.min(clock.getDelta(), 0.04)
  const time = clock.elapsedTime

  objects.forEach((object, index) => {
    const selected = selectedService.value === index
    const hovered = hoveredIndex === index
    const isBeingDragged = activeDrag === index

    const floatSpeed = 0.7
    const floatHeight = selected ? 0.12 : 0.16

    const targetY =
      Math.sin(time * floatSpeed + index * 2) * floatHeight

    object.position.y = THREE.MathUtils.lerp(
      object.position.y,
      targetY,
      1 - Math.exp(-delta * 3)
    )


    const scale = selected ? 1.1 : hovered ? 1.045 : 1

    object.scale.lerp(
      new THREE.Vector3(scale, scale, scale),
      1 - Math.exp(-delta * 3)
    )
  })

  renderer.render(scene, camera)
}

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    40,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    100,
  )
  camera.position.set(0, 0, 8.5)

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })

  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  canvas = renderer.domElement
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.display = 'block'
  canvas.style.touchAction = 'none'
  container.value.appendChild(canvas)

  scene.add(new THREE.AmbientLight(0xaacfff, 1.5))

  const blueLight = new THREE.PointLight(0x3487ff, 55, 24)
  blueLight.position.set(-4, 3, 5)
  scene.add(blueLight)

  const cyanLight = new THREE.PointLight(0x57d8ff, 35, 20)
  cyanLight.position.set(4, -2, 3)
  scene.add(cyanLight)

  const topLight = new THREE.DirectionalLight(0xffffff, 2)
  topLight.position.set(1, 5, 6)
  scene.add(topLight)

  world = new THREE.Group()
  scene.add(world)

  const creators = [
    createLandingPage,
    createIdentity,
    createRedesign,
  ]

  creators.forEach((create, index) => {
    const object = create()
    object.userData.serviceIndex = index
    object.userData.baseX = (index - 1) * BASE_SPACING
    object.position.x = object.userData.baseX

    object.traverse((child) => {
      if (child.isMesh) {
        child.userData.serviceIndex = index
      }
    })

    objects.push(object)
    world.add(object)
  })

  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2(10, 10)
  clock = new THREE.Clock()

  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  canvas.addEventListener('pointerleave', onPointerLeave)

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container.value)
  resize()
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  resizeObserver?.disconnect()

  if (canvas) {
    canvas.removeEventListener('pointerdown', onPointerDown)
    canvas.removeEventListener('pointermove', onPointerMove)
    canvas.removeEventListener('pointerup', onPointerUp)
    canvas.removeEventListener('pointercancel', onPointerUp)
    canvas.removeEventListener('pointerleave', onPointerLeave)
  }

  scene?.traverse((object) => {
    object.geometry?.dispose()

    if (object.material) {
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material]

      materials.forEach((mat) => mat.dispose())
    }
  })

  renderer?.dispose()
  renderer?.domElement.remove()
  objects = []
})
</script>

<template>
  <section id="servicos" class="services-section">
    <p class="services-label">SERVIÇOS E POSSIBILIDADES</p>
    <p class="services-hint">Clique ou arraste um elemento para interagir</p>
    <div
      ref="container"
      class="services-scene"
      aria-label="Três objetos 3D interativos representando serviços"
    ></div>


  <Transition
    name="service-reveal"
    mode="out-in"
    appear
  >
    <article
      v-if="selectedService !== null"
      :key="selectedService"
      class="service-description"
    >
      <h3>{{ services[selectedService].title }}</h3>

      <p>{{ services[selectedService].description }}</p>
    </article>
  </Transition>
  </section>
</template>

<style scoped>
.services-label {
  position: relative;
  z-index: 1;
  margin: 0 0 8px;
  color: #8dc7ff;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
}

.services-hint {
  position: relative;
  z-index: 1;
  margin: 0 0 4px;
  color: #a9b9cf;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  opacity: 0.85;
}

.services-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
  width: 100%;
  min-width: 0;
  min-height: clamp(340px, 48vh, 520px);
  padding: 16px 24px;
  overflow: visible;
  background: transparent;
  color: #fff;
}

.services-scene {
  position: relative;
  flex: 0 0 auto;
  width: min(1200px, 100%);
  height: clamp(300px, 38vw, 420px);
  min-width: 0;
  margin: 0 auto;
  overflow: visible;
}

.services-scene canvas {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  touch-action: none;
}

.service-description {
  position: absolute;
  top: calc(16px + clamp(300px, 38vw, 420px) + 8px);
  left: 50%;
  z-index: 1;
  width: min(600px, calc(100% - 24px));
  margin: 0;
  padding: 0 12px;
  text-align: center;
  transform: translateX(-50%);
}

.service-description h3 {
  margin: 8px 0 10px;
  color: #f4f8ff;
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.035em;
}

.service-description p {
  max-width: 550px;
  margin: 0 auto;
  color: #a9b9cf;
  font-size: 0.95rem;
  line-height: 1.8;
}

.service-reveal-enter-active,
.service-reveal-leave-active {
  transition:
    opacity 380ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 380ms ease,
    translate 480ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, translate, filter;
}

.service-reveal-enter-from {
  opacity: 0;
  translate: 0 22px;
  filter: blur(8px);
}

.service-reveal-enter-to {
  opacity: 1;
  translate: 0 0;
  filter: blur(0);
}

.service-reveal-leave-to {
  opacity: 0;
  translate: 0 -10px;
  filter: blur(4px);
}

@media (prefers-reduced-motion: reduce) {
  .service-reveal-enter-active,
  .service-reveal-leave-active {
    transition: none;
  }
}

@media (max-width: 760px) {
  .services-section {
    min-height: 0;
    padding: 12px 16px;
  }

  .services-scene {
    height: clamp(280px, 55vw, 360px);
  }

  .service-description {
  top: calc(12px + clamp(280px, 55vw, 360px) + 8px);
  }

  .service-description p {
    font-size: 0.92rem;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 8px 12px;
  }

  .services-scene {
    height: clamp(270px, 78vw, 330px);
  }

  .service-description {
    top: calc(8px + clamp(270px, 78vw, 330px) + 8px);
  }

  .service-description h3 {
    font-size: 1.45rem;
  }

  .service-description p {
    font-size: 0.88rem;
    line-height: 1.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-reveal-enter-active,
  .service-reveal-leave-active {
    transition: none;
  }
}
</style>

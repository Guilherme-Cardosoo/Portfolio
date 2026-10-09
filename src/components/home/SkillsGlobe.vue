<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const globeContainer = ref(null)
const selectedSkill = ref(null)
const hoveredSkill = ref(null)

let scene
let camera
let renderer
let controls
let animationId

let globeGroup

let skillMeshes = []
let connectionLines = []

let raycaster
let mouse

let pointerDown = new THREE.Vector2()
let pointerUp = new THREE.Vector2()

const skills = [
  {
    name: 'HTML',
    type: 'Hard Skill',
    description:
      'Estruturação semântica e organização de páginas web.'
  },
  {
    name: 'CSS',
    type: 'Hard Skill',
    description:
      'Criação de interfaces responsivas, organizadas e mordernas'
  },
  {
    name: 'JavaScript',
    type: 'Hard Skill',
    description:
      'Desenvolvimento de interações e funcionalidades para aplicações web.'
  },
  {
    name: 'Vue.js',
    type: 'Hard Skill',
    description:
      'Desenvolvimento de interfaces utilizando componentes e aplicações reativas.'
  },
  {
    name: 'Python',
    type: 'Hard Skill',
    description:
      'Programação, automação e desenvolvimento de soluções.'
  },
  {
    name: 'Git',
    type: 'Hard Skill',
    description:
      'Controle de versão e gerenciamento do histórico dos projetos.'
  },
  {
    name: 'GitHub',
    type: 'Hard Skill',
    description:
      'Hospedagem, colaboração e organização de projetos.'
  },
  {
    name: 'Web Design',
    type: 'Hard Skill',
    description:
      'Criação e planejamento de interfaces limpas, modernas e funcionais.'
  },
  {
    name: 'Comunicação',
    type: 'Soft Skill',
    description:
      'Capacidade de transmitir ideias de forma clara e objetiva.'
  },
  {
    name: 'Organização',
    type: 'Soft Skill',
    description:
      'Planejamento e organização de tarefas e projetos.'
  },
  {
    name: 'Paciência',
    type: 'Soft Skill',
    description:
      'Manter a calma e persistir na resolução de problemas.'
  },
  {
    name: 'Curiosidade',
    type: 'Soft Skill',
    description:
      'Interesse constante em entender como as coisas funcionam.'
  },
  {
    name: 'Resolução de problemas',
    type: 'Soft Skill',
    description:
      'Análise de problemas e busca por soluções eficientes.'
  },
  {
    name: 'Atenção aos detalhes',
    type: 'Soft Skill',
    description:
      'Cuidado com pequenos detalhes que influenciam o resultado final.'
  },
  {
    name: 'Adaptabilidade',
    type: 'Soft Skill',
    description:
      'Facilidade para aprender e se adaptar a novas situações.'
  }
]

const sphereRadius = 2.7
const structuralPointCount = 75

function createFibonacciPoints(count, radius) {
  const points = []

  const goldenAngle =
    Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y =
      1 - (i / (count - 1)) * 2

    const radiusAtY =
      Math.sqrt(1 - y * y)

    const theta =
      goldenAngle * i

    const x =
      Math.cos(theta) * radiusAtY

    const z =
      Math.sin(theta) * radiusAtY

    points.push(
      new THREE.Vector3(
        x * radius,
        y * radius,
        z * radius
      )
    )
  }

  return points
}

function setupScene() {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    45,
    globeContainer.value.clientWidth /
      globeContainer.value.clientHeight,
    0.1,
    100
  )

  camera.position.set(
    0,
    0,
    7.5
  )

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  )

  renderer.setSize(
    globeContainer.value.clientWidth,
    globeContainer.value.clientHeight
  )

  renderer.outputColorSpace =
    THREE.SRGBColorSpace

  globeContainer.value.appendChild(
    renderer.domElement
  )

  controls = new OrbitControls(
    camera,
    renderer.domElement
  )

  controls.enableDamping = true
  controls.dampingFactor = 0.045

  controls.enablePan = false
  controls.enableZoom = false

  controls.rotateSpeed = 0.45

  controls.autoRotate = true
  controls.autoRotateSpeed = 0.28

  controls.minPolarAngle = 0.35
  controls.maxPolarAngle =
    Math.PI - 0.35

  raycaster = new THREE.Raycaster()

  raycaster.params.Mesh.threshold = 0.15

  mouse = new THREE.Vector2()
}

function createGlobe() {
  globeGroup = new THREE.Group()

  scene.add(globeGroup)

  const totalPoints =
    structuralPointCount +
    skills.length

  const allPoints =
    createFibonacciPoints(
      totalPoints,
      sphereRadius
    )

  createStructuralPoints(
    allPoints
  )

  createSkillPoints(
    allPoints
  )

  createConnections(
    allPoints
  )
}

function createStructuralPoints(points) {
  const positions = []

  points.forEach((point) => {
    positions.push(
      point.x,
      point.y,
      point.z
    )
  })

  const geometry =
    new THREE.BufferGeometry()

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      positions,
      3
    )
  )

  const material =
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.38,
      sizeAttenuation: true
    })

  const structuralPoints =
    new THREE.Points(
      geometry,
      material
    )

  globeGroup.add(
    structuralPoints
  )
}

function createSkillPoints(points) {

  const skillPositions = []

  const total =
    points.length

  const step =
    Math.floor(
      total / skills.length
    )

  for (
    let i = 0;
    i < skills.length;
    i++
  ) {
    let index =
      i * step

    index =
      Math.min(
        index + (i % 3),
        points.length - 1
      )

    skillPositions.push(
      points[index]
    )
  }

  skillPositions.forEach(
    (position, index) => {
      const geometry =
        new THREE.SphereGeometry(
          0.085,
          20,
          20
        )

      const material =
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 1
        })

      const mesh =
        new THREE.Mesh(
          geometry,
          material
        )

      mesh.position.copy(
        position
      )

      mesh.userData = {
        skill: skills[index],
        index
      }

      globeGroup.add(mesh)

      skillMeshes.push(mesh)
    }
  )
}

function createConnections(points) {
  const edges = []

  const maxDistance = 1.8

  for (
    let i = 0;
    i < points.length;
    i++
  ) {
    const nearby = []

    for (
      let j = 0;
      j < points.length;
      j++
    ) {
      if (i === j) continue

      const distance =
        points[i].distanceTo(
          points[j]
        )

      if (
        distance <= maxDistance
      ) {
        nearby.push({
          index: j,
          distance
        })
      }
    }

    nearby.sort(
      (a, b) =>
        a.distance - b.distance
    )

    const connectionCount =
      Math.min(
        3,
        nearby.length
      )

    for (
      let k = 0;
      k < connectionCount;
      k++
    ) {
      const target =
        nearby[k].index

      if (i < target) {
        edges.push([
          i,
          target
        ])
      }
    }
  }

  edges.forEach(
    ([startIndex, endIndex]) => {
      const start =
        points[startIndex]

      const end =
        points[endIndex]

      const geometry =
        new THREE.BufferGeometry()
          .setFromPoints([
            start,
            end
          ])

      const material =
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.12
        })

      const line =
        new THREE.Line(
          geometry,
          material
        )

      line.userData = {
        startIndex,
        endIndex
      }

      globeGroup.add(line)

      connectionLines.push(line)
    }
  )
}

function updateMousePosition(event) {
  const rect =
    renderer.domElement
      .getBoundingClientRect()

  mouse.x =
    ((event.clientX - rect.left) /
      rect.width) *
      2 -
    1

  mouse.y =
    -(
      (event.clientY - rect.top) /
      rect.height
    ) *
      2 +
    1
}

function handlePointerDown(event) {
  pointerDown.set(
    event.clientX,
    event.clientY
  )
}

function handlePointerMove(event) {
  updateMousePosition(event)

  raycaster.setFromCamera(
    mouse,
    camera
  )

  const intersections =
    raycaster.intersectObjects(
      skillMeshes,
      false
    )

  if (
    intersections.length === 0
  ) {
    hoveredSkill.value = null

    if (!selectedSkill.value) {
      resetSkillPoints()
    }

    renderer.domElement.style.cursor =
      'grab'

    return
  }

  const object =
    intersections[0].object

  hoveredSkill.value =
    object.userData.skill

  renderer.domElement.style.cursor =
    'pointer'

  if (!selectedSkill.value) {
    highlightHover(
      object
    )
  }
}

function handlePointerUp(event) {
  pointerUp.set(
    event.clientX,
    event.clientY
  )

  const distance =
    pointerDown.distanceTo(
      pointerUp
    )

  if (distance > 5) {
    return
  }

  updateMousePosition(event)

  raycaster.setFromCamera(
    mouse,
    camera
  )

  const intersections =
    raycaster.intersectObjects(
      skillMeshes,
      false
    )

  if (
    intersections.length === 0
  ) {
    selectedSkill.value = null

    resetSkillPoints()

    return
  }

  const object =
    intersections[0].object

  selectedSkill.value =
    object.userData.skill

  highlightSelected(
    object
  )
}

function highlightHover(
  selectedObject
) {
  skillMeshes.forEach(
    (mesh) => {
      const isHovered =
        mesh === selectedObject

      mesh.scale.setScalar(
        isHovered
          ? 1.7
          : 1
      )

      mesh.material.opacity =
        isHovered
          ? 1
          : 0.55
    }
  )
}

function highlightSelected(
  selectedObject
) {
  skillMeshes.forEach(
    (mesh) => {
      const isSelected =
        mesh === selectedObject

      mesh.scale.setScalar(
        isSelected
          ? 2
          : 0.65
      )

      mesh.material.opacity =
        isSelected
          ? 1
          : 0.25
    }
  )
}

function resetSkillPoints() {
  skillMeshes.forEach(
    (mesh) => {
      mesh.scale.setScalar(1)

      mesh.material.opacity =
        1
    }
  )
}

function closeSkill() {
  selectedSkill.value = null

  hoveredSkill.value = null

  resetSkillPoints()
}

function handleResize() {
  if (!globeContainer.value) {
    return
  }

  const width =
    globeContainer.value
      .clientWidth

  const height =
    globeContainer.value
      .clientHeight

  camera.aspect =
    width / height

  camera.updateProjectionMatrix()

  renderer.setSize(
    width,
    height
  )

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  )
}

function animate() {
  animationId =
    requestAnimationFrame(
      animate
    )

  controls.update()

  renderer.render(
    scene,
    camera
  )
}

function cleanup() {
  cancelAnimationFrame(
    animationId
  )

  window.removeEventListener(
    'resize',
    handleResize
  )

  renderer.domElement.removeEventListener(
    'pointerdown',
    handlePointerDown
  )

  renderer.domElement.removeEventListener(
    'pointermove',
    handlePointerMove
  )

  renderer.domElement.removeEventListener(
    'pointerup',
    handlePointerUp
  )

  controls.dispose()

  skillMeshes.forEach(
    (mesh) => {
      mesh.geometry.dispose()
      mesh.material.dispose()
    }
  )

  connectionLines.forEach(
    (line) => {
      line.geometry.dispose()
      line.material.dispose()
    }
  )

  renderer.dispose()

  renderer.domElement.remove()
}

onMounted(() => {
  setupScene()

  createGlobe()

  renderer.domElement.addEventListener(
    'pointerdown',
    handlePointerDown
  )

  renderer.domElement.addEventListener(
    'pointermove',
    handlePointerMove
  )

  renderer.domElement.addEventListener(
    'pointerup',
    handlePointerUp
  )

  window.addEventListener(
    'resize',
    handleResize
  )

  animate()
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<template>
  <div class="skills-globe">
    <div
      ref="globeContainer"
      class="globe-container"
    ></div>

    <transition name="hover-skill">
      <div
        v-if="hoveredSkill && !selectedSkill"
        class="hover-skill"
      >
        <span>
          {{ hoveredSkill.name }}
        </span>

        <small>
          Clique para saber mais
        </small>
      </div>
    </transition>

    <transition name="skill-panel">
      <div
        v-if="selectedSkill"
        class="skill-panel"
      >
        <span class="skill-type">
          {{ selectedSkill.type }}
        </span>

        <h3>
          {{ selectedSkill.name }}
        </h3>

        <p>
          {{ selectedSkill.description }}
        </p>

        <button
          type="button"
          class="close-button"
          @click="closeSkill"
        >
          Fechar
        </button>
      </div>
    </transition>

    <div
      v-if="!selectedSkill && !hoveredSkill"
      class="globe-hint"
    >
      Arraste para explorar
    </div>
  </div>
</template>

<style scoped>
.skills-globe {
  position: relative;
  width: 100%;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.globe-container {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.globe-container:active {
  cursor: grabbing;
}

.globe-container :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.hover-skill {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 16px;
  background: rgba(10, 15, 61, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    0 5px 25px rgba(0, 0, 0, 0.2);

  transform:
    translate(-50%, -50%)
    translateY(-45px);

  pointer-events: none;
  z-index: 10;
}

.hover-skill span {
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}

.hover-skill small {
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
}

.skill-panel {
  position: absolute;
  right: 4%;
  top: 50%;
  width: 280px;
  padding: 25px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 4px 25px rgba(0, 0, 0, 0.18);

  transform:
    translateY(-50%);

  z-index: 20;
}

.skill-type {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.skill-panel h3 {
  margin: 0 0 12px;
  color: #fff;
  font-size: 28px;
  font-weight: 600;
}

.skill-panel p {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;
  line-height: 1.6;
}

.close-button {
  margin-top: 20px;
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.globe-hint {
  position: absolute;
  bottom: 15px;
  left: 50%;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  letter-spacing: 0.5px;
  transform:
    translateX(-50%);

  pointer-events: none;
}

.skill-panel-enter-active,
.skill-panel-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.skill-panel-enter-from,
.skill-panel-leave-to {
  opacity: 0;
  transform:
    translate(20px, -50%);
}

.hover-skill-enter-active,
.hover-skill-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.hover-skill-enter-from,
.hover-skill-leave-to {
  opacity: 0;
  transform:
    translate(-50%, -50%)
    translateY(-35px);
}

@media (max-width: 900px) {
  .skills-globe {
    height: 700px;
  }

  .skill-panel {
    right: 50%;
    top: auto;
    bottom: 15px;
    width: min(90%, 400px);
    transform:
      translateX(50%);
  }

  .skill-panel-enter-from,
  .skill-panel-leave-to {
    transform:
      translate(50%, 20px);
  }

  .globe-hint {
    bottom: 190px;
  }
}

@media (max-width: 600px) {
  .skills-globe {
    height: 620px;
  }

  .skill-panel {
    padding: 20px;
  }

  .skill-panel h3 {
    font-size: 24px;
  }

  .skill-panel p {
    font-size: 14px;
  }

  .globe-hint {
    bottom: 185px;
  }
}
</style>
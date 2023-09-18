<style scoped>
.canvas {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
}

@media (--hover) {
  .canvas:hover {
    cursor: pointer;
  }
}
</style>

<template>
  <canvas ref="canvas" class="canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'

const canvas = ref<HTMLCanvasElement>()

// Reference: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader.setDRACOLoader(dracoLoader)

const props = withDefaults(defineProps<{
  assetUrl: string
  enabled?: boolean,
  animate?: boolean
  postProcess?: boolean
}>(), {
  enabled: true,
  animate: false,
  postProcess: false
})

watch(() => props.enabled, () => {
  renderScene()
})

let renderer: Three.WebGLRenderer
let scene: Three.Scene
let camera: Three.PerspectiveCamera
let orbitControl: OrbitControls
let composer: EffectComposer
let renderPass: RenderPass
let outputPass: OutputPass
let bloomPass: UnrealBloomPass

onMounted(() => {
  initScene(canvas.value)
  canvas.value.style.opacity = '1'

  useResizeObserver(canvas.value, onResize)

  renderScene()
})

onBeforeUnmount(() => {
  orbitControl.dispose()

  if (composer) {
    composer.dispose()
  }
})

const initScene = (canvas: HTMLCanvasElement) => {
  scene = new Three.Scene()
  renderer = new Three.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(window.devicePixelRatio)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  camera = new Three.PerspectiveCamera(50, w / h, 0.1, 1000)
  camera.lookAt(0,0,0)
  camera.position.set(0,5,13)
  scene.add(camera)

  if (props.postProcess) {
    renderPass = new RenderPass(scene, camera)
    outputPass = new OutputPass(Three.ReinhardToneMapping)
    bloomPass = new UnrealBloomPass(new Three.Vector2(1,1), 1.5, 0.4, 0.85)
    composer = new EffectComposer(renderer)

    bloomPass.threshold = 0.5
    bloomPass.strength = .03
    bloomPass.radius = 0
    outputPass.toneMappingExposure = .3

    composer.addPass(renderPass)
    composer.addPass(bloomPass)
    composer.addPass(outputPass)
  }

  orbitControl = new OrbitControls(camera, renderer.domElement)
  orbitControl.minPolarAngle = Math.PI / 6.0
  orbitControl.maxPolarAngle = Math.PI / 2.0
  orbitControl.enableZoom = false
  orbitControl.enablePan = false
  orbitControl.autoRotate = true
  orbitControl.autoRotateSpeed = -.5

  if (!props.animate) {
    orbitControl.addEventListener('change', () => renderScene())
  }

  if (props.assetUrl) {
    loader.load(props.assetUrl, (gltf) => {
      scene.add(gltf.scene)
      // dimLights(scene)
      renderScene()
    },
    undefined,
    (e) => {
      console.error(e)
    })
  }
}

const dimLights = (scene: Three.Scene) => {
  const K = 10000
  for (const o of scene.children) {
    if (o.isGroup) {
      for (const o2 of o.children) {
        if (o2.type === 'PointLight') {
          const light = o2 as Three.PointLight
          light.intensity /= K
        }
      }
    }
  }
}

const onResize = () => {
  const rect = canvas.value.getBoundingClientRect()
  const w = rect.width
  const h = rect.height

  camera.aspect = w / h
  camera.updateProjectionMatrix()

  renderer.setSize(w ,h, false)
  if (composer) {
    composer.setSize(w, h)
  }

  renderScene()
}

const renderScene = () => {
  if (!props.enabled) {
    return
  }

  if (props.animate) {
    requestAnimationFrame(renderScene)
    orbitControl.update()
  }

  if (composer) {
    composer.render()
  } else {
    renderer.render(scene, camera)
  }
}
</script>

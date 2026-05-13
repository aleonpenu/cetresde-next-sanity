'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Printer3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const printerGroupRef = useRef<THREE.Group | null>(null)
  const animationFrameRef = useRef<number>(undefined)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(5, 4, 8)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0x4178dc, 0.5)
    pointLight1.position.set(-5, 3, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x32b4dc, 0.5)
    pointLight2.position.set(5, 3, -5)
    scene.add(pointLight2)

    const printerGroup = new THREE.Group()
    printerGroupRef.current = printerGroup
    scene.add(printerGroup)

    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2a2a2a,
      metalness: 0.7,
      roughness: 0.3
    })

    const accentMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4178dc,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x4178dc,
      emissiveIntensity: 0.2
    })

    const printHeadMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x808080,
      metalness: 0.7,
      roughness: 0.3
    })

    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a,
      metalness: 0.5,
      roughness: 0.5
    })

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.3, 3),
      baseMaterial
    )
    base.position.y = -1.5
    base.castShadow = true
    base.receiveShadow = true
    printerGroup.add(base)

    const verticalFrame1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3, 0.15),
      frameMaterial
    )
    verticalFrame1.position.set(-1.8, 0, -1.3)
    verticalFrame1.castShadow = true
    printerGroup.add(verticalFrame1)

    const verticalFrame2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3, 0.15),
      frameMaterial
    )
    verticalFrame2.position.set(1.8, 0, -1.3)
    verticalFrame2.castShadow = true
    printerGroup.add(verticalFrame2)

    const verticalFrame3 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3, 0.15),
      frameMaterial
    )
    verticalFrame3.position.set(-1.8, 0, 1.3)
    verticalFrame3.castShadow = true
    printerGroup.add(verticalFrame3)

    const verticalFrame4 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3, 0.15),
      frameMaterial
    )
    verticalFrame4.position.set(1.8, 0, 1.3)
    verticalFrame4.castShadow = true
    printerGroup.add(verticalFrame4)

    const topFrame1 = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.15, 0.15),
      frameMaterial
    )
    topFrame1.position.set(0, 1.5, -1.3)
    topFrame1.castShadow = true
    printerGroup.add(topFrame1)

    const topFrame2 = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.15, 0.15),
      frameMaterial
    )
    topFrame2.position.set(0, 1.5, 1.3)
    topFrame2.castShadow = true
    printerGroup.add(topFrame2)

    const buildPlate = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.1, 2.2),
      new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.1
      })
    )
    buildPlate.position.y = -1.3
    buildPlate.castShadow = true
    buildPlate.receiveShadow = true
    printerGroup.add(buildPlate)

    const printHead = new THREE.Group()
    
    const headBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.4, 0.5),
      printHeadMaterial
    )
    headBody.castShadow = true
    printHead.add(headBody)

    const nozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.08, 0.3, 8),
      new THREE.MeshStandardMaterial({ 
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.1
      })
    )
    nozzle.position.y = -0.35
    nozzle.castShadow = true
    printHead.add(nozzle)

    const fan = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16),
      printHeadMaterial
    )
    fan.rotation.x = Math.PI / 2
    fan.position.set(0.25, 0, 0.2)
    printHead.add(fan)

    printHead.position.set(0, 0.5, 0)
    printerGroup.add(printHead)

    const filamentMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xCC0000,
      metalness: 0.2,
      roughness: 0.4,
      emissive: 0xCC0000,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.95
    })
    const filamentStrand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 1, 8),
      filamentMaterial
    )
    printerGroup.add(filamentStrand)

    const filamentGlow = new THREE.PointLight(0xCC0000, 2, 1)
    printerGroup.add(filamentGlow)

    const pyramidMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xCC0000,
      metalness: 0.3,
      roughness: 0.6,
      emissive: 0xCC0000,
      emissiveIntensity: 0.1
    })

    const pyramidGroup = new THREE.Group()
    
    const numLayers = 40
    const baseSize = 1.2
    const pyramidHeight = 1.0
    const layerHeight = pyramidHeight / numLayers
    const layers: THREE.Mesh[] = []
    
    for (let i = 0; i < numLayers; i++) {
      const progress = i / numLayers
      const layerSize = baseSize * (1 - progress)
      
      const layerGeometry = new THREE.BoxGeometry(layerSize, layerHeight, layerSize)
      const layerMesh = new THREE.Mesh(layerGeometry, pyramidMaterial)
      
      layerMesh.position.y = i * layerHeight
      layerMesh.castShadow = true
      layerMesh.receiveShadow = true
      layerMesh.visible = false
      
      pyramidGroup.add(layerMesh)
      layers.push(layerMesh)
    }
    
    pyramidGroup.position.set(0, -1.3, 0)
    printerGroup.add(pyramidGroup)

    const xAxisRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 3.6, 16),
      new THREE.MeshStandardMaterial({ 
        color: 0xaaaaaa,
        metalness: 0.8,
        roughness: 0.2
      })
    )
    xAxisRod.rotation.z = Math.PI / 2
    xAxisRod.position.set(0, 1.2, -1.2)
    xAxisRod.castShadow = true
    printerGroup.add(xAxisRod)

    const ledStrip = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.05, 0.1),
      new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0x4178dc,
        emissiveIntensity: 0.5
      })
    )
    ledStrip.position.set(0, 1.5, 1.4)
    printerGroup.add(ledStrip)

    const controlPanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.6, 0.1),
      new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.7
      })
    )
    controlPanel.position.set(2.2, -0.5, 0)
    controlPanel.rotation.y = -Math.PI / 6
    controlPanel.castShadow = true
    printerGroup.add(controlPanel)

    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.4, 0.05),
      new THREE.MeshStandardMaterial({ 
        color: 0x32b4dc,
        emissive: 0x32b4dc,
        emissiveIntensity: 0.6
      })
    )
    screen.position.set(0, 0, 0.06)
    controlPanel.add(screen)

    printerGroup.rotation.y = -Math.PI / 6
    printerGroup.position.y = 0.5

    let mouseX = 0
    let mouseY = 0
    let targetRotationY = -Math.PI / 6
    let targetRotationX = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      targetRotationY = -Math.PI / 6 + mouseX * 0.3
      targetRotationX = mouseY * 0.1
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      if (!container || !camera || !renderer) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    let printProgress = 0
    let printingCycle = 0
    const printSpeed = 0.0008
    const printHeadDistance = 0.55
    let pathProgress = 0

    const getPyramidPathPoint = (t: number): { x: number, y: number, z: number } => {
      const currentLayer = Math.floor(printProgress * numLayers)
      const layerY = -1.3 + (currentLayer * layerHeight)
      const layerProgress = currentLayer / numLayers
      const layerSize = baseSize * (1 - layerProgress) / 2
      
      const angle = t * Math.PI * 2
      
      return {
        x: Math.cos(angle) * layerSize,
        y: layerY,
        z: Math.sin(angle) * layerSize
      }
    }

    const animate = () => {
      if (!scene || !camera || !renderer || !printerGroup) return

      printProgress += printSpeed
      if (printProgress >= 1) {
        printProgress = 0
        printingCycle++
      }

      const currentLayer = Math.floor(printProgress * numLayers)
      
      for (let i = 0; i < layers.length; i++) {
        layers[i].visible = i <= currentLayer
      }

      const pyramidTopY = -1.3 + (currentLayer * layerHeight)
      
      pathProgress += 0.002
      if (pathProgress >= 1) {
        pathProgress = 0
      }

      const { x, y, z } = getPyramidPathPoint(pathProgress)

      printHead.position.x = x
      printHead.position.z = z
      printHead.position.y = y + printHeadDistance

      const nozzleWorldPos = new THREE.Vector3(x, y + printHeadDistance - 0.35, z)
      const logoTopWorldPos = new THREE.Vector3(x, y, z)
      
      const distance = nozzleWorldPos.distanceTo(logoTopWorldPos)
      const midPoint = new THREE.Vector3().lerpVectors(nozzleWorldPos, logoTopWorldPos, 0.5)
      
      filamentStrand.position.copy(midPoint)
      filamentStrand.scale.y = distance
      
      filamentStrand.lookAt(logoTopWorldPos)
      filamentStrand.rotateX(Math.PI / 2)

      const pulseSpeed = Date.now() * 0.005
      const pulseIntensity = 0.6 + Math.sin(pulseSpeed) * 0.4
      filamentMaterial.emissiveIntensity = pulseIntensity
      filamentMaterial.opacity = 0.85 + Math.sin(pulseSpeed) * 0.15
      
      filamentGlow.position.copy(midPoint)
      filamentGlow.intensity = 1.5 + Math.sin(pulseSpeed) * 1

      printerGroup.rotation.y += (targetRotationY - printerGroup.rotation.y) * 0.05
      printerGroup.rotation.x += (targetRotationX - printerGroup.rotation.x) * 0.05

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (container && renderer) {
        container.removeChild(renderer.domElement)
      }
      renderer?.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  )
}

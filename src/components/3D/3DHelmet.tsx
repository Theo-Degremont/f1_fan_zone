
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useHelper, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, use, useRef, useEffect  } from 'react'

useGLTF.preload('/model_3D/f1_helmet_-_gilles_villeneuve/scene.gltf')

function F1Helmet() {
  const model = useGLTF('/model_3D/f1_helmet_-_gilles_villeneuve/scene.gltf')
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!model || !groupRef.current) return
    const box = new THREE.Box3().setFromObject(model.scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    model.scene.position.sub(center)
  }, [model])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef} scale={[5, 5, 5]}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <directionalLight position={[-5, -5, -5]} intensity={0.7} />
      <primitive object={model.scene} />
    </group>
  )
}

function F1HelmetViewer() {
  return (
    <div className="w-full h-full">
     <Canvas 
  camera={{ position: [0, 0, 3], fov: 50 }}
  style={{ width: '100%', height: '100%' }}
>
        <Suspense fallback={null}>
          <F1Helmet />
          <OrbitControls 
            enableDamping 
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            target={[0, 0, 0]}
            minDistance={2}
            maxDistance={4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default F1HelmetViewer

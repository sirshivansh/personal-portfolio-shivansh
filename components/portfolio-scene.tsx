'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

function CodeCluster() {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!group.current || !core.current) return
    group.current.rotation.y += delta * 0.08
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.08
    core.current.rotation.x += delta * 0.3
    core.current.rotation.z += delta * 0.18
  })

  return (
    <group ref={group} position={[0.8, 0, 0]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshStandardMaterial color="#0b1f2b" emissive="#083344" emissiveIntensity={0.7} wireframe transparent opacity={0.88} />
      </mesh>
      <mesh rotation={[0.2, 0.4, 0]}>
        <torusGeometry args={[2.05, 0.012, 12, 120]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[1.1, 0.2, 0.4]}>
        <torusGeometry args={[2.35, 0.008, 12, 120]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.45} />
      </mesh>
      {[
        [-2.2, 1.1, -0.4],
        [2.3, 0.8, 0.1],
        [1.8, -1.3, -0.8],
        [-1.8, -1.4, 0.6],
      ].map((position, index) => (
        <Float key={index} speed={1.4 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.7}>
          <mesh position={position as [number, number, number]}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshBasicMaterial color={index % 2 ? '#f59e0b' : '#5eead4'} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function PortfolioScene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#071014']} />
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 5]} color="#5eead4" intensity={18} distance={12} />
        <pointLight position={[-4, -2, 2]} color="#f59e0b" intensity={12} distance={10} />
        <CodeCluster />
        <Stars radius={40} depth={18} count={900} factor={1.3} saturation={0} fade speed={0.35} />
        <Sparkles count={100} scale={[12, 8, 8]} size={1.5} speed={0.25} color="#5eead4" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  )
}

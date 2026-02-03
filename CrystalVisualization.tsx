'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface Post {
  id: number
  validations: number
  disputes: number
}

interface CrystalVisualizationProps {
  posts: Post[]
}

function Crystal({ position, validations, disputes }: { position: [number, number, number], validations: number, disputes: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Calculate health based on validations vs disputes
  const health = validations - disputes
  const scale = Math.max(0.5, Math.min(2, 1 + health * 0.1))
  const cracked = disputes > validations
  
  // Color based on health
  const color = cracked ? '#ef4444' : health > 5 ? '#34d399' : health > 0 ? '#60a5fa' : '#94a3b8'

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      
      // Pulse effect
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={cracked ? 0.6 : 0.9}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function Scene({ posts }: { posts: Post[] }) {
  const crystalPositions = useMemo(() => {
    return posts.slice(0, 12).map((_, index) => {
      const angle = (index / 12) * Math.PI * 2
      const radius = 5
      return [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3,
        Math.sin(angle) * radius
      ] as [number, number, number]
    })
  }, [posts])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
      
      {posts.slice(0, 12).map((post, index) => (
        <Crystal
          key={post.id}
          position={crystalPositions[index]}
          validations={post.validations}
          disputes={post.disputes}
        />
      ))}
      
      <Sparkles count={50} scale={15} size={2} speed={0.3} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function CrystalVisualization({ posts }: CrystalVisualizationProps) {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-slate-900/50 border border-slate-700">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <Scene posts={posts} />
      </Canvas>
    </div>
  )
}

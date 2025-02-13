import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
export function Earth(props) {
  const earthRef = useRef()
  const { nodes, materials } = useGLTF('/models/earth.glb')
  useFrame((_, delta) => {
    earthRef.current.rotation.y += delta * 0.5
  }
  )
  return (
    <group {...props} dispose={null} ref={earthRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_Planet_0.geometry}
        material={materials.Planet}
        position={[-0.045, 1.247, 0.066]}
        rotation={[Math.PI, 0, Math.PI]}
      />
    </group>
  )
}

useGLTF.preload('/models/earth.glb')


/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: kuzneciv (https://sketchfab.com/kuznecivBlender)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/bee-minecraft-b883baf691204b4d9a618e5e5841adf1
Title: Bee minecraft
*/

import  {useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


export function Bee(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/bee.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
		actions["Animation"].reset().fadeIn(0.5).play();
		return () => actions["Animation"].fadeOut(0.5);
	}, [actions]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Bee_0" scale={[1.78, 1.78, 2.967]}>
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials['Material.001']}
                />
                <mesh
                  name="Object_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_5.geometry}
                  material={materials['Material.002']}
                />
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials['Material.003']}
                />
                <mesh
                  name="Object_7"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_7.geometry}
                  material={materials['Material.004']}
                />
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials['Material.005']}
                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials['Material.010']}
                />
              </group>
              <group name="leg004_1" position={[1.021, -2.057, -0.8]} rotation={[-2.431, 0, 0]}>
                <mesh
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials['Material.013']}
                />
              </group>
              <group
                name="USR_2"
                position={[0.79, 1.884, -4.264]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[1.092, 1.042, 1.042]}>
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials['Material.009']}
                />
              </group>
              <group
                name="USL_3"
                position={[-1.052, 1.884, -4.264]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[1.092, 1.042, 1.042]}>
                <mesh
                  name="Object_15"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_15.geometry}
                  material={materials['Material.009']}
                />
              </group>
              <group
                name="RingL_4"
                position={[-1.728, 2.228, -1.242]}
                rotation={[2.997, 0.256, -2.854]}
                scale={[1, 1, 0.916]}>
                <mesh
                  name="Object_17"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_17.geometry}
                  material={materials['Material.014']}
                />
                <mesh
                  name="Object_18"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_18.geometry}
                  material={materials['Material.011']}
                />
              </group>
              <group
                name="RingR_5"
                position={[1.48, 2.228, -1.242]}
                rotation={[2.982, -0.237, -0.337]}
                scale={[1, 1, 0.916]}>
                <mesh
                  name="Object_20"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_20.geometry}
                  material={materials['Material.011']}
                />
                <mesh
                  name="Object_21"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_21.geometry}
                  material={materials['Material.014']}
                />
              </group>
              <group name="leg001_7" position={[-1.191, -2.057, -0.8]} rotation={[-2.431, 0, 0]}>
                <mesh
                  name="Object_23"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_23.geometry}
                  material={materials['Material.013']}
                />
              </group>
              <group name="leg002_8" position={[1.021, -2.057, 0.375]} rotation={[-2.431, 0, 0]}>
                <mesh
                  name="Object_25"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_25.geometry}
                  material={materials['Material.013']}
                />
              </group>
              <group name="leg003_9" position={[-1.191, -2.057, 0.375]} rotation={[-2.431, 0, 0]}>
                <mesh
                  name="Object_27"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_27.geometry}
                  material={materials['Material.013']}
                />
              </group>
              <group name="leg005_10" position={[1.021, -2.057, 1.572]} rotation={[-2.431, 0, 0]}>
                <mesh
                  name="Object_29"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_29.geometry}
                  material={materials['Material.013']}
                />
              </group>
              <group name="leg006_11" position={[-1.191, -2.057, 1.572]} rotation={[-2.431, 0, 0]}>
                <mesh
                  name="Object_31"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_31.geometry}
                  material={materials['Material.013']}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/bee.glb')
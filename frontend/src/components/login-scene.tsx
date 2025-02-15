// this is a threejs scene component
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bee } from "./models/Bee";
import { Stage, Float } from "@react-three/drei";
import { Earth } from "./models/Earth";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
export function LoginScene() {
  return (
    <Suspense fallback={null}>
      <Canvas color="black">
        <OrbitControls />
        <OrthographicCamera makeDefault position={[0, 5, 10]} zoom={10} />
        <Stage environment={"city"} intensity={0.5}>
          <Earth position={[0, 0, 0]} scale={2} />
        </Stage>
        <Float>
          <Bee position={[0, 7, 5]} scale={0.1} rotation={[0, Math.PI, 0]} />
        </Float>
      </Canvas>
    </Suspense>
  );
}

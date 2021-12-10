import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Box = () => {
  const gltf = useLoader(GLTFLoader, "./test/textured.gltf")

  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  )
}

const CanvasRTF = () => {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Box />
          <OrbitControls />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default CanvasRTF

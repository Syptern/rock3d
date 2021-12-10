import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useRef, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

const Ball = ({
  position,
}: {
  position: { x: number; y: number; z: number }
}) => (
  <mesh
    visible
    userData={{ hello: "world" }}
    position={[position.x, position.y, position.z]}
    rotation={[Math.PI / 2, 0, 0]}
  >
    <sphereGeometry args={[0.02, 10, 10]} />
    <meshStandardMaterial color="hotpink" transparent />
  </mesh>
)

const Box = ({ handleClick }: any) => {
  const gltf = useLoader(GLTFLoader, "./test/modelDraco.gltf", (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/test/draco-gltf/")
    loader.setDRACOLoader(dracoLoader)
  })

  return (
    <>
      <primitive
        onDoubleClick={(e: any) => handleClick(e)}
        object={gltf.scene}
        scale={0.4}
      />
    </>
  )
}

const CanvasRTF = () => {
  const [balls, setBalls] = useState<any>([{ x: 1, y: 1, z: 1 }])
  const handleClick = (e: any) => {
    console.log(e)
    setBalls([...balls, { x: e.point.x, y: e.point.y, z: e.point.z }])
  }

  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Box handleClick={handleClick} />
          {balls.map((e: any, i: number) => (
            <Ball position={e} key={i} />
          ))}
          <OrbitControls />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default CanvasRTF

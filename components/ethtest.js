import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FallbackSpinner from "./fallbackspinner";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

export default function Scene() {
  // const [nodes, setNodes] = useState();
  // const [materials, setMaterials] = useState();
  const gltf = useLoader(gltfLoader, "/untitled-transformed.glb");

  return (
    <Suspense fallback={null}>
      <Canvas>
        <Suspense fallback={<FallbackSpinner />}>
          <hemisphereLight />
          <ambientLight color="0x404040" intensity={1} />
          <OrbitControls />
          {/* <mesh
            geometry={nodes.Ethereum_3D_logoObject_0.geometry}
            material={materials.Metallic}
            position={[-1760.61, 354.54, -1638.65]}
            rotation={[0.89, -1.29, 0.71]}
            scale={[11.39, 11.39, 7.46]}
          />
          <mesh geometry={nodes.robot.geometry} material={materials.metal} />
          <mesh geometry={nodes.robot.geometry} material={materials.metal} /> */}
        </Suspense>
      </Canvas>
    </Suspense>
  );
}

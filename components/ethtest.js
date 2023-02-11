import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

export default function Scene() {
  const [model, setModel] = useState();
  useEffect(() => {
    gltfLoader.load("/untitled-transformed.gltf", (gltf) => {
      console.log(gltf);
      setModel(gltf);
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <Canvas>
        <Suspense fallback={null}>
          <hemisphereLight />
          <ambientLight />
          <OrbitControls />
          {model ? <primitive object={model.scene} /> : "Loading"}
          {/*  */}
        </Suspense>
      </Canvas>
    </Suspense>
  );
}

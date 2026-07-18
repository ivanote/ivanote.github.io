"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import ReactAtom from "./ReactAtom";

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    // Ease group toward pointer for a subtle parallax tilt.
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      pointer.y * 0.25,
      0.05
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      pointer.x * 0.35,
      0.05
    );
  });

  return <group ref={ref}>{children}</group>;
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#0a0f1e", 8, 16]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={60} color="#22c55e" />
      <pointLight position={[6, 3, -2]} intensity={40} color="#38bdf8" />

      <ParallaxRig>
        <ReactAtom scale={1.05} />
      </ParallaxRig>

      <Sparkles
        count={45}
        scale={12}
        size={2}
        speed={0.3}
        opacity={0.5}
        color="#4ade80"
      />
    </Canvas>
  );
}

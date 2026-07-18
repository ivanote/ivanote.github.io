"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TECH_LOGOS, type TechLogo } from "@/lib/logos";
import ExtrudedLogo from "./ExtrudedLogo";

// All the featured tech, distributed on a sphere.
const FEATURED = [
  "laravel",
  "react",
  "nextdotjs",
  "typescript",
  "php",
  "tailwindcss",
  "vuedotjs",
  "mysql",
  "docker",
  "git",
];

/** Even points on a sphere (Fibonacci spiral). */
function fibonacciSphere(count: number, radius: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

function Constellation({ onHover }: { onHover: (l: TechLogo | null) => void }) {
  const logos = useMemo(
    () => FEATURED.map((k) => TECH_LOGOS.find((l) => l.key === k)!).filter(Boolean),
    []
  );
  const positions = useMemo(() => fibonacciSphere(logos.length, 3.5), [logos.length]);

  return (
    <group>
      {logos.map((logo, i) => (
        <Float
          key={logo.key}
          speed={2.4}
          rotationIntensity={0.5}
          floatIntensity={1.1}
        >
          <ExtrudedLogo
            logo={logo}
            position={positions[i]}
            scale={1.05}
            spinSpeed={0.45 + (i % 3) * 0.12}
            onHover={onHover}
          />
        </Float>
      ))}
    </group>
  );
}

export default function TechScene({
  onHover,
}: {
  onHover: (l: TechLogo | null) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 6]} intensity={1.4} />
      <pointLight position={[-8, 4, 4]} intensity={90} color="#22c55e" />
      <pointLight position={[8, -4, 2]} intensity={70} color="#38bdf8" />
      <pointLight position={[0, 6, -6]} intensity={60} color="#a78bfa" />

      <Stars radius={40} depth={30} count={800} factor={3} fade speed={1} />
      <Sparkles count={40} scale={12} size={2.5} speed={0.35} opacity={0.5} color="#4ade80" />

      <Constellation onHover={onHover} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.9}
        rotateSpeed={0.6}
        enableDamping
        dampingFactor={0.08}
      />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}

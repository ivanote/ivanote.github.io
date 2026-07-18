"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const REACT_BLUE = "#61DAFB";

function Orbit({ rotation }: { rotation: [number, number, number] }) {
  const electronRef = useRef<THREE.Mesh>(null);

  // Elliptical ring geometry (thin torus flattened).
  const ringGeo = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, 2.4, 0.95, 0, Math.PI * 2, false, 0);
    const points = curve.getPoints(128);
    const path = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(p.x, p.y, 0)),
      true
    );
    return new THREE.TubeGeometry(path, 200, 0.045, 12, true);
  }, []);

  const curve = useMemo(
    () => new THREE.EllipseCurve(0, 0, 2.4, 0.95, 0, Math.PI * 2, false, 0),
    []
  );

  useFrame((state) => {
    if (electronRef.current) {
      const t = (state.clock.elapsedTime * 0.55) % 1;
      const p = curve.getPoint(t);
      electronRef.current.position.set(p.x, p.y, 0);
    }
  });

  return (
    <group rotation={rotation}>
      <mesh geometry={ringGeo}>
        <meshStandardMaterial
          color={REACT_BLUE}
          emissive={REACT_BLUE}
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={electronRef}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={REACT_BLUE}
          emissive={REACT_BLUE}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export default function ReactAtom({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Gentle 3D wobble keeps the trefoil readable (never edge-on) while
      // still feeling alive; the electrons do the fast orbiting.
      const t = state.clock.elapsedTime;
      group.current.rotation.y = Math.sin(t * 0.35) * 0.35;
      group.current.rotation.x = Math.cos(t * 0.28) * 0.16;
      group.current.rotation.z = t * 0.06;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* nucleus */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={REACT_BLUE}
          emissive={REACT_BLUE}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <Orbit rotation={[0, 0, 0]} />
      <Orbit rotation={[0, 0, (Math.PI / 3) * 1]} />
      <Orbit rotation={[0, 0, (Math.PI / 3) * 2]} />
    </group>
  );
}

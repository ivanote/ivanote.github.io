"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { LOGO_VIEWBOX, type TechLogo } from "@/lib/logos";

type Props = {
  logo: TechLogo;
  position: [number, number, number];
  scale?: number;
  spinSpeed?: number;
  onHover?: (logo: TechLogo | null) => void;
};

/**
 * Turns a flat SVG brand path into a beveled, extruded 3D mesh.
 * Centered on origin, Y flipped (SVG is Y-down), self-rotating, and
 * interactive: it grows + glows brighter on hover.
 */
export default function ExtrudedLogo({
  logo,
  position,
  scale = 1,
  spinSpeed = 0.35,
  onHover,
}: Props) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}"><path d="${logo.path}"/></svg>`;
    const loader = new SVGLoader();
    const data = loader.parse(svg);

    const shapes: THREE.Shape[] = [];
    for (const path of data.paths) {
      const s = SVGLoader.createShapes(path);
      for (const shape of s) shapes.push(shape);
    }

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 3.2,
      bevelEnabled: true,
      bevelThickness: 0.6,
      bevelSize: 0.45,
      bevelSegments: 4,
      curveSegments: 16,
    });

    geo.scale(1, -1, 1); // SVG space is Y-down; flip to Y-up.
    geo.center(); // rotate around itself
    geo.computeBoundingBox();
    const box = geo.boundingBox!;
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y) || 1;
    geo.scale(1 / maxDim, 1 / maxDim, 1 / maxDim);
    geo.computeVertexNormals();
    return geo;
  }, [logo.path]);

  const color = useMemo(() => new THREE.Color(logo.color), [logo.color]);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += delta * (hovered ? spinSpeed * 3 : spinSpeed);
    // Smoothly grow toward the hover target scale.
    const target = hovered ? scale * 1.45 : scale;
    const s = THREE.MathUtils.lerp(g.scale.x, target, 0.12);
    g.scale.setScalar(s);
    if (matRef.current) {
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        hovered ? 0.85 : 0.28,
        0.12
      );
    }
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onHover?.(logo);
    document.body.style.cursor = "pointer";
  };
  const out = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    onHover?.(null);
    document.body.style.cursor = "auto";
  };

  return (
    <group
      ref={ref}
      position={position}
      scale={scale}
      onPointerOver={over}
      onPointerOut={out}
    >
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.28}
          metalness={0.75}
          roughness={0.26}
        />
      </mesh>
    </group>
  );
}

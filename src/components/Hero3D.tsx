"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const m = (c: string, r = 0.55) => <meshStandardMaterial color={c} roughness={r} />;

function Folder({ x, color, dark }: { x: number; color: string; dark: string }) {
  return (<Float speed={1.2} floatIntensity={0.25} rotationIntensity={0}><group position={[x, -1.2, 0]}>
    <RoundedBox args={[1.9, 1.3, 0.5]} radius={0.08} smoothness={3}>{m(dark)}</RoundedBox>
    <RoundedBox args={[0.8, 0.18, 0.5]} radius={0.06} position={[-0.55, 0.72, 0]}>{m(dark)}</RoundedBox>
    <RoundedBox args={[1.9, 1.0, 0.1]} radius={0.08} position={[0, -0.12, 0.3]}>{m(color)}</RoundedBox>
    <mesh position={[0, -0.12, 0.37]}><boxGeometry args={[0.3, 0.05, 0.02]} />{m("#fff", 0.3)}</mesh>
    <mesh position={[0, -0.02, 0.37]}><boxGeometry args={[0.05, 0.22, 0.02]} />{m("#fff", 0.3)}</mesh>
  </group></Float>);
}
function useLabel(text: string, bg: string) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas"); c.width = 256; c.height = 320;
    const g = c.getContext("2d")!;
    g.fillStyle = "#fff"; g.fillRect(0, 0, 256, 320);
    g.fillStyle = bg; g.fillRect(0, 0, 256, 64);
    g.fillRect(88, 96, 80, 80);
    g.fillStyle = "#fff"; g.fillRect(104, 112, 48, 8); g.fillRect(104, 132, 48, 8); g.fillRect(104, 152, 30, 8);
    g.fillStyle = "#2B2F45"; g.font = "bold 36px Arial, sans-serif"; g.textAlign = "center"; g.fillText(text, 128, 238);
    g.fillStyle = "#E5E7EB"; g.fillRect(48, 262, 160, 8); g.fillRect(48, 282, 110, 8);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }, [text, bg]);
}
function Card({ text, color, angle, rotate }: { text: string; color: string; angle: number; rotate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const tex = useLabel(text, color);
  const place = (a: number) => [Math.cos(a) * 1.9, 0.9 + Math.sin(a * 2) * 0.25, Math.sin(a) * 0.9] as const;
  useFrame((s) => {
    if (!ref.current) return;
    const a = angle + (rotate ? s.clock.elapsedTime * 0.35 : 0);
    const [x, y, z] = place(a);
    ref.current.position.set(x, y, z);
    ref.current.rotation.set(0, 0, -x * 0.12);
  });
  const [x, y, z] = place(angle);
  return (<group ref={ref} position={[x, y, z]}>
    <mesh><planeGeometry args={[1, 1.25]} /><meshBasicMaterial map={tex} side={THREE.DoubleSide} /></mesh>
  </group>);
}
function Dots({ rotate }: { rotate: boolean }) {
  const g = useRef<THREE.Group>(null);
  const dots = useMemo(() => {
    const cols = ["#E31E24", "#F08A24", "#1E9E5A", "#E5484D", "#8B5CF6"];
    return Array.from({ length: 22 }, (_, i) => {
      const a = i * 2.399, r = 2.4 + (i % 5) * 0.35;
      return { p: [Math.cos(a) * r, Math.sin(a * 1.3) * 1.8 + 0.3, -1 - (i % 3) * 0.5] as [number, number, number], c: cols[i % 5], s: 0.04 + (i % 4) * 0.02 };
    });
  }, []);
  useFrame((s) => { if (rotate && g.current) g.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.2) * 0.08; });
  return (<group ref={g}>{dots.map((d, i) => (<mesh key={i} position={d.p}><sphereGeometry args={[d.s, 12, 12]} />{m(d.c, 0.4)}</mesh>))}</group>);
}
function Arcs() {
  return (<group position={[0, 0, -1.6]}>{[3.4, 3.9, 4.4].map((r, i) => (<mesh key={i} rotation={[0, 0, 0.6 + i * 0.2]}><torusGeometry args={[r, 0.008, 6, 90, Math.PI * 0.55]} /><meshBasicMaterial color="#9DBDFB" transparent opacity={0.7 - i * 0.18} /></mesh>))}</group>);
}
function Scene({ rotate }: { rotate: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => { if (rotate && g.current) g.current.rotation.y = s.pointer.x * 0.25; });
  return (<>
    <ambientLight intensity={0.9} /><directionalLight position={[3, 5, 5]} intensity={1.4} />
    <group ref={g} scale={0.95}>
      <Arcs /><Dots rotate={rotate} />
      <Folder x={-1.3} color="#E31E24" dark="#C1191F" />
      <Folder x={1.3} color="#F9A63A" dark="#E08A1E" />
      <Card text="Extract" color="#E5484D" angle={0.2} rotate={rotate} />
      <Card text="Compress" color="#E31E24" angle={0.2 + (Math.PI * 2) / 3} rotate={rotate} />
      <Card text="Merge" color="#1E9E5A" angle={0.2 + (Math.PI * 4) / 3} rotate={rotate} />
    </group>
  </>);
}
function Fallback() {
  return (<div className="grid h-full place-items-center"><div className="relative flex items-end gap-6">
    <div className="absolute -top-24 left-1/2 flex -translate-x-1/2 gap-3">
      {[["Extract","#E5484D"],["Compress","#E31E24"],["Merge","#1E9E5A"]].map(([t,c])=>(<div key={t} className="w-20 rounded border border-line bg-white p-2 text-center text-[11px] font-semibold"><div className="mb-2 h-3 rounded-sm" style={{background:c}}/>{t}</div>))}</div>
    <div className="h-24 w-32 rounded-md bg-brand" /><div className="h-24 w-32 rounded-md bg-[#F9A63A]" /></div></div>);
}
export default function Hero3D() {
  const [rotate, setRotate] = useState(true);
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRotate(!mq.matches);
    const h = () => setRotate(!mq.matches);
    mq.addEventListener("change", h);
    try { const c = document.createElement("canvas"); if (!(c.getContext("webgl2") || c.getContext("webgl"))) setOk(false); } catch { setOk(false); }
    return () => mq.removeEventListener("change", h);
  }, []);
  return (
    <div role="img" aria-label="Animated 3D scene of blue and orange folders with Extract, Compress and Merge file cards orbiting" className="h-[360px] w-full md:h-[460px]">
      {ok ? <Canvas camera={{ position: [0, 0.3, 7.2], fov: 45 }} dpr={[1, 2]} frameloop={rotate ? "always" : "demand"}><Scene rotate={rotate} /></Canvas> : <Fallback />}
    </div>);
}

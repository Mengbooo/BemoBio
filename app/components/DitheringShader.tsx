'use client';

import { memo, FC, useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Float, useGLTF, Lightformer, Environment, AccumulativeShadows, RandomizedLight, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { Effect } from 'postprocessing';
import { EffectComposer, RenderPass, BloomEffect, EffectPass } from 'postprocessing';

// ─── Dithering Shader GLSL ───────────────────────────────────────────────────

const ditheringShader = /*glsl*/`
uniform float ditheringEnabled;
uniform vec2 resolution;
uniform float gridSize;
uniform float luminanceMethod;
uniform float invertColor;
uniform float pixelSizeRatio;
uniform float grayscaleOnly;
uniform float time;

bool getValue(float brightness, vec2 pos) {
  if (brightness > 16.0 / 17.0) return false;
  if (brightness < 1.0 / 17.0) return true;
  vec2 pixel = floor(mod(pos.xy / gridSize, 4.0));
  int x = int(pixel.x);
  int y = int(pixel.y);
  if (x == 0) {
    if (y == 0) return brightness < 16.0 / 17.0;
    if (y == 1) return brightness < 5.0 / 17.0;
    if (y == 2) return brightness < 13.0 / 17.0;
    return brightness < 1.0 / 17.0;
  } else if (x == 1) {
    if (y == 0) return brightness < 8.0 / 17.0;
    if (y == 1) return brightness < 12.0 / 17.0;
    if (y == 2) return brightness < 4.0 / 17.0;
    return brightness < 9.0 / 17.0;
  } else if (x == 2) {
    if (y == 0) return brightness < 14.0 / 17.0;
    if (y == 1) return brightness < 2.0 / 17.0;
    if (y == 2) return brightness < 15.0 / 17.0;
    return brightness < 3.0 / 17.0;
  } else {
    if (y == 0) return brightness < 6.0 / 17.0;
    if (y == 1) return brightness < 10.0 / 17.0;
    if (y == 2) return brightness < 7.0 / 17.0;
    return brightness < 11.0 / 17.0;
  }
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragCoord = uv * resolution;
  vec3 baseColor;
  float pixelSize = gridSize * pixelSizeRatio;
  vec2 pixelatedUV = floor(fragCoord / pixelSize) * pixelSize / resolution;
  baseColor = texture2D(inputBuffer, pixelatedUV).rgb;
  float luminance = dot(baseColor, vec3(1.,1.,1.));
  if (grayscaleOnly > 0.0) {
    baseColor = vec3(luminance);
  }
  bool dithered = getValue(luminance, fragCoord);
  vec3 ditherColor = dithered ? vec3(0.0) : baseColor;
  vec2 currentPixel = floor(fragCoord / pixelSize);
  vec2 originalPixel = floor(uv * resolution / pixelSize);
  baseColor = (currentPixel == originalPixel) ? ditherColor : baseColor;
  if (invertColor > 0.0) {
    baseColor = 1.0 - baseColor;
  }
  outputColor = vec4(baseColor, inputColor.a);
}`;

// ─── DitheringEffect ──────────────────────────────────────────────────────────

interface DitheringEffectOptions {
  time?: number;
  resolution?: THREE.Vector2;
  gridSize?: number;
  luminanceMethod?: number;
  invertColor?: boolean;
  pixelSizeRatio?: number;
  grayscaleOnly?: boolean;
}

class DitheringEffect extends Effect {
  uniforms: Map<string, THREE.Uniform<number | THREE.Vector2>>;

  constructor({
    time = 0,
    resolution = new THREE.Vector2(1, 1),
    gridSize = 4.0,
    luminanceMethod = 0,
    invertColor = false,
    pixelSizeRatio = 1,
    grayscaleOnly = false,
  }: DitheringEffectOptions = {}) {
    const uniforms = new Map<string, THREE.Uniform<number | THREE.Vector2>>([
      ['time', new THREE.Uniform(time)],
      ['resolution', new THREE.Uniform(resolution)],
      ['gridSize', new THREE.Uniform(gridSize)],
      ['luminanceMethod', new THREE.Uniform(luminanceMethod)],
      ['invertColor', new THREE.Uniform(invertColor ? 1 : 0)],
      ['ditheringEnabled', new THREE.Uniform(1)],
      ['pixelSizeRatio', new THREE.Uniform(pixelSizeRatio)],
      ['grayscaleOnly', new THREE.Uniform(grayscaleOnly ? 1 : 0)],
    ]);
    super('DitheringEffect', ditheringShader, { uniforms });
    this.uniforms = uniforms;
  }

  update(
    _renderer: THREE.WebGLRenderer,
    inputBuffer: THREE.WebGLRenderTarget,
    deltaTime: number
  ): void {
    const timeUniform = this.uniforms.get('time');
    if (timeUniform !== undefined && typeof timeUniform.value === 'number') {
      timeUniform.value += deltaTime;
    }
    const resolutionUniform = this.uniforms.get('resolution');
    if (resolutionUniform !== undefined && resolutionUniform.value instanceof THREE.Vector2) {
      resolutionUniform.value.set(inputBuffer.width, inputBuffer.height);
    }
  }
}

// ─── PostProcessing ───────────────────────────────────────────────────────────

interface PostProcessingProps {
  gridSize?: number;
  pixelSizeRatio?: number;
  grayscaleOnly?: boolean;
}

const PostProcessing: FC<PostProcessingProps> = ({
  gridSize = 4,
  pixelSizeRatio = 1,
  grayscaleOnly = false,
}) => {
  const composerRef = useRef<EffectComposer | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);

  const handleResize = useCallback(() => {
    if (composerRef.current) {
      composerRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (!scene || !camera || !composerRef.current) return;
    const composer = composerRef.current;
    composer.removeAllPasses();
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new EffectPass(camera, new DitheringEffect({ gridSize, pixelSizeRatio, grayscaleOnly })));
  }, [scene, camera, gridSize, pixelSizeRatio, grayscaleOnly]);

  useFrame(({ gl, scene: currentScene, camera: currentCamera }) => {
    if (!composerRef.current) {
      composerRef.current = new EffectComposer(gl);
      handleResize();
    }
    if (scene !== currentScene) setScene(currentScene);
    if (camera !== currentCamera) setCamera(currentCamera);
    composerRef.current?.render();
  }, 1);

  return null;
};

// ─── Environment ──────────────────────────────────────────────────────────────

const boxGeometry = new THREE.BoxGeometry();
const whiteMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(1, 1, 1) });

function Room({ highlight }: { highlight: string }) {
  return (
    <group position={[0, -0.5, 0]}>
      <spotLight castShadow position={[-15, 20, 15]} angle={0.2} penumbra={1} intensity={2} decay={0} />
      <spotLight castShadow position={[15, 20, 15]} angle={0.2} penumbra={1} intensity={2} decay={0} />
      <spotLight castShadow position={[15, 20, -15]} angle={0.2} penumbra={1} intensity={2} decay={0} />
      <spotLight castShadow position={[-15, 20, -15]} angle={0.2} penumbra={1} intensity={2} decay={0} />
      <pointLight castShadow color="white" intensity={100} distance={28} decay={2} position={[0.5, 14.0, 0.5]} />
      <mesh geometry={boxGeometry} castShadow receiveShadow position={[0.0, 13.2, 0.0]} scale={[31.5, 28.5, 31.5]}>
        <meshStandardMaterial color="gray" side={THREE.BackSide} />
      </mesh>
      <mesh geometry={boxGeometry} material={whiteMaterial} castShadow receiveShadow position={[-10.906, -1.0, 1.846]} rotation={[0, -0.195, 0]} scale={[2.328, 7.905, 4.651]} />
      <mesh geometry={boxGeometry} material={whiteMaterial} castShadow receiveShadow position={[-5.607, -0.754, -0.758]} rotation={[0, 0.994, 0]} scale={[1.97, 1.534, 3.955]} />
      <mesh geometry={boxGeometry} material={whiteMaterial} castShadow receiveShadow position={[6.167, -0.16, 7.803]} rotation={[0, 0.561, 0]} scale={[3.927, 6.285, 3.687]} />
      <mesh geometry={boxGeometry} material={whiteMaterial} castShadow receiveShadow position={[-2.017, 0.018, 6.124]} rotation={[0, 0.333, 0]} scale={[2.002, 4.566, 2.064]} />
      <mesh geometry={boxGeometry} material={whiteMaterial} castShadow receiveShadow position={[2.291, -0.756, -2.621]} rotation={[0, -0.286, 0]} scale={[1.546, 1.552, 1.496]} />
      <mesh geometry={boxGeometry} material={whiteMaterial} castShadow receiveShadow position={[-2.193, -0.369, -5.547]} rotation={[0, 0.516, 0]} scale={[3.875, 3.487, 2.986]} />
      <Lightformer form="ring" position={[2, 3, -2]} scale={10} color={highlight} intensity={15} />
      <Lightformer form="box" intensity={80} position={[-14.0, 10.0, 8.0]} scale={[0.1, 2.5, 2.5]} />
      <Lightformer form="box" intensity={80} position={[-14.0, 14.0, -4.0]} scale={[0.1, 2.5, 2.5]} />
      <Lightformer form="box" intensity={23} position={[14.0, 12.0, 0.0]} scale={[0.1, 5.0, 5.0]} />
      <Lightformer form="box" intensity={16} position={[0.0, 9.0, 14.0]} scale={[5.0, 5.0, 0.1]} />
      <Lightformer form="box" intensity={80} position={[7.0, 8.0, -14.0]} scale={[2.5, 2.5, 0.1]} />
      <Lightformer form="box" intensity={80} position={[-7.0, 16.0, -14.0]} scale={[2.5, 2.5, 0.1]} />
      <Lightformer form="box" intensity={20} position={[0.0, 15, 0.0]} scale={[10, 1, 10]} />
    </group>
  );
}

const Shadows: FC = memo(() => (
  <AccumulativeShadows frames={100} temporal alphaTest={0.8} opacity={1.25} scale={15} position={[0, -1.12, 0]}>
    <RandomizedLight amount={8} radius={4} position={[1, 5.5, 1]} />
  </AccumulativeShadows>
));
Shadows.displayName = 'Shadows';

// ─── Helmet ───────────────────────────────────────────────────────────────────

useGLTF.preload('/jousting_helmet-transformed.glb');

function Helmet(props: { [key: string]: any }) {
  const { nodes, materials } = useGLTF('/jousting_helmet-transformed.glb') as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Object_2.geometry}
        material={materials.model_Material_u1_v1}
        material-roughness={0.15}
        position={[-2.016, -0.06, 1.381]}
        rotation={[-1.601, 0.068, 2.296]}
        scale={0.038}
      />
    </group>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface DitheringShaderProps {
  /** Canvas 背景色，默认 '#ffffff' */
  bgColor?: string;
  /** 环境光强度，影响模型整体亮度，默认 1.5 */
  envIntensity?: number;
  /** 场景高光颜色（ring lightformer），默认 '#066aff' */
  highlight?: string;
  /** 抖动格子大小，值越大像素块越粗，默认 4 */
  gridSize?: number;
  /** 像素化强度倍数，基于 gridSize 进一步放大像素块，默认 1 */
  pixelSizeRatio?: number;
  /** 是否仅输出灰度，true 时去除彩色信息，默认 true */
  grayscaleOnly?: boolean;
  /** 是否启用轨道控制，默认 true */
  enableControls?: boolean;
  /** 是否允许指针事件，默认 true */
  allowPointerEvents?: boolean;
}

function LoadingOverlay({ bgColor }: { bgColor: string }) {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (progress >= 100) {
      setOpacity(0);
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: bgColor,
        opacity,
        transition: 'opacity 1s ease',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  );
}

export default function DitheringShader({
  bgColor = '#ffffff',
  envIntensity = 1.5,
  highlight = '#066aff',
  gridSize = 4,
  pixelSizeRatio = 1,
  grayscaleOnly = false,
  enableControls = true,
  allowPointerEvents = true,
}: DitheringShaderProps) {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [modelScale, setModelScale] = useState(3);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(bgColor));
    }
  }, [bgColor]);

  const handleResize = useCallback(() => {
    setModelScale(window.innerWidth <= 768 ? 2.4 : 3);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, -1, 4], fov: 65 }}
        gl={{ alpha: false }}
        style={{ pointerEvents: allowPointerEvents ? 'auto' : 'none' }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
          gl.setClearColor(new THREE.Color(bgColor));
        }}
      >
        <group position={[0, -0.5, 0]}>
          <Float floatIntensity={2} rotationIntensity={1} speed={2}>
            <Center scale={modelScale} position={[0, 0.8, 0]} rotation={[0, -Math.PI / 3.5, -0.4]}>
              <Helmet />
            </Center>
          </Float>
        </group>
        <OrbitControls enableZoom={false} enablePan={false} enabled={enableControls} />
        <Environment resolution={1024} background={false} environmentIntensity={envIntensity}>
          <Room highlight={highlight} />
        </Environment>
        <PostProcessing gridSize={gridSize} pixelSizeRatio={pixelSizeRatio} grayscaleOnly={grayscaleOnly} />
      </Canvas>
      <LoadingOverlay bgColor={bgColor} />
    </div>
  );
}

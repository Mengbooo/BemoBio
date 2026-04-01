'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Perlin Noise 3D implementation
const perlinNoise = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform float uFrequency;
uniform float uSpeed;
uniform float uLightness;
uniform vec2 uResolution;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;

varying vec2 vUv;

${perlinNoise}

// ASCII characters ordered by density (light to dark)
const int ASCII_CHARS = 12;

float character(int n, vec2 p) {
  p = floor(p * vec2(4.0, -4.0) + 2.5);
  if (clamp(p.x, 0.0, 4.0) == p.x) {
    if (clamp(p.y, 0.0, 4.0) == p.y) {
      int a = int(round(p.x) + 5.0 * round(p.y));
      if (((n >> a) & 1) == 1) return 1.0;
    }
  }
  return 0.0;
}

void main() {
  vec2 uv = vUv;
  vec2 pix = gl_FragCoord.xy;

  // Character size in pixels
  vec2 charSize = vec2(8.0, 12.0);
  vec2 charCoord = floor(pix / charSize);
  vec2 pixInChar = mod(pix, charSize) / charSize;

  // Sample noise at character position
  vec3 noisePos = vec3(charCoord * 0.05 * uFrequency, uTime * uSpeed);
  float noiseVal = snoise(noisePos) * 0.5 + 0.5;

  // Map noise to ASCII character set
  // Using simple character patterns for demonstration
  int charIndex = int(noiseVal * float(ASCII_CHARS));

  // Simple character patterns (you can expand this)
  int patterns[12];
  patterns[0] = 0;        // space (empty)
  patterns[1] = 2063;     // .
  patterns[2] = 15255086; // :
  patterns[3] = 13191550; // i
  patterns[4] = 11512810; // |
  patterns[5] = 31183902; // +
  patterns[6] = 32294446; // *
  patterns[7] = 23385164; // #
  patterns[8] = 15252014; // @
  patterns[9] = 32642681; // M
  patterns[10] = 31207646; // W
  patterns[11] = 33686238; // Full block

  float char = 0.0;
  if (charIndex >= 0 && charIndex < ASCII_CHARS) {
    char = character(patterns[charIndex], pixInChar);
  }

  // Apply lightness and color
  float charVal = char * uLightness;

  // Create rainbow color based on noise and position
  float hue = noiseVal + uTime * 0.1 + (vUv.x + vUv.y) * 0.5;
  hue = fract(hue); // Keep hue in 0-1 range

  // HSV to RGB conversion for rainbow colors
  vec3 rainbowColor;
  float h = hue * 6.0;
  float x = 1.0 - abs(mod(h, 2.0) - 1.0);

  if (h < 1.0) rainbowColor = vec3(1.0, x, 0.0);
  else if (h < 2.0) rainbowColor = vec3(x, 1.0, 0.0);
  else if (h < 3.0) rainbowColor = vec3(0.0, 1.0, x);
  else if (h < 4.0) rainbowColor = vec3(0.0, x, 1.0);
  else if (h < 5.0) rainbowColor = vec3(x, 0.0, 1.0);
  else rainbowColor = vec3(1.0, 0.0, x);

  vec3 color = rainbowColor * charVal;

  gl_FragColor = vec4(color, 1.0);
}
`

interface ASCIIShaderProps {
  className?: string
  frequency?: number
  speed?: number
  lightness?: number
  colorPrimary?: string
  colorSecondary?: string
}

export default function ASCIIShader({
  className = '',
  frequency = 2.5,
  speed = 0.2,
  lightness = 1.0,
  colorPrimary = '#00ff00',
  colorSecondary = '#003300'
}: ASCIIShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const clockRef = useRef<THREE.Clock | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Helper function to convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
          }
        : { r: 0, g: 1, b: 0 }
    }

    const primaryRgb = hexToRgb(colorPrimary)
    const secondaryRgb = hexToRgb(colorSecondary)

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(1)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uFrequency: { value: frequency },
        uSpeed: { value: speed },
        uLightness: { value: lightness },
        uColorPrimary: { value: new THREE.Vector3(primaryRgb.r, primaryRgb.g, primaryRgb.b) },
        uColorSecondary: { value: new THREE.Vector3(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b) },
        uResolution: {
          value: new THREE.Vector2(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          )
        }
      }
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const clock = new THREE.Clock()
    clockRef.current = clock

    renderer.setAnimationLoop(() => {
      if (materialRef.current && clockRef.current) {
        materialRef.current.uniforms.uTime.value += clockRef.current.getDelta()
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    })

    const observer = new ResizeObserver(() => {
      if (!containerRef.current || !rendererRef.current || !materialRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      rendererRef.current.setSize(width, height)
      materialRef.current.uniforms.uResolution.value.set(width, height)
    })
    observer.observe(containerRef.current)
    resizeObserverRef.current = observer

    return () => {
      renderer.setAnimationLoop(null)

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }

      if (materialRef.current) {
        materialRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (!materialRef.current) return

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
          }
        : { r: 0, g: 1, b: 0 }
    }

    const primaryRgb = hexToRgb(colorPrimary)
    const secondaryRgb = hexToRgb(colorSecondary)

    materialRef.current.uniforms.uFrequency.value = frequency
    materialRef.current.uniforms.uSpeed.value = speed
    materialRef.current.uniforms.uLightness.value = lightness
    materialRef.current.uniforms.uColorPrimary.value.set(
      primaryRgb.r,
      primaryRgb.g,
      primaryRgb.b
    )
    materialRef.current.uniforms.uColorSecondary.value.set(
      secondaryRgb.r,
      secondaryRgb.g,
      secondaryRgb.b
    )
  }, [frequency, speed, lightness, colorPrimary, colorSecondary])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        fontFamily: 'monospace',
        backgroundColor: '#000'
      }}
    />
  )
}

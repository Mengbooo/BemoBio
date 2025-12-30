'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface DitheringShaderProps {
  className?: string
}

// Dithering Shader Material
const DitheringShaderMaterial = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // 4x4 Bayer Dithering Matrix
    float dither4x4(vec2 position, float brightness) {
      int x = int(mod(position.x, 4.0));
      int y = int(mod(position.y, 4.0));
      int index = x + y * 4;
      float limit = 0.0;
      
      if (index == 0) limit = 0.0625;
      else if (index == 1) limit = 0.5625;
      else if (index == 2) limit = 0.1875;
      else if (index == 3) limit = 0.6875;
      else if (index == 4) limit = 0.8125;
      else if (index == 5) limit = 0.3125;
      else if (index == 6) limit = 0.9375;
      else if (index == 7) limit = 0.4375;
      else if (index == 8) limit = 0.25;
      else if (index == 9) limit = 0.75;
      else if (index == 10) limit = 0.125;
      else if (index == 11) limit = 0.625;
      else if (index == 12) limit = 1.0;
      else if (index == 13) limit = 0.5;
      else if (index == 14) limit = 0.875;
      else if (index == 15) limit = 0.375;
      
      return brightness < limit ? 0.0 : 1.0;
    }
    
    // Rainbow color function
    vec3 getRainbowColor(float t) {
      vec3 c = vec3(0.0);
      c.r = abs(sin(t * 6.28318 + 0.0));
      c.g = abs(sin(t * 6.28318 + 2.09439));
      c.b = abs(sin(t * 6.28318 + 4.18879));
      return c;
    }
    
    void main() {
      // Pixelation effect
      vec2 pixelSize = vec2(8.0);
      vec2 pixelated = floor(vUv * uResolution / pixelSize) * pixelSize / uResolution;
      
      // Create animated pattern
      float pattern = sin(pixelated.x * 20.0 + uTime) * cos(pixelated.y * 20.0 + uTime);
      pattern = pattern * 0.5 + 0.5;
      
      // Add circular wave
      vec2 center = vec2(0.5);
      float dist = length(pixelated - center);
      float wave = sin(dist * 15.0 - uTime * 2.0) * 0.5 + 0.5;
      
      // Combine patterns
      float brightness = mix(pattern, wave, 0.5);
      
      // Apply dithering
      vec2 ditherPos = gl_FragCoord.xy;
       float dithered = dither4x4(ditherPos, brightness);
      
      // Rainbow colors based on position and time
      float colorPhase = vUv.x + vUv.y + uTime * 0.1;
      vec3 rainbowColor = getRainbowColor(colorPhase);
      
      // Final color with dithering
      vec3 finalColor = rainbowColor * dithered;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} scale={0.65}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(800, 600) }
        }}
      />
    </mesh>
  )
}

export default function DitheringShader({ className = '' }: DitheringShaderProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <DitheringShaderMaterial />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

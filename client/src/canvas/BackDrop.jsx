// import React from 'react'
// import { easing } from "maath"
// import { useFrame } from "@react-three/fiber"
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei"
import { useRef } from "react"

const BackDrop = () => {
  const shadows = useRef()

  return (
    <AccumulativeShadows 
      ref={shadows}
      temporal
      frames={120}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI/2, 0, 0]}
      position={[0,0,-0.14]}
    >

      <RandomizedLight 
        amount={4} 
        radius={9}
        intensity={.65}
        ambient={0.25}
        position={[5,5,-10]}
      />
      <RandomizedLight 
        amount={4} 
        radius={9}
        intensity={0.45}
        ambient={0.25}
        position={[-5,5,-9]}
      />
    </AccumulativeShadows>
  )
}

export default BackDrop
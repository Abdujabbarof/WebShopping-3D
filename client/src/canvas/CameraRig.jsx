// import React from 'react'
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useSnapshot } from "valtio"
import PropTypes from 'prop-types';

import state from "../store"
import { useRef } from "react"

const CameraRig = ({ children }) => {
  const group = useRef()
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const isBrackpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600

    // set initial position
    let targetPosition = [-0.4, 0, 2]
    if(snap.intro) {
      if(isBrackpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if(isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set model rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 5, -state.pointer.x / 2, 0],
      0.25,
      delta
    )
  })
  

  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig

CameraRig.propTypes = {
  children: PropTypes.element
}
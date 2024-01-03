// import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'

import { getContrastingColor } from '../config/helpers'
import { headContainerAnimation, headTextAnimation, headContentAnimation, slideAnimation } from '../config/motion'
import { CustomButton } from '../components'

const Home = () => {
  const snap = useSnapshot(state)
  const contrastColor = getContrastingColor(snap.color)

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' { ...slideAnimation('left') }>
          <motion.header { ...slideAnimation('down') }>
            <img src="./threejs.png" alt="logo" className='w-8 h-8 object-contain' />
          </motion.header>

          <motion.div { ...headContainerAnimation }>
            <motion.div { ...headTextAnimation }>
              <h1 className='head-text xl:mt-[8rem]'>LET&apos;S <br className='xl:block hidden' /> DO IT</h1>
            </motion.div>
            <motion.div { ...headContentAnimation }>
              <p className={`max-w-md font-normal text-${contrastColor}`}>Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong> {" "} and define your own style</p>

              <CustomButton title='Customize It' type='filled' handleClick={() => state.intro = false} customStyle='w-fit mt-5 px-4 py-2.5 font-bold text-sm' />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home
// import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

// import config from '../config/config'
import state from '../store'
// import { download } from '../assets'
import { 
  // downloadCanvasToImage,
  reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

import { AiPicker, FilePicker, Tab, ColorPicker, CustomButton } from '../components'
import { useState } from 'react'

const Customizer = () => {
  const snap = useSnapshot(state)
  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  
  // show tab content
  const generateTabContent = () => {
    switch(activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return <AiPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generating={generating}
          handleSubmit={handleSubmit}
        />
      default:
        null
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt")

    console.log(prompt);
    try {
      // call backend
      setGenerating(true)
      const response = await fetch('https://threed-js-app-by-abdujabbarof.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json()

      console.log(data.photo[0].b64_json);
      handleDecals(type, `data:image/png;base64,${data.photo[0].b64_json}`)
    } catch (err) {
      alert(err)
    } finally {
      setGenerating(false)
      setActiveEditorTab('')
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabname) => {
    switch(tabname) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabname];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabname];
        break;
      default:
        state.isFullTexture = false
        state.isLogoTexture = true
    }

    setActiveFilterTab((prev) => {
      return { 
        ...prev, 
        [tabname]: !prev[tabname]
      }
    })
  }

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('')
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key='custom' className='absolute left-0 top-0 z-10' { ...slideAnimation('left') }>
            <div className='flex items-center min-h-screen'>
              <div className="editortabs-container tabs">
                {EditorTabs.map(tab => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 top-5 right-5' { ...fadeAnimation }>
            <CustomButton type='filled' title='Go back' handleClick={() => state.intro = true} customStyle='w-fit px-3 py-2.5 font-bold text-sm' />
          </motion.div>

          <motion.div className='filtertabs-container' { ...slideAnimation('up') }>
            {FilterTabs.map(tab => (
              <Tab 
                key={tab.name} 
                tab={tab} 
                handleClick={() => handleActiveFilterTab(tab.name)} 
                isFilterTab 
                isActiveTab={activeFilterTab[tab.name]} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
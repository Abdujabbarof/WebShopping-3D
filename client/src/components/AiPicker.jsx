// import React from 'react'
import CustomButton from './CustomButton'

const AiPicker = ({ prompt, setPrompt, handleSubmit, generating }) => {
  return (
    <div className="aipicker-container">
      <textarea placeholder="Ask AI..."
      rows={5}
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className="aipicker-textarea" />

      <div className="flex flex-wrap gap-3">
        {generating ? (
          <CustomButton title='Asking AI...'
            type='outline'
            handleClick={() => handleSubmit('logo')}
            customStyle='text-xs' />
        ) : (
          <>
            <CustomButton title='AI Logo' 
              type='outline' 
              handleClick={() => handleSubmit('logo')}
              customStyle='text-xs' />

            <CustomButton title='AI Full' 
              type='filled' 
              handleClick={() => handleSubmit('full')}
              customStyle='text-xs' />
          </>
        )}
      </div>
    </div>
  )
}

export default AiPicker
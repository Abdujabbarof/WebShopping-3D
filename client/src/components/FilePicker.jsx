// import React from 'react'

import CustomButton from "./CustomButton"

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input type="file" id="file-upload" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <label className="filepicker-label" htmlFor="file-upload"> 
          Upload file
        </label>

        <p className="mt-2 text-gray-700 text-xs truncate">{file === '' ? 'No file selected' : file.name}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton title={'Logo'} type={'outline'} handleClick={() => readFile('logo')} customStyle='text-xs' />
        <CustomButton title={'Full'} type={'filled'} handleClick={() => readFile('full')} customStyle='text-xs' />
      </div>
    </div>
  )
}

export default FilePicker
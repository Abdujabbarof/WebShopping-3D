// import React from 'react'
import { useSnapshot } from "valtio"
import PropTypes from 'prop-types';
import state from "../store"

import { getContrastingColor } from "../config/helpers";

const CustomButton = ({title, type, handleClick, customStyle}) => {
    const snap = useSnapshot(state)

    const generateStyle = (type) => {
        if(type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type ==='outline') {
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: snap.color
            }
        }
    }

  return (
    <button className={`px-2 flex-1 py-1.5 rounded-md ${customStyle}`} style={generateStyle(type)} onClick={handleClick}> 
        {title}
    </button>
  )
}

export default CustomButton

CustomButton.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    handleClick: () => PropTypes.func,
    customStyle: PropTypes.string
}
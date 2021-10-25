import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types' // Allow us to ensure mandatory props are passed to component

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      setVisible
    }
  })

  return (
    <div className="mb-10">
      <div style={hideWhenVisible}>
        <button onClick = {() => {setVisible(!visible)}} className='bg-gray-300 rounded-md px-5 py-2 font-semibold'>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="relative">
        <button onClick={toggleVisibility} className='bg-gray-300 rounded-md px-2 py-2 font-semibold absolute right-3 top-3'>Cancel</button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
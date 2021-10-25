import React from 'react'

const Notification = ({ messageType, message }) => {
  if (!message) {
    return null
  }
  if (messageType === 'notification'){
    return (
      <div className='border-2 px-3 py-2 border-green-600 text-green-600 bg-white'>{message}</div>
    )
  }
  if (messageType === 'error'){
    return (
      <div className='border-2 px-3 py-2 border-red-600 text-red-600 bg-white'>{message}</div>
    )
  }

}

export default Notification
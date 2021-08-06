import React from 'react'

const Notification = ({ messageType, message }) => {

    if (!message) {
        return null
    }

    return (
        <div className={messageType}>{message}</div>
    )
}

export default Notification
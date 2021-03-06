import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) => { return (<Part part={part} />) })}
        </div>
    )
}

export default Content
import React from 'react'

const Total = ({ course }) => {
    return (
        <p>Number of exercises {course.parts.reduce((total, current) => total + current.exercises, 0)}</p>
    )
}

export default Total
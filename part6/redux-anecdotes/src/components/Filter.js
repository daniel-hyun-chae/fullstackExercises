import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilterAction } from '../reducers/filterReducer'

const Filter = (props) => {
    // const dispatch = useDispatch()

    const handleChange = (event) => {
        // dispatch(setFilterAction(event.target.value))
        props.setFilterAction(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    setFilterAction
}

export default connect(null, mapDispatchToProps)(Filter)
//export default Filter
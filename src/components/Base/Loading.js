import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = ({color}) => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{}}>
            <Spinner animation="border" size="lg" variant={color?color:"primary"}/>
        </div>
    )
}

export default Loading

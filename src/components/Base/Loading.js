import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = ({color,size}) => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{}}>
            <Spinner animation="border" size={size?size:"lg"} variant={color?color:"primary"}/>
        </div>
    )
}

export default Loading

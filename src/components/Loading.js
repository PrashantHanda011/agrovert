import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{backgroundColor:"rgba(0,0,0,0.3)",height:"100vh"}}>
            <Spinner animation="border" size="lg" variant="primary"/>
        </div>
    )
}

export default Loading

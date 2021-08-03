import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{}}>
            <Spinner animation="border" size="lg" variant="primary"/>
        </div>
    )
}

export default Loading

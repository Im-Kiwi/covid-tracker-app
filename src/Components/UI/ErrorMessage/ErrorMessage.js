import React from 'react'
import { Alert, Container } from 'react-bootstrap'

const ErrorMessage = () => {

    return (
        <Container className = 'mt-5'>
            <Alert variant = 'danger'>
                <Alert.Heading className = 'display-4'>There is an Error</Alert.Heading>
                <p className = 'lead'>Either data is currently unavailable or the servers are under maintainence </p>
                <p className = 'lead'>Please do check after sometime as if the servers are under maintainence then it will be back online soon</p>
                <hr />
                <p className = 'lead'><strong>PLEASE TRY AGAIN LATER</strong></p>
            </Alert>
        </Container>
    )
}

export default ErrorMessage
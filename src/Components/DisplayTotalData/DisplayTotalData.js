import React from 'react'
import { Row, Col, Badge, Card } from 'react-bootstrap'
import classes from './DisplayTotalData.module.css'
import { confirmedCase, death, recover, activeCase } from '../../ImageStore/ImageStore' 

const DisplayTotalData = props => {

    // it is necessary becoz this component is innermost child which will render first and thus initially the object will gonna be null ...
    // ...  that will cause error if we perform toLocaleString() on the object values
    const objKeys = Object.keys(props.dataset)

    let cases, deaths, recovered, active, dailyCases, dailyDeaths, dailyRecovered, dailyActive

    // calculating the daily active cases
    const sum = props.dataset.todayRecovered + props.dataset.todayDeaths
    const tempActive = props.dataset.todayCases - sum 
    

    if (objKeys.length > 0) {
        cases = props.dataset.cases.toLocaleString()
        deaths = props.dataset.deaths.toLocaleString()
        recovered = props.dataset.recovered.toLocaleString()
        active = props.dataset.active.toLocaleString()
        dailyCases = props.dataset.todayCases.toLocaleString()
        dailyDeaths = props.dataset.todayDeaths.toLocaleString()
        dailyRecovered = props.dataset.todayRecovered.toLocaleString()
        dailyActive = tempActive.toLocaleString()
    }
      
    return (
        <Row className = 'p-3 justify-content-center'>
            <Col sm className = 'text-danger mb-4'>
                <Card className = {['border p-2 mx-auto', classes.dataContainer, classes.cardOne].join(' ')}>
                    <Card.Img src = {confirmedCase} alt = 'confirmcd cases ' width = '60' height = '60'/>
                    <Card.Body>
                        <Card.Title className = {classes.header}>Cases</Card.Title>
                        <Card.Text className = {classes.value}><strong>{cases}</strong></Card.Text>
                        <Badge 
                            variant = 'danger'
                            className = {[classes.newValue, 'p-2'].join(' ')}>
                                {props.dataset.todayCases > 0 ? '+' + dailyCases : dailyCases}
                        </Badge>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm className = 'text-dark mb-4'>
                <Card className = {['p-2 mx-auto', classes.dataContainer, classes.cardTwo].join(' ')}>
                    <Card.Img src = {death} alt = 'confirmed cases' width = '60' height = '60' />
                    <Card.Body>
                        <Card.Title className = {classes.header}>Deaths</Card.Title>
                        <Card.Text className = {classes.value}>{deaths}</Card.Text>
                        <Badge 
                            variant = 'dark' 
                            className = {[classes.newValue, 'p-2'].join(' ')}>
                                {props.dataset.todayDeaths ? '+' + dailyDeaths : dailyDeaths}
                        </Badge>                    
                    </Card.Body>
                </Card>
            </Col>
            <Col sm className = 'text-success mb-4'>
                <Card className = {[' p-2 mx-auto', classes.dataContainer, classes.cardThree].join(' ')}>
                    <Card.Img src = {recover} alt = 'total recovered' width = '60' height = '60' />
                    <Card.Body>
                        <Card.Title className = {classes.header}>Recovered</Card.Title>
                        <Card.Text className = {classes.value}>{recovered}</Card.Text>
                        <Badge 
                            variant = 'success'
                            className = {[classes.newValue, 'p-2'].join(' ')}>
                                {props.dataset.todayRecovered > 0 ? '+' + dailyRecovered : dailyRecovered }
                        </Badge>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm className = 'text-primary mb-4'>
                <Card className = {[' p-2 mx-auto', classes.dataContainer, classes.cardFour].join(' ')}>
                    <Card.Img src = {activeCase} alt = 'active cases' width = '60' height = '60' />
                    <Card.Body>
                        <Card.Title className = {classes.header}>Active</Card.Title>
                        <Card.Text className = {classes.value}>{active}</Card.Text>
                        <Badge 
                            variant = 'primary'
                            className = {[classes.newValue, 'p-2'].join(' ')}>
                                {tempActive > 0 ? '+' + dailyActive : dailyActive }
                        </Badge>                                    
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default DisplayTotalData
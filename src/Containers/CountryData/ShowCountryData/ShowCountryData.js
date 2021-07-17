import React from 'react'
import DisplayTotalData from '../../../Components/DisplayTotalData/DisplayTotalData'
import { Container, Row, Figure } from 'react-bootstrap'
import useCurrentData from '../../../hooks/useCurrentData'
import Graph from '../../../Components/UI/Graph/Graph'
import GraphDataButton from '../../../Components/UI/Graph/GraphDataButton/GraphDataButton'
import GraphTypeButton from '../../../Components/UI/Graph/GraphTypeButton/GraphTypeButton'
import DropdownComponent from '../../../Components/DropdownButton/DropdownButton'
import useGraphData from '../../../hooks/useGraphData'

const ShowCountryData = props => {

    const [dataset, currentDayHandler] = useCurrentData(props.todayData, props.yesterdayData, props.twoDaysAgoData)

    // extracting months and data from the historical data
    const months = props.historicalData.map(month => {
        return month.date
    })
    const stats = props.historicalData.map(data => {
        return data.data
    })

    // this will make the data to change dynamically according to the field selected by the user (cases, deaths, recovered)
    const [dataToDisplay, changeGraph, showDataHandler, changeGraphHandler, graphColor, graphBorder] = useGraphData(stats)

    const data = {
        labels : months,
        datasets : [
            {
                label : 'Data',
                data : dataToDisplay,
                tension : 0.3,
                backgroundColor: [graphColor],
                borderColor: [graphBorder ]
            }
        ]
    }

    return (
        <Container>
            <div>
                <Row className = 'ml-5 mb-2'>
                    <DropdownComponent 
                        currentDayHandler = {currentDayHandler}
                    />
                </Row>
                <DisplayTotalData 
                    dataset = {dataset}
                />
            </div>
            <div className = 'mt-5'>
                <Graph
                    data = {data}
                    graphType = {changeGraph}
                >
                    <GraphDataButton 
                        clickHandler = {showDataHandler}
                    />
                    <GraphTypeButton 
                        changeGraph = {changeGraphHandler}
                        graphType = {changeGraph}
                    />
                </Graph>
                <Figure.Caption 
                    className = 'text-success'
                >
                    **Graph showing the past data of the country from Jan 20 to {months[months.length-1]}
                </Figure.Caption>
            </div>
        </Container>
    )
}

export default ShowCountryData
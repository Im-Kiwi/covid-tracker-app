import React from 'react'
import { Container, Row, Figure } from 'react-bootstrap'
import Graph from '../../../Components/UI/Graph/Graph'
import GraphDataButton from '../../../Components/UI/Graph/GraphDataButton/GraphDataButton'
import GraphTypeButton from '../../../Components/UI/Graph/GraphTypeButton/GraphTypeButton'
import DropdownComponent from '../../../Components/DropdownButton/DropdownButton'
import DisplayTotalData from '../../../Components/DisplayTotalData/DisplayTotalData'
import useGraphData from '../../../hooks/useGraphData'
import useCurrentData from '../../../hooks/useCurrentData'

const ShowWorldData = props => {

    // extracting months and data from the historical data
    const month = props.historicalData.map(month => {
        return month.date
    })
    const stats = props.historicalData.map(data => {
        return data.data
    })

    const [dataToDisplay, changeGraph, showDataHandler, changeGraphHandler, graphColor, graphBorder] = useGraphData(stats)

    const [dataset, currentDayHandler] = useCurrentData(props.todayData, props.yesterdayData, props.twoDaysAgoData)
    
    // contains the data needed to display on graph
    const data =  {
        labels: month,
        datasets: [
            {
            label: 'Total Cases',
            data: dataToDisplay,
            backgroundColor: [graphColor],
            borderColor: [graphBorder ],
            tension: 0.3
            },
        ],
    };

    return (
        <Container className = 'mt-5'>
            <Row className = 'ml-5 mb-2'>
                <DropdownComponent
                    currentDayHandler = {currentDayHandler}
                />
            </Row>

            <DisplayTotalData
                dataset = {dataset}
            />

            <div className = 'mt-5'> 
                <Graph
                    graphType = {changeGraph}
                    data = {data}
                >
                    <GraphDataButton 
                        clickHandler = {showDataHandler}
                    />
                    <GraphTypeButton 
                        graphType = {changeGraph}
                        changeGraph = {changeGraphHandler}
                    />
                </Graph>
                <Figure.Caption className = 'text-success'>**Graph showing the past data from Jan 20 to {month[month.length-1]}</Figure.Caption>
            </div>
            
        </Container>
    )
}

export default ShowWorldData
import React from 'react'
import { Container, Row, Figure } from 'react-bootstrap'
import DisplayTotalData from '../../../Components/DisplayTotalData/DisplayTotalData'
import DropdownComponent from '../../../Components/DropdownButton/DropdownButton'
import useCurrentData from '../../../hooks/useCurrentData'
import Graph from '../../../Components/UI/Graph/Graph'
import useGraphData from '../../../hooks/useGraphData'
import GraphDataButton from '../../../Components/UI/Graph/GraphDataButton/GraphDataButton'
import GraphTypeButton from '../../../Components/UI/Graph/GraphTypeButton/GraphTypeButton'
import ShowTableData from '../../../Components/ShowTableData/ShowTableData'
import { useParams } from 'react-router-dom'
import classes from './ShowContinentData.module.css'

const ShowContinentData = props => {

    // GETTING THE NAME OF THE CONTINENT FROM THE PARAMS
    const { name } = useParams()

    // THIS CUSTOM HOOK IS USED TO SHOW THE TOTAL DATA ACCORDING TO THE DAY (TODAY, YESTERDAY, TWO_DAYS_AGO)
    const [ dataset, currentDayHandler] = useCurrentData(props.todayData, props.yesterdayData, props.twoDaysAgoData)
    
    let months = []
    let stats = []

    // extracting months and data from the historical data
    months = props.historicalData.map(month => {
        return month.date
    })
    stats = props.historicalData.map(data => {
        return data.dataset
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
        <Container className = 'mt-5'>
            <div className = 'mb-4'>
                <h3 className = {classes.header}>{name.toUpperCase()}</h3>
            </div>
            <Row className = 'ml-5 mb-2'>
                <DropdownComponent 
                    currentDayHandler = {currentDayHandler}
                />
            </Row>
            <div>
                <DisplayTotalData 
                    dataset = {dataset}
                />
            </div>
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
                <Figure.Caption
                     className = 'text-success'
                >
                    **Graph showing the past data of the continent from Jan 2020 to {months[months.length-1]}
                </Figure.Caption>
            </div>
            <div className = 'mt-5'>
                <ShowTableData 
                    continentData = {props.todayData}
                    todayData = {props.countriesData}
                    yesterdayData = {props.yesterdayCountData}
                    twoDaysAgoData = {props.twoDaysAgoCountData}
                />
            </div>
        </Container>
    )
}

export default ShowContinentData
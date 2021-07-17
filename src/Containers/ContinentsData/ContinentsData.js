import React, { useEffect } from 'react'
import Graph from '../../Components/UI/Graph/Graph'
import * as globalVariables from '../../globalVariables/globalVariables'
import { Container, Figure } from 'react-bootstrap'
import useGraphData from '../../hooks/useGraphData'
import GraphDataButton from '../../Components/UI/Graph/GraphDataButton/GraphDataButton'
import ShowContinentsData from './ShowContinentsData/ShowContinentsData'
import {  useLocation } from 'react-router-dom'
import Spinner from '../../Components/UI/Spinner/Spinner'
import ErrorMessage from '../../Components/UI/ErrorMessage/ErrorMessage'
import classes from './ContinentsData.module.css'

const ContinentsData = props => {

    const { pathname } = useLocation();

    // to make sure when user navigate to a page then it displays that page from very start
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // using custom hook which returns data to display on graph and a method
    const [dataToDisplay, ,showDataHandler, ,graphColor, graphBorder] = useGraphData(props.continentsData)

    // creating an array which consist of name of the continents
    const continentsName = props.continentsData.map((cont, id) => {
        return cont.continent
    })

    // creating an array which will consist the objects containing the continent name and its data (data can be cases, deaths ,recovered)
    // ... depends upon the displayState (displayState which is returned from custom hook above)
    const dataOnGraph = continentsName.map((name, id) => {
        return {
            name : name,
            data : dataToDisplay[id]
        }
    })

    // sorting the data in ascending order
    const sortedGraphData = dataOnGraph.sort((a,b) => b.data - a.data)

    // creating a new array which consist of sorted data, this data will be used in graph
    const sortedNames = sortedGraphData.map(name => {
        return name.name
    })
    const sortedData = dataOnGraph.map(data => {
        return data.data
    })

    // the dataset which will represent on graph
    const data = {
        labels: sortedNames,
        datasets: [
           {
               label : 'Data',
               data: sortedData,
               backgroundColor: [graphColor],
                borderColor: [graphBorder ]
           }
        ]
    }

    let showContent = (
        <Container className = 'mt-5'>
            <h3 className = {[classes.header, 'mb-5'].join(' ')}>CONTINENTS STATISTICS</h3>
            <Graph 
                graphType = {globalVariables.HORIZONTAL_BAR}
                data = {data}
            >
                <GraphDataButton 
                    clickHandler = {showDataHandler}
                />
            </Graph>
            <Figure.Caption className = 'text-success'>**Graph showing the worse affected continents.</Figure.Caption>
            <ShowContinentsData 
                todayData = {props.continentsData}
                yesterdayData = {props.yesterdayContData}
                twoDaysAgoData = {props.twoDaysAgoContData}
            />
        </Container>
    )

    // the error message will be displayed on the page once it satisfies the below condition
    if (props.isError) {
        showContent = <ErrorMessage />
    }

    return (
        <div className = 'mt-4'>
            {props.loading ? <Spinner /> : showContent}
        </div>
    )
}

export default ContinentsData
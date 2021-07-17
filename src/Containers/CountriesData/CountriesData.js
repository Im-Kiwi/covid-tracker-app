import React, { useEffect } from 'react'
import useGraphData from '../../hooks/useGraphData'
import Graph from '../../Components/UI/Graph/Graph'
import GraphDataButton from '../../Components/UI/Graph/GraphDataButton/GraphDataButton'
import ShowCountriesData from './ShowCountriesData/ShowCountriesData'
import * as globalVariables from '../../globalVariables/globalVariables'
import { Container, Figure } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Spinner from '../../Components/UI/Spinner/Spinner'
import ErrorMessage from '../../Components/UI/ErrorMessage/ErrorMessage'
import classes from './CountriesData.module.css'



const CountriesData = props => {

    const { pathname } = useLocation();

    // to make sure when user navigate to a page then it displays that page from very start
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [dataToDisplay, ,showDataHandler, , graphColor, graphBorder] = useGraphData(props.todayData)

    // array consist the name of the country
    const countriesName = props.todayData.map(name => name.country)

    // creating an array consisting object which includes name of the country and its data
    const dataOnGraph = dataToDisplay.map((data, id) => {
        return {
            name : countriesName[id],
            data : data
        }
    })
    // sorting the array
    const sortedData = dataOnGraph.sort((a,b) => {
        return b.data - a.data
    })
    // after sorting taking the first 10 elements of that array
    const filterData = sortedData.filter((data, id) => id < 10 )


    //seperating the sorted data and names in seperate array
    const sortedNames = filterData.map(name => name.name)
    const sortedDataOnly = filterData.map(data => data.data)

    // data to be displayed on x axis
    const data = {
        labels : sortedNames,
        datasets : [
            {
                label : 'Data',
                data : sortedDataOnly,
                backgroundColor: [graphColor],
                borderColor: [graphBorder ]
            }
        ]
    }

    let showContent = (
        <Container className = 'mt-5'>
            <div>
                <h3 className = {['mb-5', classes.header].join(' ')}>COUNTRIES STATISTICS</h3>
                <Graph
                    graphType = {globalVariables.HORIZONTAL_BAR}
                    data = {data}
                >
                    <GraphDataButton 
                        clickHandler = {showDataHandler}
                    />
                </Graph> 
                <Figure.Caption className = 'text-success'>**Graph showing top 10 worst affected countries</Figure.Caption>
            </div>
            <div>
                <ShowCountriesData
                    todayData = {props.todayData}
                    yesterdayData = {props.yesterdayData}
                    twoDaysAgoData = {props.twoDaysAgoData}
                />
            </div>
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

export default CountriesData
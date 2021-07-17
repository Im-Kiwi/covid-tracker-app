import React, { useState, useEffect } from 'react'
import ShowWorldData from './ShowWorldData/ShowWorldData'
import { monthlyDataset } from '../../globalMethods/monthlyData'
import { Route } from 'react-router-dom'
import Spinner from '../../Components/UI/Spinner/Spinner'
import ErrorMessage from '../../Components/UI/ErrorMessage/ErrorMessage'
import { useLocation } from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import classes from './WorldData.module.css'


const WorldData = () => {

    // to make sure when user navigate to a page then it displays that page from very start
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const url = 'https://corona.lmao.ninja/v2/all'

    const secondURL = 'https://corona.lmao.ninja/v2/historical/all?lastdays=all'

    const [todayData, yesterdayData, twoDaysAgoData, historicalData, loading, isError] = useFetchData(url, secondURL, true)

    const [updatedHistory, setUpdatedHistory] = useState([])

    useEffect(() => {

        // here we are extracting the important data required to display on the graph
        if (historicalData.length !== 0) {
            const cases = historicalData.cases
            const keys = Object.keys(cases)
            const dataset = monthlyDataset(keys, historicalData)
            setUpdatedHistory(dataset)
        }
    }, [historicalData])

    let showContent = (
        <> 
            <div className = 'mt-5'>
                <h3 className = {classes.header}>GLOBAL STATISTICS</h3>                
            </div>
            <ShowWorldData
                historicalData = {updatedHistory}
                todayData = {todayData}
                yesterdayData = {yesterdayData}
                twoDaysAgoData = {twoDaysAgoData}
            />
        </>
    )

    // if there is an error then error message will be displayed
    if (isError) {
        showContent = (
            <ErrorMessage />
        )
    }

    return (
        <>  
            <Route exact path = {['/','/global-stats']}>
                {loading ? <Spinner /> :  showContent}        
            </Route>
        </>
    )
}

export default WorldData
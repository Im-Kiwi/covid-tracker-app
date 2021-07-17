import React, { useEffect, useState, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { monthlyDataset } from '../../globalMethods/monthlyData'
import useFetchData from '../../hooks/useFetchData'
import ErrorMessage from '../../Components/UI/ErrorMessage/ErrorMessage'
import Spinner from '../../Components/UI/Spinner/Spinner'
import classes from './CountryData.module.css'
import { Suspense } from 'react'
const ShowCountryData = lazy(() => import('./ShowCountryData/ShowCountryData'))

const CountryData = props => {

    const { name } = useParams()

    const url = `https://corona.lmao.ninja/v2/countries/${name}`
    const secondURL = `https://corona.lmao.ninja/v2/historical/${name}?lastdays=all`

    const [
        todayData,
        yesterdayData,
        twoDaysAgoData,
        historicalData,
        loading,
        isError
    ] = useFetchData(url, secondURL, true)

    // this stores extracted data from historical data
    const [updatedHistory, setUpdatedHistory] = useState([])

    useEffect(() => {
        // here we are extracting the important data required to display on the graph
        if (historicalData.length !== 0) {
            const timeStamps = Object.keys(historicalData.timeline.cases)
            const dataset = monthlyDataset(timeStamps, historicalData.timeline)
            setUpdatedHistory(dataset)
        }
    }, [historicalData])

    let showContent = (
        <>
            <h4 className = {['mt-5 mb-5', classes.header].join(' ')}>{name.toUpperCase()}</h4>
            <Suspense fallback = {<div></div>}>
                <ShowCountryData
                    todayData = {todayData}
                    yesterdayData = {yesterdayData}
                    twoDaysAgoData = {twoDaysAgoData}
                    historicalData = {updatedHistory}
                />
            </Suspense>
        </>
    )

    if (isError) {
        showContent = <ErrorMessage />
    }

    return (
        <>
            {loading ? <Spinner /> : showContent}
        </>
    )
}

export default React.memo(CountryData)
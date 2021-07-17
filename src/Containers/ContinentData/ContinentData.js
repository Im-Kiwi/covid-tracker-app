import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../Components/UI/Spinner/Spinner'
import ErrorMessage from '../../Components/UI/ErrorMessage/ErrorMessage'
import useFetchData from '../../hooks/useFetchData'
import { Suspense } from 'react'
const ShowContinentData = lazy(() => import('./ShowContinentData/ShowContinentData'))

const ContinentData = props => {

    // this is use to fetch the name of the continent from the url
    const { name : continentName } = useParams()
    
    const url  = `https://corona.lmao.ninja/v2/continents/${continentName}`

    // used custom hook to send request and recieving response from the server
    const [todayData, yesterdayData, twoDaysAgoData, loading, isError] = useFetchData(url, null, false)

    // past data of countries belong to a continent
    const [historicalData, setHistoricalData] = useState([])


    const countriesPastData = props.countriesPastData

    useEffect(() => {
        let tempData = []

        // checking whether the state is non empty
        if (Object.keys(todayData).length !== 0 && countriesPastData.length !== 0 ) {
            const countryNames = todayData.countries //storing the countries name
            
            // getting the data of the particular country and storing it in empty array
            for (let name of countryNames) {
                for (let data of countriesPastData) {
                    if (name === data.country) {
                        tempData.push(data)
                    }
                }
            }

            // extracting the data which consist object having date and data property
            const dataOnly = tempData.map(data => {
                return data.dataset
            })
            
            // now extracting the only date from the array
            const timeStamp = dataOnly[0].map(time => {
                return time.date
            })
            
            // now getting the data of all countries of that particular continent according to the timestamp 
            let monthlyStats = timeStamp.map(time => {
                let temp = []
                for (let data of dataOnly) {
                    for (let getData of data) {
                        if (time === getData.date) {
                            temp.push(getData.data)
                        }
                    }
                }
                
                const casesArr = temp.map(cases => {
                    return cases.cases
                })
                const deathsArr = temp.map(deaths => {
                    return deaths.deaths
                })
                const recoveredArr = temp.map(recovered => {
                    return recovered.recovered
                })

                const totalCases = casesArr.reduce((total, current) => {
                    return total + current
                })
                const totalDeaths = deathsArr.reduce((total, current) => {
                    return total + current
                })
                const totalRecovered = recoveredArr.reduce((total, current) => {
                    return total + current
                })

                return {
                    date : time,
                    dataset : {
                        cases : totalCases,
                        deaths : totalDeaths,
                        recovered : totalRecovered
                    }
                }
            })

            setHistoricalData(monthlyStats)   
        }

    }, [todayData, countriesPastData])

    let showContent = (
        <Suspense fallback = {<div></div>}>
            <ShowContinentData 
                todayData = {todayData}
                yesterdayData = {yesterdayData}
                twoDaysAgoData = {twoDaysAgoData}
                historicalData = {historicalData}
                countriesData = {props.countriesData}
                yesterdayCountData = {props.yesterdayCountData}
                twoDaysAgoCountData = {props.twoDaysAgoCountData}
            />

        </Suspense>
    )
    
    // if there is an error then error message will be displayed
    if (isError) {
        showContent = <ErrorMessage />
    }

    return (
        <>
            {loading ? <Spinner /> : showContent}  
        </>
    )
}

export default ContinentData
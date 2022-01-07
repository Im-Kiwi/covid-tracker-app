import React, { useState, useEffect, lazy } from 'react'
// import ContinentsData from '../ContinentsData/ContinentsData'
// import CountriesData from '../CountriesData/CountriesData'
import ContinentData from '../ContinentData/ContinentData'
import CountryData from '../CountryData/CountryData'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import { monthlyDataset } from '../../globalMethods/monthlyData'
import useSpinner from '../../hooks/useSpinner'
import useError from '../../hooks/useError'
import { Suspense } from 'react'
const CountriesData = lazy(() => import('../CountriesData/CountriesData'))
const ContinentsData = lazy(() => import('../ContinentsData/ContinentsData'))


const ParticularData = props => {

    // data of continent of last three days (today, yesterday, twoDaysAgo)
    const [continentsData, setContinentsData] = useState([])
    const [yesterdayContData, setYesterdayContData] = useState([])
    const [twoDaysAgoContData, setTwoDaysAgoContData] = useState([])

    // data of countries of last three days (today, yesterday, twoDaysAgo)
    const [countriesData, setCountriesData] = useState([])
    const [yesterdayCountData, setYesterdayCountData] = useState([])
    const [twoDaysAgoCountData, setTwoDaysAgoCountData] = useState([]) 

    // historical data of each countries
    const [countriesPastData, setCountriesPastData] = useState([])

    // this custom hook is to manage spinner
    const [loading, loadingHandler] = useSpinner()

    // this hook is to manage the error messages
    const [isError, errorHandler] = useError()

    useEffect(() => {

        // fetching the data from the server which includes continents data and countries data of last 3 days (today, yesterday, 2 days ago)
         (async () => {

            try {
                loadingHandler(true) // spinner will enable

                // created an object which contains properties used to send request to the server
                const fetchContinentsData = {
                    today : axios.get('https://disease.sh/v3/covid-19/continents'),
                    yesterday : axios.get('https://disease.sh/v3/covid-19/continents?yesterday=true'),
                    twoDaysAgo : axios.get('https://disease.sh/v3/covid-19/continents?twoDaysAgo=true')
                }
                const fetchCountriesData = {
                    today : axios.get('https://disease.sh/v3/covid-19/countries'),
                    yesterday : axios.get('https://disease.sh/v3/covid-19/countries?yesterday=true'), 
                    twoDaysAgo : axios.get('https://disease.sh/v3/covid-19/countries?twoDaysAgo=true'),
                    pastData : axios.get('https://disease.sh/v3/covid-19/historical?lastdays=all')
                }
    
                // the object created above is used to send the different request all together which is done below using all() of axios
                const fetchContinentArray = await axios.all([
                    fetchContinentsData.today, 
                    fetchContinentsData.yesterday, 
                    fetchContinentsData.twoDaysAgo,                 
                ])
                const fetchCountriesArray = await axios.all([
                    fetchCountriesData.today,
                    fetchCountriesData.yesterday,
                    fetchCountriesData.twoDaysAgo,
                    fetchCountriesData.pastData
                ])
    
                // storing the response in an object
                const tempContinentsData = {
                    today : fetchContinentArray[0].data,
                    yesterday : fetchContinentArray[1].data,
                    twoDaysAgo : fetchContinentArray[2].data
                }
                const tempCountriesData = {
                    today : fetchCountriesArray[0].data,
                    yesterday : fetchCountriesArray[1].data,
                    twoDaysAgo : fetchCountriesArray[2].data,
                    pastData : fetchCountriesArray[3].data
                }

                // updating the response
                setContinentsData(tempContinentsData.today)
                setYesterdayContData(tempContinentsData.yesterday)
                setTwoDaysAgoContData(tempContinentsData.twoDaysAgo)
    
                setCountriesData(tempCountriesData.today)
                setYesterdayCountData(tempCountriesData.yesterday)
                setTwoDaysAgoCountData(tempCountriesData.twoDaysAgo)

                // updating the past data
                const manipulateData = tempCountriesData.pastData.map(data => {
                    const timeStamps = Object.keys(data.timeline.cases)
                    const tempData = data.timeline 
                    const dataset = monthlyDataset(timeStamps, tempData)
                    return {
                        country : data.country,
                        dataset : dataset
                    }
                })

                // updating the state by storing the updated past data
                setCountriesPastData(manipulateData)

                // disabling the spinner and error message 
                loadingHandler(false)
                errorHandler(false)

            } catch(err) {
                loadingHandler(false) // disabling the spinner
                errorHandler(true) // enabling the error message component
            }

        })();

    }, [errorHandler, loadingHandler])

    return (
        <Switch>
            <Route exact path = '/continents-stats'>
                <Suspense fallback = {<div></div>}>
                    <ContinentsData
                        loading = {loading}
                        isError = {isError}
                        continentsData = {continentsData}
                        yesterdayContData = {yesterdayContData}
                        twoDaysAgoContData = {twoDaysAgoContData}
                    />                                    
                </Suspense>
            </Route>
            <Route exact path = '/countries-stats'>
                <Suspense fallback = {<div></div>}>
                    <CountriesData 
                        loading = {loading}
                        isError = {isError}
                        todayData = {countriesData}
                        yesterdayData = {yesterdayCountData}
                        twoDaysAgoData = {twoDaysAgoCountData}
                    />
                </Suspense>
            </Route> 
            <Route path = '/continents-stats/:name'>
                <ContinentData
                    countriesPastData = {countriesPastData}
                    countriesData = {countriesData}
                    yesterdayCountData = {yesterdayCountData}
                    twoDaysAgoCountData = {twoDaysAgoCountData}
                />
            </Route>
            <Route  path = '/countries-stats/:name'>
                <CountryData />
            </Route>          
        </Switch>
    )
}

export default ParticularData

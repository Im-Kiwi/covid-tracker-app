import { useEffect, useState } from "react"
import axios from 'axios'
import useSpinner from "./useSpinner"
import useError from "./useError"

const useFetchData = (url, urlTwo, isPast) => {

    // these states contains the data of today yesterday and two days ago
    const [todayData, setTodayData] = useState({})
    const [yesterdayData, setYesterdayData] = useState({})
    const [twoDaysAgoData, setTwoDaysAgoData] = useState({})

    // past data
    const [historicalData, setHistoricalData] = useState([])

    // this custom hook is to manage spinner
    const [loading, loadingHandler] = useSpinner()

    // this hook is to manage the error messages
    const [isError, errorHandler] = useError()

    useEffect(() => {
        (async () => {
            try {
                loadingHandler(true) // enabling spinner

                // preparing the request to the server
                const fetchToday = axios.get(url)
                const fetchYesterday = axios.get(url + '?yesterday=true')
                const fetchTwoDaysAgo = axios.get(url + '?twoDaysAgo=true')
    
                // using axios.all() to send all request at once
                const fetchArray = await axios.all([fetchToday, fetchYesterday, fetchTwoDaysAgo])
                
                // storing data which are recieved from the server
                const getToday = fetchArray[0].data
                const getYesterday = fetchArray[1].data
                const getTwoDaysAgo = fetchArray[2].data

                // updating the states
                setTodayData(getToday)
                setYesterdayData(getYesterday)
                setTwoDaysAgoData(getTwoDaysAgo)

                // this is to send request so as to fetch the past data
                if (isPast) {
                    const fetchData = await axios.get(urlTwo)
                    
                    const gethistorical = fetchData.data
                    setHistoricalData(gethistorical)
                }

                loadingHandler(false) // disabling the spinner
                errorHandler(false) // disabling the error message

            } catch(err) {
                loadingHandler(false) // disabling the spinner
                errorHandler(true) // enabling the error message
            }
        })();

    }, [url, urlTwo, isPast, loadingHandler, errorHandler])

    if (isPast) {
        return [
            todayData,
            yesterdayData, 
            twoDaysAgoData,
            historicalData,
            loading,
            isError
        ]
    } else {
        return [
            todayData,
            yesterdayData,
            twoDaysAgoData,
            loading,
            isError
        ]
    }
}

export default useFetchData
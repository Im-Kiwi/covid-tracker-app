import { useState } from 'react'
import * as globalVariables from '../globalVariables/globalVariables'

const useCurrentData = (todayData, yesterdayData, twoDaysAgoData) => {

     // this will manage to keep record of last 3 days (today, yesterday, two days ago)
     const [currentDay, setCurrentDay] = useState('')

     let dataset

     // this method will help to display the data of past 3 days (today, yesterday, two days ago)
    const currentDayHandler = (day) => {
        if (day === globalVariables.TODAY) {
            setCurrentDay(day)
        } else if (day === globalVariables.YESTERDAY) {
            setCurrentDay(day)
        } else if (day === globalVariables.TWO_DAYS_AGO) {
            setCurrentDay(day)
        }
    }

    switch(currentDay) {
        case globalVariables.TODAY:
            dataset = todayData
            break;
        case globalVariables.YESTERDAY:
            dataset = yesterdayData
            break;
        case globalVariables.TWO_DAYS_AGO:
            dataset = twoDaysAgoData
            break;
        default:
            dataset = todayData
    }

    return [
        dataset,
        currentDayHandler
    ]
}

export default useCurrentData
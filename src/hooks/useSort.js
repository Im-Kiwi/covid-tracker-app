import { useState } from 'react'
import * as globalVariables from '../globalVariables/globalVariables'

const useSort = dataset => {
    
    const [sortingBy, setSortingBy] = useState(globalVariables.CASES) // managing the sorting data 

    const [areCasesDescend, setCasesDescend] = useState(true)
    const [areDeathsDescend, setDeathsDescend] = useState(false)
    const [areRecoveredDescend, setRecoveredDescend] = useState(false)
    const [areActiveDescend, setActiveDescend] = useState(false)

    let sortData

     // method will arrange the data in ascending or descending order
     const sortingHandler = (input) => {

        setSortingBy(input)

        if (input === globalVariables.CASES) {
            setCasesDescend(v => !v)
            setDeathsDescend(false)
            setRecoveredDescend(false)
            setActiveDescend(false)
        } else if (input === globalVariables.DEATHS) {
            
            setCasesDescend(false)
            setDeathsDescend(v => !v)
            setRecoveredDescend(false)
            setActiveDescend(false)
        } else if (input === globalVariables.RECOVERED) {
            
            setCasesDescend(false)
            setDeathsDescend(false)
            setRecoveredDescend(v => !v)
            setActiveDescend(false)
        } else if (input === globalVariables.ACTIVE) {
            setCasesDescend(false)
            setDeathsDescend(false)
            setRecoveredDescend(false)
            setActiveDescend(v => !v)
        }
    }

    // sorting the data according to the data field (cases, deaths, recovered, active) in ascending and descending order
    switch (sortingBy) {
        case globalVariables.CASES:
            if (areCasesDescend) {
                sortData = dataset.sort((a,b) => b.cases - a.cases)          
            } else {
                sortData = dataset.sort((a,b) => a.cases - b.cases)
            }            
            break;
        case globalVariables.DEATHS:
            if (areDeathsDescend) {
                sortData = dataset.sort((a,b) => b.deaths - a.deaths)
            } else {
                sortData = dataset.sort((a,b) => a.deaths - b.deaths)
            }
            break;
        case globalVariables.RECOVERED:
            if (areRecoveredDescend) {
                sortData = dataset.sort((a,b) => b.recovered - a.recovered)
            } else {
                sortData = dataset.sort((a,b) => a.recovered - b.recovered)
            }
            break;
        case globalVariables.ACTIVE:
            if (areActiveDescend) {
                sortData = dataset.sort((a,b) => b.active - a.active)
            } else {
                sortData = dataset.sort((a,b) => a.active - b.active)
            }
            break;
        default:
            sortData = dataset.sort((a,b) => b.cases - a.cases)
            break;
    }

    return [
        sortData,
        sortingHandler,
        areCasesDescend,
        areDeathsDescend,
        areRecoveredDescend,
        areActiveDescend
    ]
}

export default useSort
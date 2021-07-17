import { useState } from 'react'
import * as globalVariables from '../globalVariables/globalVariables'

const useGraphData = (dataset) => {

    // this will manage the change of graph type 
    const [changeGraph, setChangeGraph] = useState(globalVariables.VERTICAL_BAR)

    // this stores the current state of data field
    const [showCases, setShowCases] = useState(false)
    const [showDeaths, setShowDeaths] = useState(false)
    const [showRecovered, setShowRecovered] = useState(false)

    // this state stores the current color of the graph
    const [graphColor, setGraphColor] = useState('#fb3640')
    const [graphBorder, setGraphBorder] = useState('#fb3640')

    const showDataHandler = (input) => {
        if (input === globalVariables.CASES) {
            setGraphColor('#fb3640')
            setGraphBorder('#fb3640')
            setShowCases(true)
            setShowDeaths(false)
            setShowRecovered(false)
        } else if (input === globalVariables.DEATHS) {
            setGraphColor('#333533')
            setGraphBorder('#333533')
            setShowCases(false)
            setShowDeaths(true)
            setShowRecovered(false)
        } else if (input === globalVariables.RECOVERED) {
            setGraphColor('#2dc653')
            setGraphBorder('#2dc653')
            setShowCases(false)
            setShowDeaths(false)
            setShowRecovered(true)
        }
    }

    const dataToDisplay = dataset.map(data => {
        if (showCases) {
            return data.cases
        } else if (showDeaths) {
            return data.deaths
        } else if (showRecovered) {
            return data.recovered
        } else {
            return data.cases
        }
    })


     // to change the graph type
     const changeGraphHandler = (graph) => {
        setChangeGraph(graph)
    }

    return [
        dataToDisplay,
        changeGraph,
        showDataHandler,
        changeGraphHandler, 
        graphColor,
        graphBorder
    ]
}

export default useGraphData
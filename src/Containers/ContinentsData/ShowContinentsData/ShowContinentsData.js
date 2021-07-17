import React from 'react'
import { Table } from 'react-bootstrap'
import TabularData from '../../../Components/UI/TabularData/TabularData'
import DropdownComponent from '../../../Components/DropdownButton/DropdownButton'
import useSort from '../../../hooks/useSort'
import SortBy from '../../../Components/SortBy/SortBy'
import useCurrentData from '../../../hooks/useCurrentData'

const ShowContinentsData = props => {

    // this custom hook will provide the data of countries which can be dynamically changed based on the correponding method 
    const [dataset, currentDayHandler] = useCurrentData(props.todayData, props.yesterdayData, props.twoDaysAgoData)
  
    // using custom hook which will help to sort data in ascending and descending order
    const [sortData, sortingHandler, areCasesDescend, areDeathsDescend, areRecoveredDescend, areActiveDescend ] = useSort(dataset)

    // displaying the data in tabular format
    const displayContData = sortData.map((data, id) => {
        return (
            <TabularData 
                key = {data.continent}
                title = {data.continent}
                cases = {data.cases}
                deaths = {data.deaths}
                recovered = {data.recovered}
                active = {data.active}
                todayCases = {data.todayCases}
                todayDeaths = {data.todayDeaths}
                todayRecovered = {data.todayRecovered}
                todayActive = {data.todayActive}
                id = {id}
                flag = {null}
                url = '/continents-stats/'
            />
        )
    })

    return (

        <div className = 'mt-5'>
            <div className = 'float-left mb-1'>
                <DropdownComponent 
                    currentDayHandler = {currentDayHandler}
                />
            </div>
            <div className = 'float-right'>
                <SortBy
                    sortingHandler = {sortingHandler}
                    areCasesDescend = {areCasesDescend}
                    areDeathsDescend = {areDeathsDescend}
                    areRecoveredDescend = {areRecoveredDescend}
                    areActiveDescend = {areActiveDescend}
                />
            </div>
            <div>
                <Table bordered striped hover responsive>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Continent Name</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                            <th>Recovered</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayContData}
                    </tbody>
                </Table>
            </div> 
           
        </div>
    )
}

export default ShowContinentsData
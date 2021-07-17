import React, { useState } from 'react'
import { Table, Form, Row, Col, Alert } from 'react-bootstrap'
import TabularData from '../../../Components/UI/TabularData/TabularData'
import DropdownButton from '../../../Components/DropdownButton/DropdownButton'
import SortBy from '../../../Components/SortBy/SortBy'
import * as globalVariables from '../../../globalVariables/globalVariables'
import classes from './ShowCountriesData.module.css'
import useSort from '../../../hooks/useSort'

// THIS COMPONENT MEANT TO SHOW THE TABLE CONTAINING DATA OF ALL COUNTRIES
const ShowCountriesData = props => {

    // STORES THE DAY (TODAY, YESTERDAY, TWO_DAYS_AGO)
    const [currentDay, setCurrentDay] = useState(globalVariables.TODAY)
    const [searchQuery, setSearchQuery] = useState('')

    let dataset

    // HANDLING THE DAY
    const currentDayHandler = (day) => {
        setCurrentDay(day)
    }

    // DATASET ACCORDING TO THE DAY
    switch (currentDay) {
        case globalVariables.TODAY:
            dataset = props.todayData
            break;
        case globalVariables.YESTERDAY:
            dataset = props.yesterdayData
            break;
        case globalVariables.TWO_DAYS_AGO:
            dataset = props.twoDaysAgoData
            break;
        default:
            dataset = props.todayData
    }

    // custom hook is used to sort the data in ascending and descending order
    const [sortData, sortingHandler, areCasesDescend, areDeathsDescend, areRecoveredDescend, areActiveDescend] = useSort(dataset)

    // filtering the dataset according to the search query given by the user 
    const filterData = sortData.filter(data => {
        const tempCountry = data.country.toLowerCase()
        const query = searchQuery.toLowerCase()
        const stringToSearch = new RegExp(query)
        const matchedStr = stringToSearch.exec(tempCountry) 
        if (matchedStr) {
            return data
        }
        return null
    })
    
    // if the country is not found according to the search input then the below message will be displayed
    let noCountry
    if (filterData.length === 0) {
        noCountry = <Alert variant = 'danger'>No Country Found</Alert>
    }

    const tableContent = filterData.map((data, id) => {
        return (
            <TabularData
                key = {data.country} 
                id = {id}
                title = {data.country}
                cases = {data.cases}
                deaths = {data.deaths}
                recovered = {data.recovered}
                active = {data.active}
                todayCases = {data.todayCases}
                todayDeaths = {data.todayDeaths}
                todayRecovered = {data.todayRecovered}
                flag = {data.countryInfo.flag}  
                url = '/countries-stats/'      
            />
        )
    })

    return (
        <div className = 'mt-5'>
            <Row>
                <Col className = {classes.coloumnOne}>
                    <div className = 'float-left mt-2'>
                        <DropdownButton 
                            currentDayHandler = {currentDayHandler}
                        />  
                    </div>
                </Col>
                <Col className = {classes.coloumnTwo}>
                    <div className = {['mb-2 mx-auto', classes.searchInputContainer].join(' ')}>
                        <Form.Control 
                            className = {classes.searchInput}  
                            type = 'search' 
                            placeholder = 'Search'
                            onChange = {(event) => setSearchQuery(event.target.value)}  
                            value = {searchQuery}  
                        />
                    </div>
                </Col>
                <Col>
                    <div className = 'float-right mt-2'>
                        <SortBy
                            sortingHandler = {sortingHandler}
                            areCasesDescend = {areCasesDescend}
                            areDeathsDescend = {areDeathsDescend}
                            areRecoveredDescend = {areRecoveredDescend}
                            areActiveDescend = {areActiveDescend}
                        />
                    </div>
                </Col>
            </Row>
            <div>
                <Table bordered striped hover responsive>
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Country Name</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                            <th>Recovered</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </Table>
                {noCountry}
            </div>
        </div>
    )
}

export default React.memo(ShowCountriesData)
import React, { useState } from 'react'
import { Table, Col, Row, Form } from 'react-bootstrap'
import useCurrentData from '../../hooks/useCurrentData'
import useSort from '../../hooks/useSort'
import TabularData from '../UI/TabularData/TabularData'
import DropdownComponent from '../DropdownButton/DropdownButton'
import SortBy from '../SortBy/SortBy'
import classes from './ShowTableData.module.css'

//THIS COMPONENT IS ONLY TO SHOW THE COUNTRIES DATA OF A PARTICULAR CONTINENT
const ShowTableData = props => {

    const [searchQuery, setSearchQuery] = useState('')

    let countriesList = []
    // list of countries of a given continent
    if (Object.keys(props.continentData).length !== 0) {
        countriesList = props.continentData.countries
    }

    let filterTodayData = []
    let filterYesterdayData = []
    let filterTwoDaysAgoData = []


    // filtering the country data according to the countries belong to that particular continent
    filterTodayData = props.todayData.filter(data => {
        for (let country of countriesList) {
            if (country === data.country) {
                return data
            }
            
        } 
        return null
    })
    filterYesterdayData = props.yesterdayData.filter(data => {
        for (let country of countriesList) {
            if (country === data.country) {
                return data
            }
        } 
        return null
    })
    filterTwoDaysAgoData = props.twoDaysAgoData.filter(data => {
        for (let country of countriesList) {
            if (country === data.country) {
                return data
            }
        } 
        return null
    })
    
    // dataset which will change dynamically according to the day (today, yesterday, twoDaysAgo)
    const [ dataset, currentDayHandler]  = useCurrentData(filterTodayData, filterYesterdayData, filterTwoDaysAgoData)
    
    const [ sortData, sortingHandler] = useSort(dataset)

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

    let tableBody = []
        tableBody = filterData.map((data, id) => {
            return (
                <TabularData 
                    key = {data.country}
                    url = '/countries-stats/'
                    title = {data.country}
                    cases = {data.cases}
                    deaths = {data.deaths}
                    recovered = {data.recovered}
                    active = {data.active}
                    todayCases = {data.todayCases}
                    todayDeaths = {data.todayDeaths}
                    todayRecovered = {data.todayRecovered}
                    id = {id}
                    flag = {data.countryInfo.flag}
                />
            )
        })

    return (
        <>
            <Row>
                <Col className = {classes.coloumnOne}>
                    <div className = 'float-left mt-2'>
                        <DropdownComponent
                            currentDayHandler = {currentDayHandler}
                        />
                    </div>
                </Col>
                <Col className = {classes.coloumnTwo}>
                    <div className = {classes.search}>
                        <Form.Control
                            className = 'mb-2'
                            type = 'search'
                            placeholder = 'search'
                            onChange = {(event) => setSearchQuery(event.target.value)}
                            value = {searchQuery}
                        />
                    </div>
                </Col>
                <Col className = {classes.coloumnThree}>
                    <div className = 'float-right mt-2'>
                        <SortBy
                            sortingHandler = {sortingHandler}
                        />
                    </div>
                </Col>
            </Row>
            <Table bordered striped responsive>
                <thead className = {classes.tableHead}>
                    <tr>
                        <th>Sr.No</th>
                        <th>Country Name</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>
        </>
    )
}

export default ShowTableData
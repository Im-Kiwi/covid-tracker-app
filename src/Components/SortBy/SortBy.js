import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import * as globalVariables from '../../globalVariables/globalVariables'

const SortBy = props => {

    // this state will help to display the sort symbol (ascending and descending)
    const [showSort, setShowSort] = useState(globalVariables.CASES)

    let sortCases, sortDeaths, sortRecovered, sortActive

    // sort symbol will appear on the options of dropdown button which is clicked by the user
    switch (showSort) {
        case globalVariables.CASES:
            if (props.areCasesDescend) {
                sortCases = <i class="fas fa-sort-down ml-1"></i>
            } else {
                sortCases = <i class="fas fa-sort-up ml-1"></i>
            }
            sortDeaths = null
            sortRecovered = null
            sortActive = null
            break;

        case globalVariables.DEATHS:
            if (props.areDeathsDescend) {
                sortDeaths = <i class="fas fa-sort-down ml-1"></i>
            } else {
                sortDeaths = <i class="fas fa-sort-up ml-1"></i>
            }
            sortCases = null
            sortRecovered = null
            sortActive = null
            break;

        case globalVariables.RECOVERED:
            if (props.areRecoveredDescend) {
                sortRecovered = <i class="fas fa-sort-down ml-1"></i>
            } else {
                sortRecovered = <i class="fas fa-sort-up ml-1"></i>
            }
            sortCases = null
            sortDeaths = null
            sortActive = null
            break;

        case globalVariables.ACTIVE:
            if (props.areActiveDescend) {
                sortActive = <i class="fas fa-sort-down ml-1"></i>
            } else {
                sortActive = <i class="fas fa-sort-up ml-1"></i>
            }
            sortCases = null
            sortRecovered = null
            sortDeaths = null
            break;
        
        default:
            sortCases = null
            sortRecovered = null
            sortDeaths = null
            sortActive = null
    }

    return (
        <div>
            <DropdownButton title = 'Sort by ' size = 'sm' variant = 'secondary' >
                <Dropdown.Item 
                    onClick = {
                        () => {props.sortingHandler(globalVariables.CASES)
                            setShowSort(globalVariables.CASES)
                        }     
                    }>
                    Cases
                    {sortCases}                       
                </Dropdown.Item>
                <Dropdown.Item 
                    onClick = {
                        () => {
                            props.sortingHandler(globalVariables.DEATHS)
                            setShowSort(globalVariables.DEATHS)
                        }
                    }>
                    Deaths
                    {sortDeaths}    
                </Dropdown.Item>
                <Dropdown.Item 
                    onClick = {
                        () => {
                            props.sortingHandler(globalVariables.RECOVERED)
                            setShowSort(globalVariables.RECOVERED)
                        } 
                    }>
                    Recovered
                    {sortRecovered}
                </Dropdown.Item>
                <Dropdown.Item 
                    onClick = {
                        () => {
                            props.sortingHandler(globalVariables.ACTIVE)
                            setShowSort(globalVariables.ACTIVE)
                        } 
                    }>
                    Active
                    {sortActive}
                </Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default SortBy 
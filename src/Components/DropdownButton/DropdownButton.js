import React, { useState } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import * as globalVariables from '../../globalVariables/globalVariables'
import classes from './DropdownButton.module.css'

const DropdownComponent = props => {
    // state to keep record of current dropdown title

    const [dropdownTitle, setDropdownTitle] = useState('Today')
    
    const pastDays = ['Today', 'Yesterday', 'Two Days Ago']

    // this method name the title of the dropdown button dynamically
    const dropDownClickHandler = (element, day) => {
        setDropdownTitle(element)
        props.currentDayHandler(day)
    }

    return (
        <>
            <DropdownButton className = {classes.dropdownButton} title = {dropdownTitle} size = 'sm' variant = 'info'>
                <Dropdown.Item 
                    onClick = {() => dropDownClickHandler(pastDays[0], globalVariables.TODAY)}
                >
                    {pastDays[0]}
                </Dropdown.Item>
                <Dropdown.Item 
                    onClick = {() => dropDownClickHandler(pastDays[1], globalVariables.YESTERDAY)}
                >
                    {pastDays[1]}
                </Dropdown.Item>
                <Dropdown.Item 
                    onClick = {() => dropDownClickHandler(pastDays[2], globalVariables.TWO_DAYS_AGO)}
                >
                    {pastDays[2]}
                </Dropdown.Item>
            </DropdownButton>
        </>
    )
}

export default React.memo(DropdownComponent)
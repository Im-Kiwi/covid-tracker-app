import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import * as globalVariables from '../../../../globalVariables/globalVariables'
import classes from './GraphDataButton.module.css'

const GraphDataButton = props => {

    const [changeTitle, setChangeTitle] = useState(globalVariables.CASES)
    const [changeColor, setChangeColor] = useState(globalVariables.DANGER)

    const clickHandler = (title, color) => {
        setChangeTitle(title)
        setChangeColor(color)
        props.clickHandler(title)
    }

    return (
        <div className = 'float-left'>
            <DropdownButton 
                className = {['mr-2 float-left', classes.dropdownButton].join(' ')} 
                title = {changeTitle} 
                size = 'sm' 
                variant = {changeColor}
            >
                <Dropdown.Item onClick = {() => clickHandler(globalVariables.CASES, globalVariables.DANGER)}>Cases</Dropdown.Item>
                <Dropdown.Item onClick = {() => clickHandler(globalVariables.DEATHS, globalVariables.DARK)}>Deaths</Dropdown.Item>
                <Dropdown.Item onClick = {() => clickHandler(globalVariables.RECOVERED, globalVariables.SUCCESS)}>Recovered</Dropdown.Item>
            </DropdownButton>
        </div>
    )

}

export default GraphDataButton
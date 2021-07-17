import React from 'react'
import { Button } from 'react-bootstrap'
import * as globalVariables from '../../../../globalVariables/globalVariables'
import classes from './GraphTypeButton.module.css'

const GraphTypeButton = props => {

    return (
        <div className = 'float-right'>
          <Button
            className = {classes.button}
            variant = 'outline-secondary mr-2' 
            size = 'sm'
            active = {props.graphType === globalVariables.VERTICAL_BAR ? true : null}
            onClick = {() => {props.changeGraph(globalVariables.VERTICAL_BAR)}}
          >Bar</Button>
          <Button 
            className = {classes.button}
            variant = 'outline-secondary' 
            size = 'sm'
            active = {props.graphType === globalVariables.LINE ? true : null}
            onClick = {() => {props.changeGraph(globalVariables.LINE)}}
          >Line</Button>
        </div>
    )
}

export default GraphTypeButton
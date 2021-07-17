import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Alert } from 'react-bootstrap'
import * as globalVariables from '../../../globalVariables/globalVariables'
import classes from './Graph.module.css'



const Graph = props => {
  let graph

  // configuring for VERTICAL BAR graph
  const horizontalConfig = {
    indexAxis : 'y',
    animation : false,
    maintainAspectRatio : false,
    scales : {
      xAxis : {
        ticks : {
          callback : function(value, index, values) {
            const str = value.toString()
            if (str.length > 6) {
              return value/1e6 + ' M' 
            } else if (str.length > 3) {
              return value/1e3 + ' K'
            } else {
              return value
            }
          }
        }
      }
    }
  }

  const config = {
    animation : false,
    maintainAspectRatio : false,
    scales : {
      yAxis : {
        ticks : {
          callback : function(value, index, values) {
            const str = value.toString()
            if (str.length > 6) {
              return value/1e6 + ' M' 
            } else if (str.length > 3) {
              return value/1e3 + ' K'
            } else {
              return value
            }
          }
        }
      }
    }
  }
  
  switch (props.graphType) {
    case globalVariables.HORIZONTAL_BAR: 
      graph = (
        <Bar
            data = {props.data}
            options = {horizontalConfig}
        />
      )
      break;

    case globalVariables.VERTICAL_BAR:
      graph = (
        <Bar 
          data = {props.data}
          options = {config}
        />
      )
      break;

    case 'LINE':
      graph = (
        <Line 
          data = {props.data}
          options = {config}
        />
      )
      break;

    default:
      return (
        <Alert variant = 'danger mx-auto'>Something is wrong</Alert>
      )
  }

  

    return (
        <div className = 'border border rounded p-4'>
          <div className = {classes.graphContainer}>
          {props.children}
            {graph}
          </div>
        </div>
    )
}

export default Graph
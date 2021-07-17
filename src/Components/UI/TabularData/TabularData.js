import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Badge, Image } from 'react-bootstrap'
import classes from './TabularData.module.css'

const TabularData = props => {

    // converting the numbers into readable format (seperating digits by commas)
    const cases = props.cases.toLocaleString()
    const deaths = props.deaths.toLocaleString()
    const recovered = props.recovered.toLocaleString()
    const active = props.active.toLocaleString()

    const sum = props.todayRecovered + props.todayDeaths
    const todayActive = props.todayCases - sum

    const dailyCases = props.todayCases.toLocaleString()
    const dailyDeaths = props.todayDeaths.toLocaleString()
    const dailyRecovered = props.todayRecovered.toLocaleString()
    const dailyActive = todayActive.toLocaleString()

    return (
        <tr>
            <td>{props.id+1}</td>
            <td className = {classes.nameContainer}>
                <Link to = {`${props.url}${props.title}`}>
                    {props.flag  
                        ? <Image className = {['float-left', classes.flag]} width = '40' height = '25' src = {props.flag}  />
                        : null
                    }
                    <Button variant = 'outline-secondary' className = {[classes.titleButton]} size = 'sm'>{props.title}</Button>    
                </Link>
            </td>
            <td>
                <p>{cases}</p> 
                <Badge variant = 'danger'>+{dailyCases}</Badge>   
            </td>
            <td>
                <p>{deaths}</p>
                <Badge variant = 'dark'>+{dailyDeaths}</Badge>
            </td>
            <td>
                <p>{recovered}</p>
                <Badge variant = 'success'>+{dailyRecovered}</Badge>
            </td>
            <td>
                <p>{active}</p>
                <Badge variant = 'primary'>{todayActive < 0 ? dailyActive : '+' + dailyActive}</Badge>
            </td>
        </tr>
    )
}

export default React.memo(TabularData)
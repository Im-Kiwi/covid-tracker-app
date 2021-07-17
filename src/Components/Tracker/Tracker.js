import React from 'react'
import WorldData from '../../Containers/WorldData/WorldData'
import ParticularData from '../../Containers/ParticularData/ParticularData'

const Tracker = props => {

    return (
        <div>
            <ParticularData />
            <WorldData />    
        </div>
    )
}

export default Tracker
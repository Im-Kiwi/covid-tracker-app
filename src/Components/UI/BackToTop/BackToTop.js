import React, { useState } from 'react'
import classes from './BackToTop.module.css'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

const BackToTop = () => {

    const [scrollPos, setScrollPos] = useState(0)

    // this hook is used to return the scroll position
    useScrollPosition(({ prevPos, currPos }) => {
        setScrollPos(currPos.y)
    })

    // this will restore the scroll position
    const backToTopHandler = () => {
        window.scrollTo(0,0)
    }

    let backToTop = (
        <button 
            className = {classes.backToTopContainer}
            onClick = {backToTopHandler}
        >
            <i className = {["fas fa-arrow-up text-light", classes.backToTop, ''].join(' ')}></i>
        </button>
    )

    return (
        <>
            {scrollPos !== 0 ? backToTop : null}       
        </>
    )
}

export default BackToTop
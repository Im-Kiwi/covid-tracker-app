import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {

    let year = new Date().getFullYear()

    return (
        <>
            <div className = {[classes.footer, 'mt-3 fixed-bottom'].join(' ')}>
                <div className = 'mt-3'>
                    <p className = {[classes.footerText, 'text-light'].join(' ')}>© {year}, By R.Rana (Kiwi)</p>
                </div>
            </div>
            <div className = {classes.extraSpace}></div>
        </>
    )
}

export default Footer
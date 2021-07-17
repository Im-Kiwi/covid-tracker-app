import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import classes from './Navigation.module.css'
import { withRouter } from 'react-router-dom'
import { virusTwo } from '../../ImageStore/ImageStore'
import { useLocation, useHistory } from 'react-router-dom'

const Navigation = props => {

    const { pathname } = useLocation()
    const { push } = useHistory()


    // these states will keep an eye on which navigation tabs are active
    const [globalActive, setGlobalActive] = useState(false)
    const [continentsActive, setContinentsActive] = useState(false)
    const [countriesActive, setCountriesActive] = useState(false)

    // sets conditions to activate and deactivate the navigation tabs
    useEffect(() => {
        if (pathname === '/global-stats' || pathname === '/') {
            setGlobalActive(true)
            setContinentsActive(false)
            setCountriesActive(false)
        } else if (pathname === '/continents-stats') {
            setContinentsActive(true)
            setGlobalActive(false)
            setCountriesActive(false)
        } else if (pathname === '/countries-stats') {
            setContinentsActive(false)
            setGlobalActive(false)
            setCountriesActive(true)
        } else {
            setGlobalActive(false)
            setContinentsActive(false)
            setCountriesActive(false)
        }
    }, [pathname])

    const clickHandler = () => {
        push('/')
    }

    return (
        <div className = ''>
            <Navbar className = {classes.navbar} variant = 'dark' expand= 'md' fixed = 'top'>
                <Navbar.Brand>
                    <button className = {classes.logoButton} onClick = {clickHandler}>
                        <Image className = {['d-inline', classes.logo].join(' ')} src = {virusTwo} alt = 'logo' width = '60' height = '60' />
                        <h3 className = {['d-inline text-light', classes.header].join(' ')}>vid Tracker</h3>
                    </button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls = 'navbarScroll' />
                <Navbar.Collapse id = 'navbarScroll' className = 'justify-content-end'>
                    <Nav className = {[''].join(' ')}>                        
                        <LinkContainer  to = '/global-stats' className = {['px-4 my-auto', classes.navContainer].join(' ')}>
                            <Nav.Link
                                active = {globalActive}
                                className = {classes.navItem}
                            >Global</Nav.Link>
                        </LinkContainer>
                        <LinkContainer className = 'px-4'  to = '/continents-stats'>
                            <Nav.Link 
                                active = {continentsActive}
                                className = {[classes.navItem].join(' ')}
                            >Continents</Nav.Link>
                        </LinkContainer>
                        <LinkContainer className = 'px-4'  to = '/countries-stats'>
                            <Nav.Link 
                                active = {countriesActive}
                                className = {[classes.navItem].join(' ')}
                            >Countries</Nav.Link>
                        </LinkContainer>
                    </Nav> 
                </Navbar.Collapse>
            </Navbar>
            <div className = {classes.extraSpace}></div>
        </div>
    )
}

export default withRouter(Navigation)
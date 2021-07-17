import React from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import BackToTop from '../UI/BackToTop/BackToTop'
import { Route } from 'react-router-dom'

const Layout = props => {

    return (
        <>  
            <Navigation />                
            <main>
                {props.children}
            </main>
            <Route path = '/'>
                <BackToTop />
            </Route>
            <Footer />
        </>
    )
}

export default Layout
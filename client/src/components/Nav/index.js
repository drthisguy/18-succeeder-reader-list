import React, {useState} from 'react'
import { Link, useLocation as location } from 'react-router-dom'
import { Collapse } from '../Grid'

export default function navBar() {

    let [navLinks, showNavLinks] = useState(false)

    const toggleNav = () => showNavLinks(navLinks = !navLinks)

    const { pathname } = location();

    return (
        <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
            <Link to='/' className={'navbar-brand'}>Succeeder Reader</Link>
            <button onClick={toggleNav} className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#target-collapse" >
            <span className="navbar-toggler-icon"></span>
            </button>
                

            <Collapse navState={navLinks} id={'target-collapse'}>
              <ul className="navbar-nav mr-auto">
                <li className={pathname === "/" ? "nav-item active" : "nav-item"}>
                    <Link to="/" className={'nav-link'}>
                        Search 
                    </Link>    
                </li>
                <li className={pathname === "/profiles" ? "nav-item active" : "nav-item"}>
                    <Link to="/saved" className={'nav-link'}>
                        Saved List
                    </Link>    
                </li>
              </ul>
            </Collapse>
        </nav>
    )
}

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../App'
import logo from '../images/logo.png'

const Navbar = () => {


    const loggedUserInfo = JSON.parse(localStorage.getItem('loggedUser'))
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    const clearStorage = () => {
        localStorage.removeItem("loggedUserInfo")
        localStorage.clear()
        setIsLoggedIn(false)
    }
    return (
        <Wrapper>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <Link to="/" className="nav-link d-flex align-items-center navbar-brand logo-text router-link-exact-active router-link-active" aria-current="page">
                            <img src={logo} alt="BD Railway" className="d-inline-block align-top" width="60" height="60" />&nbsp;<span className="d-none d-sm-block">Bangladesh Railway</span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                {
                                    isLoggedIn && <p className='nav-link'> Welcome,  <i>{loggedUserInfo[0].name}</i> </p>
                                }

                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/cancel-ticket">Cancel Ticket</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    isLoggedIn ? <Link to='/' className="nav-link" onClick={clearStorage}>Logout</Link> : <Link className="nav-link" to="/login">Login</Link>
                                }

                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </Wrapper>
    )
}

const Wrapper = styled.section`
button.navbar-toggler{
    border:0 !important;
}
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
    
    outline: none;
    box-shadow: none;
}



`
export default Navbar

import axios from 'axios'
import React, { useState,useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../App'


const Login = () => {
    const {isLoggedIn,setIsLoggedIn}  = useContext(UserContext)

    const info = JSON.parse(localStorage.getItem('route_info'))
    const history = useHistory()
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setUser(prevUser => {
            return {
                ...prevUser, [e.target.name]: e.target.value
            }
        })
    }

    const fetchUser = async (email, password) => {
        const res = await axios.get(`/users`, {
            params: {
                "email": email,
                "password": password
            }
        })
        const user = await res.data
        return user

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = user
        if (email !== '' && password !== '') {
            setAlert('')
            const loggedUser = await fetchUser(email, password)

            if (loggedUser.length > 0) {
                //logged in
                // console.log(loggedUser)
                setError('')
                localStorage.setItem('loggedUser',JSON.stringify(loggedUser))
                setIsLoggedIn(true)
                if(info){

                    history.push('/search-result')
                }
                else{
                    history.push('/')
                }
            }
            else {
                setError('Invalid Credentials!')
            }
            
        }
        else {
            setAlert('Please insert all required field')
        }


    }


    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-8 mx-auto py-4">
                    <h2>Login </h2>
                    {
                        alert && <h4 className='text-danger p-3'>{alert}</h4>
                       
                    }
                    {
                         error && <h4 className='text-danger p-3'>{error}</h4>
                    }
                    <form className='py-4' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">*Email address</label>
                            <input type="email" className="form-control" name='email' value={user.email} onChange={handleChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">*Password</label>
                            <input type="password" className="form-control" name='password' value={user.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login

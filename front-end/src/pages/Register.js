import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { base_url } from '../App'

const Register = () => {
    const history = useHistory()
   
    const [users, setUsers] = useState({
        name: '',
        address: '',
        email: '',
        password: '',
        mobile: '+880',
        gender: 'Male',
     

    })

    const [alert,setAlert] = useState('')

    const handleChange = (e) => {
        setUsers(prevUser => {
            return {
                ...prevUser, [e.target.name]: e.target.value
            }
        })
    }


    const sendUsers = async ()=>{
        
        const res = await axios.post(`${base_url}/users`,users)
        const data = await res.data
        // console.log(data)
        // setAlert(data)
        // localStorage.setItem('userInfo',JSON.stringify(users))
        // 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {name,email,password} = users
        if(name!=='' && email !=='' && password!==''){
            setAlert('')
            sendUsers()
            history.push('/login')
        }
        else{
            setAlert('Please insert all required field')
        }

    }

  
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-8 py-4 mx-auto">
                    <h2>Register </h2> 
                  {
                      alert && <h4 className='text-danger p-3'>{alert}</h4>
                  }
                    <form className='py-4' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">*Name</label>
                            <input type="text" className="form-control" name='name' value={users.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">*Address</label>
                            <input type="text" className="form-control" name='address' value={users.address} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">*Email address</label>
                            <input type="email" className="form-control" name='email' value={users.email} onChange={handleChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">*Password</label>
                            <input type="password" className="form-control" name='password' value={users.password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">*Mobile Number</label>
                            <input type="text" className="form-control" name='mobile' value={users.mobile} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Gender</label>
                            <select type="text" className="form-control" name='gender' value={users.gender} onChange={handleChange}>
                                <option value="" disabled>Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register

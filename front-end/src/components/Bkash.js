
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { base_url } from '../App'

const Bkash = ({ location }) => {
    const loggedUserInfo = JSON.parse(localStorage.getItem('loggedUser'))
    const info = JSON.parse(localStorage.getItem('route_info'))
    const total = location.state
    const [bkash, setBkash] = useState('')
    const [ticketId, setTicketId] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        sendTicketInfo()

    }


    const sendTicketInfo = async () => {
        //send ticket with ticket id and these information
        const res = await fetch(`${base_url}/purchase`, {
            method: 'POST',
            body: JSON.stringify({
                bkash,
                amount: total,
                date: info.date,
                user: loggedUserInfo[0]._id
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        
        setTicketId(data)
    }

    if (ticketId !== '') {
        return <div className='container'>
            <div className="row p-4">
                <div className="col-md-10 mx-auto text-center">
                    <h3><i className="fas fa-check-circle"></i> Purchase successful  </h3>
                    Your ticket id <h3>{ticketId}</h3>
                    <p> You can cancel your ticket within 24 hrs with this Id</p>
                </div>
            </div>
        </div>
    }
    else {

        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="form-group py-2 my-4">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name='bkash' value={bkash} onChange={(e) => setBkash(e.target.value)} placeholder='Enter Bkash Number...' className="form-control mb-3" />
                                <input type="text" placeholder='Enter password...' className="form-control" />
                                <div className="text-center">
                                    <input type="submit" className='btn my-2' value="Submit" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bkash

import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { base_url, fetchTicketInfo, UserContext } from '../App'


const CancelTicket = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

    const info = JSON.parse(localStorage.getItem('route_info'))
    const history = useHistory()
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('')
    const [cancel, setCancel] = useState(false)
    const [ticketInfo, setTicketInfo] = useState([])
    const [cancelInfo, setCancelInfo] = useState({
        ticketId: '',
        bkash: ''
    })
    const handleChange = (e) => {
        setCancelInfo(prevInfo => {
            return {
                ...prevInfo, [e.target.name]: e.target.value
            }
        })
    }

    const fetchTicketInfo = async (ticketId, bkash) => {
        const res = await axios.get(`${base_url}/purchase`, {
            params: {
                "ticketId": ticketId,
                "bkash": bkash
            }
        })
        const cancelInfo = await res.data
        return cancelInfo

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { ticketId, bkash } = cancelInfo
        if (ticketId !== '' && bkash !== '') {
            setAlert('')

            const info = await fetchTicketInfo(ticketId, bkash)

            if (info.length > 0) {
                //logged in
                // console.log(info)
                setError('')
                setTicketInfo(info)
                // if(info){

                //     history.push('/search-result')
                // }
                // else{
                //     history.push('/')
                // }
            }
            else {
                setError('Invalid information!')
            }

        }
        else {
            setAlert('Please insert all required field')
        }


    }

if(cancel){
    return <div className='container'>
        <div className="row">
            <div className="col-md-8 mx-auto text-center my-auto">
                <h2>Your ticket is successfully cancelled !</h2>
                
            </div>
        </div>
    </div>
    
}

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 mx-auto py-4">
                    <h2>Cancel Ticket </h2>
                    {
                        alert && <h4 className='text-danger p-3'>{alert}</h4>

                    }
                    {
                        error && <h4 className='text-danger p-3'>{error}</h4>
                    }
                    <form className='py-4' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">*Ticket Id</label>
                            <input type="text" className="form-control" name='ticketId' value={cancelInfo.ticketId} onChange={handleChange} />
                            <div id="emailHelp" className="form-text">We'll never share your ticketId with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">*Bkash Number</label>
                            <input type="text" className="form-control" name='bkash' value={cancelInfo.bkash} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-md-4 mx-auto py-4">
                    {
                        ticketInfo.map(t => {
                            return (
                                <>
                                    <h3>Your Information</h3>
                                    <p>Id : <strong>{t._id}</strong></p>
                                    <p>Amount : <strong>{t.amount}</strong> BDT</p>
                                    <p>bKash No: <strong>{t.bkash}</strong></p>
                                    <p>Purchased On : <strong>{t.date}</strong></p>
                                    <p>Deduced amount : <strong>{t.amount * 0.1}</strong> BDT</p>
                                    <hr />
                                    <strong>You will receive {t.amount - t.amount * 0.1}</strong> BDT
                                    <button onClick={()=>setCancel(true)} className="btn my-3">cancel now</button>
                                </>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default CancelTicket

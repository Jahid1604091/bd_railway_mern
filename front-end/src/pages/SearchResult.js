import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import axios from 'axios'
import { base_url, calculatePrice, UserContext } from '../App'
import { Link } from 'react-router-dom'
const qs = require('querystring')

const SearchResult = () => {
    const history = useHistory()
    const loggedUserInfo = JSON.parse(localStorage.getItem('loggedUser'))
    const { isLoggedIn } = useContext(UserContext)
    const info = JSON.parse(localStorage.getItem('route_info'))
    // console.log(info)
    const [availableTrains, setAvailableTrains] = useState([])


    const fetchByStation = async () => {
        const res = await axios.get(`${base_url}/search-by-station`, {
            params: {
                "from": info.from,
                "to": info.to
            }
        })
        const trainList = await res.data
        setAvailableTrains(trainList)

    }

    // let arrayOfTrainNo = availableTrains.map(a => a.train_no);



    useEffect(() => {
        fetchByStation()

    }, [])


    // console.log(info,availableTrains)

if(!isLoggedIn){
    history.push('/login')
}
   
        return (
            <Wrapper>

                <div className='container'>
                    <div className="row">

                        <h3 className='py-2'>Search Result</h3>
                        <div className='py-4'>
                            {
                                availableTrains.map(t => {
                                    return <div key={t.train_no} className='shadow p-4 my-2 trainlist d-lg-flex justify-content-around'>
                                        <strong>Train: {t.train_no}</strong>
                                        <div>
                                            <p> <strong>From</strong>: <i> {t.departure_station}</i></p>
                                            <p className='fw-bold'> Departure : {t.departure_time}</p>

                                        </div>
                                        <div>
                                            <p> <strong>To</strong>: <i> {t.arrival_station}</i></p>
                                            <p className='fw-bold'> Arrival(approx.): {t.arrival_time}</p>

                                        </div>
                                        <div>
                                            <p><small> Journey date:  {info.date}</small></p>
                                            <p>Duration: 8 hour</p>
                                        </div>
                                        <div>
                                            <p>Amount: BDT <strong>{calculatePrice(info, t.fare)}</strong></p>
                                            <small> Included all charges.</small>
                                        </div>
                                        <div className='my-auto'>

                                            <Link to={{
                                                pathname: '/purchase-ticket',
                                                state: calculatePrice(info, t.fare)
                                            }} className="btn" >purchase</Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </div>
            </Wrapper>
        )
    
}

const Wrapper = styled.section`
.trainlist{
    line-height:20px;
    .btn{
        max-height:40px;
        
    }
}
`
export default SearchResult

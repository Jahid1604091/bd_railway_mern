import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import img from '../images/banner.jpg'
import { useHistory } from 'react-router-dom'


const Home = () => {

    const history = useHistory()
  
    const [districts, setDistricts] = useState([])
    const [routeInfo, setRouteInfo] = useState({
        from: 'Dhaka',
        to: 'Chattogram',
        date: '',
        class: 'Shovon',
        adult: 1,
        infant: 0
    })

    const fetchAllDistrict = async () => {
        const response = await fetch(
            'https://bdapis.herokuapp.com/api/v1.1/districts',
        );
        const data = await response.json(); // Here you have the data that you need
        setDistricts(data.data)
    }

    useEffect(() => {
        fetchAllDistrict()

    }, [])


    const handleChange = (e) => {
        setRouteInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('route_info', JSON.stringify(routeInfo));
        history.push('/search-result')

    }

    return (
        <Wrapper>
            <div className='container'>
                <div className="row">
                    <div className="col-md-5 my-auto">
                        <h2 className='text-center text-light fw-bold'>
                            Welcome to
                            Bangladesh Railway
                            E-Ticketing Service
                        </h2>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <section className='bg-secondary mb-3 p-4 text-light'>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Route</label>
                                    <select name='from' value={routeInfo.from} onChange={handleChange} className="form-select" id="inputGroupSelect01">
                                        <option disabled>From...</option>

                                        {
                                            districts.map((d) => {
                                                return <option key={d._id} value={d.district}>{d.district}</option>
                                            })
                                        }
                                    </select>

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">&nbsp;</label>
                                    <select name='to' value={routeInfo.to} onChange={handleChange} className="form-select" id="inputGroupSelect01">
                                        <option disabled>To...</option>

                                        {
                                            districts.map((d) => {
                                                return <option key={d._id} value={d.district}>{d.district}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Date</label>
                                    <input name='date' value={routeInfo.date} onChange={handleChange} type="date" className="form-control" id="inputEmail4" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">Class</label>
                                    <select name='class' value={routeInfo.className} onChange={handleChange} className="form-select" id="inputGroupSelect01">
                                        <option disabled>Choose...</option>
                                        <option value="1">Shovon</option>
                                        <option value="2">Shovon Chair</option>
                                        <option value="3">AC</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Passenger(s)</label>
                                    <select name='adult' value={routeInfo.adult} onChange={handleChange} className="form-select" id="inputGroupSelect01">
                                        <option disabled>Adult...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">&nbsp;</label>
                                    <select name='infant' value={routeInfo.infant} onChange={handleChange} className="form-select" id="inputGroupSelect01">
                                        <option disabled>Infant...</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                                <div className="d-grid gap-2">
                                    <input type="submit" className='btn' value="find" />
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.article`
    padding:30px 0;
    background-image: url(${img});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    
    position: relative;
    z-index: 0;
    &:before {
        background: rgba(0, 0, 0, 0.3);
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
    }

    h2{
        line-height:45px;
    }
`

export default Home

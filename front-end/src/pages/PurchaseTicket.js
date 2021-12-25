import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../App'


const PurchaseTicket = (props) => {
    const history = useHistory()
    const loggedUserInfo = JSON.parse(localStorage.getItem('loggedUser'))
    const {isLoggedIn}  = useContext(UserContext)
    const total = props.location.state
    const vat = total * 0.02
    const serviceCharge = 20
    const grandTotal = total + vat + serviceCharge
    const info = JSON.parse(localStorage.getItem('route_info'))

    if(!isLoggedIn){
        history.push('/login')
    }
    else{
     
        return (
            <div className='container'>
                <div className="row">
                    <h3 className="text-light bg-secondary p-3">Passenger Details</h3>
                    <div className="col-md-6">
                        <p><strong>Name :</strong>{loggedUserInfo[0].name}</p>
                        <p><strong>Email :</strong>{loggedUserInfo[0].email}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Address :</strong>{loggedUserInfo[0].address}</p>
                        <p><strong>Mobile :</strong>{loggedUserInfo[0].mobile}</p>
                    </div>
                </div>
                <div className="row">
                    <h3 className="text-light bg-secondary p-3">Ticket Details</h3>
                    <div className="col-md-6">
                        <p><strong>Adult : </strong> {info.adult ? info.adult : "0"}</p>
                        <p><strong>Children : </strong> {info.infant ? info.infant : "0"}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Fare : </strong>BDT {total.toFixed(2)}</p>
                        <p><strong>Service Charge : </strong>BDT {serviceCharge.toFixed(2)}</p>
                        <p><strong>Vat : </strong>BDT {vat.toFixed(2)}</p>
                        <p><strong>Total : BDT {grandTotal.toFixed(2)}</strong></p>
                    </div>
                </div>
                <div className="row">
                    <h3 className="text-light bg-secondary p-3">Review the Rules &amp; Restrictions</h3>
                    <div className="col-md-6">
                      <ul className='rules'>
                          <li> Terms &amp; Conditions are applicable</li>
                          <li> Tickets are nontransferable and name changes are not allowed.</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-group py-2 text-center">
                            <Link to='/search-result' className='btn'>back</Link>
                            <Link to={{
                                pathname:'/payment',
                                state:grandTotal
                            }} className='btn'>buy ticket</Link>
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }
}

const Wrapper = styled.section`
    ul.rules{
        list-style-type: square !important;
    }
`

export default PurchaseTicket

import React from 'react'
import dbbl from '../images/dbbl.jpg'
import visa from '../images/visa.png'
import rocket from '../images/rocket.png'
import bkash from '../images/bkash.jpg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Payment = ({ location }) => {
    const total = location.state
    return (
        <Wrapper>
            <div className='container'>
                <div className="row py-4">
                    <div className="col-md-8 my-auto text-center mx-auto">
                        <h3>Total Amount {total.toFixed(2)} BDT</h3>
                        <hr />
                        <h4>Select a Payment Method</h4>
                        <div className="col-md-4 offset-md-4 py-4 text-center">
                            <div className="row">
                                
                                <div className="col-xs-2">
                                    <Link to={{
                                        pathname:'/payment/bkash',
                                        state:total
                                    }}><img src={bkash} alt="bKash Mobile Banking" className=" img-fluidrounded mx-auto d-block" /></Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    img{
        width:200px;
        height:200px;
    }

`

export default Payment

import React from 'react'
import { useHistory } from 'react-router'

const Logout = () => {
   const history = useHistory()
    localStorage.clear()
    console.log('clicked')
    history.push('/')
    return (
        <div>
            
        </div>
    )
}

export default Logout

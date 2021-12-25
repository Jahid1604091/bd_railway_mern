import { createContext, React, useContext, useEffect, useState } from 'react'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from "./pages/About";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PurchaseTicket from "./pages/PurchaseTicket";
import CancelTicket from "./pages/CancelTicket";
import SearchResult from './pages/SearchResult';
import Payment from './pages/Payment';
import Bkash from './components/Bkash';

import Logout from './components/Logout';


export const base_url = 'http://localhost:5000'




//calculate price
export const calculatePrice = (info, fare) => {
  let total = 0
  let unitPrice = Number(fare)
  const adult = info.adult && Number(info.adult)
  const infant = info.infant && Number(info.infant)
  const infantPrice = unitPrice * 0.6
  total = (adult * unitPrice) + (infant * infantPrice)
  // const totalPassengers = adult + infant
  // console.log(unitPrice)
  return total
}

export const UserContext = createContext()

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)



  return (
    <BrowserRouter>
      <UserContext.Provider value={{
          isLoggedIn,setIsLoggedIn
      }}>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/about' exact component={About} />
        <Route path='/login' exact component={Login} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/register' exact component={Register} />
        <Route path='/purchase-ticket' exact component={PurchaseTicket} />
        <Route path='/search-result' exact component={SearchResult} />
        <Route path='/cancel-ticket' exact component={CancelTicket} />
        <Route path='/payment' exact component={Payment} />
        <Route path='/payment/bkash' exact component={Bkash} />
       
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;

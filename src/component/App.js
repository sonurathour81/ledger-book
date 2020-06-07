import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Login from './login/index'
import SignUp from './signup/index'
import TopBar from './topBar/index'
import {NotFound} from './notFound/index'
import { Home } from './home/index'
import AddUser from './addUser/index';
import CustomersList from './customersList/index';
import { CustomerAccount } from './customerAccount/index'
import { SelectedCustomerAccount } from './selectedCustomerAccount/index'
import { UserProfile } from './userProfile/index'
const App = (props) => {
  const mapState = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const [getToken, setGetToken] = useState('')
  const [clickedCustomer, setClickedCustomer] = useState('')

  useEffect(()=>{
    setClickedCustomer(JSON.parse(localStorage.getItem("Clicked_User_Data")) || [])
    const getToken = localStorage.getItem("Token") || '';
    setGetToken(getToken)
  }, [mapState])


  return (
    <div className="App">
      <ToastContainer autoClose={2000}/>

      <Router>
        <TopBar />
        <div>
          <Switch>
            {
              getToken ? 
              <div>
                <Route exact path="/" component={CustomersList} />
                <Route exact path="/customerAccount" component={CustomerAccount} />
                <Route exact path={`/customerAccount/${clickedCustomer.customerId}`} component={SelectedCustomerAccount} />
                <Route exact path={`/userProfile`} component={UserProfile} />
              </div>
              :
              <div>
                <Route exact path="/" component={Login} /> 
                <Route exact path="/signup" ><SignUp /></Route>
              </div>
            }
            <Route exact component={NotFound} />  
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;

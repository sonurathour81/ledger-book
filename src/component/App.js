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
import UsersTable from './usersTable/index';
import { UserAccount } from './userAccount/index'
import { SelectedUserAccount } from './selectedUserAccount/index'
const App = () => {

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
      <ToastContainer autoClose={5000}/>

      <Router>
        <TopBar />
        <div>
          <Switch>
            {
              getToken ? 
              <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/addUser" component={AddUser} />
                <Route exact path="/usersTable" component={UsersTable} />
                <Route exact path="/userAccount" component={UserAccount} />
                <Route exact path={`/userAccount/${clickedCustomer.customerId}`} component={SelectedUserAccount} />
              </div>
              :
              <div>
                <Route exact path="/" component={Home} /> 
                <Route exact path="/login" component={Login} />
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

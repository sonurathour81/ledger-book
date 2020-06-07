import React, { useState, useEffect } from 'react'
import { Field, formInputData, formValidation } from 'reactjs-input-validator';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import  { Redirect,Link } from 'react-router-dom'


import * as fun from '../../redux/actions/index'
import * as styl from '../../style'
import * as stylCls from './style'


const Login = (props) => {

  const mapState = useSelector(state => state.userData);
  const dispatch = useDispatch();
  
  
  const [data, setData] = useState({})
  const [shouldValidateInputs, setShouldValidateInputs] = useState('')
  
  const handleChange = (event, inputValue, inputName, validationState, isRequired) => {
    
    const value = (event && event.target.value) || inputValue;
    data[inputName] = { value, validation: validationState, isRequired };
    setData({...data})
  }
  
  useEffect(()=>{
    dispatch(fun.displayDataInitial())
    
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = formValidation(data);
    
    if (isFormValid) {
      const logData = formInputData(data)
      const objectLenght = Object.keys(mapState.userSignUpData).length;

			const checkArry = objectLenght > 0 ? _.map(mapState.userSignUpData, (val, key) => {
				return {...val, key: key}
			}) : (alert("You have no Account!"))

			const xyz = objectLenght > 0 && checkArry.filter((val,key) => {
				if(val.email === logData.email && val.password === logData.password){
					return val
				}
			})
      
      if(xyz !== false){
        if(xyz.length !== 0){
          localStorage.setItem("LogedUser",JSON.stringify(xyz));
          localStorage.setItem("Token", Date.now());
          const getlogiedItem =  JSON.parse(localStorage.getItem("LogedUser"))
          dispatch(fun.logedInData(getlogiedItem))
          dispatch(fun.tokenLogin({"Token": Date.now()}))
          return props.history.push('/');
        } else {
          alert("Credential is wrong! Please try again")
        }
      }

    } else {
      setShouldValidateInputs(!isFormValid)
    }
  }

    return(
      <styl.ManForm>
        <styl.ManFormSec>
          <styl.Header>
            SignIn
          </styl.Header>
          <form class="ui form" >
            <stylCls.CustmFormField className="field">
              <Field
                validator="isEmail"
                required
                label="Email"
                name="email"
                placeholder="Example@gmail.com"
                onChange={handleChange}
                value={data.email}
                shouldValidateInputs={shouldValidateInputs}
              />
            </stylCls.CustmFormField>
            <stylCls.CustmFormField>
              <Field
                type="password"
                required
                label="Password"
                name="password"
                placeholder="*********"
                onChange={handleChange}
                value={data.password}
                shouldValidateInputs={shouldValidateInputs}
              />            
            </stylCls.CustmFormField>

            <stylCls.CustmButton>
              <button class="positive ui button" type="submit" onClick={handleSubmit} >Login</button>
            </stylCls.CustmButton>
            <p className="clickableBtn">
              <Link to="/signup">Click here to SignUp!</Link>
            </p>
          </form>
        </styl.ManFormSec>
      </styl.ManForm>
    )
}

export default Login;
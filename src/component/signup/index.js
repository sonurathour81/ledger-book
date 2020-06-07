import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import  { Redirect,Link } from 'react-router-dom'

import { Field, formInputData, formValidation } from 'reactjs-input-validator';

import * as styl from '../../style'
import * as stylCls from './style'

import './style.css';
import * as fun from '../../redux/actions/index'
import Login from '../login';


const SignUp = (props) => {


	const [signUpState, setSignUpState] = useState({});
	const [shouldValidateInputs, setShouldValidateInputs] = useState('')

	const fieldHandle = (event, inputValue, inputName, validationState, isRequired) => {
		const value = (event && event.target.value) || inputValue;
		signUpState[inputName] = { value, validation: validationState, isRequired };
		setSignUpState({...signUpState})

	}
	const [storeType, setStoreType] = useState('')

	useEffect(()=>{
		dispatch(fun.displayDataInitial())

	}, [])

	
    const mapState = useSelector(state => state.userData);
	const dispatch = useDispatch();
	
	


	const submitForm = (e) => {
		e.preventDefault();
		const isFormValid = formValidation(signUpState);
		const inputValue = formInputData(signUpState)
		const newObj = {...inputValue, "storeType": storeType}
		
		if (isFormValid) {

			const objectLenght = Object.keys(mapState.userSignUpData).length; 
			const checkArry = objectLenght > 0 ? _.map(mapState.userSignUpData, (val, key) => {
				return val
			}) : (dispatch(fun.initialSignUp(newObj)), alert("Account Created Successfully ! You Can Login"))

			const xyz = objectLenght > 0 && checkArry.filter((val) => {
				if(val.email === newObj.email){
					return val
				}
			})
			
			if(objectLenght !== 0){
				if(xyz.length !== 0){
					alert("This email is already registred ! Please try another ")
				} else {
					dispatch(fun.initialSignUp(newObj))
					alert("Account Created Successfully ! You Can Login")
					// return(props.history.push('/login'))
					// return  <Redirect to='/login'></Redirect>

				}
			}
	
			// window.location.reload();
		} else {
			setShouldValidateInputs(!isFormValid)
		}
	}
	
	

	const passwordValue = signUpState.password && signUpState.password.value;
    return(
      <styl.ManForm>
        <styl.ManFormSec className="withIncres">
          <styl.Header>
            SignUp
          </styl.Header>
          <form className="ui form" onSubmit={submitForm}>
			<div className="two fields">
				<stylCls.CustmFormField className="field">
					<Field
						validator="isAlphanumeric"
						required
						label="First Name"
						name="first_name"
						placeholder="First Name"
						onChange={fieldHandle}
						value={signUpState.first_name}
						shouldValidateInputs={shouldValidateInputs}
					/>
				</stylCls.CustmFormField>
				<stylCls.CustmFormField className="field">
					<Field
						validator="isAlphanumeric"
						required
						label="Last Name"
						name="last_name"
						placeholder="Last Name"
						onChange={fieldHandle}
						value={signUpState.last_name}
						shouldValidateInputs={shouldValidateInputs}
					/>
				</stylCls.CustmFormField>
			</div>
			<div className="two fields">
				<stylCls.CustmFormField className="field">
					<Field
						validator="isAlphanumeric"
						required
						label="Store Name"
						name="store_name"
						placeholder="Store Name"
						onChange={fieldHandle}
						value={signUpState.store_name}
						shouldValidateInputs={shouldValidateInputs}
					/>
				</stylCls.CustmFormField>
				<stylCls.CustmFormField className="field">
					<label>Type of Store</label>
					<select 
						class="ui dropdown" 
						required
						name="store_type"
						onChange={(e) => setStoreType(e.target.value)}
						value={storeType}
					>
						<option value="">Select Type</option>
						<option value="kirana">Kirana Store</option>
						<option value="electronic">Electronic</option>
						<option value="hotel">Hotel</option>
						<option value="bicycle">Bicycle</option>
					</select>
				</stylCls.CustmFormField>             
			</div>
			<div className="two fields">
				<stylCls.CustmFormField className="field">
					<Field
						validator="isEmail"
						required
						label="Email"
						name="email"
						placeholder="Example@yopmail.com"
						onChange={fieldHandle}
						value={signUpState.email}
						shouldValidateInputs={shouldValidateInputs}
					/>
				</stylCls.CustmFormField>
				<stylCls.CustmFormField className="field">
					<Field
						maxLength={10}
						minLength={10}
						validator="isNumeric"
						required
						placeholder="Phone Number"
						label="Phone Number"
						name="phone"
						onChange={fieldHandle}
						value={signUpState.phone}
						shouldValidateInputs={shouldValidateInputs}
						minLengthErrMsg="Invalid Phone"
					/>
				</stylCls.CustmFormField>
			</div>	
			<div className="two fields">
				<stylCls.CustmFormField className="field">
					<Field
						validator="isAlphanumeric" minLength={8}
						minLengthErrMsg="Short passwords are easy to guess. Try one with atleast 8 characters"
						required
						type="password"
						label="Password"
						name="password"
						placeholder="********"
						onChange={fieldHandle}
						value={signUpState.password}
						shouldValidateInputs={shouldValidateInputs}
					/>
				</stylCls.CustmFormField>
				<stylCls.CustmFormField className="field">
					<Field
						validator="equals"
						comparison={passwordValue}
						validatorErrMsg="These passwords don't match. Try again?"
						required
						type="password"
						label="Confirm Password"
						name="confirm_password"
						placeholder="********"
						onChange={fieldHandle}
						value={signUpState.confirm_password}
						shouldValidateInputs={shouldValidateInputs}
					/>
				</stylCls.CustmFormField>
			</div>
			<stylCls.CustmButton>
				<button 
					className="positive ui button" 
					type="submit"
				>
					SignUp
				</button>
			</stylCls.CustmButton>
			<p className="clickableBtn">
				<Link to="/login">Click here to SignIn!</Link>
			</p>
          </form>
        </styl.ManFormSec>
      </styl.ManForm>
    )
}

export default SignUp;
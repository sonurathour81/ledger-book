import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import  { Redirect,Link } from 'react-router-dom'

import { Field, formInputData, formValidation } from 'reactjs-input-validator';

import * as styl from '../../style'
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
		
	const [ dobDate, setDobDate ] = useState('')
	const DobFun = date => {
		setDobDate(date)
	};

	useEffect(()=>{
		dispatch(fun.displayDataInitial())

	}, [])

	
    const mapState = useSelector(state => state.userData);
	const dispatch = useDispatch();
	
	


	const submitForm = (e) => {
		e.preventDefault();
		var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'agu', 'sep', 'oct', 'nov', 'dec'];
		var day = dobDate.getDate();
		var year = dobDate.getFullYear();
		var month = months[dobDate.getMonth()];
		const fullDate = `${day}/${month}/${year}`;

		const isFormValid = formValidation(signUpState);
		const inputValue = formInputData(signUpState)
		const newObj = {...inputValue, "dateOfBirth": fullDate}
		
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
        <styl.ManFormSec>
          <styl.Header>
			  {props.check}
            SignUp
          </styl.Header>
          <form className="ui form" onSubmit={submitForm}>
			<div>
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
			</div>
			<div>
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
			</div>
			<div>
				<Field
					validator="isEmail"
					required
					label="Email"
					name="email"
					placeholder="Example@gmail.com"
					onChange={fieldHandle}
					value={signUpState.email}
					shouldValidateInputs={shouldValidateInputs}
				/>
			</div>
			<div className="field datefield">
				<label>Date of Birth</label>
				<DatePicker
					required
					selected= { dobDate }
					onChange={ DobFun }
					placeholderText = "mm/dd/yyyy"
					dateFormat = "MM/dd/yyyy"
				/>
			</div>
			<div>
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
			</div>
			<div>
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
			</div>
			<styl.Button>
				<button 
					className="positive ui button" 
					type="submit"
				>
					SignUp
				</button>
			</styl.Button>
			<p className="clickableBtn">
				<Link to="/login">Click here to SignIn!</Link>
			</p>
          </form>
        </styl.ManFormSec>
      </styl.ManForm>
    )
}

export default SignUp;
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';

import { Field, formInputData, formValidation } from 'reactjs-input-validator';

import * as styl from '../../style'
import './style.css';
import * as fun from '../../redux/actions/index'
import { ConfirmationModal } from '../confirmationModal';


const AddUser = (props) => {

    const mapState = useSelector(state => state);
    const dispatch = useDispatch();
	const [customerState, setCustomerState] = useState({});
	const [shouldValidateInputs, setShouldValidateInputs] = useState('')
    
	const fieldHandle = (event, inputValue, inputName, validationState, isRequired) => {
        const value = (event && event.target.value) || inputValue;
		customerState[inputName] = { value, validation: validationState, isRequired };
		setCustomerState({...customerState})
        
	}
    
    
    const [logedId, setLogedId] = useState('')
    useEffect(()=>{
        const logedData = JSON.parse(localStorage.getItem("LogedUser"))
        logedData && logedData.map((val) => {
            setLogedId(val.key)
        })
    }, [])
    
    useEffect(()=>{
        dispatch(fun.displayCustomerDataInitial(logedId))
        dispatch(fun.displayDataInitial())
    }, [logedId])
    

    const [showModal,setShowModal] = useState(false)
    const [text, setText] = useState('')

    const confirmOpen = (status) => {
        setShowModal(true)
        if(status === "email_phone"){
            setText('This user are registred already! Please use another Email Id and Phone Number!')
        }else if(status === "email"){
            setText('This Email Id is registred already! Please use another Email Id!')
        }else if(status === 'phone'){
            setText('This Phone Number is registred already! Please use another Phone Number!')
        }else if(status === 'success'){
            setText(`User Added Successfully! You can go on user's list`)
        }
    }
	
    const hideModal = () => {
        setShowModal(false)
    }

    const submitForm = (e) => {
        e.preventDefault();
        
        const isFormValid = formValidation(customerState);
        const inputValue = formInputData(customerState)
        const tempObj = {...inputValue, logedUserId: logedId }
        
		if (isFormValid) {
            
            const objectLenght = Object.keys(mapState.customerData.customer).length; 
			const checkArry = objectLenght > 0 ? _.map(mapState.customerData.customer, (val, key) => {
				return val
			}) : (dispatch(fun.initialCustomerAdd(tempObj)),confirmOpen("success"))

			const xyz = objectLenght > 0 && checkArry.filter((val) => {
				if(val.cust_email === tempObj.cust_email && val.cust_phone === tempObj.cust_phone){
                    confirmOpen("email_phone")
					return val
				} else if(val.cust_email === tempObj.cust_email){
                    confirmOpen("email")
                    return val
                } else if(val.cust_phone === tempObj.cust_phone){
                    confirmOpen("phone")
                    return val
                }
			})
			
			if(objectLenght !== 0){
				if(xyz.length === 0){
                    dispatch(fun.initialCustomerAdd(tempObj))
                    confirmOpen("success")
				}
			}
	
		} else {
			setShouldValidateInputs(!isFormValid)
        }  
	}


    return(
      <div>
        <styl.ManForm>
            <styl.ManFormSec>
                <styl.Header>
                    Add Customer
                </styl.Header>
                <form className="ui form" onSubmit={submitForm}>
                    <div>
                        <Field
                            validator="isAlpha"
                            required
                            label="Customer Name"
                            name="cust_name"
                            placeholder="Customer Name"
                            onChange={fieldHandle}
                            value={customerState.cust_name}
                            shouldValidateInputs={shouldValidateInputs}
                        />
                    </div>
                    <div>
                        <Field
                            validator="isEmail"
                            required
                            label="Customer Email"
                            name="cust_email"
                            placeholder="Example@gmail.com"
                            onChange={fieldHandle}
                            value={customerState.cust_email}
                            shouldValidateInputs={shouldValidateInputs}
                        />
                    </div>
                    <div>
                        <Field
                            validator="isNumeric"
                            maxLength={10}
                            minLength={10}
                            required
                            label="Customer Phone"
                            name="cust_phone"
                            placeholder="Customer Phone"
                            onChange={fieldHandle}
                            value={customerState.cust_phone}
                            shouldValidateInputs={shouldValidateInputs}
                        />
                    </div>
                    <div>
                        <Field
                            validator="isAlpha"
                            requiredErrMsg="Enter your city"
                            required
                            label="Customer City"
                            name="cust_city"
                            placeholder="Customer City"
                            onChange={fieldHandle}
                            value={customerState.cust_city}
                            shouldValidateInputs={shouldValidateInputs}
                        />
                    </div>
                    <div>
                        <Field
                            validator="isAlphanumeric"
                            requiredErrMsg="Enter your street"
                            required
                            label="Customer Street"
                            name="cust_street"
                            placeholder="Customer Street"
                            onChange={fieldHandle}
                            value={customerState.cust_street}
                            shouldValidateInputs={shouldValidateInputs}
                        />
                    </div>
                    <div>
                        <Field
                            validator="isNumeric"
                            maxLength={6}
                            minLength={6}
                            required
                            label="Customer Zip Code"
                            name="cust_zip"
                            placeholder="Customer Zip Code"
                            onChange={fieldHandle}
                            value={customerState.cust_zip}
                            shouldValidateInputs={shouldValidateInputs}
                        />
                    </div>
                    <styl.Button>
                        <button 
                            className="positive ui button" 
                            type="submit"
                            disabled = {!formValidation(customerState) && 'disabled'}
                        >
                            Add Customer
                        </button>
                    </styl.Button>
                </form>
            </styl.ManFormSec>
        </styl.ManForm>
        <ConfirmationModal 
            showModal = {showModal}
            hideModal = {hideModal}
            text = {text}
        />
      </div>
    )
}

export default AddUser;
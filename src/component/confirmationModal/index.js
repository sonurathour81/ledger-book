import React,{useState, useEffect} from 'react';
import { Field, formInputData, formValidation } from 'reactjs-input-validator';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'

import { Modal } from 'react-bootstrap';

import {TextConfim,CustmButton,CustmHeader,ShowHideToggle, CustmFormField} from './style.js'
import * as fun from '../../redux/actions/index'

import "./style.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ConfirmationModal = (props) =>{
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();

    const [fixedValue, setFixedValue] = useState('')
    useEffect(()=>{
        setFixedValue(...JSON.parse(localStorage.getItem("LogedUser")) || '')
    },[mapState])

    const [changePasswordStates, setChangePasswordStates] = useState({});

	const fieldHandle = (event, inputValue, inputName, validationState, isRequired) => {
		const value = (event && event.target.value) || inputValue;
		changePasswordStates[inputName] = { value, validation: validationState, isRequired };
		setChangePasswordStates({...changePasswordStates})
    }
    const submitForm = (e) => {
        e.preventDefault();
		const isFormValid = formValidation(changePasswordStates);
		const inputValue = formInputData(changePasswordStates)

        if(inputValue.old_pass !== inputValue.password && isFormValid){
            const temp = {...fixedValue, password:inputValue.password,confirm_password:inputValue.confirm_password}
            dispatch(fun.initialChangePasswordUser(temp))
            props.hideModal()
            toast.success("Change Password Successfully!")
            setChangePasswordStates({})
        }else if(inputValue.old_pass === inputValue.password){
            alert("Old Password & New Password can't same!")
        }
    }
    
    const [toggle, setToggle] = useState(false)
    useEffect(()=>{
        setToggle(false)
    },[mapState])
    const passwordValue = changePasswordStates.password && changePasswordStates.password.value;

    return(
        <div>
            <Modal show={props.showModal} onHide={props.hideModal}>
                <CustmHeader>
                    <Modal.Header>
                        <Modal.Title>{props.changePass ? "Change Password" : "Confirmation"}</Modal.Title>
                    </Modal.Header>
                </CustmHeader>
                <Modal.Body>
                    <div>
                        {
                            !props.changePass &&
                            <TextConfim>
                                {props.text}
                            </TextConfim>
                        }
                        {
                            props.changePass &&
                            <form className="ui form" onSubmit={(e)=>submitForm(e)}>
                                <CustmFormField className="field">
                                    <ShowHideToggle textcolor = {toggle ? "#db2828" : "#21ba45"} onClick={()=>setToggle(!toggle)}>
                                        {
                                           toggle ? "Hide Passwords" : "Show Passwords"
                                        }
                                    </ShowHideToggle>
                                    <Field                                
                                        validator="equals"
                                        comparison={fixedValue.password}
                                        validatorErrMsg="Password are not same to old password."
                                        required
                                        type= { toggle ? "text" : "password" }
                                        label="Old Password"
                                        name="old_pass"
                                        onChange={fieldHandle}
                                        value={changePasswordStates.old_pass}
                                    />
                                </CustmFormField>
                                <CustmFormField className="field">
                                    <Field
                                        validator="isAlphanumeric"
                                        minLength={8}
                                        minLengthErrMsg="Short passwords are easy to guess. Try one with atleast 8 characters"
                                        required
                                        type= { toggle ? "text" : "password" }
                                        label="New Password"
                                        name="password"
                                        onChange={fieldHandle}
                                        value={changePasswordStates.password}
                                    />
                                </CustmFormField>
                                <CustmFormField className="field">
                                    <Field
                                        validator="equals"
                                        comparison={passwordValue}
                                        validatorErrMsg="New password and confirm password are not match!"
                                        required
                                        type= { toggle ? "text" : "password" }
                                        label="Confirm Password"
                                        name="confirm_password"
                                        onChange={fieldHandle}
                                        value={changePasswordStates.confirm_password}
                                    />
                                </CustmFormField>
                                <CustmButton>
                                    <button 
                                        className="positive ui button" 
                                        type="submit"
                                    >
                                        Change
                                    </button>
                                </CustmButton>
                            </form>
                            }
                            {
                                !props.changePass &&
                                <CustmButton>
                                    <button 
                                        className="positive ui button" 
                                        type="submit"
                                    >
                                        OK
                                    </button>
                                </CustmButton>
                            }
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

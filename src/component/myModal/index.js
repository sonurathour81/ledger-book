import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'

import { Modal } from 'react-bootstrap';

import {CustmFormField,CustmButton,CustmHeader,CustmModal} from './style.js'
import * as fun from '../../redux/actions/index'

import "./style.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from '../addUser/index'

export const CommanModal = (props) =>{
    
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();
    
    const [customerState, setCustomerState] = useState({});
    const [clickedEmail, setClickedEmail] = useState('')
    const [clickedPhone, setClickedPhone] = useState('')
    
    useEffect(()=>{
        const getClickedData = JSON.parse(localStorage.getItem("User_Clicked__Data")) || []
        setCustomerState({...getClickedData})
        setClickedPhone(getClickedData.cust_phone)
        setClickedEmail(getClickedData.cust_email)
    },[mapState])


    const fieldHandle = (e) => {
        e.preventDefault();
        setCustomerState(
            {...customerState,
            [e.target.name] : e.target.value
            }
        )
    }
    
    const submitUpdate = (e) => {
        e.preventDefault();

        const objectLenght = Object.keys(mapState.customerData.customer).length; 
        const checkArry = objectLenght > 0 && _.map(mapState.customerData.customer, (val, key) => {
            return val
        })
        
        const xyz = objectLenght > 0 && checkArry.filter((val) => {
            if((val.cust_email === customerState.cust_email && val.cust_email !==  clickedEmail) && (val.cust_phone === customerState.cust_phone && val.cust_phone !== clickedPhone)){
                alert("This Email Id & Phone number is registred already! Please use another!")
                return val
            } else if(val.cust_email === customerState.cust_email && val.cust_email !==  clickedEmail){
                alert("This Email Id is registred already! Please use another!")
                return val
            } else if(val.cust_phone === customerState.cust_phone && val.cust_phone !== clickedPhone){
                alert("This Phone Number is registred already! Please use another!")
                return val
            }
        })

        if(objectLenght !== 0){
            if(xyz.length === 0){
                dispatch(fun.updateCustomerInitial(customerState))
                props.hideModal();
                toast.success("User Updated Successfully!");
            }
        }
    }
    
    useEffect(()=>{
        props.hideModal()
    },[mapState.customerData.addCustomerStatus])

    return(
        <div>
            <CustmModal>
                <Modal 
                    show={props.showModal}
                    onHide={props.hideModal}
                    size="lg"
                >
                    <CustmHeader>
                        <Modal.Header>
                            <Modal.Title>{props.addCustomer ? 'Add Customer' : 'Update Customer'}</Modal.Title>
                        </Modal.Header>
                    </CustmHeader>
                    <Modal.Body>
                        <div>
                            { props.updateCustomer && <form className="ui form" onSubmit={submitUpdate}>
                                <div className="two fields">
                                    <CustmFormField className="field">
                                        <label>Customer Name</label>
                                        <input
                                            type="text"
                                            required
                                            name="cust_name"
                                            onChange={(e)=>{fieldHandle(e)}}
                                            value={customerState.cust_name}
                                        />
                                    </CustmFormField>
                                    <CustmFormField className="field">
                                        <label>Customer Email</label>
                                        <input
                                            type="email"
                                            required
                                            name="cust_email"
                                            onChange={(e)=>{fieldHandle(e)}}
                                            value={customerState.cust_email}
                                        />
                                    </CustmFormField>
                                </div>
                                <div className="two fields">
                                    <CustmFormField className="field">
                                        <label>Customer Phone</label>
                                        <input
                                            type="text"
                                            required
                                            name="cust_phone"
                                            value={customerState.cust_phone}
                                            onChange={(e)=>{fieldHandle(e)}}
                                            pattern="[0-9]{10}"
                                            title="Please use Number & 10 digit's Phone number!"
                                            maxLength={10}
                                            minLength={10}
                                        />
                                    </CustmFormField>
                                    <CustmFormField className="field">
                                        <label>Customer City</label>
                                        <input
                                            type="text"
                                            required
                                            name="cust_city"
                                            value={customerState.cust_city}
                                            onChange={(e)=>{fieldHandle(e)}}
                                        />
                                    </CustmFormField>
                                </div>
                                <div className="two fields">
                                    <CustmFormField className="field">
                                        <label>Customer Street</label>
                                        <input
                                            type="text"
                                            required
                                            name="cust_street"
                                            value={customerState.cust_street}
                                            onChange={(e)=>{fieldHandle(e)}}
                                            />
                                    </CustmFormField>
                                    <CustmFormField className="field">
                                        <label>Customer Zip Code</label>
                                        <input
                                            type="text"
                                            required
                                            label="Customer Zip Code"
                                            name="cust_zip"
                                            value={customerState.cust_zip}
                                            onChange={(e)=>{fieldHandle(e)}}
                                            pattern="[0-9]{6}"
                                            title="Please use Number & 6 digit's zip code!"
                                        />
                                    </CustmFormField>
                                </div>
                                <CustmButton>
                                    <button 
                                        className="positive ui button" 
                                        type="submit"
                                    >
                                        Update Customer
                                    </button>
                                </CustmButton>
                            </form>}
                            {props.addCustomer && <AddUser />}
                        </div>
                    </Modal.Body>
                </Modal>
            </CustmModal>
        </div>
    )
}

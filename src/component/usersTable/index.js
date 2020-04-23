import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom'
import { CommanModal } from '../myModal/index'

import { toast } from 'react-toastify';


import './style.css';
import * as fun from '../../redux/actions/index'


const UsersTable = (props) => {

    const mapState = useSelector(state => state);
    const dispatch = useDispatch();

    
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


    const deletebtn = (e, key) => {
        e.preventDefault();
        const newobj = {"deleteId": key, "logedId":logedId}
        dispatch(fun.deleteCustomerInitial(newobj))
        toast.success("User Deleted Successfully!");
    }
    
    const [showModal,setShowModal] = useState(false)

    const editBtn = (e,value) => {
        e.preventDefault();
        setShowModal(true)
        localStorage.setItem("User_Clicked__Data", JSON.stringify(value))
        dispatch(fun.updateUserClickedData(value))
    }

    const hideModal = () => {
        setShowModal(false)
        localStorage.removeItem("User_Clicked__Data")
    }
    
    const sendData = (e,value) => {
        e.preventDefault();
        localStorage.setItem("Clicked_User_Data", JSON.stringify(value))
    }

    const objectLenght = Object.keys(mapState.customerData.customer).length; 
    return(
      <div className="cust-mrgn-tp">
          <table className="ui green table">
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Customer Phone</th>
                    <th>Customer Address</th>
                    <th>Customer Zip Code</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    objectLenght > 0 && _.map(mapState.customerData.customer, (val,idx)=>{
                        return(
                            <tr key={idx}>
                                <td>{Number(idx)+1}</td>
                                <td>{val.cust_name}</td>
                                <td>{val.cust_email}</td>
                                <td>{val.cust_phone}</td>
                                <td>{val.cust_city}, {val.cust_street}</td>
                                <td>{val.cust_zip}</td>
                                <td>
                                    <div className="iconsManDiv">
                                        <div onClick={(e)=>editBtn(e,val)}>
                                            <i class="edit outline icon"></i>
                                        </div>
                                        <div onClick={(e)=>deletebtn(e,val.customerId)}>
                                            <i class="trash alternate outline icon"></i>
                                        </div>
                                        <div onClick={(e)=>sendData(e,val)}>
                                            <Link to="/userAccount">
                                                <i class="folder open outline icon"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )                
                    })
                }

            </tbody>
        </table>
        <CommanModal
            showModal = {showModal}
            hideModal = {hideModal}
        />
      </div>
    )
}

export default UsersTable;
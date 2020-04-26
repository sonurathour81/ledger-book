import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { CommanModal } from '../myModal/index'

import { toast } from 'react-toastify';
import * as stylCls from './style';
import * as fun from '../../redux/actions/index'
import { CustomerStatusbar } from '../customerStatusbar'


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

    const searchFun = () =>{
       const temp =  _.map(mapState.customerData.customer, (val,idx)=>{
            return val
        })
        const temp2 = temp.filter((val)=>{
            const chk = val.cust_name.toLowerCase().startsWith(mapState.searchingText.searchText.toLowerCase()) ||
                        val.cust_email.toLowerCase().startsWith(mapState.searchingText.searchText.toLowerCase())
            return chk
        })
        return temp2

    }
    return(
        <stylCls.MainUsersDiv>
            <CustomerStatusbar 
                fixedStatus
                usersLength = {searchFun().length}
            />
            <stylCls.MainUsersTable>
                <div className="cust-mrgn-tp">
                    <table className="ui green table">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Phone No.</th>
                                <th>Customer Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchFun().length > 0 ?  searchFun().map((val,idx)=>{
                                    return(
                                        <tr key={idx} className="fullTr">                                
                                            <td>{Number(idx)+1}</td>
                                            <td>{val.cust_name}</td>
                                            <td>{val.cust_email}</td>
                                            <td>{val.cust_phone}</td>
                                            <td>{val.cust_city}, {val.cust_street}, {val.cust_zip}</td>
                                            <td className="action">
                                                <div className="iconsManDiv">
                                                    <div onClick={(e)=>editBtn(e,val)}>
                                                        <i class="edit outline icon"></i> Edit
                                                    </div>
                                                    <div onClick={(e)=>sendData(e,val)}>
                                                        <Link to="/userAccount">
                                                            <i class="folder alternate outline icon"></i> Ledger
                                                        </Link>
                                                    </div>
                                                    <div onClick={(e)=>deletebtn(e,val.customerId)}>
                                                    <i class="trash alternate outline icon"></i> Delete
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )                
                                }) :
                                <tr>
                                    <td colspan="6"><stylCls.NoUser>No Any Customer</stylCls.NoUser></td>
                                </tr>
                                
                            }
                        </tbody>
                    </table>
                    <CommanModal
                        showModal = {showModal}
                        hideModal = {hideModal}
                    />
                </div>
            </stylCls.MainUsersTable>
        </stylCls.MainUsersDiv>
    )
}

export default UsersTable;
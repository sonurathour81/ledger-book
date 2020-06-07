import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import * as stylCls from './style'

export const CustomerHeader = (props) => {

    const [clickedUserData, setClickedUserData] = useState({})
    useEffect(()=>{
        setClickedUserData(JSON.parse(localStorage.getItem("Clicked_User_Data")) || [])
    }, [])

    const deleteClickedUserData = () => {
        return localStorage.removeItem("Clicked_User_Data")
    }

    return(
        <div>
            {
            clickedUserData &&
                <stylCls.MainUserHeader>
                    <React.Fragment>
                        {
                            props.customerHistory &&
                            <div>
                                <Link to='/customerAccount'>
                                    <i class="plus square outline icon"></i> Add More Items / Pay
                                </Link>
                            </div>
                        }
                        {
                            props.customerAddPay &&
                            <div>
                                <Link to='/customersList' onClick={deleteClickedUserData}>
                                    <i class="angle double left icon"></i> Back
                                </Link>
                            </div>
                        }
                        <div>
                            <i class="user circle outline icon"></i>
                            {clickedUserData.cust_name}
                        </div>
                        <div>
                            <i class="envelope outline icon"></i>
                            {clickedUserData.cust_email}
                        </div>
                        <div>
                            <i class="phone volume icon"></i>
                            {clickedUserData.cust_phone}
                        </div>
                        {
                            props.customerAddPay && 
                            <div>
                                <Link to={`/customerAccount/${clickedUserData.customerId}`}>
                                    <i class="folder open outline icon"></i> History
                                </Link>
                            </div>
                        }
                    </React.Fragment>
                </stylCls.MainUserHeader>   
            }
        </div>
    )
  }
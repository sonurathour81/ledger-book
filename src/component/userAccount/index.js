import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as fun from '../../redux/actions/index'
import * as stylCls from './style'
import { AddPayTabs } from '../tabs/index'
import { CustomerHeader } from '../customerHeader';
import { CustomerStatusbar } from '../customerStatusbar';


export const UserAccount = () => {
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();
    
	useEffect(()=>{
        dispatch(fun.displayDataInitial())
    }, [])

    return(
        <div>
            <stylCls.MainDiv>
                <CustomerHeader 
                    customerAddPay
                />
                <CustomerStatusbar 
                    customerAccount
                />
                <AddPayTabs
                    customerAddPay
                    title1 = "Add Item" 
                    title2 = "Pay" 
                    eventKey1 = "addItem"
                    eventKey2 = "pay"
                    defaultActiveKey = "addItem"
                />
            </stylCls.MainDiv>
        </div>
    )
  }
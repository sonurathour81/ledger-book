import React from 'react'
import * as stylCls from './style'
import {Tabs, Tab} from 'react-bootstrap'
import { UserAddItems } from '../userAddItems/index'
import { UserPay } from '../userPay';
import { YouGaveHistory } from '../youGaveHistory'
import { YouGotHistory } from '../youGotHistory'

export const AddPayTabs = (props) => {

    
    return(  
        <stylCls.MainTab>
            <Tabs defaultActiveKey={props.defaultActiveKey}>
                <Tab eventKey={props.eventKey1} title={props.title1}>
                    {props.customerAddPay && <UserAddItems />}
                    {props.customerHistory && <YouGaveHistory />}
                    
                </Tab>
                <Tab eventKey={props.eventKey2} title={props.title2}>
                    {props.customerAddPay && <UserPay />}
                    {props.customerHistory && <YouGotHistory />}
                </Tab>
            </Tabs>
        </stylCls.MainTab>     
    )
  }
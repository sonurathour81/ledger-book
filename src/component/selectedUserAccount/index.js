import React from 'react'
import * as stylCls from './style'
import { AddPayTabs } from '../tabs/index'
import { CustomerHeader } from '../customerHeader/index'
import { CustomerStatusbar } from '../customerStatusbar'

export const SelectedUserAccount = () => {

    return(
        <div>
            <stylCls.MainDiv>
                <CustomerHeader 
                    customerHistory
                />
                <CustomerStatusbar 
                    customerAccount
                />
                <AddPayTabs
                    customerHistory
                    title1 = "You Gave" 
                    title2 = "You Got" 
                    eventKey1 = "youGave"
                    eventKey2 = "youGot"
                    defaultActiveKey = "youGave"
                />
            </stylCls.MainDiv>
        </div>
    )
  }
import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as fun from '../../redux/actions/index'
import * as stylCls from './style'
import moment from 'moment'
import {Accordion, Button} from 'react-bootstrap'

export const YouGaveHistory = () => {
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fun.displayDataInitial())
        dispatch(fun.getItemsInitial())
        dispatch(fun.getMoneyInitial())
    }, [])

    let daybytotal = 0;
    const oneTimeAddvalue = (tot) => {
        daybytotal = (parseFloat(daybytotal) + parseFloat(tot)).toFixed(2);
    }
    
    return(
        <div>
            <stylCls.CustTable>
                <stylCls.TableHeading yougave>
                    You Gave
                </stylCls.TableHeading>
                <div className="ui table">
                    <stylCls.MainTopHeader>
                        <div>Sr. No.</div>
                        <div>Unit of Price</div>
                        <div>Product Name</div>
                        <div>Quantity</div>
                        <div>Amount / Product</div>
                    </stylCls.MainTopHeader>

                    <stylCls.AccrodinMain>
                        <Accordion defaultActiveKey="0">
                            {
                                mapState.customerItems.clickedCustomerAllData && 
                                mapState.customerItems.clickedCustomerAllData.map((val,srno)=>{
                                    return(
                                        val.totalItems.map((val2,idx)=>{
                                            daybytotal = 0
                                            return(
                                                <React.Fragment>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey={`${idx}`} style={{width:'100%', textDecoration:'none', marginBottom: '3px', padding: '0px 10px', outline: 'none'}}>
                                                        <stylCls.AcordianHeader key={idx}>
                                                            <div>{idx+1}</div>
                                                            <div>{moment(val2.createdTime).format('llll')}</div>
                                                        </stylCls.AcordianHeader>
                                                    </Accordion.Toggle>
                                                    {
                                                        val2.allItem.map((item,index)=>{
                                                            return(
                                                                <Accordion.Collapse eventKey={`${idx}`}>
                                                                    <React.Fragment>
                                                                        <stylCls.AcordianItems key={index}>
                                                                            <div>{idx+1}.{index+1}</div>
                                                                            <div>{item.price}<i class="rupee sign icon"></i>/ {item.price_unit}</div>
                                                                            <div>{item.product_name}</div>
                                                                            <div>{item.quantity} {item.qty_unit}</div>
                                                                            <div>{item.amountOfProduct}<i class="rupee sign icon"></i></div>
                                                                        </stylCls.AcordianItems>
                                                                        {
                                                                            <React.Fragment>
                                                                                {oneTimeAddvalue(item.amountOfProduct)}
                                                                                {
                                                                                    val2.allItem.length-1 === index &&
                                                                                        <stylCls.AcordianTotal>
                                                                                            <div></div>
                                                                                            <div>Total Amount:- </div>
                                                                                            <div>{daybytotal}<i class="rupee sign icon"></i></div>
                                                                                        </stylCls.AcordianTotal>
                                                                                }
                                                                            </React.Fragment>
                                                                        }
                                                                    </React.Fragment>
                                                                </Accordion.Collapse>
                                                            )
                                                        })
                                                    }
                                                </React.Fragment>
                                            )
                                        })
                                    )
                                })
                            }
                        </Accordion>
                    </stylCls.AccrodinMain>
                </div>
            </stylCls.CustTable>
        </div>
    )
  }
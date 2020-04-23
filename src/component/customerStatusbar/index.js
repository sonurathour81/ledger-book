import React,{useEffect,useState} from 'react'
import * as stylCls from './style'
import * as fun from '../../redux/actions/index'
import { useSelector, useDispatch } from 'react-redux';

export const CustomerStatusbar = (props) => {

    const mapState = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fun.getItemsInitial())
        dispatch(fun.getMoneyInitial())
    }, [])

    let youGavetotal = 0
    const totalYouGave = () => {
        const custData = mapState.customerItems.clickedCustomerAllData;
        custData && custData.map((val)=>{
            return(
                val.totalItems.map((val2)=>{
                    return(
                        val2.allItem.map((val3)=>{
                            youGavetotal = youGavetotal + Number(val3.amountOfProduct)
                            return youGavetotal
                        })
                    )
                })
            )
        })
        return parseFloat(youGavetotal).toFixed(2)
    }

    let youGotTotal = 0
    const totalYouGot = () => {
        const custMoney = mapState.customerMoney.customerAmount;
        custMoney && custMoney.map((val)=>{
            return(
                val.totAmount.map((val2)=>{
                    youGotTotal = youGotTotal + Number(val2.mpay)
                    return youGotTotal             
                })
            )
        })
        return parseFloat(youGotTotal).toFixed(2)
    }


    return(
        <div>
            <stylCls.CustStatusMain
                fixedStatus = {props.fixedStatus}
            >
                <React.Fragment>
                    <div>
                        {
                            (props.usersLength || props.usersLength === 0) && 
                                <React.Fragment>
                                    {props.usersLength === 0 || props.usersLength === 1 ? "Total Customer" : "Total Customers"} <span>{props.usersLength}</span>
                                </React.Fragment>
                        }
                        {
                            (!props.usersLength && props.usersLength !== 0) &&
                                <React.Fragment>
                                    You Got <span> <i class="rupee sign icon"></i>{totalYouGot()}</span>
                                </React.Fragment>
                        }
                    </div>
                    <div>
                        You Gave <span> <i class="rupee sign icon"></i>{totalYouGave()}</span>
                    </div>
                        {
                            youGavetotal === youGotTotal && (
                                <stylCls.FinallyRes settled>
                                    Settled Up <span> <i class="rupee sign icon"></i> {(parseFloat(youGavetotal) - parseFloat(youGotTotal)).toFixed(2)}</span>
                                </stylCls.FinallyRes>
                            )
                        }
                        {
                            youGavetotal > youGotTotal && (
                                <stylCls.FinallyRes youget>
                                    You will get <span> <i class="rupee sign icon"></i> {(parseFloat(youGavetotal) - parseFloat(youGotTotal)).toFixed(2)}</span>
                                </stylCls.FinallyRes>

                            )
                        }
                        {
                            youGavetotal < youGotTotal && (
                                <stylCls.FinallyRes yougive>
                                    You will give <span> <i class="rupee sign icon"></i> {(parseFloat(youGotTotal) - parseFloat(youGavetotal)).toFixed(2)}</span>
                                </stylCls.FinallyRes>
                            )
                        }
                </React.Fragment>
            </stylCls.CustStatusMain>   
        </div>
    )
  }
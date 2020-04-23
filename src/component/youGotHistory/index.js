import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as fun from '../../redux/actions/index'
import * as stylCls from './style'
import moment from 'moment'


export const YouGotHistory = () => {
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fun.displayDataInitial())
        dispatch(fun.getItemsInitial())
        dispatch(fun.getMoneyInitial())
    }, [])

    return(
        <div>
            <stylCls.CustTable chekkk>
                <stylCls.TableHeading yougot>
                    You Got
                </stylCls.TableHeading>
                <div className="ui table">
                    <stylCls.GotTopHeader>
                        <div>Sr. No.</div>
                        <div>Title</div>
                        <div>Amount</div>
                        <div>Paid Date</div>
                    </stylCls.GotTopHeader>
                    <stylCls.AccrodinMain mrbotm>
                        {
                            mapState.customerMoney.customerAmount && mapState.customerMoney.customerAmount.map((val)=>{
                                return(
                                    val.totAmount.map((val2,idx)=>{
                                        return(
                                            <stylCls.GotItems>
                                                <div>{idx+1}</div>
                                                <div>{val2.title}</div>
                                                <div>{val2.mpay}<i class="rupee sign icon"></i></div>
                                                <div>{moment(val2.paidOnDate).format('llll')}</div>
                                            </stylCls.GotItems>
                                        )
                                    })
                                )
                            })
                        }
                    </stylCls.AccrodinMain>
                </div>
            </stylCls.CustTable>
        </div>
    )
  }
import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as fun from '../../redux/actions/index'
import * as stylCls from './style'
import { toast } from 'react-toastify';


export const UserPay = () => {
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();
    

    const [clickedUserData, setClickedUserData] = useState({})
	useEffect(()=>{
        dispatch(fun.displayDataInitial())
        setClickedUserData(JSON.parse(localStorage.getItem("Clicked_User_Data")) || [])
    }, [])

    const initial = {
        title:'',
        mpay:''
    }
    const [money,setMoney] = useState(initial)
    const fieldHandle = (e) => {
        e.preventDefault();
        setMoney(
            {...money,
                [e.target.name] : e.target.value
            }
        )
    }
    const save = (e) => {
        e.preventDefault();
        const xyz = {...money,mpay: parseFloat(money.mpay).toFixed(2)}
        const temp = {totAmount: [{...xyz, paidOnDate: Date.now()}], customerId:clickedUserData.customerId}
        dispatch(fun.addMoneyInitial(temp))
        toast.success("Paid Successfully!");
        setMoney({
            title:'',
            mpay:''
        })
    }

    
    return(
        <div>
            <stylCls.MainDiv2>
                <form className="ui form" onSubmit={save}>
                    <div className="fields">

                        <stylCls.MainDivInput className="eight wide field">
                            <label>Title</label>
                            <input 
                                type="text"
                                required
                                name="title"
                                placeholder="Just Pay"
                                value={money.title}
                                onChange={fieldHandle}
                            />
                        </stylCls.MainDivInput>
                        <stylCls.MainDivInput className="five wide field">
                            <label>Amount</label>
                            <input 
                                type="number"
                                required
                                name="mpay"
                                maxlength="7"
                                placeholder="231"
                                value={money.mpay}
                                onChange={fieldHandle}
                                pattern="\d*"
                                maxLength={7}
                                minLength={1}
                                title="Use Minimum 1 Digit or Maximum 7 Digits"
                            />
                        </stylCls.MainDivInput>
                        <stylCls.MianDivButton className="three wide field">
                            <button class="ui green button">Pay</button>
                        </stylCls.MianDivButton> 
                    </div>
                </form>
            </stylCls.MainDiv2>
        </div>
    )
  }
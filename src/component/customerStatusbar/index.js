import React,{useEffect,useState} from 'react'
import * as stylCls from './style'
import * as fun from '../../redux/actions/index'
import { useSelector, useDispatch } from 'react-redux';
import { CommanModal } from '../myModal/index'

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

    const finalRes = () => {
        if(youGavetotal === youGotTotal){
            return(
                <stylCls.FinallyRes settled>
                    Settled Up <span> <i class="rupee sign icon"></i> {(parseFloat(youGavetotal) - parseFloat(youGotTotal)).toFixed(2)}</span>
                </stylCls.FinallyRes>
            )
        }

        if(youGavetotal > youGotTotal){
            return(
                <stylCls.FinallyRes youget>
                    You will get <span> <i class="rupee sign icon"></i> {(parseFloat(youGavetotal) - parseFloat(youGotTotal)).toFixed(2)}</span>
                </stylCls.FinallyRes>
            )
        }

        if(youGavetotal < youGotTotal){
            return(
                <stylCls.FinallyRes yougive>
                    You will give <span> <i class="rupee sign icon"></i> {(parseFloat(youGotTotal) - parseFloat(youGavetotal)).toFixed(2)}</span>
                </stylCls.FinallyRes>
            )
        }
    }


    const searchSubmit = (e) => {
        e.preventDefault();
        dispatch(fun.searchText(e.target.value))
    }

    const [showModal,setShowModal] = useState(false)

    const openAddUserModal = () => {
        setShowModal(true)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    return(
        <div>
            <stylCls.CustStatusMain
                fixedStatus = {props.fixedStatus}
            >
            {
                props.customerAccount && 
                    <React.Fragment>
                        <div> You Got <span> <i class="rupee sign icon"></i>{totalYouGot()}</span></div>
                        <div> You Gave <span> <i class="rupee sign icon"></i>{totalYouGave()}</span></div>
                        {finalRes()}
                    </React.Fragment>
            }

            {
                (props.usersLength || props.usersLength === 0) && 
                    <React.Fragment>
                        <stylCls.SrchMain>
                            <div onClick={openAddUserModal}><i className="plus square outline icon"></i> Add Customer</div>
                            <div> {props.usersLength === 0 || props.usersLength === 1 ? "Total Customer" : "Total Customers"} <span>{props.usersLength}</span> </div>
                            <div>
                                <form>
                                    <stylCls.SearchInput
                                        type="text"
                                        placeholder="Search with Name or Email"
                                        onChange= {(e) => searchSubmit(e)}
                                    />
                                    <i className="sistrix icon"></i>
                                </form>
                            </div>
                        </stylCls.SrchMain>
                    </React.Fragment>
            }
            </stylCls.CustStatusMain>
            
            <CommanModal 
                showModal = {showModal}
                hideModal = {hideModal}
                addCustomer
            /> 
        </div>
    )
  }
import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as fun from '../../redux/actions/index'
import * as stylCls from './style'
import { toast } from 'react-toastify';


export const UserAddItems = () => {
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();
    

    const [clickedUserData, setClickedUserData] = useState({})
	useEffect(()=>{
        dispatch(fun.displayDataInitial())
        setClickedUserData(JSON.parse(localStorage.getItem("Clicked_User_Data")) || [])
    }, [])

    const initial = {
        price_unit:'',
        price:'',
        qty_unit:'',
        quantity:'',
        product_name:''
    }
    const [item,setItem] = useState(initial)
    const fieldHandle = (e) => {
        e.preventDefault();
        setItem(
            {...item,
                [e.target.name] : e.target.value
            }
        )
    }

    const checkFun = () => {
        const {price_unit,price,qty_unit,quantity} = item;
        if(price_unit === 'PIECE'){
            return (price*quantity).toFixed(2)
        } else if(price_unit === 'KG'){
            if(qty_unit === 'KG'){
                return (price*quantity).toFixed(2)
            } else if(qty_unit === 'GM'){
                const oneGm = price / 1000;
                return (oneGm*quantity).toFixed(2)
            }
        }
    }

    const addItem = (e) => {
        e.preventDefault();
        const temp = {...item,amountOfProduct:checkFun(), customerId:clickedUserData.customerId}
        dispatch(fun.addItemFun(temp))
        toast.success("Item Add Successfully!");
        setItem({
            price_unit:'',
            price:'',
            qty_unit:'',
            quantity:'',
            product_name:''
        })
    }

    const deleteItem = (e,indx) => {
        e.preventDefault();
        dispatch(fun.deleteItemFun(indx))
        toast.success("Item Deleted Successfully!");

    }

    const [grandTotal, setGrandTotal] = useState(0)
    let gdAmount = 0;
    const itemOfClickedCustomer = 
    mapState.customerItems.item && mapState.customerItems.item.filter((val,idx)=>{
        if(val.customerId === clickedUserData.customerId){
            const temp = parseFloat(gdAmount) + parseFloat(val.amountOfProduct)
            gdAmount = temp.toFixed(2);
            return val
        }
    })
    
    useEffect(()=>{
        setGrandTotal(gdAmount)
    },[gdAmount])
    
    const submitItems = () => {
        const temp = { customerId:clickedUserData.customerId, totalItems : [{ allItem : [...itemOfClickedCustomer], createdTime: Date.now() }]}
        dispatch(fun.addItemsInitial(temp))
        toast.success("All items added successfully!")
    }
    
    return(
        <div>
            <stylCls.MainDiv2>
                <form className="ui form" onSubmit={addItem}>
                    <div className="fields">
                        <stylCls.MainDivInput className="two wide field">
                            <label>Unit of Price</label>   
                            <select 
                                className="ui fluid search dropdown" 
                                name="price_unit"
                                required
                                value={item.price_unit}
                                onChange={fieldHandle}
                            >
                                <option value="">Select</option>
                                <option value="KG">Kilogram(KG)</option>
                                <option value="PIECE">Piece</option>
                            </select>
                        </stylCls.MainDivInput>
                        <stylCls.MainDivInput className="two wide field">
                            
                            <label>
                                {item.price_unit === 'KG' && "Price / Kg"}
                                {item.price_unit === 'PIECE' && "Price / Piece"}
                                {item.price_unit === '' && "Price"}
                            </label>
                            <input
                                type="text"
                                required
                                name="price"
                                placeholder="510"
                                value={item.price}
                                onChange={fieldHandle}
                                pattern="\d*"
                                maxLength={4}
                                minLength={1}
                                title="Use Minimum 1 Digit or Maximum 4 Digits"
                                disabled = {item.price_unit === '' && true}
                            />
                        </stylCls.MainDivInput>
                        <stylCls.MainDivInput className="two wide field">
                            <label>Unit of Quantity</label>   
                            <select 
                                className="ui fluid search dropdown" 
                                name="qty_unit"
                                required
                                value={item.qty_unit}
                                onChange={fieldHandle}
                                disabled = {item.price_unit === '' && true}
                            >
                                <option value="">Select</option>
                                {item.price_unit === 'KG' ? 
                                    <React.Fragment>
                                        <option value="KG">Kilogram(KG)</option>
                                        <option value="GM">Gram(GM)</option>
                                    </React.Fragment>
                                    : <option value="PIECE">Pieces</option>
                                }
                            </select>
                        </stylCls.MainDivInput>
                        <stylCls.MainDivInput className="two wide field">
                            <label>Quantity</label>
                            <input 
                                type="text"
                                required
                                name="quantity"
                                maxlength="3"
                                placeholder="231"
                                value={item.quantity}
                                onChange={fieldHandle}
                                pattern="\d*"
                                maxLength={3}
                                minLength={1}
                                title="Use Minimum 1 Digit or Maximum 3 Digits"
                            />
                        </stylCls.MainDivInput>
                        <stylCls.MainDivInput className="five wide field">
                            <label>Product Name</label>
                            <input 
                                type="text"
                                required
                                name="product_name"
                                placeholder="Biscuit 50-50"
                                value={item.product_name}
                                onChange={fieldHandle}
                            />
                        </stylCls.MainDivInput>
                        <stylCls.MianDivButton className="three wide field">
                            <button class="ui green button">Add Item</button>
                        </stylCls.MianDivButton> 
                    </div>
                </form>
            </stylCls.MainDiv2>
            <stylCls.CustTable>                    
                <div>
                    Added Items <span>{itemOfClickedCustomer.length}</span>
                </div>
                <table className="ui green table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Unit of Price</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Amount / Product</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            itemOfClickedCustomer && itemOfClickedCustomer.map((val,idx)=>{
                                return(
                                    <tr key={idx}>
                                        <td>{Number(idx)+1}</td>
                                        <td>{val.price}<i class="rupee sign icon"></i>/ {val.price_unit}</td>
                                        <td>{val.product_name}</td>
                                        <td>{val.quantity} {val.qty_unit}</td>
                                        <td>{val.amountOfProduct}<i class="rupee sign icon"></i></td>
                                        <td>
                                            <div className="iconsManDiv">
                                                <div onClick={(e)=>deleteItem(e,idx)}>
                                                    <i className="trash alternate outline icon"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )                
                            })
                        }
                        {
                            itemOfClickedCustomer.length > 0 &&
                            <stylCls.TotalTr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Grand Total </td>
                                <td>{grandTotal}<i class="rupee sign icon"></i></td>
                                <td>
                                <stylCls.MianDivButton>
                                    <button class="ui green button" onClick = {submitItems}>Submit</button>
                                </stylCls.MianDivButton> 
                                </td>
                            </stylCls.TotalTr>
                        }
                    </tbody>
                </table>
            </stylCls.CustTable>
        </div>
    )
  }
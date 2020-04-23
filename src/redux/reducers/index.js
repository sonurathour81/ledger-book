import { combineReducers } from 'redux';
import loginSignup from './loginSignup';
import customer from './customer'
import items from './items'
import customerMoney from './customerMoney'

 const reducer = combineReducers({
    userData: loginSignup,
    customerData: customer,
    customerItems: items,
    customerMoney: customerMoney
})

export default reducer;
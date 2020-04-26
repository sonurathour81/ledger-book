import { combineReducers } from 'redux';
import loginSignup from './loginSignup';
import customer from './customer'
import items from './items'
import customerMoney from './customerMoney'
import searching from './searching'

 const reducer = combineReducers({
    userData: loginSignup,
    customerData: customer,
    customerItems: items,
    customerMoney: customerMoney,
    searchingText: searching
})

export default reducer;
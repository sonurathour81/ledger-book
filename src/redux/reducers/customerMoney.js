import * as act from '../actionType'

const initial = {
    customerAmount: []
}

export default (state= initial, action) => {
    switch(action.type){

        case act.ADD_MONEY_OF_CUSTOMER_INITIAL:
            return{...state}

        case act.ADD_MONEY_OF_CUSTOMER_SUCCESS:
            return {...state, customerAmount:[action.payload]}

        case act.ADD_MONEY_OF_CUSTOMER_ERROR:
            return {...state, error: action.payload }

        case act.GET_MONEY_OF_CUSTOMER_INITIAL:
            return{...state}

        case act.GET_MONEY_OF_CUSTOMER_SUCCESS:
            return {...state, customerAmount:[...action.payload]}

        case act.GET_MONEY_OF_CUSTOMER_ERROR:
            return {...state, error: action.payload }
    
        
        default:
            return state
    }
}
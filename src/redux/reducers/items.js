import * as act from '../actionType'

const initial = {
    item: []
}

export default (state= initial, action) => {
    switch(action.type){
            
        case act.ADD_ITEM:
            return {...state, item:[...state.item, action.payload]};
            
        case act.DELETE_ITEM:
            const temp = state.item.filter((val,index)=>{
                return index !== action.payload
            })
            return {...state, item:[...temp]}
            
        case act.ADD_ITEMS_OF_CUSTOMER_INITIAL:
            return{...state}

        case act.ADD_ITEMS_OF_CUSTOMER_SUCCESS:
            return {...state, item:[], clickedCustomerAllData : [action.payload]}

        case act.ADD_ITEMS_OF_CUSTOMER_ERROR:
            return {...state, error: action.payload }

        case act.GET_ITEMS_OF_CUSTOMER_INITIAL:
            return {...state}

        case act.GET_ITEMS_OF_CUSTOMER_SUCCESS:
            return {...state, clickedCustomerAllData : [...action.payload]}

        case act.GET_ITEMS_OF_CUSTOMER_ERROR:
            return {...state, error: action.payload }

        default:
            return state
    }
}
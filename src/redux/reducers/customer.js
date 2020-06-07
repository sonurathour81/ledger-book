import * as act from '../actionType'

const initial = {
    customer: {},
}

export default (state= initial, action) => {
    switch(action.type){
        case act.ADD_CUSTOMER_INITIAL:
            return {...state};
            
        case act.ADD_CUSTOMER_SUCCESS:
            return {...state, customer:{...state.customer, ...action.payload}};
            
        case act.ADD_CUSTOMER_ERROR:
            return{...state, error: action.payload };

        case act.ADD_CUSTOMER_SUCCESS_STATUS:
            return{...state, addCustomerStatus: action.payload}
        
        case act.DISPLAY_CUSTOMER_DATA_INITIAL:
            return {...state};

        case act.DISPLAY_CUSTOMER_DATA_SUCCESS:
            return {...state, customer:{...action.payload}};

        case act.DISPLAY_CUSTOMER_DATA_ERROR:
            return{...state, error: action.payload };

        case act.DELETE_CUSTOMER_INITIAL:
            return {...state};

        case act.DELETE_CUSTOMER_SUCCESS:
            return {...state, customer:{...action.payload}};

        case act.DELETE_CUSTOMER_ERROR:
            return{...state, error: action.payload };
    
        case act.UPDATE_CLICKED_DATA:
            return{...state, User_Clicked__Data: action.payload}

        case act.UPDATE_CUSTOMER_INITIAL:
            return {...state};

        case act.UPDATE_CUSTOMER_SUCCESS:
            return {...state, customer:{...action.payload}};

        case act.UPDATE_CUSTOMER_ERROR:
            return{...state, error: action.payload };

        default:
            return state
    }
}
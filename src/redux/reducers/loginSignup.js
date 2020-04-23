import * as act from '../actionType'

const initial = {
    userSignUpData: {},
    // customer:{}
}

export default (state= initial, action) => {
    switch(action.type){
        case act.CREATE_INITIAL_SIGNUP:
            return {...state};

        case act.CREATE_SUCCESS_SIGNUP:
            return {...state, userSignUpData:{...state.userSignUpData, ...action.payload}};

        case act.CREATE_ERROR_SIGNUP:
            return{...state, error: action.payload };
        
        case act.ON_FORM_DISPLAY_INITIAL:
            return {...state};

        case act.ON_FORM_DISPLAY_SUCCESS:
            return {...state, userSignUpData:{...state.userSignUpData, ...action.payload}};

        case act.ON_FORM_DISPLAY_ERROR:
            return {...state, error: action.payload };

        case act.TOKEN_ON_LOGIN:
            return {...state , loginToken: action.payload}

        case act.LOGED_DATA:
            return {...state, logedData: action.payload}

        default:
            return state
    }
}
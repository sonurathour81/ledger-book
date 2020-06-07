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

        case act.UPDATE_USER_PRFILE_INITIAL:
            return {...state};

        case act.UPDATE_USER_PRFILE_SUCCESS:
            return {...state, profileUpadte : true};

        case act.UPDATE_USER_PRFILE_ERROR:
            return {...state, error: action.payload };

        case act.CHANGE_USER_PASSWORD_INITIAL:
            return {...state};

        case act.CHANGE_USER_PASSWORD_SUCCESS:
            return {...state, chnagePassword : true};

        case act.CHANGE_USER_PASSWORD_ERROR:
            return {...state, error: action.payload };

        case act.CHNAGE_PASSWORD_STATUS:
            return {...state, changePasswordStatus: action.payload}

        default:
            return state
    }
}
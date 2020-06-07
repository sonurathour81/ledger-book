import * as act from '../actionType';

export const initialSignUp = (data) => {
    return{
        type : act.CREATE_INITIAL_SIGNUP,
        payload: {...data}
    }
}

export const successSignUp = (data) => {
    return{
        type : act.CREATE_SUCCESS_SIGNUP,
        payload: {...data}
    }
}

export const errorSignUp = (data) => {
    return{
        type : act.CREATE_ERROR_SIGNUP,
        payload: data
    }
}

export const initialUpdateUser = (data) => {
    return{
        type : act.UPDATE_USER_PRFILE_INITIAL,
        payload: {...data}
    }
}

export const successUpdateUser = (data) => {
    return{
        type : act.UPDATE_USER_PRFILE_SUCCESS,
        payload: {...data}
    }
}

export const errorUpdateUser = (data) => {
    return{
        type : act.UPDATE_USER_PRFILE_ERROR,
        payload: data
    }
}


export const initialChangePasswordUser = (data) => {
    return{
        type : act.CHANGE_USER_PASSWORD_INITIAL,
        payload: {...data}
    }
}

export const successChangePasswordUser = (data) => {
    return{
        type : act.CHANGE_USER_PASSWORD_SUCCESS,
        payload: {...data}
    }
}

export const errorChangePasswordUser = (data) => {
    return{
        type : act.CHANGE_USER_PASSWORD_ERROR,
        payload: data
    }
}



export const displayDataInitial = (data) => {
    return{
        type : act.ON_FORM_DISPLAY_INITIAL,
        payload: data
    }
}

export const displayDataSuccess = (data) => {
    return{
        type : act.ON_FORM_DISPLAY_SUCCESS,
        payload: {...data}
    }
}


export const displayDataError = (data) => {
    return{
        type : act.ON_FORM_DISPLAY_ERROR,
        payload: data
    }
}


export const tokenLogin = (data) => {
    return{
        type : act.TOKEN_ON_LOGIN,
        payload: {...data}
    }
}

export const logedInData = (data) => {
    return{
        type : act.LOGED_DATA,
        payload: data
    }
}

export const initialCustomerAdd = (data) => {
    return{
        type : act.ADD_CUSTOMER_INITIAL,
        payload: {...data}
    }
}

export const successCustomerAdd = (data) => {
    return{
        type : act.ADD_CUSTOMER_SUCCESS,
        payload: {...data}
    }
}

export const successAddCustomerStatus = (data) => {
    return{
        type: act.ADD_CUSTOMER_SUCCESS_STATUS,
        payload: data
    }
}

export const errorCustomerAdd = (data) => {
    return{
        type : act.ADD_CUSTOMER_ERROR,
        payload: data
    }
}


export const displayCustomerDataInitial = (data) => {
    return{
        type : act.DISPLAY_CUSTOMER_DATA_INITIAL,
        payload: data
    }
}

export const displayCustomerDataSuccess = (data) => {
    return{
        type : act.DISPLAY_CUSTOMER_DATA_SUCCESS,
        payload: {...data}
    }
}


export const displayCustomerDataError = (data) => {
    return{
        type : act.DISPLAY_CUSTOMER_DATA_ERROR,
        payload: data
    }
}


export const deleteCustomerInitial = (data) => {
    return{
        type: act.DELETE_CUSTOMER_INITIAL,
        payload: data
    }
}

export const deleteCustomerSuccess = (data) => {
    return{
        type: act.DELETE_CUSTOMER_SUCCESS,
        payload: data
    }
}

export const deleteCustomerError = (data) => {
    return{
        type: act.DELETE_CUSTOMER_ERROR,
        payload: data
    }
}

export const updateUserClickedData = (data) => {
    return{
        type: act.UPDATE_CLICKED_DATA,
        payload: data
    }
}

export const updateCustomerInitial = (data) => {
    return{
        type: act.UPDATE_CUSTOMER_INITIAL,
        payload: data
    }
}

export const updateCustomerSuccess = (data) => {
    return{
        type: act.UPDATE_CUSTOMER_SUCCESS,
        payload: data
    }
}

export const updateCustomerError = (data) => {
    return{
        type: act.UPDATE_CUSTOMER_ERROR,
        payload: data
    }
}

export const addItemFun = (data) => {
    return{
        type: act.ADD_ITEM,
        payload: data
    }
}

export const deleteItemFun = (data) => {
    return{
        type: act.DELETE_ITEM,
        payload: data
    }
}


export const addItemsInitial = (data) => {
    return{
        type: act.ADD_ITEMS_OF_CUSTOMER_INITIAL,
        payload: data
    }
}

export const addItemsSuccess = (data) => {
    return{
        type: act.ADD_ITEMS_OF_CUSTOMER_SUCCESS,
        payload: data
    }
}

export const addItemsError = (data) => {
    return{
        type: act.ADD_ITEMS_OF_CUSTOMER_ERROR,
        payload: data
    }
}


export const getItemsInitial = (data) => {
    return{
        type: act.GET_ITEMS_OF_CUSTOMER_INITIAL,
        payload: data
    }
}

export const getItemsSuccess = (data) => {
    return{
        type: act.GET_ITEMS_OF_CUSTOMER_SUCCESS,
        payload: data
    }
}

export const getItemsError = (data) => {
    return{
        type: act.GET_ITEMS_OF_CUSTOMER_ERROR,
        payload: data
    }
}


export const addMoneyInitial = (data) => {
    return{
        type: act.ADD_MONEY_OF_CUSTOMER_INITIAL,
        payload: data
    }
}

export const addMoneySuccess = (data) => {
    return{
        type: act.ADD_MONEY_OF_CUSTOMER_SUCCESS,
        payload: data
    }
}

export const addMoneyError = (data) => {
    return{
        type: act.ADD_MONEY_OF_CUSTOMER_ERROR,
        payload: data
    }
}

export const getMoneyInitial = (data) => {
    return{
        type: act.GET_MONEY_OF_CUSTOMER_INITIAL,
        payload: data
    }
}

export const getMoneySuccess = (data) => {
    return{
        type: act.GET_MONEY_OF_CUSTOMER_SUCCESS,
        payload: data
    }
}

export const getMoneyError = (data) => {
    return{
        type: act.GET_MONEY_OF_CUSTOMER_ERROR,
        payload: data
    }
}

export const searchText = (data) => {
    return{
        type: act.SEARCH_TEXT,
        payload: data
    }
}


export const changePasswordStatus = (data) => {
    return{
        type: act.CHNAGE_PASSWORD_STATUS,
        payload: data
    }
}
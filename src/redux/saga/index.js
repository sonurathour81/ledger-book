import * as act from '../actionType'
import * as fun from '../actions/index';
import { all, takeEvery, put ,call} from 'redux-saga/effects';
import {configDatabase} from '../../firebaseSetup';
import _ from 'lodash';
import { toast } from 'react-toastify';

const databaseLoginSignUp = configDatabase.database().ref("/login");
const databaseCustomerData = configDatabase.database().ref("/customers");
const databaseCustomerItem = configDatabase.database().ref("/customersItem");
const databaseCustomerMoney = configDatabase.database().ref("/customersMoney");

const getLoginSignUpData = () =>  new Promise(function(resolve, reject) {
    databaseLoginSignUp.on('value',snapshot=>{
        resolve(snapshot.val());
    })
});

const getCustomerData = () =>  new Promise(function(resolve, reject) {
    databaseCustomerData.on('value',snapshot=>{
        resolve(snapshot.val());
    })
});

const getCustomerItems = () =>  new Promise(function(resolve, reject) {
    databaseCustomerItem.on('value',snapshot=>{
        resolve(snapshot.val());
    })
});

const getCustomerAmount = () =>  new Promise(function(resolve, reject) {
    databaseCustomerMoney.on('value',snapshot=>{
        resolve(snapshot.val());
    })
});


export function* displayData(){
    try{
        const result = yield call(getLoginSignUpData)
        yield put(fun.displayDataSuccess(result))
    }catch(error){
        yield put(fun.displayDataError(error))
    }
}

export function* initialSignUpGen(data){
    try{
        let x = databaseLoginSignUp.push(data.payload);
        const out = { [x.key]: { ...data.payload }}
        yield put(fun.successSignUp(out))

    }catch(error){

        yield put(fun.errorSignUp(error))

    }

}

export function* initalUpdateuserProfile(data){
    try{
        const useRef = configDatabase.database().ref(`/login/${data.payload.key}`);
        useRef.update(data.payload);
        const temp = [{...data.payload}]
        localStorage.setItem("LogedUser",JSON.stringify(temp));
        yield put(fun.successUpdateUser(data))
    }catch(error){
        yield put(fun.errorUpdateUser(error))
    }
}

export function* initalChangeUserPassword(data){
    try{
        const useRef = configDatabase.database().ref(`/login/${data.payload.key}`);
        useRef.update(data.payload);
        const temp = [{...data.payload}]
        localStorage.setItem("LogedUser",JSON.stringify(temp));
        yield put(fun.successChangePasswordUser(data))
    }catch(error){
        yield put(fun.errorChangePasswordUser(error))
    }
}

export function* initialCustomerGen(data){
    try{
        let x = databaseCustomerData.push(data.payload);
        const out = { [x.key]: { ...data.payload, "customerId": x.key }}
        yield put(fun.successCustomerAdd(out))

    }catch(error){

        yield put(fun.errorCustomerAdd(error))

    }
}

export function* displayCustomerData(data){
    try{
        const result = yield call(getCustomerData)
        const getCustData =  _.map(result,(val,key)=>{
            return {...val, customerId:key}
        })
        const logedCustData = getCustData.filter((val)=>{
            if(val.logedUserId === data.payload){
                return val
            }            
        })
        yield put(fun.displayCustomerDataSuccess(logedCustData))
    }catch(error){
        yield put(fun.displayCustomerDataError(error))
    }
}

export function* deleteCustomer(data){
    try{
        // Delete customer of this id start
        const useRef = configDatabase.database().ref(`/customers/${data.payload.deleteId}`);
        useRef.remove();
        
        const allcust = yield call(getCustomerData)
        const getCustData =  _.map(allcust,(val,key)=>{
            return {...val, customerId:key}
        })
        const logedCustData = getCustData.filter((val)=>{
            if(val.logedUserId === data.payload.logedId){
                return val
            }            
        })
        // Delete customer of this id end

        // Delete customer items of this id start
        const allitems = yield call(getCustomerItems)
        
        const getCustDataitem =  _.map(allitems,(val,key)=>{
            return {...val, customerDataId:key}
        })

        const filteredCustomer = getCustDataitem.filter((val) => {
            if(val.customerId === data.payload.deleteId){
                return val
            }
        })

        filteredCustomer && filteredCustomer.map((val) => {
            const useRef = configDatabase.database().ref(`/customersItem/${val.customerDataId}`);
            return useRef.remove();
        })
        // Delete customer items of this id end

        // Delete customer Money of this id start
        const allMoney = yield call(getCustomerAmount)

        const getCustDataMoney =  _.map(allMoney,(val,key)=>{
            return {...val, customerMoneyId:key}
        })

        const filteredMoney = getCustDataMoney.filter((val) => {
            if(val.customerId === data.payload.deleteId){
                return val
            }
        })

        filteredMoney && filteredMoney.map((val) => {
            const useRef = configDatabase.database().ref(`/customersMoney/${val.customerMoneyId}`);
            return useRef.remove();
        })
        // Delete customer Money of this id end

        yield put(fun.deleteCustomerSuccess(logedCustData))
    } catch(error) {
        yield put(fun.deleteCustomerError(error))
    }
}

export function* updateCustomer(data){
    
    try{
        const {customerId,logedUserId} = data.payload;
        const useRef = configDatabase.database().ref(`/customers/${customerId}`);
        useRef.update(data.payload);
        
        const result = yield call(getCustomerData)
        const getCustData =  _.map(result,(val,key)=>{
            return {...val, customerId:key}
        })
        
        const logedCustData = getCustData.filter((val)=>{
            if(val.logedUserId === logedUserId){
                return val
            }            
        })
        yield put(fun.updateCustomerSuccess(logedCustData))
    } catch(error) {
        yield put(fun.updateCustomerError(error))
    }
}

export function* addItemsOfCustomer(data){
    try{
        
        const result = yield call(getCustomerItems)
        const getCustMoneyData =  _.map(result,(val,key)=>{
            return {...val, customerItemsId:key}
        })
        
        const xyz = getCustMoneyData.filter((val)=>{
            if(val.customerId === data.payload.customerId){
                return val
            }
        })
        
        let newObj2 = {};
        if(xyz.length > 0){
            xyz.map((val)=>{
                const newobj = [...val.totalItems, ...data.payload.totalItems]
                const temp = {customerId: val.customerId, totalItems: [...newobj]}
                const useRef = configDatabase.database().ref(`/customersItem/${val.customerItemsId}`);
                useRef.update(temp);
                newObj2 = {...temp, customerItemsId: val.customerItemsId }
            })
        }else{
            let x = databaseCustomerItem.push(data.payload);
            newObj2 = {...data.payload, customerItemsId: x.key }
        }
        
        yield put(fun.addItemsSuccess(newObj2))
    }catch(error){
        yield put(fun.addItemsError(error))
    }
}

export function* getItemsOfCustomer(data){
    try{
        const clickedCustomer = JSON.parse(localStorage.getItem("Clicked_User_Data")) || []
        const result = yield call(getCustomerItems)
        
        const getCustData =  _.map(result,(val,key)=>{
            return {...val, customerDataId:key}
        })

        const filteredCustomer = getCustData.filter((val) => {
            if(val.customerId === clickedCustomer.customerId){
                return val
            }
        })
        yield put(fun.getItemsSuccess(filteredCustomer))
    }catch(error){
        yield put(fun.getItemsError(error))
    }
}

export function* addMoneyofCustomer(data){
    try{
        const result = yield call(getCustomerAmount)
        const getCustMoneyData =  _.map(result,(val,key)=>{
            return {...val, customerMoneyId:key}
        })
        
        const xyz = getCustMoneyData.filter((val)=>{
            if(val.customerId === data.payload.customerId){
                return val
            }
        })
        
        let newObj2 = {};
        if(xyz.length > 0){
            xyz.map((val)=>{
                const newobj = [...val.totAmount, ...data.payload.totAmount]
                newObj2 = {customerId: val.customerId, totAmount: [...newobj]}
                const useRef = configDatabase.database().ref(`/customersMoney/${val.customerMoneyId}`);
                useRef.update(newObj2);
            })
        }else{
            databaseCustomerMoney.push(data.payload);
            newObj2 = { customerId: data.payload.customerId, totAmount: [...data.payload.totAmount] }
        }
        
        yield put(fun.addMoneySuccess(newObj2))
    }catch(error){
        yield put(fun.addMoneyError(error))
    }
}

export function* getMoneyofCustomer(data){
    try{
        const clickedCustomer = JSON.parse(localStorage.getItem("Clicked_User_Data")) || []
        const result = yield call(getCustomerAmount)
        const getCustMoneyData =  _.map(result,(val,key)=>{
            return {...val, customerMoneyId:key}
        })
        
        const finalRes = getCustMoneyData.filter((val)=>{
            if(val.customerId === clickedCustomer.customerId){
                return val
            }
        })

        yield put(fun.getMoneySuccess(finalRes))
    }catch(error){
        yield put(fun.getMoneyError(error))
    }
}

export function * watcherSaga(){
    yield takeEvery(act.CREATE_INITIAL_SIGNUP,initialSignUpGen);
    yield takeEvery(act.ON_FORM_DISPLAY_INITIAL,displayData);
    yield takeEvery(act.ADD_CUSTOMER_INITIAL,initialCustomerGen);
    yield takeEvery(act.DISPLAY_CUSTOMER_DATA_INITIAL,displayCustomerData);
    yield takeEvery(act.DELETE_CUSTOMER_INITIAL,deleteCustomer);
    yield takeEvery(act.UPDATE_CUSTOMER_INITIAL,updateCustomer);
    yield takeEvery(act.ADD_ITEMS_OF_CUSTOMER_INITIAL,addItemsOfCustomer);
    yield takeEvery(act.GET_ITEMS_OF_CUSTOMER_INITIAL,getItemsOfCustomer);
    yield takeEvery(act.ADD_MONEY_OF_CUSTOMER_INITIAL,addMoneyofCustomer);
    yield takeEvery(act.GET_MONEY_OF_CUSTOMER_INITIAL,getMoneyofCustomer);
    yield takeEvery(act.UPDATE_USER_PRFILE_INITIAL,initalUpdateuserProfile);
    yield takeEvery(act.CHANGE_USER_PASSWORD_INITIAL,initalChangeUserPassword);
}

export default function * rootSaga(){
    yield all([
        watcherSaga(),
    ])
}


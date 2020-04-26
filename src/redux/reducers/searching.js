import * as act from '../actionType'

const initial = {
    searchText: '',
}

export default (state= initial, action) => {
    switch(action.type){
        case act.SEARCH_TEXT:
            return {...state , searchText: action.payload};
            
        default:
            return state
    }
}
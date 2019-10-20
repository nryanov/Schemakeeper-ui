import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
import thunk from 'redux-thunk';
import {subjectList} from "./actions";

const logger = store => next => action => {
    console.groupCollapsed("dispatching", action.type);
    console.log("Previous state", store.getState());
    console.log("Action", action);
    let result = next(action);
    console.log("Next state", store.getState());
    console.groupEnd();
    return result;
};

let initialState = {
    page: 1,
    subjects: [],
    subjectsMeta: {},
    selectedSubject: null,
    lastException: null
};

const storeFactory = (state = initialState) => applyMiddleware(thunk, logger)(createStore)(
    reducer,
    state
);

const store = storeFactory();
store.dispatch(subjectList());

export default store;

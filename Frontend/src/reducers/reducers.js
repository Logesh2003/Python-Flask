// reducers.js
import {
    LOGIN_SUCCESS, LOGIN_FAILURE,
    FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE,
    ADD_EMPLOYEE_SUCCESS, ADD_EMPLOYEE_FAILURE
} from '../actions/Actions';

const initialState = {
    token: localStorage.getItem('token') || null,
    employees: [],
    error: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                token: null,
                error: action.payload,
            };
        case FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload,
                error: null,
            };
        case FETCH_EMPLOYEES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: [...state.employees, action.payload],
                error: null,
            };
        case ADD_EMPLOYEE_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;

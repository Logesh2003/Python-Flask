// actions.js
// Auth Actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Employee Actions
export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

export const ADD_EMPLOYEE_REQUEST = 'ADD_EMPLOYEE_REQUEST';
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const ADD_EMPLOYEE_FAILURE = 'ADD_EMPLOYEE_FAILURE';

// Action Creators
export const loginRequest = (userName, password) => ({
    type: LOGIN_REQUEST,
    payload: { userName, password },
});

export const fetchEmployeesRequest = () => ({
    type: FETCH_EMPLOYEES_REQUEST,
});

export const addEmployeeRequest = (employee) => ({
    type: ADD_EMPLOYEE_REQUEST,
    payload: employee,
});


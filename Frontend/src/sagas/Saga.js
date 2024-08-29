import { call, put, takeEvery,all } from 'redux-saga/effects';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    FETCH_EMPLOYEES_REQUEST, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE,
    ADD_EMPLOYEE_REQUEST, ADD_EMPLOYEE_SUCCESS, ADD_EMPLOYEE_FAILURE
} from '../actions/Actions';

const apiLogin = (userName, password) => {
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
    }).then(res => res.json());
};

const apiFetchEmployees = () => {
    return fetch('http://localhost:5000/employees',
        {
            method:'GET'
        }
    ).then(res => res.json());
};

const apiAddEmployee = (employee) => {
    return fetch('http://localhost:5000/addEmp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
    }).then(res => res.json());
};

function* handleLogin(action) {
    try {
        const response = yield call(apiLogin, action.payload.userName, action.payload.password);
        sessionStorage.setItem('token', response.token);
        yield put({ type: LOGIN_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, payload: error.message });
    }
    // try {
    //     const response = yield call(apiLogin, action.payload.userName, action.payload.password);
    //     if (response.status === 200 || response.status === 201) {
    //       yield put({ type: LOGIN_SUCCESS, payload: response });
    //     }
    //   } catch (error) {
    //     yield put({ type: LOGIN_FAILURE, payload: error.message });
    //   }
}

function* handleFetchEmployees() {
    try {
        const response = yield call(apiFetchEmployees);
        yield put({ type: FETCH_EMPLOYEES_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: FETCH_EMPLOYEES_FAILURE, payload: error.message });
    }
}

function* handleAddEmployee(action) {
    try {
        const response = yield call(apiAddEmployee, action.payload);
        yield put({ type: ADD_EMPLOYEE_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
    }
}

function* watchLogin() {
    yield takeEvery(LOGIN_REQUEST, handleLogin);
}

function* watchFetchEmployees() {
    yield takeEvery(FETCH_EMPLOYEES_REQUEST, handleFetchEmployees);
}

function* watchAddEmployee() {
    yield takeEvery(ADD_EMPLOYEE_REQUEST, handleAddEmployee);
}

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchFetchEmployees(),
        watchAddEmployee(),
    ]);
}

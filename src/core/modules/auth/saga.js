/* eslint-disable no-unused-vars */
import { put, call, fork, all, take } from 'redux-saga/effects';
import {
  SET_INITIAL_VALUE,
  POST_LOGIN_REQUEST,
  authActionCreators
} from 'core/modules/auth/actions';
import { restService } from 'utilities';

export function* asyncSetInitialValueRequest({ payload, resolve, reject }) {
  try {
    yield put(authActionCreators.setInitialValueSuccess({ ...payload }));
  } catch (e) {
    reject(e);
  }
}

export function* asyncPostLoginRequest({ payload, resolve, reject }) {
  const { email, password } = payload;
  try {
    const response = yield call(restService, {
      api: '',
      method: 'post',
      params: { email, password },
      third_party: false
    });
    if (!response.status === 200) {
      yield put(authActionCreators.loginSuccess({ user: response.data }));
      resolve(response);
    } else {
      reject(response);
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchSetInitialValueRequest() {
  while (true) {
    const action = yield take(SET_INITIAL_VALUE);
    yield* asyncSetInitialValueRequest(action);
  }
}

export function* watchPostLoginRequest() {
  while (true) {
    const action = yield take(POST_LOGIN_REQUEST);
    yield* asyncPostLoginRequest(action);
  }
}

export default function*() {
  yield all([fork(watchSetInitialValueRequest), fork(watchPostLoginRequest)]);
}

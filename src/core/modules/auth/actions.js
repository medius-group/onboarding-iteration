import { createAction } from 'redux-actions';
import { createPromiseAction } from 'core/modules/utils';

/**
 * Action Types
 */
export const SET_INITIAL_VALUE = '@auth/SET_INITIAL_VALUE';
export const SET_INITIAL_VALUE_SUCCESS = '@auth/SET_INITIAL_VALUE_SUCCESS';
export const POST_LOGIN_REQUEST = '@auth/POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = '@auth/POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = '@auth/POST_LOGIN_FAILURE';

/**
 * Action Creators
 */
export const authActionCreators = {
  setInitialValue: createPromiseAction(SET_INITIAL_VALUE),
  setInitialValueSuccess: createPromiseAction(SET_INITIAL_VALUE_SUCCESS),
  login: createPromiseAction(POST_LOGIN_REQUEST),
  loginSuccess: createAction(POST_LOGIN_SUCCESS),
  loginFailure: createAction(POST_LOGIN_FAILURE)
};

import axios from 'axios';
import {browserHistory} from 'react-router';
import * as types from './types';

const ROOT_URL = 'http://localhost:3000';

export const signinUser = ({email, password}) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password})
      .then(response => {
        dispatch({type: types.AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })     
      .catch(error => {
        dispatch(authError('Bad Login info'));
      });
  }
};

export const signupUser = ({email, password}) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password})
      .then(response => {
        dispatch({type: types.AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })     
      .catch(response => {
        dispatch(authError(response.response.data.error));
      });
  }
};

export const authError = (error) => ({
  type: types.AUTH_ERROR,
  payload: error
});

export const signoutUser = () => {
  localStorage.removeItem('token');
  return {
    type: types.UNAUTH_USER
  }
}

export const fetchMessage = () => {
  return (dispatch) => {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then(response => dispatch({
      type: types.FETCH_MESSAGE,
      payload: response.data
    }));
  }
}
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

      });
  }
};
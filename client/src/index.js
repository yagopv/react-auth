import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {App, Signin, Signout, Signup, Feature, RequireAuth, Welcome} from './components';
import * as actions from './actions/types';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const token = localStorage.getItem('token');

if (token) {
  store.dispatch({
    type: actions.AUTH_USER
  })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}></IndexRoute>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/signout" component={Signout}></Route>
        <Route path="/signup" component={Signup}></Route>        
        <Route path="/feature" component={RequireAuth(Feature)}></Route>        
      </Route>      
    </Router>
  </Provider>
  , document.querySelector('.container'));

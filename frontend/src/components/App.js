import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertTemplate from 'react-alert-template-basic';
import { transitions, Provider as AlertProvider } from 'react-alert';
import { HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';


import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import Login from './accounts/Login';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';


//Alert options
const alertOptions = {
    timeout:3000,
    position:'top center',
    transition: transitions.SCALE
};


class App extends Component  {

    componentDidMount() {
       
        store.dispatch(loadUser());
    }

   render() {
       return (
           <Provider store={store}>
               <AlertProvider template={AlertTemplate} {...alertOptions}>
                 <Router>
                   <React.Fragment>
                       <Header />
                       <Alerts />
                           <div className="container">
                               <Switch>
                                   <PrivateRoute exact path="/" component={Dashboard} />
                                   <Route exact path="/register" component={Register} />
                                   <Route exact path="/login" component={Login} /> 
                               </Switch>
                           </div>
                       </React.Fragment>
                   </Router>
           </AlertProvider>
          </Provider>
       )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect } from 'react';

import './App.css';
import Navbar from './Components/layout/Navbar';
import Landing from './Components/layout/Landing';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Alert from './Components/layout/Alert';
import Dashboard from './Components/dashboard/Dashboard';
import PrivateRoute from './Components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" Component={Landing} />

            <Route exact path="/register" Component={Register} />
            <Route exact path="/login" Component={Login} />

            <Route element={<PrivateRoute />}>
              <Route exact path="/dashboard" Component={Dashboard} />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

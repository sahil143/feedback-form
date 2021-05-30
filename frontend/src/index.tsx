import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Details from './components/details/Details';
import Form from './components/Form';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path={['/feedbacks/:id', '/feedbacks']} component={Details} />
        <Route path="/" component={Form} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

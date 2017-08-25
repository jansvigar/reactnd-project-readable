import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../containers/App';

const routes = (
  <BrowserRouter>
    <Route exact path="/" component={App} />
  </BrowserRouter>
);

export default routes;

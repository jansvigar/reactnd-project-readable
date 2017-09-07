import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostsListContainer from '../containers/PostsListContainer';
import CategoriesListContainer from '../containers/CategoriesListContainer';
import PostFormModal from '../containers/PostFormModal';
import { Header, Footer, Sidebar } from '../components/Layouts';
import '../index.css';

const DefaultLayout = ({ component: Component, showSidebar = 'false', ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <div className="app">
        <Header />
        <div className="app-container">
          {showSidebar === 'true' &&
            (<Sidebar>
              <CategoriesListContainer {...matchProps} />
            </Sidebar>)}
          <div className="inner-container">
            <Component {...matchProps} />
          </div>
        </div>
        <Footer />
      </div>
    )}
  />
);

DefaultLayout.propTypes = {
  component: PropTypes.func.isRequired,
  showSidebar: PropTypes.string,
};

const routes = (
  <BrowserRouter>
    <Switch>
      <DefaultLayout
        exact
        path="/posts/new"
        showSidebar="true"
        component={PostFormModal}
      />
      <DefaultLayout
        exact
        path="/:category?"
        showSidebar="true"
        component={PostsListContainer}
      />
      <Route><div>Error</div></Route>
    </Switch>
  </BrowserRouter>
);

export default routes;

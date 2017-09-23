import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostsListContainer from '../containers/PostsListContainer';
import CategoriesListContainer from '../containers/CategoriesListContainer';
import PostFormModal from '../containers/PostFormModal';
import PostDetailModal from '../containers/PostDetailModal';
import { Header, Footer, Sidebar } from '../components/Layouts';
import '../index.css';

const DefaultLayout = ({ component: Component, showSidebar = 'false', isModal = 'false', ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      const prevLocationState = matchProps.location.state;
      const prevMatchProps = prevLocationState ? {
        location: prevLocationState.prevPath,
        match: prevLocationState.prevMatch,
      } : matchProps;
      return (
        <div className="app">
          <Header />
          <div className="app-container">
            {showSidebar === 'true' &&
            (<Sidebar>
              <CategoriesListContainer {...matchProps} />
            </Sidebar>)}
            <div className="inner-container">
              {isModal === 'true' ?
                (
                  <div>
                    <PostsListContainer {...prevMatchProps} />
                    <Component {...matchProps} />
                  </div>
                )
                : <Component {...matchProps} />
              }

            </div>
          </div>
          <Footer />
        </div>
      );
    }}
  />
);

DefaultLayout.propTypes = {
  component: PropTypes.func.isRequired,
  showSidebar: PropTypes.string,
  isModal: PropTypes.string,
};

const routes = (
  <BrowserRouter>
    <Switch>
      <DefaultLayout
        exact
        path="/posts/new"
        showSidebar="true"
        isModal="true"
        component={PostFormModal}
      />
      <DefaultLayout
        exact
        path="/posts/:id/edit"
        showSidebar="true"
        isModal="true"
        component={PostFormModal}
      />
      <DefaultLayout
        exact
        path="/"
        showSidebar="true"
        component={PostsListContainer}
      />
      <DefaultLayout
        exact
        path="/:category"
        showSidebar="true"
        component={PostsListContainer}
      />
      <DefaultLayout
        exact
        path="/:category/:id"
        showSidebar="true"
        isModal="true"
        component={PostDetailModal}
      />
      <Route><div>Error</div></Route>
    </Switch>
  </BrowserRouter>
);

export default routes;

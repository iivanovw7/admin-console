import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import ContentLayout from './layouts/contentLayout';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route  {...rest} render={props => {
     if(authenticated) {
       return (
         <ContentLayout>
           <Component {...props} />
         </ContentLayout>
       );
     } return <Redirect to='/'/>;
    }}/>
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.user.authenticated
});

export default connect(mapStateToProps)(PrivateRoute);

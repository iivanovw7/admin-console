import { Paper, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRoles } from '../actions/roles';
import RolesContainer from '../components/Roles/RolesContainer';
import AddNewButton from '../components/UI/AddButton';
import { PageSelector } from '../components/UI/PageSelector';
import { Wrapper } from '../components/UI/ThemeProperties';
import Spinner from '../components/UI/Spinner';

const Roles = props => {
  const { classes, history } = props;
  const limit = 8; //default limit of elements for current page

  //current page number
  const [currentPage, setCurrentPage] = useState(props.roles.list.page);
  const list = props.roles.list.output; //list of elements fetched

  useEffect(() => {
    props.dispatch(getRoles(currentPage, limit, history));
  }, [currentPage]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.controlsContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Roles</h2>
          </div>
          <AddNewButton history={history} element={'roles'}/>
        </Paper>
        {(!list) ? (<Spinner />) : (<RolesContainer dispatch={props.dispatch}/>)}
      </div>
      <br/>
      <Paper className={classes.controlsContainer}>
        <div/>
        <PageSelector classes={classes} data={props.roles} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Roles.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { roles: state.roles };
}

export default connect(mapStateToProps, { getRoles })(withStyles(Wrapper, { withTheme: true })(withRouter(Roles)));



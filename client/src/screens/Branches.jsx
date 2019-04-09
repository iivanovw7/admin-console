import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBranches } from '../actions/branches';
import BranchesContainer from '../components/Branches/BranchesContainer';
import AddNewButton from '../components/UI/AddButton';
import { PageSelector } from '../components/UI/PageSelector';
import { Wrapper } from '../components/UI/ThemeProperties';
import Spinner from '../components/UI/Spinner';
import RolesContainer from './Roles';

const Branches = props => {
  const { classes, history } = props;
  const limit = 7; //default limit of elements for current page

  //current page number
  const [currentPage, setCurrentPage] = useState(props.branches.list.page);
  const branches = props.branches.list.output; //list of elements fetched

  useEffect(() => {
    props.dispatch(getBranches(currentPage, limit, history));
  }, [currentPage]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.titleContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Branches</h2>
          </div>
          <AddNewButton history={history} element={'branches'}/>
        </Paper>
        {!branches ? <Spinner /> : <BranchesContainer branches={branches} page={currentPage} limit={limit} dispatch={props.dispatch}/>}
      </div>
      <Paper className={classes.controlsContainer} style={{marginTop: '24px', marginBottom: '24px'}}>
        <p style={{color: 'red'}}>{props.errorMessage}</p>
        <PageSelector classes={classes} data={props.branches} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Branches.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    branches: state.branches,
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
  };
}

export default connect(mapStateToProps, { getBranches })(withStyles(Wrapper, { withTheme: true })(withRouter(Branches)));


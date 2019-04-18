import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBranches } from '../actions';
import BranchesContainer from '../components/Branches/BranchesContainer';
import AddNewButton from '../components/UI/ButtonAddNew';
import { PageSelector } from '../components/UI/PageSelector';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';

const Branches = props => {
  const { classes, history, dispatch } = props;
  const limit = 7; //default limit of elements for current page

  //current page number
  const [currentPage, setCurrentPage] = useState(props.branches.list.page);
  const branches = props.branches.list.output; //list of elements fetched

  useEffect(() => {
    props.dispatch(getBranches(currentPage, limit, history));
  }, [currentPage, limit]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  const renderBranchesContainer = () => (
    <BranchesContainer
      branches={branches}
      page={currentPage}
      limit={limit}
      dispatch={dispatch}
    />
  );

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.titleContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Branches</h2>
          </div>
          <AddNewButton history={history} element={'branches'}/>
        </Paper>
        {!branches || branches.length > limit ? <Spinner/> : renderBranchesContainer()}
      </div>
      <Paper
        className={classes.controlsContainer}
        style={{ marginTop: '24px', marginBottom: '24px' }}
      >
        <div/>
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
    branches: state.branches
  };
}

export default connect(mapStateToProps, { getBranches })(withStyles(Wrapper, { withTheme: true })(withRouter(Branches)));


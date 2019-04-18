import { List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Buttons } from '../UI/ThemeProperties';
import { TopInfoBarElement } from './TopInfoBarElement';

export const TopInfoBar = props => {

  const { viewBranch, viewMode, viewGroup } = props;

  return (
    <List style={{ paddingTop: 0, paddingBottom: 0, flexDirection: 'row', display: 'flex' }}>
      <TopInfoBarElement title={'View'} icon={'view_module'} view={viewMode} {...props}/>
      {viewGroup && (
        <TopInfoBarElement title={'Group'} icon={'business_center'} view={viewGroup} {...props}/>
      )}
      {viewBranch && (
        <TopInfoBarElement title={'Branch'} icon={'location_city'} view={viewBranch} {...props}/>
      )}
    </List>
  );
};

TopInfoBar.propTypes = {
  classes: PropTypes.object.isRequired,
  viewBranch: PropTypes.string,
  viewGroup: PropTypes.string,
  viewMode: PropTypes.string.isRequired
};

export default withStyles(Buttons, { withTheme: true })(TopInfoBar);
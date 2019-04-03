import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import logo from '../../../logo.svg';
import NoSsr from '@material-ui/core/NoSsr';
import { NavigationStyles } from '../ThemeProperties';
import { DrawerNavigationItem } from './DrawerNavigationItem';
import { withStyles } from '@material-ui/core/styles';

const DrawerNavigation = props => {

  const { classes } = props;

  const items = [
    { title: 'Statistics', icon: 'timeline', link: '/statistics' },
    { title: 'Staff', icon: 'star', link: '/staff' },
    { title: 'Roles', icon: 'people', link: '/roles' },
    { title: 'Messages', icon: 'chat', link: '/messages' },
    { title: 'Tickets', icon: 'live_help', link: '/tickets' },
    { title: 'Groups', icon: 'business_center', link: '/groups' },
    { title: 'Branches', icon: 'location_city', link: '/branches' }
  ];

  return (
    <div>
      <div className={classes.toolbar}>
        <img src={logo} className="App-logo" alt="logo"/>
      </div>
      <Divider/>
      <NoSsr>
        <List>
          {items.map(item => (
            <DrawerNavigationItem
              key={item.title}
              text={item.title}
              icon={item.icon}
              link={item.link}
              classes={classes}
            />
          ))}
        </List>
      </NoSsr>
      <Divider/>
    </div>
  );
};

DrawerNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(NavigationStyles, { withTheme: true })(DrawerNavigation);




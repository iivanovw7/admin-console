import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Typography } from '@material-ui/core';

const Messages = props => {

  const { classes, history } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <h2>Messages</h2>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
        elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
        hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
        velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
        Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
        viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
        sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
        In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
      </Typography>
    </main>
  );
};

Messages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Messages;




import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Statistics from './screens/Statistics';
import Messages from './screens/Messages';
import Branches from './screens/Branches';
import Users from './screens/Users';
import Roles from './screens/Roles';
import Groups from './screens/Groups';
import Tickets from './screens/Tickets';
import Login from './screens/Login';

export default (
  <Switch>
    <Route exact path={'/'} component={(Login)}/>
    <Route path={'/statistics'} component={(Statistics)}/>
    <Route path={'/messages'} component={(Messages)}/>
    <Route path={'/staff'} component={(Users)}/>
    <Route path={'/roles'} component={(Roles)}/>
    <Route path={'/groups'} component={(Groups)}/>
    <Route path={'/branches'} component={(Branches)}/>
    <Route path={'/tickets'} component={(Tickets)}/>
  </Switch>
);


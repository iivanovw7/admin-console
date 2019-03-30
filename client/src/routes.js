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
import requireAuth from './authentication/RequireAuth';

export default (
  <Switch>
    <Route exact path={'/'} component={(Login)}/>
    <Route path={'/statistics'} component={requireAuth(Statistics)}/>
    <Route path={'/staff'} component={requireAuth(Users)}/>
    <Route path={'/roles'} component={requireAuth(Roles)}/>
    <Route path={'/messages'} component={requireAuth(Messages)}/>
    <Route path={'/tickets'} component={requireAuth(Tickets)}/>
    <Route path={'/groups'} component={requireAuth(Groups)}/>
    <Route path={'/branches'} component={requireAuth(Branches)}/>
  </Switch>
);


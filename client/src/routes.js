import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Branch from './screens/Branch';
import Branches from './screens/Branches';
import Group from './screens/Group';
import Groups from './screens/Groups';
import Login from './screens/Login';
import Message from './screens/Message';
import Messages from './screens/Messages';
import Role from './screens/Role';
import Roles from './screens/Roles';
import Statistics from './screens/Statistics';
import Ticket from './screens/Ticket';
import Tickets from './screens/Tickets';
import User from './screens/User';
import Users from './screens/Users';

const NoMatch = ({ location }) => (
  <div>
    <h3><code>{location.pathname}</code> not found!</h3>
  </div>
);

export default (
  <Switch>
    <Route exact path={'/'} component={Login}/>
    <PrivateRoute path={'/statistics'} component={Statistics}/>
    <PrivateRoute path={'/users/:id'} component={User}/>
    <PrivateRoute path={'/users/new'} component={User}/>
    <PrivateRoute path={'/users'} component={Users}/>
    <PrivateRoute path={'/messages/:id'} component={Message}/>
    <PrivateRoute path={'/messages/new'} component={Message}/>
    <PrivateRoute path={'/messages'} component={Messages}/>
    <PrivateRoute path={'/tickets/:id'} component={Ticket}/>
    <PrivateRoute path={'/tickets'} component={Tickets}/>
    <PrivateRoute path={'/roles/:id'} component={Role}/>
    <PrivateRoute path={'/roles/new'} component={Role}/>
    <PrivateRoute path={'/roles'} component={Roles}/>
    <PrivateRoute path={'/groups/:id'} component={Group}/>
    <PrivateRoute path={'/groups/new'} component={Group}/>
    <PrivateRoute path={'/groups'} component={Groups}/>
    <PrivateRoute path={'/branches/:id'} component={Branch}/>
    <PrivateRoute path={'/branches/new'} component={Branch}/>
    <PrivateRoute path={'/branches'} component={Branches}/>
    <Route component={NoMatch}/>
  </Switch>
);


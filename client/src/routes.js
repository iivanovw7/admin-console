import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loginLayout from './layouts/loginLayout';
import protectedContent from './layouts/protectedContent';
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
    <Route exact path={'/'} component={loginLayout(Login)}/>
    <Route path={'/statistics'} component={protectedContent(Statistics)}/>
    <Route path={'/users/:id'} component={protectedContent(User)}/>
    <Route path={'/users/new'} component={protectedContent(User)}/>
    <Route path={'/users'} component={protectedContent(Users)}/>
    <Route path={'/messages/:id'} component={protectedContent(Message)}/>
    <Route path={'/messages/new'} component={protectedContent(Message)}/>
    <Route path={'/messages'} component={protectedContent(Messages)}/>
    <Route path={'/tickets/:id'} component={protectedContent(Ticket)}/>
    <Route path={'/tickets'} component={protectedContent(Tickets)}/>
    <Route path={'/roles/:id'} component={protectedContent(Role)}/>
    <Route path={'/roles/new'} component={protectedContent(Role)}/>
    <Route path={'/roles'} component={protectedContent(Roles)}/>
    <Route path={'/groups/:id'} component={protectedContent(Group)}/>
    <Route path={'/groups/new'} component={protectedContent(Group)}/>
    <Route path={'/groups'} component={protectedContent(Groups)}/>
    <Route path={'/branches/:id'} component={protectedContent(Branch)}/>
    <Route path={'/branches/new'} component={protectedContent(Branch)}/>
    <Route path={'/branches'} component={protectedContent(Branches)}/>
    <Route component={NoMatch}/>
  </Switch>
);

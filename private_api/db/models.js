const mongoose = require("mongoose");



//model for website users
const userSchema = mongoose.Schema({

  _id:         mongoose.Schema.Types.ObjectId,
  email:       {type: String,  required: true},
  phone:       {type: String,  required: true},
  password:    {type: String,  required: true},
  name:        {type: String,  required: true},
  surname:     {type: String,  required: true},
  branch:      {type: String,  required: true},
  group:       {type: String,  required: true},
  created:     {type: Date,    required: true},
  status:      {type: Boolean, required: true},
  permissions: {type: String,  required: false},

});

const ticketSchema = mongoose.Schema({

  _id:         mongoose.Schema.Types.ObjectId,
  message:     {type: String,  required: true},
  note:        {type: String,  required: true},
  status:      {type: String,  required: true},
  created:     {type: Date,    required: true},

});

const messageSchema = mongoose.Schema({

  _id:         mongoose.Schema.Types.ObjectId,
  subject:     {type: String,  required: true},
  message:     {type: String,  required: true},
  created:     {type: Date,    required: true},

});

const branchSchema = mongoose.Schema({

  _id:         mongoose.Schema.Types.ObjectId,
  name:        {type: String,  required: true},
  phone:       {type: String,  required: true},
  fax:         {type: String,  required: true},
  address:     {type: String,  required: true},
  information: {type: String,  required: true},
  status:      {type: Boolean, required: true},
  //number of employees ???

});

const groupSchema = mongoose.Schema({

  _id:          mongoose.Schema.Types.ObjectId,
  status:      {type: Boolean, required: true},
  description: {type: String,  required: true},
  //available for permissions ???

});

const roleSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  name:        {type: String,  required: true},
  code:        {type: String,  required: true},
  description: {type: String,  required: true},
  active:      {type: Boolean, required: true},

});

const clientSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

});

const user = mongoose.model('User', userSchema, 'users');
const ticket = mongoose.model('Ticket', ticketSchema, 'tickets');
const message = mongoose.model('Message', messageSchema, 'messages');
const branch = mongoose.model('Branch', branchSchema, 'branches');
const group = mongoose.model('Group', groupSchema, 'groups');
const role = mongoose.model('Role', roleSchema, 'roles');
const client = mongoose.model('Client', clientSchema, 'clients');

module.exports = {
  user: user,
  ticket: ticket,
  message: message,
  branch: branch,
  group: group,
  role: role,
  client: client
};
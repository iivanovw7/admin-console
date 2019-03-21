import mongoose from 'mongoose';

/** Stores information about changes performed with objects in db by users */
const historySchema = mongoose.Schema({

  //action authors`s id, stores id of user performed an action
  actionAuthor: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

  //action target model`s id, stores id of changed model
  actionTargetModel: String,

  //target id, stores id of object which was changes
  actionTarget: { type: mongoose.Schema.ObjectId, required: true },

  //tye of action performed: Update, Delete, Add
  actionType: String,

  //timestamp
  created: { type: Date, default: Date.now },

  //fields changed in object
  actionChanges: {}

});

export default mongoose.model('History', historySchema, 'history');

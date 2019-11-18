import mongoose from 'mongoose';

/**
 * Stores information about changes performed with objects in db by users
 *
 * actionAuthor: action authors`s id, stores id of user performed an action
 * actionTargetModel: action target model`s id, stores id of changed model
 * actionTarget: target id, stores id of object which was changes
 * actionType: type of action performed: Update, Delete, Add
 * created: timestamp
 * actionChanges: fields changed in object
 *
 */
const historySchema = mongoose.Schema({
  actionAuthor: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  actionTargetModel: String,
  actionTarget: { type: mongoose.Schema.ObjectId, required: true },
  actionType: String,
  created: { type: Date, default: Date.now() },
  actionChanges: {}
});

export default mongoose.model('History', historySchema, 'history');

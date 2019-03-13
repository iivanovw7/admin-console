import httpStatus from 'http-status';
import Group from '../../db/models/Group';
import User from '../../db/models/User';
import { defaultGroups } from '../config/param-groups';
import { catchErrors, formPage, checkElement } from './helper-functions';

/**
 * Function changes removed Group
 * and add Other group to users
 *
 * @param req
 * @param res
 * @param next
 * @param params
 *
 * @returns
 * { Removed: oldGroup },
 * { NewGroup: group },
 * { Changes: result }
 */
function swap(req, res, next, params) {

  catchErrors(
    Group.findOne({ name: 'Other' })
         .then(group => {

           if (!group) {
             return res.send(httpStatus.INTERNAL_SERVER_ERROR);
           }

           User.updateMany(
             { group: { _id: req.params.id } },
             { $set: { group: { _id: group._id } } })
               .then(result => {
                 res.json(
                   [
                     { requestGroupId: req.params.id },
                     { removedGroup: params.removedGroup },
                     { newGroup: group },
                     { changes: result }
                   ]
                 );
               }).catch(e => next(e));
         }).catch(e => next(e))
  );
}


/**
 * Get full Groups list.
 * @returns {groups[]}
 *
 */
const list = async (req, res) => {
  const groups = await Group.find({});

  if (groups) {
    res.json(groups);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }

};

/**
 * Function creates new Group if it doesn`t exists in db
 *
 * @requires name: req.headers.name,
 * @requires description: req.headers.description,
 * @requires status: req.headers.status,
 *
 * @param req
 * @param res
 *
 * @returns
 * {Group}
 */
const add = async (req, res) => {

  const group = await Group.findOne({
    name: req.headers.name,
    description: req.headers.description
  });

  // If another object with same parameters exists,
  // returns error
  if (group) {
    return res.send(httpStatus.BAD_REQUEST);
  } else {

    //If not - create new object
    const newGroup = await new Group({
      name: req.headers.name,
      description: req.headers.description,
      status: req.headers.status
    });

    //Saving new object in to collection
    const savedGroup = await newGroup.save();

    if (savedGroup) {
      res.status(201).json(savedGroup);
    } else {
      return res.send(
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

};

/**
 * Get group
 * @requires {objectId} id: req.params.id
 * @returns {group, [users]}
 */
const get = async (req, res) => {

  const group = await Group.findOne({ _id: req.params.id });

  if (group) {
    res.json(group);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }

};

/**
 * Update existing group
 *
 * @requires name: req.headers.name
 * @requires description: req.headers.description
 * @requires permissions: req.headers.permissions
 * @requires status: req.headers.status
 *
 * @returns {Group} Returns updated group
 */
const update = async (req, res) => {

  const group = await Group.findOne({ _id: req.params.id });

  if (!group) {
    res.send(httpStatus.NOT_FOUND);
  } else {

    const data = {
      name: req.headers.name,
      status: req.headers.status,
      permissions: req.headers.permission,
      description: req.headers.description
    };

    const updatedGroup = await
      Group.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
      );

    res.json(updatedGroup);
  }
};

/**Get one page of groups
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
const page = async (req, res) => {

  const groups = await Group.find({});

  if (groups) {
    const page = await formPage(req.headers.page, req.headers.limit, groups);
    res.json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};


/**
 * Deletes group, removes all same groups in Users list
 * @requires {objectId} id: req.params.id
 * @param {objectId} req.headers.group
 * @returns swap(req,res,next,{removedGroup: removedGroup});
 * (Calls swap groups function to change deleted group to 'Other'
 * )
 */
const remove = async (req, res, next) => {

  const group = await Group.findOne({ _id: req.params.id });

  if (!group) {
    res.send(httpStatus.BAD_REQUEST);
  } else {
    if (!checkElement(group.name, defaultGroups)) {
      const removedGroup = await Group.findByIdAndRemove({ _id: req.params.id });
      if (removedGroup) {
        return swap(req, res, next, { removedGroup: removedGroup });
      } else {
        res.send(httpStatus.NOT_FOUND);
      }
    }
  }
};


export { get, list, add, update, page, remove };


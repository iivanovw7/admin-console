import httpStatus from 'http-status';
import Group from '../../db/models/Group';
import User from '../../db/models/User';
import { defaultGroups } from '../config/param-groups';

import { catchErrors, formPage } from './helper-functions/index';

//function checks if group status belongs to list of default groups
function checkGroup(group) {
  for (const mainGroup of defaultGroups) {
    if (mainGroup === group.name) {
      return true;
    }
  }
  return false;
}

/**
 * Function changes removed Group to Other
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
                     { RequestGroupId: req.params.id },
                     { RemovedGroup: params.removedGroup },
                     { NewGroup: group },
                     { Changes: result }
                   ]
                 );
               }).catch(e => next(e));
         })
         .catch(e => next(e))
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
  // return error
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
      res.status(201).json(
        { Created: savedGroup }
      );
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

  const group = await
    Group.findOne({ _id: req.params.id });

  if (group) {
    const users = await User.find({ group: req.params.id });
    res.json(users);
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

  if (group) {

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
  } else {
    res.send(httpStatus.NOT_FOUND);
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


/**TODO REMOVE AND SWITCH Groups
 /**
 * Deletes group, removes all same groups in Users list
 * @requires {objectId} id: req.params.id
 * @param {objectId} req.headers.group
 * @returns swap(req,res,next,{removedGroup: removedGroup});
 * (Calls swap groups function to change deleted group to 'Other'
 * )
 */
const remove = async (req, res) => {
  const group = await Group.findOne({ _id: req.params.id });

  if (group) {
    if (!checkGroup(group)) {
      const removeGroup = await Group.findOneAndDelete();
    }
  } else {

  }


};

// /**
//  * Deletes role, removes all same roles in Users list
//  * @requires {objectId} id: req.params.id
//  * @param {objectId} req.headers.role
//  * another role Id, to change Users roles
//  * @returns swapRoles(req,res,next,{removedRole: removedRole});
//  * (Calls swap roles function to change deleted role to another one,
//  * if role parameter passed in headers, if not - removes roles)
//  * )
//  */
// const remove = async (req, res, next) => {
//
//   const role = await Role.findOne({ _id: req.params.id });
//
//   if (role) {
//     if (!checkRole(role)) {
//       const removedRole = await
//         Role.findByIdAndRemove(
//           { _id: req.params.id }
//         );
//       if (removedRole) {
//         return (
//           swap(
//             req,
//             res,
//             next,
//             { removedRole: removedRole }
//           )
//         )
//       } else {
//         return res.send(httpStatus.NOT_FOUND);
//       }
//     } else {
//       res.send(httpStatus.BAD_REQUEST);
//     }
//   } else {
//     res.send(httpStatus.NOT_FOUND);
//   }
// };


export { get, list, add, update, page, remove };


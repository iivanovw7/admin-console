import httpStatus from 'http-status';
import Group from '../../models/Group';
import User from '../../models/User';
import { defaultGroups } from '../config/param-controllers';
import { getAsPage, ifArrayContains } from '../helper-functions';

/**
 * Function is called after removing a group,
 * passes through users of removed group and changes their group to Other
 *
 * @param req
 * @param res
 * @param params
 *
 * @returns
 * { requestGroupId: req.params.id },
 * { removedGroup: params.removedGroup },
 * { newGroup: role },
 * { changes: result }
 */
function swapGroups(req, res, params) {
  Group.findOne({ name: 'Other' })
       .then(group => {

         if (!group) {
           return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
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
             }).catch(e => res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR));
       }).catch(e => res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR));
}

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
const addGroup = async (req, res) => {

  const group = await Group.findOne({
    name: req.body.name,
    description: req.body.description
  });

  // If another object with same parameters exists,
  // returns error
  if (group) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  } else {

    //If not - create new object
    const newGroup = await new Group({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    });

    //Saving new object in to collection
    const savedGroup = await newGroup.save();

    if (savedGroup) {
      res.status(201).json(savedGroup);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }

};

/**
 * Get group
 * @requires {objectId} id: req.params.id
 * @returns {group, [users]}
 */
const getGroup = async (req, res) => {

  const group = await Group.findOne({ _id: req.params.id });

  if (group) {
    res.json(group);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**
 * Update existing group
 *
 * @requires name: req.body.name
 * @requires description: req.body.description
 * @requires permissions: req.body.permissions
 * @requires status: req.body.status
 *
 * @returns {Group} Returns updated group
 */
const updateGroup = async (req, res) => {

  const group = await Group.findOne({ _id: req.params.id });

  if (!group) {
    res.sendStatus(httpStatus.NOT_FOUND);
  } else {

    const data = {
      name: req.body.name,
      status: req.body.status,
      permissions: req.body.permission,
      description: req.body.description
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

/**
 * Get one listRoles of groups
 * @headers {number} listRoles: req.headers.listRoles
 * @headers {number} limit: req.headers.limit
 *
 */
const listGroups = async (req, res) => {

  const groups = await Group.find({});

  if (groups) {

    const page = req.headers.page && req.headers.limit
      ? await getAsPage(req.headers.page, req.headers.limit, groups)
      : groups;

    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**
 * Deletes group, removes all same groups in Users list
 *
 * @requires  {objectId} id: req.params.id
 * @param     {objectId} req.headers.group
 * @returns   swap(req,res,next,{removedGroup: removedGroup});
 * (Calls swap groups function to change deleted group to 'Other')
 */
const removeGroup = async (req, res) => {

  const group = await Group.findOne({ _id: req.params.id });

  if (!group) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  } else {
    if (!ifArrayContains(group.name, defaultGroups)) {
      const removedGroup = await Group.findByIdAndRemove({ _id: req.params.id });
      if (removedGroup) {
        return swapGroups(req, res, { removedGroup: removedGroup });
      } else {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    }
  }
};

export { getGroup, listGroups, addGroup, updateGroup, removeGroup };


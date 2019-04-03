import httpStatus from 'http-status';
import Group from '../../models/Group';
import User from '../../models/User';
import { defaultGroups } from '../config/constants.config';
import { ifArrayContains } from '../helper-functions';

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
 * @requires name: req.query.name,
 * @requires description: req.query.description,
 * @requires status: req.query.status,
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
 * @query {number} listRoles: req.query.listRoles
 * @query {number} limit: req.query.limit
 *
 */
const listGroups = async (req, res) => {

  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const findPromise = Group.find({})
                           .skip(skipped)
                           .limit(limit);

  const countPromise = Group.countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (!output && results === 0) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  res.json({
    page,
    limit,
    pages,
    results,
    output
  });
};

/**
 * Deletes group, removes all same groups in Users list
 *
 * @requires  {objectId} id: req.params.id
 * @param     {objectId} req.query.group
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


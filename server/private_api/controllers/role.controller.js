import httpStatus from 'http-status';
import Role from '../../models/Role';
import User from '../../models/User';
import { defaultRoles, mainRoles } from '../config/constants.config';
import { ifArrayContains } from '../helper-functions';

/**
 * Function is called after removing a role,
 * passes through users of removed role and changes their role to USER
 *
 * @param req
 * @param res
 * @param params
 *
 * @returns
 * { requestRoleId: req.params.id },
 * { removedRole: params.removedRole },
 * { newRole: role },
 * { changes: result }
 */
function swapRoles(req, res, params) {
  Role.findOne({ code: 'USER' })
      .then(role => {
        if (!role) {
          return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        } else {
          User.updateMany({ role: { _id: req.params.id } }, { $set: { role: { _id: role._id } } })
              .then(result => {
                res.json(
                  [
                    { requestRoleId: req.params.id },
                    { removedRole: params.removedRole },
                    { newRole: role },
                    { changes: result }
                  ]
                );
              }).catch(e => res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR));
        }
      }).catch(e => res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR));
}

/**
 * Gets one list of Roles if called with page number and limit,
 * if not - returns full list of Roles
 *
 * @query {number} listRoles: req.query.listRoles
 * @query {number} limit: req.query.limit
 *
 */
const listRoles = async (req, res) => {

  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const findPromise = Role.find({})
                          .skip(skipped)
                          .limit(limit);

  const countPromise = Role.countDocuments();

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
 * Get role
 * @requires {objectId} id: req.params.id
 * @returns {role, [users]}
 */
const getRole = async (req, res) => {

  const role = await Role.findOne({ _id: req.params.id });

  if (role) {
    res.json(role);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**
 * Update existing role
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} description: req.query.description
 * @parameter {string} active: req.query.active
 *
 * @returns {Role} Returns updated role
 */
const updateRole = async (req, res) => {

  const role = await Role.findOne({ _id: req.params.id });

  if (role) {

    const data = req.body;

    if (typeof data.active !== 'undefined' || data.active !== null) {
      if (data.active !== true) {
        data.active = ifArrayContains(role.code, mainRoles)
      }
    }


    const updatedRole = await
      Role.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true });
    res.json({ newRole: updatedRole });
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**
 * Function creates new Role if it doesn`t exists in db
 * @requires name: req.query.name,
 * @requires code: req.query.code,
 * @requires description: req.query.description,
 * active: req.query.active,
 * public: req.query.public,
 * editable: req.query.editable
 * @param req
 * @param res
 * @returns
 * {Role}
 */
const addRole = async (req, res) => {

  const role = await Role.findOne({ code: req.query.code, name: req.query.name });

  // If another object with same parameters exists,
  // return error
  if (role) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  } else {

    const newRole = await new Role({
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      active: req.body.active,
      public: req.body.isPublic,
      editable: req.body.isEditable
    });

    //Saving new object in to collection
    const savedRole = await newRole.save();

    if (savedRole) {
      res.status(201).json(savedRole);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }

};

/**
 * Deletes role, removes all same roles in Users list
 * @requires {objectId} id: req.params.id
 * @param {objectId} req.query.role
 * another role Id, to change Users roles
 * @returns swapRoles(req,res,next,{removedRole: removedRole});
 * (Calls swap roles function to change deleted role to another one,
 * if role parameter passed in query, if not - removes roles)
 * )
 */
const removeRole = async (req, res) => {

  const role = await Role.findOne({ _id: req.params.id });

  if (role) {
    if (!ifArrayContains(role.code, defaultRoles)) {
      const removedRole = await Role.findByIdAndRemove({ _id: req.params.id });
      if (removedRole) {
        return swapRoles(req, res, { removedRole: removedRole });
      } else {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

export { getRole, updateRole, removeRole, addRole, listRoles };


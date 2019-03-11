const User = require('../../db/models/User');
const Role = require('../../db/models/Role');
import { catchErrors, formPage } from './helper-functions/index';

const httpStatus = require('http-status');
const { defaultRoles } = require('../config/param-roles');

//function checks if role status belongs to list of default roles
function checkRole(role) {
  for (const mainRole of defaultRoles) {
    if (mainRole === role.code) {
      return true;
    }
  }
  return false;
}

/**
 * Get roles list.
 * @returns {Role[]}
 */
export const list = async (req, res) => {

  const roles = await Role.find({});

  if (roles) {
    res.status(200).json([
      { Total: roles.length },
      { Results: roles }]
    );
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**Get one page of roles
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
export const page = async (req, res) => {

  const roles = await Role.find({});

  if (roles) {
    const page = await
      formPage(
        req.headers.page,
        req.headers.limit,
        roles,
        roles.length
      );
    res.status(200).json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**
 * Get role
 * @requires {objectId} id: req.params.id
 * @returns {role, [users]}
 */
export const get = async (req, res) => {

  const role = await
    Role.findOne({ _id: req.params.id });

  if (role) {
    const users = await User.find({ role: req.params.id });
    res.status(200).json(
      [
        { role: role },
        { users: users }
      ]
    );
  } else {
    res.send(httpStatus.NOT_FOUND);
  }

};

/**
 * Update existing role
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} description: req.headers.description
 * @parameter {string} active: req.headers.active
 *
 * @returns {Role} Returns updated role
 */
export const update = async (req, res) => {

  const role = await
    Role.findOne({ _id: req.params.id });

  if (role) {
    const data = {
      description: req.headers.description,
      active:
        req.headers.active ?
          true
          :
          (role.code === 'ADMIN' || role.code === 'USER'),
      public: req.headers.public,
      editable: req.headers.editable
    };

    const updatedRole = await
      Role.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
      );

    res.status(200).json(
      { NewRole: updatedRole }
    );

  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**
 * Function changes current to a USER
 *
 * @param req
 * @param res
 * @param next
 * @param params
 *
 * @returns
 * { Removed: oldRole },
 * { NewRole: role },
 * { Changes: result }
 */
function swap(req, res, next, params) {

  catchErrors(
    Role.findOne({ code: 'USER' })
        .then(role => {
          if (!role) {
            return res.send(
              httpStatus.INTERNAL_SERVER_ERROR
            );
          }
          User.updateMany(
            { role: { _id: req.params.id } },
            { $set: { role: { _id: role._id } } })
              .then(result => {
                res.status(200).json(
                  [
                    { RequestRoleId: req.params.id },
                    { RemovedRole: params.removedRole },
                    { NewRole: role },
                    { Changes: result }
                  ]
                );
              }).catch(e => next(e));
        })
        .catch(e => next(e))
  );

}

/**
 * Function creates new Role if it doesn`t exists in db
 *
 * @requires name: req.headers.name,
 * @requires code: req.headers.code,
 * @requires description: req.headers.description,
 * active: req.headers.active,
 * public: req.headers.public,
 * editable: req.headers.editable
 * @param req
 * @param res
 *
 * @returns
 * {Role}
 */
export const add = async (req, res) => {

  const role = await
    Role.findOne(
      {
        code: req.headers.code,
        name: req.headers.name
      }
    );

  if (role) {
    return res.send(
      httpStatus.BAD_REQUEST
    );
  } else {

    const newRole = await new Role({
      name: req.headers.name,
      code: req.headers.code,
      description: req.headers.description,
      active: req.headers.active,
      public: req.headers.public,
      editable: req.headers.editable
    });

    const savedRole = await newRole.save();

    if (savedRole) {
      res.status(201).json(
        { Created: savedRole }
      );
    } else {
      return res.send(
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

};

/**
 * Deletes role, removes all same roles in Users list
 * @requires {objectId} id: req.params.id
 * @param {objectId} req.headers.role
 * another role Id, to change Users roles
 * @returns swapRoles(req,res,next,{removedRole: removedRole});
 * (Calls swap roles function to change deleted role to another one,
 * if role parameter passed in headers, if not - removes roles)
 * )
 */
export const remove = async (req, res, next) => {

  const role = await Role.findOne({ _id: req.params.id });

  if (role) {
    if (!checkRole(role)) {
      const removedRole = await
        Role.findByIdAndRemove(
          { _id: req.params.id }
        );
      if (removedRole) {
        return (
          swap(
            req,
            res,
            next,
            { removedRole: removedRole }
          )
        )
      } else {
        return res.send(httpStatus.NOT_FOUND);
      }
    } else {
      res.send(httpStatus.BAD_REQUEST);
    }
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

module.exports = { list, get, update, remove, add, page };


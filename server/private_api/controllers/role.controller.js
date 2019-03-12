import httpStatus from 'http-status';
import Role from '../../db/models/Role';
import User from '../../db/models/User';
import { defaultRoles } from '../config/param-roles';
import { catchErrors, formPage } from './helper-functions/index';

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
                res.json(
                  [
                    { requestRoleId: req.params.id },
                    { removedRole: params.removedRole },
                    { newRole: role },
                    { changes: result }
                  ]
                );
              }).catch(e => next(e));
        })
        .catch(e => next(e))
  );
}

/**
 * Get roles list.
 * @returns {Role[]}
 */
const list = async (req, res) => {

  const roles = await Role.find({});

  if (roles) {
    res.json(roles);
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
const page = async (req, res) => {

  const roles = await Role.find({});

  if (roles) {
    const page = await formPage(req.headers.page, req.headers.limit, roles);
    res.json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**
 * Get role
 * @requires {objectId} id: req.params.id
 * @returns {role, [users]}
 */
const get = async (req, res) => {

  const role = await
    Role.findOne({ _id: req.params.id });

  if (role) {
    const users = await User.find({ role: req.params.id });
    res.json(users);
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
const update = async (req, res) => {

  const role = await Role.findOne({ _id: req.params.id });

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
      Role.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true });
    res.json({ newRole: updatedRole });
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

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
const add = async (req, res) => {

  const role = await
    Role.findOne({ code: req.headers.code, name: req.headers.name });

  // If another object with same parameters exists,
  // return error
  if (role) {
    return res.send(httpStatus.BAD_REQUEST);
  } else {

    const newRole = await new Role({
      name: req.headers.name,
      code: req.headers.code,
      description: req.headers.description,
      active: req.headers.active,
      public: req.headers.public,
      editable: req.headers.editable
    });

    //Saving new object in to collection
    const savedRole = await newRole.save();

    if (savedRole) {
      res.status(201).json({ created: savedRole });
    } else {
      return res.send(httpStatus.INTERNAL_SERVER_ERROR);
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
const remove = async (req, res, next) => {

  const role = await Role.findOne({ _id: req.params.id });

  if (role) {
    if (!checkRole(role)) {
      const removedRole = await Role.findByIdAndRemove({ _id: req.params.id });
      if (removedRole) {
        return swap(req, res, next, { removedRole: removedRole });
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

export { list, get, update, remove, add, page };


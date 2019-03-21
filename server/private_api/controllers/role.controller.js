import httpStatus from 'http-status';
import Role from '../../models/Role';
import User from '../../models/User';
import { defaultRoles, mainRoles } from '../config/param-controllers';
import { catchErrors, getAsPage, ifArrayContains } from '../helper-functions';


/**
 * Function is called after removing a role,
 * passes through users of removed role and changes their role to USER
 *
 * @param req
 * @param res
 * @param next
 * @param params
 *
 * @returns
 * { requestRoleId: req.params.id },
 * { removedRole: params.removedRole },
 * { newRole: role },
 * { changes: result }
 */
function swapRoles(req, res, next, params) {

  catchErrors(
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
                }).catch(e => next(e));
          }
        }).catch(e => next(e))
  );
}

/**
 * Gets one list of Roles if called with page number and limit,
 * if not - returns full list of Roles
 *
 * @headers {number} listRoles: req.headers.listRoles
 * @headers {number} limit: req.headers.limit
 *
 */
const listRoles = async (req, res) => {

  const roles = await Role.find({});

  if (roles) {

    const page = req.headers.page && req.headers.limit
      ? await getAsPage(req.headers.page, req.headers.limit, roles)
      : roles;

    res.json(page);

  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
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
 * @parameter {string} description: req.headers.description
 * @parameter {string} active: req.headers.active
 *
 * @returns {Role} Returns updated role
 */
const updateRole = async (req, res) => {

  const role = await Role.findOne({ _id: req.params.id });

  if (role) {

    const data = {
      description: req.body.description,
      active: req.body.active ? true : ifArrayContains(role.code, mainRoles),
      public: req.body.public,
      editable: req.body.editable
    };

    const updatedRole = await
      Role.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true });
    res.json({ newRole: updatedRole });
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
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
const addRole = async (req, res) => {

  const role = await Role.findOne({ code: req.headers.code, name: req.headers.name });

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
      public: req.body.public,
      editable: req.body.editable
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
 * @param {objectId} req.headers.role
 * another role Id, to change Users roles
 * @returns swapRoles(req,res,next,{removedRole: removedRole});
 * (Calls swap roles function to change deleted role to another one,
 * if role parameter passed in headers, if not - removes roles)
 * )
 */
const removeRole = async (req, res, next) => {

  const role = await Role.findOne({ _id: req.params.id });

  if (role) {
    if (!ifArrayContains(role.code, defaultRoles)) {
      const removedRole = await Role.findByIdAndRemove({ _id: req.params.id });
      if (removedRole) {
        return swapRoles(req, res, next, { removedRole: removedRole });
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


import httpStatus from 'http-status';
import Branch from '../../models/Branch';
import { getAsPage } from '../helper-functions';

/**
 * Gets one listRoles of branches if called with listRoles and limit,
 * if not - returns full list of branches
 *
 * @headers {number} listRoles: req.body.listRoles
 * @headers {number} limit: req.body.limit
 *
 * @returns {listRoles}
 *
 */
const listBranches = async (req, res) => {

  const branches = await Branch.find({});

  if (branches) {

    const page = req.headers.page && req.headers.limit
      ? await getAsPage(req.headers.page, req.headers.limit, branches)
      : branches;

    res.json(page);

  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**
 * Get branch
 * @requires {objectId} id: req.params.id
 * @returns {Branch}
 */
const getBranch = async (req, res) => {

  const branch = await Branch.findOne({ _id: req.params.id });

  if (branch) {
    res.json(branch);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**
 * Update existing branch
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} name: req.body.name
 * @parameter {string} email: req.body.email,
 * @parameter {string} phone: req.body.phone
 * @parameter {string} fax: req.body.fax
 * @parameter {string} address: req.body.address
 * @parameter {string} information: req.body.information
 *
 * @returns {Branch}
 */
const updateBranch = async (req, res) => {

  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    fax: req.body.fax,
    address: req.body.address,
    information: req.body.information,
    status: req.body.status
  };

  const updated = await
    Branch.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );

  if (updated) {
    res.json(updated);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**
 * Function creates new Branch if it doesn`t exists in db
 *
 * @requires name: req.body.name,
 * @requires email: req.body.email,
 * @requires phone: req.body.phone,
 * @requires fax: req.body.fax
 * @requires address: req.body.address,
 * @requires information: req.body.information,
 * @requires status: req.body.status
 *
 * @param req
 * @param res
 *
 * @returns
 * {Branch}
 */
const addBranch = async (req, res) => {

  // If another object with same parameters exists,
  // return error
  const branch = await
    Branch.findOne({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      fax: req.body.fax
    });

  //If not - create new object
  if (branch) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  } else {

    const newBranch = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      fax: req.body.fax,
      address: req.body.address,
      information: req.body.information,
      status: req.body.status
    };

    //Saving new object in to collection
    const savedBranch = await newBranch.save();

    if (savedBranch) {
      res.status(201).json(savedBranch);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

export { listBranches, getBranch, updateBranch, addBranch };


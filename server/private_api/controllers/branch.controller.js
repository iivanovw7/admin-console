import httpStatus from 'http-status';
import Branch from '../../db/models/Branch';
import { formPage } from './helper-functions';

/**
 * Get branches list.
 * @returns {[
 * { Total: branches.length },
 * { Results: branches }
 * ]}
 */
const list = async (req, res) => {

  const branches = await Branch.find({});

  if (branches) {
    res.json(branches);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**Get one page of branches
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
const page = async (req, res) => {

  const branches = await Branch.find({});

  if (branches) {
    const page = await
      formPage(req.headers.page, req.headers.limit, branches);
    res.json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**
 * Get branch
 * @requires {objectId} id: req.params.id
 * @returns {Branch}
 */
const get = async (req, res) => {

  const branch = await Branch.findOne({ _id: req.params.id });

  if (branch) {
    res.json(branch);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**
 * Update existing branch
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} name: req.headers.name
 * @parameter {string} email: req.headers.email,
 * @parameter {string} phone: req.headers.phone
 * @parameter {string} fax: req.headers.fax
 * @parameter {string} address: req.headers.address
 * @parameter {string} information: req.headers.information
 *
 * @returns {Branch}
 */
const update = async (req, res) => {

  const data = {
    name: req.headers.name,
    email: req.headers.email,
    phone: req.headers.phone,
    fax: req.headers.fax,
    address: req.headers.address,
    information: req.headers.information,
    status: req.headers.status
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
    res.send(httpStatus.NOT_FOUND);
  }
};

/**
 * Function creates new Branch if it doesn`t exists in db
 *
 * @requires name: req.headers.name,
 * @requires email: req.headers.email,
 * @requires phone: req.headers.phone,
 * @requires fax: req.headers.fax
 * @requires address: req.headers.address,
 * @requires information: req.headers.information,
 * @requires status: req.headers.status
 *
 * @param req
 * @param res
 *
 * @returns
 * {Branch}
 */
const add = async (req, res) => {

  // If another object with same parameters exists,
  // return error
  const branch = await
    Branch.findOne({
      name: req.headers.name,
      email: req.headers.email,
      phone: req.headers.phone,
      fax: req.headers.fax
    });

  //If not - create new object
  if (branch) {
    return res.send(httpStatus.BAD_REQUEST);
  } else {

    const newBranch = {
      name: req.headers.name,
      email: req.headers.email,
      phone: req.headers.phone,
      fax: req.headers.fax,
      address: req.headers.address,
      information: req.headers.information,
      status: req.headers.status
    };

    //Saving new object in to collection
    const savedBranch = await newBranch.save();

    if (savedBranch) {
      res.status(201).json(savedBranch);
    } else {
      return res.send(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};


export { list, get, update, page, add };


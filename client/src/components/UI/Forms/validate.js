export const validateBranch = values => {

  const errors = {};

  if (!values.email) {
    errors.email = 'Field is required!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.phone) {
    errors.phone = 'Field is required!';
  } else if (/^(0|[1-9][0-9]{9})$/i.test(values.phone)) {
    errors.phone = 'Wrong format! XX XXX XXX XXXX';
  } else if (values.phone.length < 16) {
    errors.phone = 'Must be 12 characters!';
  }
  if (!values.fax) {
    errors.fax = 'Field is required!';
  } else if (/^(0|[1-9][0-9]{9})$/i.test(values.fax)) {
    errors.fax = 'Wrong format! XX XXX XXX XXXX';
  } else if (values.fax.length < 16) {
    errors.fax = 'Must be 12 characters!';
  }

  if (!values.name) {
    errors.name = 'Field is required!';
  } else if (values.name.length < 3) {
    errors.name = 'Must contain at least 3 symbols!';
  } else if (values.name.length > 30) {
    errors.name = 'Too many characters!';
  }

  if (!values.address) {
    errors.address = 'Field is required!';
  } else if (values.address.length < 3) {
    errors.address = 'Must contain at least 3 symbols!';
  } else if (values.address.length > 499) {
    errors.address = 'Too many characters!';
  }

  if (!values.information) {
    errors.information = 'Field is required!';
  } else if (values.information.length < 3) {
    errors.information = 'Must contain at least 3 symbols!';
  } else if (values.information.length > 499) {
    errors.information = 'Too many characters!';
  }

  return errors;
};

export const validateLogin = values => {

  const errors = {};

  if (!values.email) {
    errors.email = 'Field is required!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Field is required!';
  } else if (values.password.length > 15) {
    errors.password = 'Must contain less than 15 symbols!';
  } else if (values.password.length < 3) {
    errors.password = 'Must contain at least 3 symbols!';
  }

  return errors;
};

export const validateGroup = values => {

  const errors = {};

  if (!values.name) {
    errors.name = 'Field is required!';
  } else if (values.name.length < 3) {
    errors.name = 'Must be at least 3 characters!';
  } else if (values.name.length > 40) {
    errors.name = 'Too many characters!';
  }

  if (!values.description) {
    errors.description = 'Field is required!';
  } else if (values.description.length < 3) {
    errors.description = 'Must be at least 3 characters!';
  } else if (values.description.length > 499) {
    errors.description = 'Too many characters!';
  }

  if (!values.status && values.permissions) {
    errors.permissions = 'Permissions could not be set for disabled group!';
  }

  return errors;
};

export const validateRole = values => {

  const errors = {};

  if (!values.name) {
    errors.name = 'Field is required!';
  } else if (values.name.length < 3) {
    errors.name = 'Must be at least 3 characters!';
  } else if (values.name.length > 40) {
    errors.name = 'Too many characters!';
  }

  if (!values.code) {
    errors.code = 'Field is required!';
  } else if (values.code.length < 3) {
    errors.code = 'Must be at least 3 characters!';
  } else if (values.code.length > 40) {
    errors.code = 'Too many characters!';
  }

  if (!values.description) {
    errors.description = 'Field is required!';
  } else if (values.description.length < 3) {
    errors.description = 'Must be at least 3 characters!';
  } else if (values.description.length > 499) {
    errors.description = 'Too many characters!';
  }

  return errors;
};

export const validateTicket = values => {

  const errors = {};

  if (!values.note) {
    errors.note = 'Field is required!';
  } else if (values.note.length < 3) {
    errors.note = 'Must be at least 3 characters!';
  } else if (values.note.length > 499) {
    errors.note = 'Too many characters!';
  } else if (values.note === 'Ticket note...') {
    errors.note = 'Field is required!';
  }

  if (!values.status) {
    errors.note = 'Field is required!';
  }

  return errors;
};

export const validateMessage = values => {

  const errors = {};

  if (!values.subject) {
    errors.subject = 'Field is required!';
  } else if (values.subject.length < 3) {
    errors.subject = 'Must be at least 3 characters!';
  } else if (values.subject.length > 40) {
    errors.subject = 'Too many characters!';
  }

  if (!values.message) {
    errors.message = 'Field is required!';
  } else if (values.message.length < 3) {
    errors.message = 'Must be at least 3 characters!';
  } else if (values.message.length > 499) {
    errors.message = 'Too many characters!';
  }

  return errors;
};



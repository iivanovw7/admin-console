export const validate = values => {

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
  }

  if (!values.address) {
    errors.address = 'Field is required!';
  }

  if (!values.information) {
    errors.information = 'Field is required!';
  }

  return errors;
};

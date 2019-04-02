//values and properties needed for input form validation
export const validate = values => {

  const errors = {};

  if (!values.email) {
    errors.email = 'Field is required!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Wrong email format!';
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

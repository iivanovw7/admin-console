
//values and properties needed for input form validation
export const validate = values => {

  const errors = {};
  if (!values.email) {
    errors.email = 'Поле обязательно';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Не верный формат почтового адреса!';
  }
  if (!values.password) {
    errors.password = 'Поле обязательно!';
  } else if (values.password.length > 15) {
    errors.password = 'Не более пятнадцати символов!';
  } else if (values.password.length < 3) {
    errors.password = 'Не менее трех символов!';
  }

  return errors;
};

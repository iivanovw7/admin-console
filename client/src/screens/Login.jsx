import React from 'react';

const Login = () => {

  return (
    <form onSubmit={ console.log('Submitted')}>
      <button onClick={console.log('Submit action')}>Login</button>
    </form>
  );
};


export default Login;


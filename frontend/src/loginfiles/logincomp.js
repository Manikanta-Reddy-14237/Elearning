import React from 'react';

import SignIn from '../signincomp/Signin.js';
import TSignIn from '../signincomp/TeachSignin.js';
import SSignIn from '../signincomp/Studentsignin.js';

function Admlog() {
  return (<SignIn />);
}

function Tealog() {
  return (<TSignIn />);
}

function Stdlog() {
  return (<SSignIn />);
}

export { Admlog, Tealog, Stdlog };

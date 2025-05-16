import { isMobilePhone } from "validator";
import isEmail from "validator/lib/isEmail";


export function verifyLoginFields(email, password) {
  const error = { emailError: null, passwordError: null };
  if (!isEmail(email)) error.emailError = "Email is not valid";
  if (email.trim().length === 0) error.emailError = "Email is required";
  if (password.trim().length === 0)
    error.passwordError = "Password is required";

  return error;
}

export function verifySignupFields(fullName, email, phone, password, confirmPassword) {
  const error = {
    fullNameError: null,
    emailError: null,
    phoneError:null,
    passwordError: null,
    confirmPasswordError: null,
  };
  if (!isEmail(email)) 
    error.emailError = "Email is not valid";
  if(!isMobilePhone(phone))
    error.phoneError='Invalid phone number'
  if (password.trim().length < 6)
    error.passwordError = "Password should have minimum six characters";
  if(fullName.trim().length === 0)
    error.fullNameError='Name is required'
  if (email.trim().length === 0) 
    error.emailError = "Email is required";
  if(phone.trim().length===0)
    error.phoneError='Phone is required';
  if (password.trim().length === 0)
    error.passwordError = "Password is required";
  if (confirmPassword.trim() !== password.trim())
    error.confirmPasswordError = "Password did not match";
  if (confirmPassword.trim().length === 0)
    error.confirmPasswordError = "Confirm password is required";

  return error;
}

import { EMAIL_REGEXP, PASSWORD_REGEXP } from "@constants/common";
import * as Yup from "yup";

export const signupScheme = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .matches(EMAIL_REGEXP, "Email is not valid"),
  password: Yup.string()
    .required("Password is required")
    .matches(PASSWORD_REGEXP, "Password is not valid"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("does not match the password"),
});

export const signinScheme = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(PASSWORD_REGEXP, "Password is not valid"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .matches(EMAIL_REGEXP, "Email is not valid"),
});

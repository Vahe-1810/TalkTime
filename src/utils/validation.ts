import { EMAIL_REGEXP } from "@constants/common";
import * as Yup from "yup";

const passwordSchema: Yup.StringSchema<string> = Yup.string()
  .test(
    "has-digit",
    "Password must have at least one digit",
    (value: any) => value && /\d/.test(value)
  )
  .test(
    "has-uppercase",
    "Password must have at least one uppercase letter",
    (value: any) => value && /[A-Z]/.test(value)
  )
  .test(
    "length",
    "Password must be 8-20 characters long",
    (value: any) => value && value.length >= 8 && value.length <= 20
  )
  .required("Password is required");

export const signupScheme = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .matches(EMAIL_REGEXP, "Email is not valid"),
  password: passwordSchema,
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("does not match the password"),
});

export const signinScheme = Yup.object().shape({
  password: passwordSchema,
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .matches(EMAIL_REGEXP, "Email is not valid"),
});

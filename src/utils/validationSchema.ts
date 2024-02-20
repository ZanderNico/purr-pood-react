import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  user_name: Yup.string().required("Username is required"),
  user_role: Yup.string().required("User role is required"),
});

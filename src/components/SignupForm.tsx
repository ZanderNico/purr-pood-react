import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createUser } from "../slices/userSlice";
import { userValidationSchema } from "../utils/validationSchema";
import { AppDispatch } from "../store/store";

function SignupForm() {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      user_name: "",
      user_role: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      dispatch(createUser(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Your form fields here */}
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <label htmlFor="user_name">Username:</label>
      <input
        type="text"
        id="user_name"
        name="user_name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_name}
      />
      {formik.touched.user_name && formik.errors.user_name ? (
        <div>{formik.errors.user_name}</div>
      ) : null}

      <label htmlFor="user_role">User Role:</label>
      <input
        type="text"
        id="user_role"
        name="user_role"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_role}
      />
      {formik.touched.user_role && formik.errors.user_role ? (
        <div>{formik.errors.user_role}</div>
      ) : null}

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;

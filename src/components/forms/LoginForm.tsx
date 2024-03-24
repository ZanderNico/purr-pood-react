import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/good-pet-food.svg";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit }: any) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await onSubmit(values);
      } catch (error) {
        setErrors({ password: "Invalid credentials" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col max-w-fit border border-solid justify-center items-center bg-gray-200 px-5 py-2 rounded-md"
      >
        <img className="max-h-16 max-w-16" src={logo} alt="Logo" />
        <div>
          <h2 className="text-xl text-yellow-400 font-bold">LOG IN NOW</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
          </div>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-xs italic">
                * {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="font-medium">
              Password
            </label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-xs italic">
                * {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Submit
            </button>
          </div>
          <Link
            to="/sign-up"
            className="text-yellow-500 hover:text-yellow-600 text-xs italic text-center m-2"
          >
            Create an Account Here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

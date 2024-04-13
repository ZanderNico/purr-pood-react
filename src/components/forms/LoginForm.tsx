import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/good-pet-food.svg";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit }: any) {
  const [alert, setAlert] = useState(false)

  const showAlert = () => {
    setAlert(true);
    // Timer to turn off the alert after 3 seconds (adjust as needed)
    setTimeout(() => setAlert(false), 1500);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
        await onSubmit(values);
        showAlert();
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col max-w-fit justify-center items-center  px-3 py-2"
      >
        {alert && (<h1 className="text-md text-red-500 font-medium italic">*Invalid Email or Password*</h1>)}
        <div className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email here..."
              className="block w-full sm:w-48 md:w-52 lg:w-56 xl:w-64 rounded-full border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                * {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password here..."
              value={formik.values.password}
              className="block w-full rounded-full border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs italic">
                * {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex w-full justify-center rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              LOG IN
            </button>
          </div>
          <Link
            to="/sign-up"
            className="text-yellow-500 hover:text-yellow-600 text-xs italic text-center mt-20"
          >
            Create an Account Here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

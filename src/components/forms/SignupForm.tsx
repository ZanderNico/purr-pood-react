import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createUser } from "../../slices/userSlice";
import { userValidationSchema } from "../../utils/validationSchema";
import { AppDispatch } from "../../store/store";
import logo from "../../assets/good-pet-food.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      user_name: "",
      user_role: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createUser(values));
        setSignupSuccess(true);
        // window.alert('You have successfully signed up!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Signup error:', error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col max-w-fit justify-center items-center  px-5 py-2"
    >

      <div className="flex flex-col gap-2">
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
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter your password here..."
          className="block w-full rounded-full border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 text-xs italic">
            {formik.errors.password}
          </p>
        ) : null}

        <input
          type="text"
          id="user_name"
          name="user_name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.user_name}
          placeholder="Enter your name here..."
          className="block w-full rounded-full border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        />
        {formik.touched.user_name && formik.errors.user_name ? (
          <p className="text-red-500 text-xs italic">
            {formik.errors.user_name}
          </p>
        ) : null}

        <label htmlFor="user_role" className="font-medium text-yellow-400">
          Choose a role:
        </label>
        <div className="flex items-center gap-5">
          <div>
        <input
          type="radio"
          id="customer"
          name="user_role"
          value="customer"
          checked={formik.values.user_role === 'customer'}
          onChange={formik.handleChange}
          className="mr-1"
        />
        <label htmlFor="customer" className="text-gray-500">Customer</label>
        </div>
        <div>
        <input
          type="radio"
          id="admin"
          name="user_role"
          value="admin"
          checked={formik.values.user_role === 'admin'}
          onChange={formik.handleChange}
          className="mr-1"
        />
        <label htmlFor="admin" className="text-gray-500">Admin</label>
        </div>
      </div>
        {formik.touched.user_role && formik.errors.user_role ? (
          <p className="text-red-600 text-xs italic">
            {formik.errors.user_role}
          </p>
        ) : null}
{!signupSuccess && (
  <>
        <button
          type="submit"
          className="flex w-full justify-center rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
        >
          Sign Up
        </button>
 
        <Link
            to="/"
            className="text-yellow-400 hover:text-yellow-500 text-xs italic text-center mt-16"
          >
            Go back to log in
          </Link>
          </>
            )}
      </div>
      
      {signupSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> You have successfully signed up!</span>
        </div>
      )}
    </form>
  );
}

export default SignupForm;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginForm({onSubmit}: any) {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
          try {
            await onSubmit(values);
          } catch (error) {
            setErrors({ password: 'Invalid credentials' });
          } finally {
            setSubmitting(false);
          }
        },
      });
    
      return (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div>{formik.errors.email}</div>
            )}
          </div>
    
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div>{formik.errors.password}</div>
            )}
          </div>
    
          <button type="submit" disabled={formik.isSubmitting}>
            Submit
          </button>
        </form>
      );
}

export default LoginForm
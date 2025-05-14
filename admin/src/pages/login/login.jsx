import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login.css'; // Import CSS file

import axios from '../../lib/axios';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleLogin = async values => {
    const result = await axios.post('/signin', { ...values });
    if (result.data.success) {
      login(result.data.data);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#d9f2ff]">
      <div className="flex bg-white shadow w-[700px] h-[400px] rounded-3xl overflow-hidden">
        <div className="grow bg-gradient-to-r from-cyan-950 to-cyan-700 text-white p-[40px] flex flex-col justify-center items-center rounded-(15px 120px 120px 15px)">
          <h2 className="font-bold">Enter your credentials to login</h2>
        </div>
        {/* Employee Login Section */}
        <div className="grow p-[40px]">
          <h2 className="mb-2">Login Details</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-2">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-2">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Admin Login Section */}
      </div>
    </div>
  );
};

export default Login;

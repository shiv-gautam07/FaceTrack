import { Button } from '@/components/ui/Button';
import FormikInput from '@/components/ui/formik/Input';
import FormikSelect from '@/components/ui/formik/Select';
import { Form, Formik } from 'formik';
import { defaults } from 'lodash';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from '@/lib/axios';

const GENDERs = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'NotToSay', value: 'NotToSay' },
];
const validationSchema = Yup.object({
  firstName: Yup.string().required().min(3).length(50),
  lastName: Yup.string().required().min(3).length(50),
  email: Yup.string().email('Invalid email format').required(),
  gender: Yup.object().nonNullable('Required field'),
  roleId: Yup.object().nonNullable('Required field'),
  department: Yup.string().required(),
  password: Yup.string()
    .required()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().when('password', (password, schema) =>
    password
      ? schema
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required')
      : schema,
  ),
  phone: Yup.string().required(),
  address1: Yup.string().required(),
  street: Yup.string().required(),
  cityId: Yup.object().nonNullable('Required field'),
  stateCode: Yup.object().nonNullable('Required field'),
  zipCode: Yup.string().required(),
  countryCode: Yup.object().nonNullable('Required field'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  gender: null,
  roleId: null,
  department: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address1: '',
  street: '',
  cityId: null,
  stateCode: null,
  zipCode: '',
  countryCode: null,
};

async function fetchCountries() {
  const response = await axios.get(`/countries`);
  const result = response.data;
  return response.status === 200 && result.success
    ? result.data
    : { count: 0, rows: [] };
}

export function AddUpdateModal({ isOpen, toggleModal, user }) {
  const handleAddUpdate = values => {};
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries().then(result => setCountries(result));
  }, []);

  return (
    isOpen && (
      <div className="fixed inset-0 backdrop-opacity-25 backdrop-invert bg-white/30  flex justify-center items-center z-50">
        <div className="bg-white  rounded-lg shadow-lg w-9/12 h-fit ">
          <h2 className="text-xl font-semibold mb-[1px] pb-2 p-4 shadow">
            {user && user.id ? 'Edit User Details' : 'Add New User'}
          </h2>

          <Formik
            initialValues={defaults(user, initialValues)}
            // enableReinitialize
            validationSchema={validationSchema}
            onSubmit={values => handleAddUpdate(values)}
          >
            {({ isSubmitting }) => (
              <Form className="">
                <div className="h-[70vh] overflow-x-auto  bg-gray-50 p-4">
                  <div className="mb-2 flex gap-2">
                    <div className="grow">
                      <FormikInput
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        label="First Name"
                        required
                      />
                    </div>
                    <div className="grow">
                      <FormikInput
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        label="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      label="Email"
                      required
                    />
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="grow">
                      <FormikInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        label="Password"
                        required
                      />
                    </div>
                    <div className="grow">
                      <FormikInput
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        label="Confirm Password"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="grow">
                      <FormikInput
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        label="Phone"
                        required
                      />
                    </div>
                    <div className="grow">
                      <FormikSelect
                        name="gender"
                        placeholder="Select gender"
                        label="Select Gender"
                        options={GENDERs}
                        getOptionValue={option => option.value}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <FormikInput
                      type="text"
                      name="department"
                      placeholder="Department"
                      label="Department"
                      required
                    />
                  </div>

                  <div className="mb-2 flex gap-2">
                    <div className="grow">
                      <FormikInput
                        type="text"
                        name="address1"
                        placeholder="Address1"
                        label="Address1"
                        required
                      />
                    </div>
                    <div className="grow">
                      <FormikInput
                        type="text"
                        name="street"
                        placeholder="Street"
                        label="Street"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-2 flex gap-2">
                    <div className="grow">
                      <FormikSelect
                        name="countryCode"
                        placeholder="Select country"
                        label="Country"
                        options={countries}
                        required
                      />
                    </div>

                    <div className="grow">
                      <FormikSelect
                        name="stateCode"
                        placeholder="Select state"
                        label="State"
                        options={states}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="grow">
                      <FormikSelect
                        name="cityId"
                        placeholder="Select City"
                        label="City"
                        options={cities}
                        required
                      />
                    </div>

                    <div className="grow">
                      <FormikInput
                        type="text"
                        name="zipCode"
                        placeholder="Zipcode"
                        label="Zipcode"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 p-2 justify-end pr-4 border-t border-gray-200 bg-white">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => toggleModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button //variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
}

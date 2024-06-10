import { Form, Link, redirect, useActionData } from 'react-router-dom';
import { Logo, FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const inputErrors = {};
  if (!data.name) inputErrors.name = 'Name is required';
  if (!data.email) inputErrors.email = 'Email is required';
  if (!data.email.includes('@') || !data.email.includes('.'))
    inputErrors.email = 'Email is invalid';
  if (!data.password) inputErrors.password = 'Password is required';
  if (!data.confirmPassword)
    inputErrors.confirmPassword = 'Confirm Password is required';
  if (data.password !== data.confirmPassword) {
    inputErrors.confirmPassword = 'Passwords do not match';
  }
  if (Object.keys(inputErrors).length > 0) {
    return { inputErrors };
  }

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const actionData = useActionData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <p className="form__title">Register</p>
        <FormRow
          name="name"
          type="text"
          error={actionData?.inputErrors?.name}
        />
        <FormRow
          name="email"
          type="text"
          error={actionData?.inputErrors?.email}
        />
        <FormRow
          name="password"
          type="password"
          error={actionData?.inputErrors?.password}
        />
        <FormRow
          name="confirmPassword"
          labelText="Confirm Password"
          type="password"
          error={actionData?.inputErrors?.confirmPassword}
        />
        <SubmitBtn formBtn />
        <p className="form__tip">
          Already have an account?
          <Link to="/login" className="member__btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;

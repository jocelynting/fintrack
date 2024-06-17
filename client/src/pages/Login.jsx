import { Form, Link, redirect, useActionData } from 'react-router-dom';
import { Logo, LoginRegisterFormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const inputErrors = {};
  if (!data.email) inputErrors.email = 'Email is required';
  if (!data.email.includes('@') || !data.email.includes('.'))
    inputErrors.email = 'Email is invalid';
  if (!data.password) inputErrors.password = 'Password is required';
  if (Object.keys(inputErrors).length > 0) {
    return { inputErrors };
  }

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const actionData = useActionData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <p className="form__title">Login</p>
        <LoginRegisterFormRow
          name="email"
          type="text"
          error={actionData?.inputErrors?.email}
        />
        <LoginRegisterFormRow
          name="password"
          type="password"
          error={actionData?.inputErrors?.password}
        />
        <SubmitBtn formBtn />
        <p className="form__tip">
          Not have an account yet?
          <Link to="/register" className="member__btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;

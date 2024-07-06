import { Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Profile';
import { LoginRegisterFormRow, SubmitBtn } from '../components';
import { useDashboardContext } from '../pages/Dashboard';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch('/users/update-user', data);
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useDashboardContext();
  const { name, email } = user;

  return (
    <Wrapper>
      <div>
        <Form method="post" className="form">
          <LoginRegisterFormRow name="name" type="text" defaultValue={name} />
          <LoginRegisterFormRow name="email" type="text" defaultValue={email} />
          <SubmitBtn name="update" formBtn />
        </Form>
      </div>
    </Wrapper>
  );
};

export default Profile;

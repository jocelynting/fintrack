import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ formBtn }) => {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === 'submitting';

  return (
    <button
      className={`btn ${formBtn && 'form__btn'}`}
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default SubmitBtn;

import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  min-height: 100vh;

  .logo {
    display: block;
    margin: 0 auto;
  }

  .form__title {
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }

  .form {
    max-width: 30rem;
    border-top: 5px solid var(--primary-500);
  }

  .form__tip {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .member__btn {
    color: var(--primary-600);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

export default Wrapper;

import styled from 'styled-components';

const Wrapper = styled.div`
  .charts {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }

  .charts__buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .charts__button {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--border-radius);
    letter-spacing: var(--letter-spacing);
    padding: 0.35rem 1.75rem;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    text-decoration: none;
    font-size: 1rem;
  }

  .charts__button:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
    text-decoration: underline;
  }
`;

export default Wrapper;

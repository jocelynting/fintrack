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
    margin-bottom: 2rem;
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

  .charts__button:active {
    transform: scale(0.98);
  }

  .legend__details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .legend__detail-item {
    grid-column: span 1;
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
`;

export default Wrapper;

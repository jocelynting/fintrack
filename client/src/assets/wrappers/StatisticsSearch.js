import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  // date picker
  .react-date-picker {
    background-color: var(--background-color);
    border: 1px solid var(--grey-300);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    height: 40px;
    font-family: inherit;
    font-weight: 400;
    line-height: 1;
    font-size: var(--small-text);
  }

  .react-date-picker__wrapper {
    display: flex;
    align-items: center;
    border: none;
  }

  .react-date-picker__calendar {
    border: none;
  }

  .react-date-picker__button:active {
    /* background-color: black; */
  }

  .react-date-picker__clear-button {
    display: none;
  }

  .react-date-picker__calendar button:hover {
    background-color: var(--grey-300);
  }

  .react-calendar__tile--active {
    background: var(--primary-200);
  }

  .react-calendar__tile--now {
    background: var(--primary-600);
  }
`;

export default Wrapper;

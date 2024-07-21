import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'time category'
    'description description';
  align-items: start;
  gap: 1rem;

  padding: 1rem 0;

  .search__time {
    grid-area: time;
    display: flex;
    gap: 1rem;
  }

  .search__category {
    grid-area: category;
    display: flex;
    gap: 1rem;
  }

  .search__description {
    grid-area: description;
    display: flex;
    gap: 1rem;
  }

  .btn {
    padding: 0 4rem;
  }

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
    background-color: var(--primary-100);
  }

  .react-date-picker__calendar-button__icon {
    stroke: var(--text-color);
  }

  .react-calendar__tile--active {
    background: var(--primary-200);
  }

  .react-calendar__tile--now {
    background: var(--primary-600);
  }
`;

export default Wrapper;

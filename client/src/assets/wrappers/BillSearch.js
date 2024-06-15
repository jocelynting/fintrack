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
`;

export default Wrapper;
